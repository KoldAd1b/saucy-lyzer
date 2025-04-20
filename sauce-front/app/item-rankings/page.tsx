import { PageHeader } from "@/components/page-header"
import { ItemRankings } from "@/components/item-rankings/item-rankings"

export default function ItemRankingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader title="Item Rankings" description="Performance analysis of menu items" date="April 20, 2025" />
      <ItemRankings />
    </div>
  )
}
