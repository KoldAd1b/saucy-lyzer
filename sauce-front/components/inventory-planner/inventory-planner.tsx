"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecommendationCards } from "@/components/inventory-planner/recommendation-cards"
import { BulkPoBuilder } from "@/components/inventory-planner/bulk-po-builder"
import { LeadTimeAlerts } from "@/components/inventory-planner/lead-time-alerts"

export function InventoryPlanner() {
  return (
    <div className="grid gap-4">
      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="bulk">Bulk PO Builder</TabsTrigger>
          <TabsTrigger value="alerts">Lead-Time Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Recommendations</CardTitle>
              <CardDescription>Based on forecasted usage and current stock</CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationCards />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Purchase Order Builder</CardTitle>
              <CardDescription>Select multiple ingredients to generate a PO</CardDescription>
            </CardHeader>
            <CardContent>
              <BulkPoBuilder />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead-Time Alerts</CardTitle>
              <CardDescription>Items requiring advance ordering</CardDescription>
            </CardHeader>
            <CardContent>
              <LeadTimeAlerts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
