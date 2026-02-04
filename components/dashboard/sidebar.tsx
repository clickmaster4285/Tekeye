"use client"

import React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  UserCheck,
  Package,
  Users,
  Eye,
  ChevronDown,
  ChevronRight,
  Brain,
  Cog,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href?: string
  active?: boolean
  children?: { label: string; href: string; active?: boolean }[]
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["VMS"])

  // Define which routes belong to which parent menu
  const routeToParentMap: Record<string, string> = {
    "/": "Dashboard",
    "/pre-registration": "VMS",
    "/walk-in-registration": "VMS",
    "/streamed-upload": "VMS",
    "/photo-capture": "VMS",
    "/qr-code-generation": "VMS",
    "/appointment-scheduling": "VMS",
    "/time-slot-booking": "VMS",
    "/host-selection": "VMS",
    "/visit-purpose": "VMS",
    "/calendar-view": "VMS",
    "/warehouse-setup": "WMS",
    "/zone-location-management": "WMS",
    "/storage-allocation": "WMS",
    "/inventory-tracking": "WMS",
    "/stock-reconciliation": "WMS",
    "/camera-integration": "WMS",
    "/operations-dashboard": "WMS",
    "/analytics-dashboard": "WMS",
    "/live-monitoring": "WMS",
    "/new-seizure-entry": "WMS",
    "/jcp-toll-plaza-entry": "WMS",
    "/goods-receipt-handover": "WMS",
    "/ai-item-cataloging": "WMS",
    "/seizure-register": "WMS",
    "/fir-registration": "WMS",
    "/case-file-creation": "WMS",
    "/court-proceedings": "WMS",
    "/legal-documents": "WMS",
    "/case-status-tracking": "WMS",
    "/inter-collectorate-transfer": "WMS",
    "/internal-movement": "WMS",
    "/handover-requests": "WMS",
    "/double-authentication": "WMS",
    "/transfer-tracking": "WMS",
    "/perishable-register": "WMS",
    "/expiry-tracking": "WMS",
    "/priority-disposal-queue": "WMS",
    "/destruction-orders": "WMS",
    "/lot-creation": "WMS",
    "/item-valuation": "WMS",
    "/aso-portal-sync": "WMS",
    "/bidding-management": "WMS",
    "/sale-completion": "WMS",
    "/revenue-reports": "WMS",
    "/camera-management": "WMS",
    "/object-detection": "WMS",
    "/anpr-settings": "WMS",
    "/anomaly-detection": "WMS",
    "/reports": "AI Analytics",
    "/predictive-insights": "AI Analytics",
    "/data-visualization": "AI Analytics",
    "/employees": "HR",
    "/attendance": "HR",
    "/leave-management": "HR",
    "/payroll": "HR",
    "/recruitment": "HR",
    "/general-settings": "System configuration",
    "/user-role-management": "System configuration",
    "/integrations": "System configuration",
    "/notifications": "System configuration",
    "/security-access": "System configuration",
  }

  // Auto-expand the correct menu based on current pathname
  useEffect(() => {
    const parentMenu = routeToParentMap[pathname]
    if (parentMenu && !expandedItems.includes(parentMenu)) {
      setExpandedItems((prev) => [...prev, parentMenu])
    }
  }, [pathname])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const menuSections: MenuSection[] = [
    {
      title: "MAIN MODULES",
      items: [
        {
          icon: <LayoutDashboard size={18} />,
          label: "Dashboard",
          href: "/",
        },
        {
          icon: <UserCheck size={18} />,
          label: "VMS",
          children: [
            { label: "Pre-Registration", href: "/pre-registration" },
            { label: "Walk-In Registration", href: "/walk-in-registration" },
            { label: "Document Upload", href: "/streamed-upload" },
            { label: "Photo Capture", href: "/photo-capture" },
            { label: "QR Code Generation", href: "/qr-code-generation" },
            { label: "Appointment Scheduling", href: "/appointment-scheduling" },
            { label: "Time Slot Booking", href: "/time-slot-booking" },
            { label: "Host Selection", href: "/host-selection" },
            { label: "Visit Purpose", href: "/visit-purpose" },
            { label: "Calendar View", href: "/calendar-view" },
          ],
        },
        {
          icon: <Package size={18} />,
          label: "WMS",
          children: [
            { label: "Executive Dashboard", href: "/" },
            { label: "Operations Dashboard", href: "/operations-dashboard" },
            { label: "AI Analytics Dashboard", href: "/analytics-dashboard" },
            { label: "Live Monitoring", href: "/live-monitoring" },
            { label: "New Seizure Entry", href: "/new-seizure-entry" },
            { label: "JCP/Toll Plaza Entry (ANPR)", href: "/jcp-toll-plaza-entry" },
            { label: "Goods Receipt & Handover", href: "/goods-receipt-handover" },
            { label: "AI Item Cataloging", href: "/ai-item-cataloging" },
            { label: "QR Code Generation", href: "/qr-code-generation" },
            { label: "Seizure Register", href: "/seizure-register" },
            { label: "Warehouse Setup", href: "/warehouse-setup" },
            { label: "Zone & Location Management", href: "/zone-location-management" },
            { label: "Storage Allocation", href: "/storage-allocation" },
            { label: "Inventory Tracking", href: "/inventory-tracking" },
            { label: "Stock Reconciliation", href: "/stock-reconciliation" },
            { label: "Camera Integration", href: "/camera-integration" },
            { label: "FIR Registration", href: "/fir-registration" },
            { label: "Case File Creation", href: "/case-file-creation" },
            { label: "Court Proceedings", href: "/court-proceedings" },
            { label: "Legal Documents", href: "/legal-documents" },
            { label: "Case Status Tracking", href: "/case-status-tracking" },
            { label: "Inter-Collectorate Transfer", href: "/inter-collectorate-transfer" },
            { label: "Internal Movement", href: "/internal-movement" },
            { label: "Handover Requests", href: "/handover-requests" },
            { label: "Double Authentication", href: "/double-authentication" },
            { label: "Transfer Tracking", href: "/transfer-tracking" },
            { label: "Perishable Register", href: "/perishable-register" },
            { label: "Expiry Tracking", href: "/expiry-tracking" },
            { label: "Priority Disposal Queue", href: "/priority-disposal-queue" },
            { label: "Destruction Orders", href: "/destruction-orders" },
            { label: "Lot Creation", href: "/lot-creation" },
            { label: "Item Valuation", href: "/item-valuation" },
            { label: "ASO Portal Sync", href: "/aso-portal-sync" },
            { label: "Bidding Management", href: "/bidding-management" },
            { label: "Sale Completion", href: "/sale-completion" },
            { label: "Revenue Reports", href: "/revenue-reports" },
            { label: "Camera Management", href: "/camera-management" },
            { label: "Object Detection", href: "/object-detection" },
            { label: "ANPR Settings", href: "/anpr-settings" },
            { label: "Anomaly Detection", href: "/anomaly-detection" },
          ],
        },
        {
          icon: <Brain size={18} />,
          label: "AI Analytics",
          children: [
            { label: "Analytics Dashboard", href: "/analytics-dashboard" },
            { label: "Reports", href: "/reports" },
            { label: "Predictive Insights", href: "/predictive-insights" },
            { label: "Data Visualization", href: "/data-visualization" },
          ],
        },
        {
          icon: <Users size={18} />,
          label: "HR",
          children: [
            { label: "Employees", href: "/employees" },
            { label: "Attendance", href: "/attendance" },
            { label: "Leave Management", href: "/leave-management" },
            { label: "Payroll", href: "/payroll" },
            { label: "Recruitment", href: "/recruitment" },
          ],
        },
        {
          icon: <Cog size={18} />,
          label: "System configuration",
          children: [
            { label: "General Settings", href: "/general-settings" },
            { label: "User & Role Management", href: "/user-role-management" },
            { label: "Integrations", href: "/integrations" },
            { label: "Notifications", href: "/notifications" },
            { label: "Security & Access", href: "/security-access" },
          ],
        },
      ],
    },
  ]

  return (
    <aside className="w-[240px] min-h-screen bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3b82f6] flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-foreground">TekEye</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-2">
            {section.title && (
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground tracking-wider">
                {section.title}
              </div>
            )}
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                {item.children ? (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200",
                      item.children.some((c) => c.href === pathname)
                        ? "bg-gradient-to-r from-[#3b82f6]/15 via-[#3b82f6]/10 to-transparent text-[#3b82f6] font-medium"
                        : "text-muted-foreground hover:bg-gradient-to-r hover:from-[#3b82f6]/10 hover:via-[#3b82f6]/5 hover:to-transparent hover:text-[#3b82f6] hover:translate-x-1"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="whitespace-nowrap text-left">{item.label}</span>
                    </div>
                    <span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200",
                      pathname === item.href
                        ? "bg-gradient-to-r from-[#3b82f6]/15 via-[#3b82f6]/10 to-transparent text-[#3b82f6] font-medium"
                        : "text-muted-foreground hover:bg-gradient-to-r hover:from-[#3b82f6]/10 hover:via-[#3b82f6]/5 hover:to-transparent hover:text-[#3b82f6] hover:translate-x-1"
                    )}
                  >
                    {item.icon}
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                )}
                {item.children && expandedItems.includes(item.label) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-md transition-all duration-200",
                          pathname === child.href
                            ? "text-[#3b82f6] font-medium bg-[#3b82f6]/5"
                            : "text-muted-foreground hover:text-[#3b82f6] hover:bg-[#3b82f6]/5 hover:translate-x-1"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground">© 2024 Powered by OSIEMENS</p>
      </div>
    </aside>
  )
}
