import pandas as pd
import numpy as np
import os
import xgboost as xgb
from sklearn.metrics import mean_absolute_error
from datetime import timedelta

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FEATURES = [
    "day_of_week", "is_weekend", "is_month_end", "is_monday",
    "month", "week_of_month", "year",
    "prev_day_sales", "prev_3day_avg", "prev_7day_avg", "prev_7day_std"
]

def load_data():
    df = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "combined_2023_2025_channels.csv"))
    df["Date"] = pd.to_datetime(df["Date"])
    df = df[df["Date"].dt.weekday != 0]  # Exclude Mondays
    df["TotalSales"] = df[["Dine-In", "Delivery", "Take-Out"]].sum(axis=1)
    return df[["Date", "TotalSales"]]

def build_features(df):
    df = df.copy()
    df["day_of_week"] = df["Date"].dt.dayofweek
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)
    df["is_month_end"] = df["Date"].dt.is_month_end.astype(int)
    df["is_monday"] = (df["day_of_week"] == 0).astype(int)
    df["month"] = df["Date"].dt.month
    df["week_of_month"] = df["Date"].apply(lambda d: (d.day - 1) // 7 + 1)
    df["year"] = df["Date"].dt.year
    df["prev_day_sales"] = df["TotalSales"].shift(1)
    df["prev_3day_avg"] = df["TotalSales"].shift(1).rolling(window=3).mean()
    df["prev_7day_avg"] = df["TotalSales"].shift(1).rolling(window=7).mean()
    df["prev_7day_std"] = df["TotalSales"].shift(1).rolling(window=7).std()
    df = df.dropna().reset_index(drop=True)
    return df

from prophet import Prophet

def train_and_forecast(df, forecast_days=365):  # Forecast full year 2025
    prophet_df = df[["Date", "TotalSales"]].rename(columns={"Date": "ds", "TotalSales": "y"})
    prophet = Prophet(weekly_seasonality=True, yearly_seasonality=True)
    prophet.fit(prophet_df)
    trend_forecast = prophet.predict(prophet.make_future_dataframe(periods=0))
    df = df.merge(trend_forecast[["ds", "yhat"]], left_on="Date", right_on="ds", how="left")
    df.rename(columns={"yhat": "prophet_trend"}, inplace=True)
    df["residual"] = df["TotalSales"] - df["prophet_trend"]
    df.drop(columns=["ds"], inplace=True)

    df = build_features(df)
    residual_mean = df["residual"].mean()
    train = df[df["Date"] <= "2025-03-31"]
    test_start = pd.Timestamp("2025-01-01")
    future_dates = pd.date_range(start=test_start, periods=forecast_days*2)
    future_dates = [d for d in future_dates if d.weekday() != 0][:forecast_days]

    model = xgb.XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=4,
        subsample=0.8,
        colsample_bytree=0.8,
        min_child_weight=1,
        gamma=0.1,
        random_state=42
    )

    X_train = train[FEATURES]
    y_train = train["residual"] - residual_mean
    model.fit(X_train, y_train)

    last_known = df.set_index("Date").copy()
    predictions = []
    for date in future_dates:
        # Skip if we can't compute required lags
        if len(last_known) < 7:
            print(f"⚠️ Warning: Cannot generate valid features for {date}. Skipping.")
            continue

        row = {
            "Date": date,
            "day_of_week": date.weekday(),
            "is_weekend": int(date.weekday() in [5, 6]),
            "is_month_end": int(pd.Timestamp(date).is_month_end),
            "is_monday": int(date.weekday() == 0),
            "month": date.month,
            "week_of_month": (date.day - 1) // 7 + 1,
            "year": date.year,
            "prev_day_sales": last_known["TotalSales"].iloc[-1],
            "prev_3day_avg": last_known["TotalSales"].tail(3).mean(),
            "prev_7day_avg": last_known["TotalSales"].tail(7).mean(),
            "prev_7day_std": last_known["TotalSales"].tail(7).std()
        }
        if any(pd.isna(list(row.values()))):
            print(f"⚠️ Warning: Cannot generate valid features for {date}. Skipping.")
            continue

        pred_df = pd.DataFrame([row])
        residual_pred = model.predict(pred_df[FEATURES])[0]
        trend = prophet.predict(pd.DataFrame({"ds": [date]}))["yhat"].values[0]
        forecast = residual_pred + trend + residual_mean
        predictions.append({"Date": date, "ForecastTotalSales": forecast})
        last_known.loc[date] = row
        last_known.loc[date, "TotalSales"] = forecast

    result_df = pd.DataFrame(predictions)

    # Estimate staffing and inventory
    avg_ticket = 25.0  # average order value
    orders = result_df["ForecastTotalSales"] / avg_ticket
    result_df["Orders"] = orders
    result_df["PizzasNeeded"] = orders.round()
    result_df["CrewNeeded"] = np.ceil(orders / 45.0).astype(int)
    result_df["CheeseLbs"] = result_df["PizzasNeeded"] * 0.5
    result_df["DoughLbs"] = result_df["PizzasNeeded"] * 0.25
    result_df["SauceLiters"] = result_df["PizzasNeeded"] * 0.1
    result_df.to_csv(os.path.join(PROJECT_ROOT, "outputs", "simple_total_forecast.csv"), index=False)

    # Aggregate to weekly and monthly forecasts
    result_df["Week"] = result_df["Date"].dt.to_period("W").apply(lambda r: r.start_time)
    result_df["Month"] = result_df["Date"].dt.to_period("M").dt.to_timestamp()

    print("✅ XGBoost forecast saved to outputs/simple_total_forecast.csv")
    weekly_df = result_df.groupby("Week").agg({
        "Orders": "sum",
        "ForecastTotalSales": "sum",
        "PizzasNeeded": "sum",
        "CheeseLbs": "sum",
        "DoughLbs": "sum",
        "SauceLiters": "sum"
    }).reset_index()
    weekly_df["CrewNeeded"] = np.ceil(weekly_df["PizzasNeeded"] / 45.0).astype(int)

    monthly_df = result_df.groupby("Month").agg({
        "Orders": "sum",
        "ForecastTotalSales": "sum",
        "PizzasNeeded": "sum",
        "CheeseLbs": "sum",
        "DoughLbs": "sum",
        "SauceLiters": "sum"
    }).reset_index()
    monthly_df["CrewNeeded"] = np.ceil(monthly_df["PizzasNeeded"] / 45.0).astype(int)

    return result_df, weekly_df, monthly_df

    



from sklearn.metrics import mean_absolute_error, mean_squared_error

def plot_forecast_vs_actual(forecast_df, actual_df):
    import matplotlib.pyplot as plt

    merged = pd.merge(forecast_df, actual_df, on="Date", how="inner")
    plt.figure(figsize=(14, 5))
    plt.plot(merged["Date"], merged["ForecastTotalSales"], label="Forecasted", color="blue")
    plt.plot(merged["Date"], merged["TotalSales"], label="Actual", color="orange")
    plt.title("Forecast vs Actual Total Sales")
    plt.xlabel("Date")
    plt.ylabel("Sales")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # Calculate error metrics
    merged.dropna(inplace=True)
    mae = mean_absolute_error(merged["TotalSales"], merged["ForecastTotalSales"])
    rmse = np.sqrt(((merged["TotalSales"] - merged["ForecastTotalSales"]) ** 2).mean())
    print(f"📊 MAE: {mae:.2f} | RMSE: {rmse:.2f}")
    plt.show()


    df = load_data()
    daily, weekly, monthly = train_and_forecast(df)

    weekly.to_csv(os.path.join(PROJECT_ROOT, "outputs", "weekly_forecast.csv"), index=False)
    monthly.to_csv(os.path.join(PROJECT_ROOT, "outputs", "monthly_forecast.csv"), index=False)
    print("✅ Weekly and monthly forecasts saved to outputs/")

    actuals = df[df["Date"].dt.year == 2025][["Date", "TotalSales"]].copy()
    plot_forecast_vs_actual(daily, actuals)


if __name__ == "__main__":
    df = load_data()
    daily, weekly, monthly = train_and_forecast(df)

    daily.to_csv(os.path.join(PROJECT_ROOT, "outputs", "daily_forecast.csv"), index=False)
    weekly.to_csv(os.path.join(PROJECT_ROOT, "outputs", "weekly_forecast.csv"), index=False)
    monthly.to_csv(os.path.join(PROJECT_ROOT, "outputs", "monthly_forecast.csv"), index=False)
    print("✅ Daily, weekly, and monthly forecasts saved to outputs/")

    actuals = df[(df["Date"] > "2025-04-18") & (df["Date"] <= daily["Date"].max())][["Date", "TotalSales"]].copy()
    merged_df = pd.merge(daily, actuals, on="Date", how="inner")
    if merged_df.empty:
        print("⚠️ No overlapping dates found between forecast and actuals after April 18, 2025. Skipping evaluation.")
    else:
        plot_forecast_vs_actual(daily[daily["Date"] > "2025-04-18"], actuals)
