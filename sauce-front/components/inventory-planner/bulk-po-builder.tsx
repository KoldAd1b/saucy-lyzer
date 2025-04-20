"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FilePlus, Printer, Send } from "lucide-react"

export function BulkPoBuilder() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const inventoryItems = [
    {
      id: "1",
      item: "Fresh Tomatoes",
      supplier: "Local Farms Inc.",
      onHand: 15,
      unit: "kg",
      reorderQty: 20,
      unitPrice: 3.5,
    },
    {
      id: "2",
      item: "Chicken Breast",
      supplier: "Premium Meats",
      onHand: 30,
      unit: "kg",
      reorderQty: 30,
      unitPrice: 8.75,
    },
    {
      id: "3",
      item: "Lettuce",
      supplier: "Local Farms Inc.",
      onHand: 12,
      unit: "kg",
      reorderQty: 10,
      unitPrice: 2.25,
    },
    {
      id: "4",
      item: "Flour",
      supplier: "Baking Supplies Co.",
      onHand: 50,
      unit: "kg",
      reorderQty: 25,
      unitPrice: 1.2,
    },
    {
      id: "5",
      item: "Olive Oil",
      supplier: "Gourmet Imports",
      onHand: 15,
      unit: "L",
      reorderQty: 10,
      unitPrice: 12.5,
    },
  ]

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedItems.length === inventoryItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(inventoryItems.map((item) => item.id))
    }
  }

  const totalCost = inventoryItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.reorderQty * item.unitPrice, 0)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedItems.length === inventoryItems.length && inventoryItems.length > 0}
                  onCheckedChange={selectAll}
                />
              </TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">On Hand</TableHead>
              <TableHead className="text-right">Reorder Qty</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={() => toggleItem(item.id)} />
                </TableCell>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell className="text-right">
                  {item.onHand} {item.unit}
                </TableCell>
                <TableCell className="text-right">
                  {item.reorderQty} {item.unit}
                </TableCell>
                <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${(item.reorderQty * item.unitPrice).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-lg font-semibold">Total: ${totalCost.toFixed(2)}</div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={selectedItems.length === 0}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" disabled={selectedItems.length === 0}>
            <FilePlus className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button disabled={selectedItems.length === 0}>
            <Send className="mr-2 h-4 w-4" />
            Create PO
          </Button>
        </div>
      </div>
    </div>
  )
}
