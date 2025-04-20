"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForecastChart } from "@/components/sales-forecasts/forecast-chart";
import { ForecastTable } from "@/components/sales-forecasts/forecast-table";

export function SalesForecasts() {
  return (
    <div className="grid gap-4">
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Forecast</CardTitle>
              <CardDescription>
                Actual vs. Forecast with confidence band
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastChart period="daily" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Daily Forecast Details</CardTitle>
              <CardDescription>
                Detailed breakdown of daily forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastTable period="daily" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Sales Forecast</CardTitle>
              <CardDescription>
                Actual vs. Forecast with confidence band
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastChart period="weekly" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Forecast Details</CardTitle>
              <CardDescription>
                Detailed breakdown of weekly forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastTable period="weekly" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Forecast</CardTitle>
              <CardDescription>
                Actual vs. Forecast with confidence band
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastChart period="monthly" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Forecast Details</CardTitle>
              <CardDescription>
                Detailed breakdown of monthly forecasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastTable period="monthly" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
