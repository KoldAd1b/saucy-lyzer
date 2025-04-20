"use client"

import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - would be replaced with real API data
const dailyData = [
  { date: "Apr 19", actual: 4200, forecast: 4000, lower: 3800, upper: 4200 },
  { date: "Apr 20", actual: 4500, forecast: 4300, lower: 4100, upper: 4500 },
  { date: "Apr 21", actual: null, forecast: 4600, lower: 4400, upper: 4800 },
  { date: "Apr 22", actual: null, forecast: 4800, lower: 4600, upper: 5000 },
  { date: "Apr 23", actual: null, forecast: 5100, lower: 4900, upper: 5300 },
  { date: "Apr 24", actual: null, forecast: 5400, lower: 5200, upper: 5600 },
  { date: "Apr 25", actual: null, forecast: 5700, lower: 5500, upper: 5900 },
]

const weeklyData = [
  { date: "Week 15", actual: 29500, forecast: 28000, lower: 27000, upper: 29000 },
  { date: "Week 16", actual: 31200, forecast: 30000, lower: 29000, upper: 31000 },
  { date: "Week 17", actual: null, forecast: 32000, lower: 31000, upper: 33000 },
  { date: "Week 18", actual: null, forecast: 33500, lower: 32500, upper: 34500 },
  { date: "Week 19", actual: null, forecast: 35000, lower: 34000, upper: 36000 },
]

const monthlyData = [
  { date: "Jan", actual: 125000, forecast: 120000, lower: 115000, upper: 125000 },
  { date: "Feb", actual: 118000, forecast: 115000, lower: 110000, upper: 120000 },
  { date: "Mar", actual: 132000, forecast: 130000, lower: 125000, upper: 135000 },
  { date: "Apr", actual: 140000, forecast: 138000, lower: 133000, upper: 143000 },
  { date: "May", actual: null, forecast: 145000, lower: 140000, upper: 150000 },
  { date: "Jun", actual: null, forecast: 155000, lower: 150000, upper: 160000 },
]

interface ForecastChartProps {
  period: "daily" | "weekly" | "monthly"
}

export function ForecastChart({ period }: ForecastChartProps) {
  const getData = () => {
    switch (period) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return dailyData
    }
  }

  const data = getData()

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="upper"
            stroke="transparent"
            fill="#8884d8"
            fillOpacity={0.2}
            name="Upper Bound"
          />
          <Area
            type="monotone"
            dataKey="lower"
            stroke="transparent"
            fill="#8884d8"
            fillOpacity={0}
            name="Lower Bound"
          />
          <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Forecast" />
          <Line type="monotone" dataKey="actual" stroke="#ff7300" strokeWidth={2} name="Actual" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
