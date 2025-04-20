import { AlertCircle, Clock, Package, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
        <CardDescription>Important updates requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Inventory Alert</AlertTitle>
          <AlertDescription>Fresh tomatoes will run out in 2 days based on forecast</AlertDescription>
        </Alert>
        <Alert>
          <Package className="h-4 w-4" />
          <AlertTitle>Order Placed</AlertTitle>
          <AlertDescription>Seafood order #4532 has been confirmed for tomorrow</AlertDescription>
        </Alert>
        <Alert>
          <Users className="h-4 w-4" />
          <AlertTitle>Staff Shortage</AlertTitle>
          <AlertDescription>Friday evening is understaffed by 2 servers</AlertDescription>
        </Alert>
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertTitle>Peak Hours</AlertTitle>
          <AlertDescription>Preparing for dinner rush (6-8 PM) with 95 forecasted orders</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
