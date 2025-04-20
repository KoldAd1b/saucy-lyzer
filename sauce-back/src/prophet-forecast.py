# forecast_ops_pipeline.py

import pandas as pd
import numpy as np
from prophet import Prophet
import os
import math
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test_model_accuracy(forecast_out, df_actual):
    df_actual["ds"] = pd.to_datetime(df_actual["Date"])
    forecast_out["ds"] = pd.to_datetime(forecast_out["Date"])

    holdout = df_actual[df_actual["ds"] > "2025-03-31"].copy()
    holdout = holdout[holdout["ds"].dt.weekday != 0]
    holdout_forecast = forecast_out[forecast_out["ds"].isin(holdout["ds"])].copy()

    if not holdout.empty and not holdout_forecast.empty:
        comparison = pd.merge(
            holdout[["ds", "NetSales"]],
            holdout_forecast[["ds", "ForecastNetSales"]],
            on="ds",
            how="inner"
        )
        comparison = comparison[comparison["ds"].dt.weekday != 0]

        if not comparison.empty:
            mae = mean_absolute_error(comparison["NetSales"], comparison["ForecastNetSales"])
            rmse = mean_squared_error(comparison["NetSales"], comparison["ForecastNetSales"])
            print(f"📈 Forecast Evaluation on Holdout:")
            print(f"   - MAE: {mae:.2f}")
            print(f"   - RMSE: {math.sqrt(rmse):.2f}")
            print(f"   - Relative MAE: {mae / comparison['NetSales'].mean() * 100:.2f}%")
        else:
            print("⚠️ No matching dates between actual and forecast data.")
    else:
        print("⚠️ No holdout data to evaluate.")

def forecast_and_generate_ops():
    outputs_dir = os.path.join(PROJECT_ROOT, "outputs")
    os.makedirs(outputs_dir, exist_ok=True)

    df = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "combined_2023_2025_actuals.csv"))
    df = df[df["Date"] <= "2025-04-18"]
    df = df[["Date", "NetSales"]].rename(columns={"Date": "ds", "NetSales": "y"})
    df["ds"] = pd.to_datetime(df["ds"])

    df_train = df[df["ds"].dt.weekday != 0]
    df_train = df_train[df_train["ds"].between("2024-06-01", "2025-03-31")]
    df_train["y"] = np.log1p(df_train["y"])

    model = Prophet(weekly_seasonality=True, yearly_seasonality=True, changepoint_prior_scale=0.03)
    model.add_seasonality(name='dow', period=7, fourier_order=3)
    model.fit(df_train)

    future = model.make_future_dataframe(periods=21)
    forecast = model.predict(future)

    forecast["ds"] = pd.to_datetime(forecast["ds"])
    forecast["yhat"] = np.expm1(forecast["yhat"])
    forecast["yhat"] = forecast.apply(
        lambda row: 0 if row["ds"].weekday() == 0 else max(row["yhat"], 0), axis=1
    )

    forecast_out = forecast[["ds", "yhat"]].rename(columns={"ds": "Date", "yhat": "ForecastNetSales"})

    channel_mix = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "channel_mix_2023_2024.csv"))
    latest_mix = channel_mix[channel_mix["Year"] == 2024][["Dining Option", "Channel Share"]]
    mix_dict = dict(zip(latest_mix["Dining Option"], latest_mix["Channel Share"]))

    forecast_out["Dine-In"] = forecast_out["ForecastNetSales"] * mix_dict.get("Dine In", 0.25)
    forecast_out["Delivery"] = forecast_out["ForecastNetSales"] * mix_dict.get("Delivery", 0.35)
    forecast_out["Take-Out"] = forecast_out["ForecastNetSales"] * mix_dict.get("Take Out", 0.40)

    forecast_out.to_csv(os.path.join(outputs_dir, "daily_forecast.csv"), index=False)

    time_df = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "time_shares_2023_2025_apr18.csv"))
    hourly_forecast = []

    for _, row in forecast_out.iterrows():
        for _, trow in time_df.iterrows():
            for channel in ["Dine-In", "Delivery", "Take-Out"]:
                hourly_forecast.append({
                    "Date": row["Date"],
                    "Time": trow["Time"],
                    "Channel": channel,
                    "Sales": row[channel] * trow["Share"]
                })

    hourly_df = pd.DataFrame(hourly_forecast)
    hourly_df["Date"] = pd.to_datetime(hourly_df["Date"])
    hourly_df.to_csv(os.path.join(outputs_dir, "hourly_forecast.csv"), index=False)

    df_actual = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "combined_2023_2025_actuals.csv"))
    df_actual = df_actual[df_actual["Date"] <= "2025-04-18"]

    if df_actual["Orders"].sum() == 0 or np.isnan(df_actual["Orders"].sum()):
        avg_ticket = 25
    else:
        avg_ticket = df_actual["NetSales"].sum() / df_actual["Orders"].sum()

    forecast_out["PizzasNeeded"] = (forecast_out["ForecastNetSales"] / avg_ticket).round()

    # Calculate crew needed with more detailed factors
    hourly_avg = hourly_df.groupby("Date")["Sales"].mean()
    hourly_max = hourly_df.groupby("Date")["Sales"].max()
    peak_factor = (hourly_max / hourly_avg).reindex(pd.to_datetime(forecast_out["Date"])).fillna(1)

    # Base crew calculation
    base_crew = forecast_out["ForecastNetSales"] / avg_ticket / 45.0  # 45 orders per crew member

    # Additional factors
    dine_in_factor = forecast_out["Dine-In"] * 0.0025  # Dine-In requires more labor
    peak_load_factor = peak_factor  # Account for peak hours
    weekend_factor = forecast_out["Date"].dt.dayofweek.isin([5, 6]).astype(int) * 0.2  # 20% more staff on weekends
    month_end_factor = forecast_out["Date"].dt.is_month_end.astype(int) * 0.15  # 15% more staff on month end

    forecast_out["CrewNeeded"] = (
        base_crew + 
        dine_in_factor + 
        peak_load_factor + 
        weekend_factor + 
        month_end_factor
    ).apply(np.ceil)

    # Ensure minimum crew of 2 during operating hours
    forecast_out["CrewNeeded"] = forecast_out["CrewNeeded"].clip(lower=2)

    baseline = df_actual["NetSales"].tail(7).mean()
    forecast_out["SuggestPromo"] = forecast_out["ForecastNetSales"].apply(
        lambda x: "YES" if x < 0.9 * baseline else "No")

    forecast_out.to_csv(os.path.join(outputs_dir, "ops_sheet.csv"), index=False)

    test_model_accuracy(forecast_out, df_actual)
    print("✅ Forecast and Ops Sheet saved to 'outputs/' folder.")


if __name__ == "__main__":
    forecast_and_generate_ops()