import pandas as pd
import numpy as np
import os
import xgboost as xgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt

# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- Forecasting Code ---

def build_features(df, target_col):
    df = df.copy()
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values("Date")
    df["day_of_week"] = df["Date"].dt.dayofweek
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)
    df["is_month_end"] = df["Date"].dt.is_month_end.astype(int)
    df["is_monday"] = (df["day_of_week"] == 0).astype(int)
    df["month"] = df["Date"].dt.month
    df["week_of_month"] = df["Date"].apply(lambda d: (d.day - 1) // 7 + 1)
    df["year"] = df["Date"].dt.year

    df["prev_day_sales"] = df[target_col].shift(1)
    df["prev_3day_avg"] = df[target_col].shift(1).rolling(window=3).mean()
    df["prev_7day_avg"] = df[target_col].shift(1).rolling(window=7).mean()
    df["prev_7day_std"] = df[target_col].shift(1).rolling(window=7).std()

    df["is_big_sale"] = (df[target_col] > df[target_col].rolling(7).mean() * 1.4).astype(int)
    df["days_since_spike"] = df["is_big_sale"].cumsum()
    df["days_since_spike"] = df.groupby("days_since_spike").cumcount()

    US_HOLIDAYS = pd.to_datetime([
        "2023-02-12",  # Super Bowl
        "2023-07-04", "2023-11-23",
        "2024-02-11", "2024-07-04", "2024-11-28",
        "2025-02-09", "2025-07-04", "2025-11-27"
    ])

    df["rolling_max_7d"] = df[target_col].shift(1).rolling(window=7).max()
    df["rolling_min_7d"] = df[target_col].shift(1).rolling(window=7).min()
    df["gap_to_max"] = df["rolling_max_7d"] - df[target_col]
    df["gap_to_min"] = df[target_col] - df["rolling_min_7d"]
    df["trend_up"] = (df["prev_3day_avg"] > df["prev_7day_avg"]).astype(int)
    df["is_holiday"] = df["Date"].isin(US_HOLIDAYS).astype(int)

    df["lag_7"] = df[target_col].shift(7)
    df["lag_14_avg"] = df[target_col].shift(1).rolling(window=14).mean()

    df["volatility_7d"] = df[target_col].shift(1).rolling(window=7).std()
    df["is_volatility_spike"] = (df["prev_day_sales"] - df["prev_3day_avg"]).abs() > df["volatility_7d"]
    df["is_volatility_spike"] = df["is_volatility_spike"].astype(int)

    df["weekday_median"] = df.groupby("day_of_week")[target_col].transform("median")
    df["weekday_deviation"] = df[target_col] - df["weekday_median"]

    df = df.replace([np.inf, -np.inf], np.nan).dropna().fillna(0)
    return df

from prophet import Prophet

# --- Forecast Evaluation Over Multiple Splits ---
def evaluate_multiple_windows(df, channel_name, cutoff_dates):
    df = df[df["Date"].dt.weekday != 0]
    prophet_df = df[["Date", channel_name]].rename(columns={"Date": "ds", channel_name: "y"})
    prophet_model = Prophet(weekly_seasonality=True, yearly_seasonality=True)
    prophet_model.fit(prophet_df)
    trend_df = prophet_model.predict(prophet_model.make_future_dataframe(periods=0))
    df = df.merge(trend_df[["ds", "yhat"]], left_on="Date", right_on="ds", how="left")
    df["prophet_trend"] = df["yhat"]
    df.drop(columns=["ds", "yhat"], inplace=True)
    df["residual"] = df[channel_name] - df["prophet_trend"]


    df = build_features(df, target_col="residual")

    results = []
    for cutoff in cutoff_dates:
        train = df[df["Date"] <= cutoff]
        test = df[df["Date"] > cutoff]

        features = [
            "day_of_week", "is_weekend", "is_month_end", "is_monday",
            "month", "week_of_month", "year",
            "prev_day_sales", "prev_3day_avg", "prev_7day_avg", "prev_7day_std",
            "days_since_spike", "gap_to_max", "gap_to_min", "trend_up", "is_holiday",
            "lag_7", "lag_14_avg", "is_volatility_spike", "weekday_deviation"
        ]

        X_train = train[features]
        residual_mean = train["residual"].mean()
        y_train = train["residual"] - residual_mean
        X_test = test[features]
        y_test = test[channel_name]

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
        model.fit(X_train, y_train)
        residual_pred = model.predict(X_test)
        y_pred = test["prophet_trend"] + residual_pred + residual_mean

        mae = mean_absolute_error(y_test, y_pred)
        rel_mae = mae / y_test.mean() * 100
        results.append({"cutoff": cutoff, "MAE": mae, "Relative MAE": rel_mae})

    return pd.DataFrame(results)




# Example usage
if __name__ == "__main__":
    df = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "combined_2023_2025_channels.csv"))
    df["Date"] = pd.to_datetime(df["Date"])
    channel = "Dine-In"
    cutoffs = pd.date_range("2024-01-01", "2025-03-15", freq="7d")
    result_df = evaluate_multiple_windows(df.copy(), channel, cutoffs)
    print(result_df)
    result_df.to_csv(os.path.join(PROJECT_ROOT, "outputs", f"multi_eval_{channel}.csv"), index=False)
