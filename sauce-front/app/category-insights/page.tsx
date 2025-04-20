import { PageHeader } from "@/components/page-header"
import { CategoryInsights } from "@/components/category-insights/category-insights"

export default function CategoryInsightsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader
        title="Category Insights"
        description="Sales breakdown by order type and category"
        date="April 20, 2025"
      />
      <CategoryInsights />
    </div>
  )
}
