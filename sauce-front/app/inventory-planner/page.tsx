import { PageHeader } from "@/components/page-header"
import { InventoryPlanner } from "@/components/inventory-planner/inventory-planner"

export default function InventoryPlannerPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader title="Inventory Planner" description="Forecast-based inventory management" date="April 20, 2025" />
      <InventoryPlanner />
    </div>
  )
}
