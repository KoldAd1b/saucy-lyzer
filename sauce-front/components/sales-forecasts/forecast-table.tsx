"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - would be replaced with real API data
const dailyData = [
  {
    date: "Apr 19, 2025",
    sales: 4200,
    orders: 320,
    changePercent: 5.2,
    trend: "up",
  },
  {
    date: "Apr 20, 2025",
    sales: 4500,
    orders: 345,
    changePercent: 7.1,
    trend: "up",
  },
  {
    date: "Apr 21, 2025",
    sales: 4600,
    orders: 352,
    changePercent: 2.2,
    trend: "up",
  },
  {
    date: "Apr 22, 2025",
    sales: 4800,
    orders: 368,
    changePercent: 4.3,
    trend: "up",
  },
  {
    date: "Apr 23, 2025",
    sales: 5100,
    orders: 390,
    changePercent: 6.3,
    trend: "up",
  },
  {
    date: "Apr 24, 2025",
    sales: 5400,
    orders: 412,
    changePercent: 5.9,
    trend: "up",
  },
  {
    date: "Apr 25, 2025",
    sales: 5700,
    orders: 435,
    changePercent: 5.6,
    trend: "up",
  },
]

const weeklyData = [
  {
    date: "Week 15, 2025",
    sales: 29500,
    orders: 2250,
    changePercent: 4.2,
    trend: "up",
  },
  {
    date: "Week 16, 2025",
    sales: 31200,
    orders: 2380,
    changePercent: 5.8,
    trend: "up",
  },
  {
    date: "Week 17, 2025",
    sales: 32000,
    orders: 2450,
    changePercent: 2.6,
    trend: "up",
  },
  {
    date: "Week 18, 2025",
    sales: 33500,
    orders: 2560,
    changePercent: 4.7,
    trend: "up",
  },
  {
    date: "Week 19, 2025",
    sales: 35000,
    orders: 2680,
    changePercent: 4.5,
    trend: "up",
  },
]

const monthlyData = [
  {
    date: "January 2025",
    sales: 125000,
    orders: 9500,
    changePercent: 3.2,
    trend: "up",
  },
  {
    date: "February 2025",
    sales: 118000,
    orders: 9000,
    changePercent: -5.6,
    trend: "down",
  },
  {
    date: "March 2025",
    sales: 132000,
    orders: 10100,
    changePercent: 11.9,
    trend: "up",
  },
  {
    date: "April 2025",
    sales: 140000,
    orders: 10700,
    changePercent: 6.1,
    trend: "up",
  },
  {
    date: "May 2025",
    sales: 145000,
    orders: 11100,
    changePercent: 3.6,
    trend: "up",
  },
  {
    date: "June 2025",
    sales: 155000,
    orders: 11900,
    changePercent: 6.9,
    trend: "up",
  },
]

interface ForecastTableProps {
  period: "daily" | "weekly" | "monthly"
}

export function ForecastTable({ period }: ForecastTableProps) {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">% Change</TableHead>
            <TableHead className="text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.date}>
              <TableCell className="font-medium">{row.date}</TableCell>
              <TableCell className="text-right">${row.sales.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.orders}</TableCell>
              <TableCell className="text-right">
                <span className={row.trend === "up" ? "text-green-500" : "text-red-500"}>{row.changePercent}%</span>
              </TableCell>
              <TableCell className="text-right">
                {row.trend === "up" ? (
                  <ArrowUp className="ml-auto h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="ml-auto h-4 w-4 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
