import { PageHeader } from "@/components/page-header"
import { SalesForecasts } from "@/components/sales-forecasts/sales-forecasts"

export default function SalesForecastsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader
        title="Sales Forecasts"
        description="Daily, weekly, and monthly sales projections"
        date="April 20, 2025"
      />
      <SalesForecasts />
    </div>
  )
}
