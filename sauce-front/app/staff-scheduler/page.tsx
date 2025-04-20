import { PageHeader } from "@/components/page-header"
import { StaffScheduler } from "@/components/staff-scheduler/staff-scheduler"

export default function StaffSchedulerPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader title="Staff Scheduler" description="Forecast-driven staff scheduling" date="April 20, 2025" />
      <StaffScheduler />
    </div>
  )
}
