"use client";

import { ArrowDown, ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ItemTableProps {
  type: "top" | "bottom";
}

export function ItemTable({ type }: ItemTableProps) {
  const topItems = [
    {
      rank: 1,
      item: "Classic Cheese Pizza",
      unitsSold: 980,
      revenue: 13720,
      yoy: 18.5,
      trend: "up",
    },
    {
      rank: 2,
      item: "Ranch",
      unitsSold: 920,
      revenue: 1840,
      yoy: 15.2,
      trend: "up",
    },
    {
      rank: 3,
      item: "Chicken Wrap",
      unitsSold: 890,
      revenue: 10680,
      yoy: 12.8,
      trend: "up",
    },
    {
      rank: 4,
      item: "Meatlovers Pizza",
      unitsSold: 820,
      revenue: 14760,
      yoy: 10.5,
      trend: "up",
    },
    {
      rank: 5,
      item: "Alfredo Pasta",
      unitsSold: 780,
      revenue: 10920,
      yoy: 9.2,
      trend: "up",
    },
  ];

  const bottomItems = [
    {
      rank: 1,
      item: "Red Peppers Bags 3",
      unitsSold: 250,
      revenue: 1000,
      yoy: -8.5,
      trend: "down",
    },
    {
      rank: 2,
      item: "Parmesan Bags 3",
      unitsSold: 280,
      revenue: 1120,
      yoy: -7.2,
      trend: "down",
    },
    {
      rank: 3,
      item: "Naga Habanero Pasta",
      unitsSold: 320,
      revenue: 4800,
      yoy: -5.8,
      trend: "down",
    },
    {
      rank: 4,
      item: "Mushroom Wrap",
      unitsSold: 380,
      revenue: 4180,
      yoy: -4.2,
      trend: "down",
    },
    {
      rank: 5,
      item: "Paneer Wrap",
      unitsSold: 420,
      revenue: 5040,
      yoy: -2.5,
      trend: "down",
    },
  ];

  const data = type === "top" ? topItems : bottomItems;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Units Sold</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">YoY %</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.item}>
              <TableCell>{row.rank}</TableCell>
              <TableCell className="font-medium">{row.item}</TableCell>
              <TableCell className="text-right">
                {row.unitsSold.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${row.revenue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <span
                    className={
                      row.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {row.yoy}%
                  </span>
                  {row.trend === "up" ? (
                    <ArrowUp className="ml-2 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="ml-2 h-4 w-4 text-red-500" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Promote
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
