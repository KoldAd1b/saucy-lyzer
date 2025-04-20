"use client"

import { ArrowUp, Clock, DollarSign, ShoppingBag, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,543</div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">vs. Forecast: $12,000</p>
            <div className="flex items-center text-green-500 text-xs">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>4.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94.3%</div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">MAPE: 5.7%</p>
            <div className="flex items-center text-green-500 text-xs">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>2.1%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peak Hour Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7:00 PM</div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">Est. Orders: 87</p>
            <div className="flex items-center text-green-500 text-xs">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">vs. Forecast: 320</p>
            <div className="flex items-center text-green-500 text-xs">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>6.9%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
