"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Trash } from "lucide-react"

export function ShiftTemplates() {
  const [templates, setTemplates] = useState([
    {
      id: "1",
      role: "Server",
      startTime: "11:00",
      endTime: "19:00",
      minStaff: 3,
      maxStaff: 8,
      daysApplicable: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
    },
    {
      id: "2",
      role: "Bartender",
      startTime: "16:00",
      endTime: "00:00",
      minStaff: 1,
      maxStaff: 3,
      daysApplicable: "Thu, Fri, Sat",
    },
    {
      id: "3",
      role: "Host",
      startTime: "11:00",
      endTime: "19:00",
      minStaff: 1,
      maxStaff: 2,
      daysApplicable: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
    },
    {
      id: "4",
      role: "Kitchen Staff",
      startTime: "10:00",
      endTime: "22:00",
      minStaff: 2,
      maxStaff: 5,
      daysApplicable: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
    },
    {
      id: "5",
      role: "Cleaner",
      startTime: "22:00",
      endTime: "02:00",
      minStaff: 1,
      maxStaff: 2,
      daysApplicable: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Shift Time</TableHead>
              <TableHead className="text-center">Min Staff</TableHead>
              <TableHead className="text-center">Max Staff</TableHead>
              <TableHead>Days Applicable</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.role}</TableCell>
                <TableCell>
                  {template.startTime} - {template.endTime}
                </TableCell>
                <TableCell className="text-center">{template.minStaff}</TableCell>
                <TableCell className="text-center">{template.maxStaff}</TableCell>
                <TableCell>{template.daysApplicable}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
