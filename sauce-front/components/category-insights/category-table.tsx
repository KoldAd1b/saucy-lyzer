"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CategoryTableProps {
  location: string
  daypart: string
}

export function CategoryTable({ location, daypart }: CategoryTableProps) {
  // This would be fetched from an API based on the location and daypart
  const data = [
    {
      category: "Dine-in",
      sales: 45000,
      orders: 3200,
      avgTicket: 14.06,
      yoy: 5.2,
      trend: "up",
    },
    {
      category: "Takeaway",
      sales: 30000,
      orders: 2100,
      avgTicket: 14.29,
      yoy: 7.8,
      trend: "up",
    },
    {
      category: "Online",
      sales: 25000,
      orders: 1700,
      avgTicket: 14.71,
      yoy: 12.5,
      trend: "up",
    },
    {
      category: "Total",
      sales: 100000,
      orders: 7000,
      avgTicket: 14.29,
      yoy: 7.5,
      trend: "up",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">Avg Ticket</TableHead>
            <TableHead className="text-right">YoY %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.category}>
              <TableCell className="font-medium">{row.category}</TableCell>
              <TableCell className="text-right">${row.sales.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.orders.toLocaleString()}</TableCell>
              <TableCell className="text-right">${row.avgTicket.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <span className={row.trend === "up" ? "text-green-500" : "text-red-500"}>{row.yoy}%</span>
                  {row.trend === "up" ? (
                    <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="ml-2 h-4 w-4 text-red-500" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
