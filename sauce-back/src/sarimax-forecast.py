# sarimax_sales_forecast.py

import pandas as pd
import numpy as np
import os
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_absolute_error, mean_squared_error
import matplotlib.pyplot as plt
import math
# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def generate_sarimax_forecast():
    # === Load and prepare data ===
    df = pd.read_csv(os.path.join(PROJECT_ROOT, "data", "cleaned", "combined_2023_2025_actuals.csv"))
    df = df[df["Date"] <= "2025-04-18"]
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.set_index("Date")

    # === Filter out Mondays (store closed) ===
    df = df[df.index.dayofweek != 0]

    # === Use NetSales column ===
    series = df["NetSales"].asfreq("D")
    series = series.fillna(0)

    # === Split into train/test ===
    train = series[:"2025-03-31"]
    test = series["2025-04-01":]

    # === Fit SARIMAX model ===
    model = SARIMAX(train, order=(1, 1, 1), seasonal_order=(1, 1, 1, 7), enforce_stationarity=False, enforce_invertibility=False)
    results = model.fit(disp=False)

    # === Forecast ===
    forecast = results.get_forecast(steps=len(test))
    forecast_mean = forecast.predicted_mean

    # === Evaluate ===
    mae = mean_absolute_error(test, forecast_mean)
    rmse = mean_squared_error(test, forecast_mean)
    rel_mae = mae / test.mean() * 100

    print("📉 SARIMAX Forecast Evaluation:")
    print(f"   - MAE: {mae:.2f}")
    print(f"   - RMSE: {math.sqrt(rmse):.2f}")
    print(f"   - Relative MAE: {rel_mae:.2f}%")

    # === Plot ===
    plt.figure(figsize=(12, 5))
    plt.plot(train[-30:], label="Train (Last 30 Days)")
    plt.plot(test, label="Actual")
    plt.plot(forecast_mean, label="Forecast")
    plt.legend()
    plt.title("SARIMAX Forecast vs Actual")
    plt.tight_layout()
    plt.show()

    # === Save forecast ===
    outputs_dir = os.path.join(PROJECT_ROOT, "outputs")
    os.makedirs(outputs_dir, exist_ok=True)

    forecast_df = pd.DataFrame({
        "Date": test.index,
        "Actual": test.values,
        "Forecast": forecast_mean.values
    })
    forecast_df.to_csv(os.path.join(outputs_dir, "sarimax_forecast.csv"), index=False)


if __name__ == "__main__":
    generate_sarimax_forecast()
