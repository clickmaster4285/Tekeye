import { Calendar } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RegistrationModules } from "@/components/dashboard/registration-modules"
import { RecentRegistrations } from "@/components/dashboard/recent-registrations"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Visitor Registration Overview</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage visitor registrations, check-ins, and documentation efficiently
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Today, January 22, 2024</span>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Registration Modules */}
          <RegistrationModules />

          {/* Recent Registrations */}
          <RecentRegistrations />
        </main>
      </div>
    </div>
  )
}
