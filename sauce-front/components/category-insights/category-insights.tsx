"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryDonut } from "@/components/category-insights/category-donut"
import { CategoryTrends } from "@/components/category-insights/category-trends"
import { CategoryTable } from "@/components/category-insights/category-table"

export function CategoryInsights() {
  const [location, setLocation] = useState("all")
  const [daypart, setDaypart] = useState("all")

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Category Filters</CardTitle>
              <CardDescription>Filter data by location and time</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="uptown">Uptown</SelectItem>
                  <SelectItem value="suburb">Suburb</SelectItem>
                </SelectContent>
              </Select>
              <Select value={daypart} onValueChange={setDaypart}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select daypart" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Day</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Channel Distribution</CardTitle>
            <CardDescription>Current period share by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryDonut location={location} daypart={daypart} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Category Trends</CardTitle>
            <CardDescription>Sales trends by category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryTrends location={location} daypart={daypart} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
          <CardDescription>Detailed breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryTable location={location} daypart={daypart} />
        </CardContent>
      </Card>
    </div>
  )
}
