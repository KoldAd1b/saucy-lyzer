"use client"

import { AlertCircle, Clock, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ConflictAlerts() {
  const conflicts = [
    {
      type: "overstaffing",
      day: "Friday",
      time: "2:00 PM - 4:00 PM",
      description: "3 servers scheduled but forecast only requires 1",
      severity: "medium",
    },
    {
      type: "understaffing",
      day: "Saturday",
      time: "7:00 PM - 9:00 PM",
      description: "Peak dinner rush requires 5 servers but only 3 scheduled",
      severity: "high",
    },
    {
      type: "break",
      day: "Thursday",
      time: "All day",
      description: "John Smith scheduled for 8 hours with no break",
      severity: "high",
    },
    {
      type: "overtime",
      day: "Sunday",
      time: "All day",
      description: "Mike Johnson will exceed 40 hours this week",
      severity: "medium",
    },
    {
      type: "availability",
      day: "Wednesday",
      time: "Evening",
      description: "Sarah Williams scheduled outside availability window",
      severity: "high",
    },
  ]

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Schedule Conflicts Detected</AlertTitle>
        <AlertDescription>The following conflicts need to be resolved before finalizing the schedule.</AlertDescription>
      </Alert>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Day & Time</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conflicts.map((conflict, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {conflict.type === "overstaffing" || conflict.type === "understaffing" ? (
                      <Users className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="capitalize">{conflict.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{conflict.day}</div>
                  <div className="text-sm text-muted-foreground">{conflict.time}</div>
                </TableCell>
                <TableCell>{conflict.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      conflict.severity === "high"
                        ? "destructive"
                        : conflict.severity === "medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {conflict.severity}
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
