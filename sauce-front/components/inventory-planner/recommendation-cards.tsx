"use client"

import { AlertCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RecommendationCards() {
  const recommendations = [
    {
      item: "Fresh Tomatoes",
      onHand: 15,
      unit: "kg",
      forecastedUsage: 25,
      reorderQty: 20,
      daysUntilStockout: 2,
      status: "urgent",
    },
    {
      item: "Chicken Breast",
      onHand: 30,
      unit: "kg",
      forecastedUsage: 45,
      reorderQty: 30,
      daysUntilStockout: 3,
      status: "warning",
    },
    {
      item: "Lettuce",
      onHand: 12,
      unit: "kg",
      forecastedUsage: 15,
      reorderQty: 10,
      daysUntilStockout: 4,
      status: "warning",
    },
    {
      item: "Flour",
      onHand: 50,
      unit: "kg",
      forecastedUsage: 30,
      reorderQty: 25,
      daysUntilStockout: 8,
      status: "ok",
    },
    {
      item: "Olive Oil",
      onHand: 15,
      unit: "L",
      forecastedUsage: 8,
      reorderQty: 10,
      daysUntilStockout: 9,
      status: "ok",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((item) => (
        <Card
          key={item.item}
          className={item.status === "urgent" ? "border-red-500" : item.status === "warning" ? "border-yellow-500" : ""}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">{item.item}</CardTitle>
              {item.status === "urgent" && <AlertCircle className="h-5 w-5 text-red-500" />}
            </div>
            <CardDescription>
              On hand: {item.onHand} {item.unit}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Forecasted usage: {item.forecastedUsage} {item.unit}
                </span>
                <span
                  className={
                    item.status === "urgent"
                      ? "text-red-500 font-medium"
                      : item.status === "warning"
                        ? "text-yellow-500 font-medium"
                        : ""
                  }
                >
                  {item.daysUntilStockout} days left
                </span>
              </div>
              <Progress
                value={(item.onHand / item.forecastedUsage) * 100}
                className={item.status === "urgent" ? "bg-red-100" : item.status === "warning" ? "bg-yellow-100" : ""}
              />
              <div className="text-sm text-muted-foreground">
                Recommended reorder: {item.reorderQty} {item.unit}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={item.status === "urgent" ? "destructive" : "default"}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create PO
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
