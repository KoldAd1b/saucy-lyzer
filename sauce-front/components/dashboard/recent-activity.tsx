import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      time: "9:32 AM",
      description: "Inventory order received",
    },
    {
      time: "10:15 AM",
      description: "Staff schedule updated",
    },
    {
      time: "11:42 AM",
      description: "Sales forecast refreshed",
    },
    {
      time: "1:23 PM",
      description: "New promotion created",
    },
    {
      time: "2:45 PM",
      description: "Menu item prices updated",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="rounded-full w-2 h-2 mt-2 bg-primary" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{activity.time}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
