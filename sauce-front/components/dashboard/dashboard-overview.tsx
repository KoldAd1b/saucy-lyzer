"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { MiniCharts } from "@/components/dashboard/mini-charts";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full lg:col-span-5">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <KpiCards />
            <MiniCharts />
          </TabsContent>
        </Tabs>
      </div>
      <div className="col-span-full lg:col-span-2">
        <div className="grid gap-4">
          <AlertsPanel />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
