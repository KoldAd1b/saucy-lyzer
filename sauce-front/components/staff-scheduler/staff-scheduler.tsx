"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeatmapCalendar } from "@/components/staff-scheduler/heatmap-calendar"
import { ShiftTemplates } from "@/components/staff-scheduler/shift-templates"
import { AutoSchedulingWizard } from "@/components/staff-scheduler/auto-scheduling-wizard"
import { ConflictAlerts } from "@/components/staff-scheduler/conflict-alerts"

export function StaffScheduler() {
  return (
    <div className="grid gap-4">
      <Tabs defaultValue="heatmap" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="heatmap">Demand Heatmap</TabsTrigger>
          <TabsTrigger value="templates">Shift Templates</TabsTrigger>
          <TabsTrigger value="auto">Auto-Scheduling</TabsTrigger>
          <TabsTrigger value="conflicts">Conflict Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand Heatmap Calendar</CardTitle>
              <CardDescription>Days × Hours colored by forecasted demand</CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shift Templates</CardTitle>
              <CardDescription>Roles with min/max headcount</CardDescription>
            </CardHeader>
            <CardContent>
              <ShiftTemplates />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="auto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Scheduling Wizard</CardTitle>
              <CardDescription>Generate + manually adjust next-week roster</CardDescription>
            </CardHeader>
            <CardContent>
              <AutoSchedulingWizard />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conflict Alerts</CardTitle>
              <CardDescription>Warn on over-staffing/insufficient breaks</CardDescription>
            </CardHeader>
            <CardContent>
              <ConflictAlerts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
