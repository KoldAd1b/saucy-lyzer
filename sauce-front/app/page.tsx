import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { PageHeader } from "@/components/page-header"

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader
        title="Dashboard Overview"
        description="Key metrics and insights for your restaurant"
        date="April 20, 2025"
      />
      <DashboardOverview />
    </div>
  )
}
