"use client"

import { AlertTriangle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function LeadTimeAlerts() {
  const leadTimeItems = [
    {
      item: "Imported Cheese",
      supplier: "European Imports",
      leadTime: 14,
      currentStock: "Low",
      orderBy: "Apr 25, 2025",
      priority: "high",
    },
    {
      item: "Specialty Seafood",
      supplier: "Ocean Fresh",
      leadTime: 7,
      currentStock: "Medium",
      orderBy: "Apr 27, 2025",
      priority: "medium",
    },
    {
      item: "Aged Beef",
      supplier: "Premium Meats",
      leadTime: 10,
      currentStock: "Low",
      orderBy: "Apr 26, 2025",
      priority: "high",
    },
    {
      item: "Specialty Flour",
      supplier: "Artisan Bakers",
      leadTime: 5,
      currentStock: "Medium",
      orderBy: "Apr 30, 2025",
      priority: "low",
    },
    {
      item: "Exotic Spices",
      supplier: "Global Flavors",
      leadTime: 12,
      currentStock: "Low",
      orderBy: "Apr 25, 2025",
      priority: "high",
    },
  ]

  return (
    <div className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention Required</AlertTitle>
        <AlertDescription>The following items have long lead times and require advance ordering.</AlertDescription>
      </Alert>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Lead Time</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Order By</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadTimeItems.map((item) => (
              <TableRow key={item.item}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {item.leadTime} days
                  </div>
                </TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.orderBy}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "outline"
                    }
                  >
                    {item.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
