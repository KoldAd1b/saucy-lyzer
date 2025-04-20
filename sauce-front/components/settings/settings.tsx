"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Settings() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [forecastModel, setForecastModel] = useState("advanced")
  const [currency, setCurrency] = useState("usd")
  const [timeFormat, setTimeFormat] = useState("12h")

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure your dashboard preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Auto-refresh data</Label>
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
              <p className="text-sm text-muted-foreground">Automatically refresh dashboard data every 5 minutes</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark mode</Label>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <p className="text-sm text-muted-foreground">Enable dark mode for the dashboard</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="cad">CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Time format</Label>
              <Select value={timeFormat} onValueChange={setTimeFormat}>
                <SelectTrigger id="time-format">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email notifications</Label>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <p className="text-sm text-muted-foreground">Receive daily summary and alerts via email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="inventory-alerts">Inventory alerts</Label>
                <Switch id="inventory-alerts" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Get notified when inventory items are running low</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="staff-alerts">Staff scheduling alerts</Label>
                <Switch id="staff-alerts" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Get notified about scheduling conflicts and understaffing</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="forecasting" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Forecasting Settings</CardTitle>
            <CardDescription>Configure how sales and demand forecasts are generated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forecast-model">Forecast model</Label>
              <Select value={forecastModel} onValueChange={setForecastModel}>
                <SelectTrigger id="forecast-model">
                  <SelectValue placeholder="Select forecast model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (moving average)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (ARIMA)</SelectItem>
                  <SelectItem value="advanced">Advanced (ML-based)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Advanced models provide more accurate forecasts but require more data
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="forecast-horizon">Forecast horizon (days)</Label>
              <Input id="forecast-horizon" type="number" defaultValue="30" />
              <p className="text-sm text-muted-foreground">Number of days to forecast into the future</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="weather-impact">Include weather impact</Label>
                <Switch id="weather-impact" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Factor weather forecasts into sales predictions</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="seasonal-adjustments">Seasonal adjustments</Label>
                <Switch id="seasonal-adjustments" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Adjust forecasts based on seasonal patterns</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="integrations" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect with other systems and services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>POS System</Label>
                  <p className="text-sm text-muted-foreground">Connect to your point of sale system</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Inventory Management</Label>
                  <p className="text-sm text-muted-foreground">Connect to your inventory management system</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Accounting Software</Label>
                  <p className="text-sm text-muted-foreground">Connect to your accounting software</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Online Ordering Platforms</Label>
                  <p className="text-sm text-muted-foreground">Connect to your online ordering platforms</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
