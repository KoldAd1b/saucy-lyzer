# lightgbm_feature_forecast.py

import pandas as pd
import numpy as np
import os
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt

# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def build_features(df):
    df = df.copy()
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values("Date")
    df["day_of_week"] = df["Date"].dt.dayofweek
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)
    df["is_month_end"] = df["Date"].dt.is_month_end.astype(int)
    df["is_monday"] = (df["day_of_week"] == 0).astype(int)
    df["month"] = df["Date"].dt.month

    # Lag features
    df["prev_day_sales"] = df["NetSales"].shift(1)
    df["prev_3day_avg"] = df["NetSales"].shift(1).rolling(window=3).mean()
    df["prev_7day_avg"] = df["NetSales"].shift(1).rolling(window=7).mean()
    df["prev_7day_std"] = df["NetSales"].shift(1).rolling(window=7).std()

    for col in ["Dine-In", "Delivery", "Take-Out"]:
        if col not in df.columns:
            df[col] = 0.0

    df["dinein_pct"] = df["Dine-In"] / df["NetSales"].replace(0, np.nan)
    df["delivery_pct"] = df["Delivery"] / df["NetSales"].replace(0, np.nan)
    df["takeout_pct"] = df["Take-Out"] / df["NetSales"].replace(0, np.nan)

    df["is_big_sale"] = (df["NetSales"] > df["NetSales"].rolling(7).mean() * 1.4).astype(int)
    df["days_since_spike"] = df["is_big_sale"].cumsum()
    df["days_since_spike"] = df.groupby("days_since_spike").cumcount()

    df = df.replace([np.inf, -np.inf], np.nan).dropna().fillna(0)
    return df

def run_lightgbm_forecast():
    df = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "combined_2023_2025_actuals.csv"))
    df = df[df["Date"] <= "2025-04-18"]
    df = df[df["Date"] >= "2023-01-01"]

    df["Date"] = pd.to_datetime(df["Date"])
    df = df[df["Date"].dt.weekday != 0]
    df = build_features(df)

    train = df[df["Date"] <= "2025-03-31"]
    test = df[df["Date"] > "2025-03-31"]

    # Clip outliers from training set
    sales_cap = train["NetSales"].rolling(7).mean() * 1.8
    train = train[train["NetSales"] < sales_cap]

    features = [
        "day_of_week", "is_weekend", "is_month_end", "is_monday", "month",
        "prev_day_sales", "prev_3day_avg", "prev_7day_avg", "prev_7day_std",
        "dinein_pct", "delivery_pct", "takeout_pct", "days_since_spike"
    ]

    X_train = train[features]
    y_train = train["NetSales"]
    X_test = test[features]
    y_test = test["NetSales"]

    model = lgb.LGBMRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=4,
        random_state=42,
        force_col_wise=True
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred)
    rel_mae = mae / y_test.mean() * 100

    print("📊 LightGBM Forecast with Cleaned Feature Set:")
    print(f"   - MAE: {mae:.2f}")
    print(f"   - RMSE: {rmse:.2f}")
    print(f"   - Relative MAE: {rel_mae:.2f}%")

    forecast_df = pd.DataFrame({
        "Date": test["Date"],
        "ActualNetSales": y_test,
        "ForecastNetSales": y_pred
    })
    forecast_df.to_csv(os.path.join(PROJECT_ROOT, "outputs", "lgbm_feature_forecast.csv"), index=False)

    plt.figure(figsize=(12, 5))
    plt.plot(forecast_df["Date"], forecast_df["ActualNetSales"], label="Actual")
    plt.plot(forecast_df["Date"], forecast_df["ForecastNetSales"], label="LightGBM Forecast")
    plt.title("LightGBM Forecast vs Actual")
    plt.legend()
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    run_lightgbm_forecast()
