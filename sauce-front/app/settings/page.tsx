import { PageHeader } from "@/components/page-header"
import { Settings } from "@/components/settings/settings"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader title="Settings" description="Configure your dashboard preferences" date="April 20, 2025" />
      <Settings />
    </div>
  )
}
