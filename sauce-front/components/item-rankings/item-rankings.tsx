"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemTable } from "@/components/item-rankings/item-table"
import { ItemScatterPlot } from "@/components/item-rankings/item-scatter-plot"
import { PromoSuggestions } from "@/components/item-rankings/promo-suggestions"

export function ItemRankings() {
  return (
    <div className="grid gap-4">
      <Tabs defaultValue="top" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-10">
          <TabsTrigger value="top">Top Performers</TabsTrigger>
          <TabsTrigger value="bottom">Bottom Performers</TabsTrigger>
        </TabsList>
        <TabsContent value="top" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Items</CardTitle>
              <CardDescription>Items with highest sales volume and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ItemTable type="top" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bottom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bottom Performing Items</CardTitle>
              <CardDescription>Items with lowest sales volume and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ItemTable type="bottom" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Item Performance Analysis</CardTitle>
            <CardDescription>Volume vs. Margin (point size = price)</CardDescription>
          </CardHeader>
          <CardContent>
            <ItemScatterPlot />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Promotion Suggestions</CardTitle>
            <CardDescription>Automated recommendations based on forecasted lift</CardDescription>
          </CardHeader>
          <CardContent>
            <PromoSuggestions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
