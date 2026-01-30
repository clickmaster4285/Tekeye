import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"

interface Registration {
  name: string
  avatar?: string
  initials: string
  type: string
  department: string
  status: "Checked In" | "Approved" | "Pending Docs" | "Checked In"
  time: string
}

export function RecentRegistrations() {
  const registrations: Registration[] = [
    {
      name: "Ahmed Ali",
      initials: "AA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      type: "Pre-Registration",
      department: "Engineering",
      status: "Checked In",
      time: "10:04 AM",
    },
    {
      name: "Hassan Shahib",
      initials: "HS",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      type: "Pre-Registration",
      department: "Sales",
      status: "Approved",
      time: "8:29 PM",
    },
    {
      name: "Nazia Afzal",
      initials: "NA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      type: "Walk-In",
      department: "",
      status: "Pending Docs",
      time: "00:55 PM",
    },
    {
      name: "Muhammad Khan",
      initials: "MK",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      type: "Pre-Registration",
      department: "Operations",
      status: "Checked In",
      time: "01:04 PM",
    },
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Checked In":
        return "bg-[#dbeafe] text-[#3b82f6]"
      case "Approved":
        return "bg-[#dcfce7] text-[#22c55e]"
      case "Pending Docs":
        return "bg-[#fef9c3] text-[#ca8a04]"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Recent Registrations</h2>
        <button className="text-sm text-[#3b82f6] hover:underline">View All</button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Visitor Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Time
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={registration.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{registration.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{registration.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{registration.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{registration.department || "—"}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(registration.status)}`}
                  >
                    {registration.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{registration.time}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
