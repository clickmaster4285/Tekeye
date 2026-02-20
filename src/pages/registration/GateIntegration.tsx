import { ROUTES } from "@/routes/config"
import { VmsListPage } from "@/components/vms/vms-list-page"

export default function GateIntegrationPage() {
  return (
    <VmsListPage
      title="Gate Integration"
      description="Integration with turnstiles, doors, or barriers."
      storageKey="vms_gate_integration_rows"
      breadcrumbs={[
        { label: "Home", href: ROUTES.DASHBOARD },
        { label: "Visitor Management System" },
        { label: "Access Control" },
        { label: "Gate Integration" },
      ]}
      columns={[
        { key: "point", label: "Gate / Door" },
        { key: "status", label: "Status" },
        { key: "lastSync", label: "Last Sync" },
      ]}
      formFields={[
        { key: "point", label: "Gate / Door" },
        { key: "status", label: "Status (Connected/Warning/Offline)" },
        { key: "lastSync", label: "Last Sync" },
      ]}
      filterField="status"
      initialRows={[
        { point: "Gate 1 (Main Turnstile)", status: "Connected", lastSync: "09:45 AM" },
        { point: "Gate 3 (Warehouse Barrier)", status: "Connected", lastSync: "09:44 AM" },
        { point: "Door 7 (Admin Corridor)", status: "Warning", lastSync: "Manual override enabled" },
      ]}
    />
  )
}
