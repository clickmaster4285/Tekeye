import { ROUTES } from "@/routes/config"
import { VmsListPage } from "@/components/vms/vms-list-page"

export default function ZoneRestrictionsPage() {
  return (
    <VmsListPage
      title="Zone Restrictions"
      description="Control visitor movement based on assigned zones."
      storageKey="vms_zone_restrictions_rows"
      breadcrumbs={[
        { label: "Home", href: ROUTES.DASHBOARD },
        { label: "Visitor Management System" },
        { label: "Access Control" },
        { label: "Zone Restrictions" },
      ]}
      columns={[
        { key: "visitorType", label: "Visitor Type" },
        { key: "zone", label: "Allowed Zone" },
        { key: "level", label: "Access Level" },
      ]}
      formFields={[
        { key: "visitorType", label: "Visitor Type" },
        { key: "zone", label: "Allowed Zone" },
        { key: "level", label: "Access Level" },
      ]}
      filterField="visitorType"
      initialRows={[
        { visitorType: "Contractor", zone: "Gate Area, Workshop Block", level: "Limited" },
        { visitorType: "Interview Candidate", zone: "Reception, HR Office", level: "Restricted" },
        { visitorType: "Vendor", zone: "Loading Bay, Warehouse Entry", level: "Limited" },
      ]}
    />
  )
}
