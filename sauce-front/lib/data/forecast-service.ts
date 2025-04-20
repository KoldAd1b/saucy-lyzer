import { parseCSVToJSON, formatCurrency, formatNumber } from "../utils";

// Import CSV data
import monthlyForecastCSV from "./monthly_forecast.csv";
import weeklyForecastCSV from "./weekly_forecast.csv";
import dailyForecastCSV from "./simple_total_forecast.csv";

// Parse CSV data
const monthlyForecast = parseCSVToJSON(monthlyForecastCSV);
const weeklyForecast = parseCSVToJSON(weeklyForecastCSV);
const dailyForecast = parseCSVToJSON(dailyForecastCSV);

export interface ForecastData {
  date: string;
  orders: number;
  forecastTotalSales: number;
  pizzasNeeded: number;
  cheeseLbs: number;
  
  doughLbs: number;
  sauceLiters: number;
  crewNeeded: number;
}

export class ForecastService {
  static getMonthlyForecast(): ForecastData[] {
    return monthlyForecast.map((data: any) => ({
      ...data,
      orders: parseFloat(data.Orders),
      forecastTotalSales: parseFloat(data.ForecastTotalSales),
      pizzasNeeded: parseFloat(data.PizzasNeeded),
      cheeseLbs: parseFloat(data.CheeseLbs),
      doughLbs: parseFloat(data.DoughLbs),
      sauceLiters: parseFloat(data.SauceLiters),
      crewNeeded: parseInt(data.CrewNeeded),
    }));
  }

  static getWeeklyForecast(): ForecastData[] {
    return weeklyForecast.map((data: any) => ({
      ...data,
      orders: parseFloat(data.Orders),
      forecastTotalSales: parseFloat(data.ForecastTotalSales),
      pizzasNeeded: parseFloat(data.PizzasNeeded),
      cheeseLbs: parseFloat(data.CheeseLbs),
      doughLbs: parseFloat(data.DoughLbs),
      sauceLiters: parseFloat(data.SauceLiters),
      crewNeeded: parseInt(data.CrewNeeded),
    }));
  }

  static getDailyForecast(): ForecastData[] {
    return dailyForecast.map((data: any) => ({
      ...data,
      orders: parseFloat(data.Orders),
      forecastTotalSales: parseFloat(data.ForecastTotalSales),
      pizzasNeeded: parseFloat(data.PizzasNeeded),
      cheeseLbs: parseFloat(data.CheeseLbs),
      doughLbs: parseFloat(data.DoughLbs),
      sauceLiters: parseFloat(data.SauceLiters),
      crewNeeded: parseInt(data.CrewNeeded),
    }));
  }

  static getLatestForecast(): ForecastData {
    const daily = this.getDailyForecast();
    return daily[daily.length - 1];
  }

  static getSummaryStats() {
    const latest = this.getLatestForecast();
    return {
      totalSales: formatCurrency(latest.forecastTotalSales),
      orders: formatNumber(latest.orders),
      pizzas: formatNumber(latest.pizzasNeeded),
      crew: formatNumber(latest.crewNeeded),
    };
  }
}
