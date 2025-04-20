import pandas as pd
import numpy as np
import os
import re

def clean_and_merge_sales_data():
    """
    Clean and merge data from multiple CSV files into a single DataFrame.
    """
    os.makedirs("data/cleaned", exist_ok=True)
    
    # === 1. Load and clean 2023 daily data ===
    df_23 = pd.read_csv("data/raw/date_analysis/2023.csv", skiprows=1,
        names=["Date", "NetSales", "Orders", "Guests", "Extra"])
    df_23["Date"] = pd.to_datetime(df_23["Date"], format="%m/%d/%Y")
    df_23["NetSales"] = df_23["NetSales"].astype(float)
    df_23 = df_23[["Date", "NetSales", "Orders"]]

    # === 2. Load and clean 2024 data ===
    df_24 = pd.read_csv("data/raw/date_analysis/2024.csv", skiprows=1,
        names=["Date", "NetSales", "Orders", "Guests", "Extra"])
    df_24["Date"] = pd.to_datetime(df_24["Date"], format="%m/%d/%Y")
    df_24["NetSales"] = df_24["NetSales"].astype(float)
    df_24 = df_24[["Date", "NetSales", "Orders"]]

    # === 3. Load and clean 2025 data (YTD) ===
    df_25 = pd.read_csv("data/raw/date_analysis/2025.csv", skiprows=1,
        names=["Date", "NetSales", "Orders", "Guests", "Extra"])
    df_25["Date"] = pd.to_datetime(df_25["Date"], format="%m/%d/%Y")
    df_25["NetSales"] = df_25["NetSales"].astype(float)
    df_25 = df_25[["Date", "NetSales", "Orders"]]
    df_25 = df_25[df_25["Date"] <= "2025-04-18"]  # Only keep data up to April 18, 2025

    # === 4. Combine all 3 years ===
    combined = pd.concat([df_23, df_24, df_25], ignore_index=True)
    combined = combined.sort_values("Date").set_index("Date")
    combined = combined.asfreq("D", fill_value=0)

    # Save to cleaned folder
    combined.to_csv("data/cleaned/combined_2023_2025_actuals.csv")

    print("✅ Combined daily sales from 2023–2025 (YTD) saved to cleaned/combined_2023_2025_actuals.csv")

def clean_and_merge_time_data():
    """
    Clean and merge time data from multiple CSV files into a single DataFrame.
    Only includes data up to April 18th for each year.
    """
    os.makedirs("data/cleaned", exist_ok=True)
    
    # Load and clean 2023 time data
    df_23 = pd.read_csv("data/raw/time_analysis/2023.csv")
    df_23["Net Sales"] = df_23["Net Sales"].astype(float)
    df_23["Year"] = 2023
    df_23["Date"] = pd.to_datetime("2023-04-18")  # Set all data to April 18th
    
    # Load and clean 2024 time data
    df_24 = pd.read_csv("data/raw/time_analysis/2024.csv")
    df_24["Net Sales"] = df_24["Net Sales"].astype(float)
    df_24["Year"] = 2024
    df_24["Date"] = pd.to_datetime("2024-04-18")  # Set all data to April 18th
    
    # Load and clean 2025 time data
    df_25 = pd.read_csv("data/raw/time_analysis/2025.csv")
    df_25["Net Sales"] = df_25["Net Sales"].astype(float)
    df_25["Year"] = 2025
    df_25["Date"] = pd.to_datetime("2025-04-18")  # Set all data to April 18th
    
    # Combine all years
    combined = pd.concat([df_23, df_24, df_25], ignore_index=True)
    
    # Calculate shares for each year
    yearly_shares = combined.groupby(["Year", "Time"]).agg({
        "Net Sales": "sum",
        "Orders": "sum",
        "Guests": "sum"
    }).reset_index()
    
    # Calculate overall shares
    yearly_shares["Share"] = yearly_shares.groupby("Year")["Net Sales"].transform(
        lambda x: (x / x.sum()).round(4)
    )
    
    # Save to cleaned folder
    yearly_shares.to_csv("data/cleaned/time_shares_2023_2025_apr18.csv", index=False)
    print("✅ Combined time shares from 2023–2025 (up to April 18th) saved to cleaned/time_shares_2023_2025_apr18.csv")

def clean_and_merge_item_data():
    """
    Clean and merge item data from multiple CSV files into a single DataFrame.
    """
    os.makedirs("data/cleaned", exist_ok=True)
    
    # Load and clean 2023 item data
    df_23 = pd.read_csv("data/raw/item_analysis/2023.csv")
    df_23["Quantity Sold"] = df_23["Quantity Sold"].astype(int)
    df_23["Total Sales"] = df_23["Total Sales"].replace(r'[$,]', '', regex=True).astype(float)
    df_23["Year"] = 2023
    
    # Load and clean 2024 item data
    df_24 = pd.read_csv("data/raw/item_analysis/2024.csv")
    df_24["Quantity Sold"] = df_24["Quantity Sold"].astype(int)
    df_24["Total Sales"] = df_24["Total Sales"].replace(r'[$,]', '', regex=True).astype(float)
    df_24["Year"] = 2024
    
    # Combine both years
    combined = pd.concat([df_23, df_24], ignore_index=True)
    
    # Calculate yearly aggregates
    yearly_items = combined.groupby(["Year", "Item"]).agg({
        "Quantity Sold": "sum",
        "Total Sales": "sum"
    }).reset_index()
    
    # Calculate item shares for each year
    yearly_items["Sales Share"] = yearly_items.groupby("Year")["Total Sales"].transform(
        lambda x: (x / x.sum()).round(4)
    )
    
    # Save to cleaned folder
    yearly_items.to_csv("data/cleaned/item_sales_2023_2024.csv", index=False)
    print("✅ Combined item sales from 2023–2024 saved to cleaned/item_sales_2023_2024.csv")

def clean_and_merge_sales_breakdown():
    """
    Clean and merge sales breakdown data from multiple CSV files into a single DataFrame.
    Analyzes sales by dining options.
    """
    os.makedirs("data/cleaned", exist_ok=True)
    
    # Load and clean 2023 breakdown data

    df_23 = pd.read_csv("data/raw/sales_breakdown/2023.csv")   

    df_23["Gross Sales"] = df_23["Gross Sales"].replace(r'[$,]', '', regex=True).astype(float)
    df_23["Net Sales"] = df_23["Net Sales"].replace(r'[$,]', '', regex=True).astype(float)
    df_23["Year"] = 2023

   

    # Load and clean 2024 breakdown data
    df_24 = pd.read_csv("data/raw/sales_breakdown/2024.csv")
    df_24["Gross Sales"] = df_24["Gross Sales"].replace(r'[$,]', '', regex=True).astype(float)
    df_24["Net Sales"] = df_24["Net Sales"].replace(r'[$,]', '', regex=True).astype(float)
    df_24["Year"] = 2024

   
  
    # Combine both years
    combined = pd.concat([df_23, df_24], ignore_index=True)

    # Group by Year and Dining Option, then aggregate
    yearly_mix = combined.groupby(["Year", "Dining Option"], as_index=False).agg({
        "Item Qty": "sum",
        "Net Sales": "sum",
        "Gross Sales": "sum"
    })

    print(yearly_mix.info())
    
    # Calculate channel percentages for each year
    yearly_totals = yearly_mix.groupby("Year")["Gross Sales"].transform("sum")
    yearly_mix["Channel Share"] = (yearly_mix["Gross Sales"] / yearly_totals).round(3)
    
    print(yearly_mix.info())
    # Sort by year and share for better readability
    yearly_mix = yearly_mix.sort_values(["Year", "Channel Share"], ascending=[True, False])
    
    # Save the breakdown
    yearly_mix.to_csv("data/cleaned/channel_mix_2023_2024.csv", index=False)
    print("✅ Channel mix by dining option saved to cleaned/channel_mix_2023_2024.csv")

def classify_unknown_channels(df: pd.DataFrame) -> pd.DataFrame:
    """
    Reassigns missing or unknown Sales Category rows based on similarity to known category patterns.

    Args:
        df (pd.DataFrame): input dataframe with 'Sales Category', 'Gross Sales', 'Item Qty', etc.

    Returns:
        pd.DataFrame: modified dataframe with unknown categories reassigned
    """
    df = df.copy()

   


    # Fill missing 'Sales Category' with temporary ID
    df["Sales Category"] = df["Sales Category"].astype(str).str.strip()
    unknown_mask = (df["Sales Category"].isna()) | (df["Sales Category"] == "") | (df["Sales Category"] == "nan")
    df.loc[unknown_mask, "Sales Category"] = None

    # Define known and unknown sets
    known_df = df[df["Sales Category"].notna()]
    unknown_df = df[df["Sales Category"].isna()]

    if unknown_df.empty:
        return df

    # Compute known group averages
    known_profiles = known_df.groupby("Sales Category")[["Gross Sales", "Item Qty"]].mean()

    def find_closest_category(row):
        diffs = known_profiles.apply(lambda prof: np.abs(row[["Gross Sales", "Item Qty"]] - prof).sum(), axis=1)
        return diffs.idxmin()

    # Apply classification to each unknown
    df.loc[unknown_df.index, "Sales Category"] = unknown_df.apply(find_closest_category, axis=1)

    return df


def run_etl_pipeline():
    """
    Execute the complete ETL pipeline.
    """
    print("🚀 Starting ETL pipeline...")
    
    # Execute each ETL process
    clean_and_merge_sales_data()
    clean_and_merge_time_data()
    clean_and_merge_item_data()
    clean_and_merge_sales_breakdown()
    
    print("✨ ETL pipeline completed successfully!")

if __name__ == "__main__":
    run_etl_pipeline()
  