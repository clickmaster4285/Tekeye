import { ROUTES } from "@/routes/config"
import { VmsListPage } from "@/components/vms/vms-list-page"

export default function VehicleRegistrationPage() {
  return (
    <VmsListPage
      title="Vehicle Registration"
      description="Capture vehicle number, driver details, and entry time."
      storageKey="vms_vehicle_registration_rows"
      breadcrumbs={[
        { label: "Home", href: ROUTES.DASHBOARD },
        { label: "Visitor Management System" },
        { label: "Vehicle & Contractor Management" },
        { label: "Vehicle Registration" },
      ]}
      columns={[
        { key: "vehicle", label: "Vehicle Number" },
        { key: "driver", label: "Driver" },
        { key: "entryTime", label: "Entry Time" },
        { key: "purpose", label: "Purpose" },
      ]}
      formFields={[
        { key: "vehicle", label: "Vehicle Number" },
        { key: "driver", label: "Driver Name" },
        { key: "entryTime", label: "Entry Time" },
        { key: "purpose", label: "Purpose" },
      ]}
      filterField="purpose"
      initialRows={[
        { vehicle: "LEA-2345", driver: "Bilal Ahmed", entryTime: "09:10 AM", purpose: "Vendor Delivery" },
        { vehicle: "ICT-7788", driver: "Saeed Khan", entryTime: "11:20 AM", purpose: "Contractor Visit" },
      ]}
    />
  )
}
