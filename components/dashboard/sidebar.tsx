"use client"

import React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  UserCheck,
  ClipboardList,
  Users,
  Upload,
  Camera,
  QrCode,
  Workflow,
  Monitor,
  Eye,
  Bell,
  Shield,
  Lock,
  FileText,
  UserCog,
  Settings,
  MessageSquare,
  UserPlus,
  Cog,
  Plug,
  Smartphone,
  Server,
  Key,
  ChevronDown,
  ChevronRight,
  CalendarDays,
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
  const [expandedItems, setExpandedItems] = useState<string[]>(["Visitor Registration"])

  // Define which routes belong to which parent menu
  const routeToParentMap: Record<string, string> = {
    "/pre-registration": "Visitor Registration",
    "/walk-in-registration": "Visitor Registration",
    "/streamed-upload": "Visitor Registration",
    "/photo-capture": "Visitor Registration",
    "/qr-code-generation": "Visitor Registration",
    "/appointment-scheduling": "Appointment Scheduling",
    "/time-slot-booking": "Appointment Scheduling",
    "/host-selection": "Appointment Scheduling",
    "/visit-purpose": "Appointment Scheduling",
    "/calendar-view": "Appointment Scheduling",
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
      title: "MODULES",
      items: [
        { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "#" },
        {
          icon: <UserCheck size={18} />,
          label: "Visitor Registration",
          active: true,
          children: [
            { label: "Pre-Registration Status", href: "/pre-registration" },
            { label: "Walk-In Registration", href: "/walk-in-registration" },
            { label: "Streamed Upload", href: "/streamed-upload" },
            { label: "Photo Capture", href: "/photo-capture" },
            { label: "QR Code Generation", href: "/qr-code-generation" },
          ],
        },
        {
          icon: <CalendarDays size={18} />,
          label: "Appointment Scheduling",
          href: "/appointment-scheduling",
          children: [
            { label: "Time Slot Booking", href: "/time-slot-booking" },
            { label: "Host Selection", href: "/host-selection" },
            { label: "Visit Purpose", href: "/visit-purpose" },
            { label: "Calendar View", href: "/calendar-view" },
          ],
        },
      ],
    },
    {
      title: "INTEGRATIONS",
      items: [
        { icon: <Workflow size={18} />, label: "Visitor Workflow", href: "#" },
        { icon: <Monitor size={18} />, label: "Kiosk Setup", href: "#" },
        { icon: <Eye size={18} />, label: "Visitor Hedging", href: "#" },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { icon: <Bell size={18} />, label: "Notifications", href: "#" },
        {
          icon: <Shield size={18} />,
          label: "Guard & Reception Panel",
          children: [{ label: "Panel Settings", href: "#" }],
        },
        {
          icon: <Lock size={18} />,
          label: "Reports & Security",
          children: [
            { label: "Access Scheduling", href: "#" },
            { label: "Access Control", href: "#" },
            { label: "AI & Advanced Security", href: "#" },
          ],
        },
        {
          icon: <FileText size={18} />,
          label: "Front & Document",
          children: [{ label: "Document Settings", href: "#" }],
        },
        {
          icon: <UserCog size={18} />,
          label: "Guard & Reception Panel",
          children: [{ label: "Guard Settings", href: "#" }],
        },
        {
          icon: <Shield size={18} />,
          label: "Reports & Security",
          children: [{ label: "Security Reports", href: "#" }],
        },
      ],
    },
    {
      title: "",
      items: [
        {
          icon: <FileText size={18} />,
          label: "Reports & Analytics",
          children: [{ label: "Analytics Dashboard", href: "#" }],
        },
        {
          icon: <ClipboardList size={18} />,
          label: "Audit & Compliance",
          children: [{ label: "Compliance Reports", href: "#" }],
        },
        {
          icon: <MessageSquare size={18} />,
          label: "Communication",
          children: [{ label: "Messages", href: "#" }],
        },
      ],
    },
    {
      title: "",
      items: [
        {
          icon: <UserPlus size={18} />,
          label: "User & Role Management",
          children: [{ label: "Users", href: "#" }],
        },
        {
          icon: <Cog size={18} />,
          label: "System Configuration",
          children: [{ label: "Settings", href: "#" }],
        },
        {
          icon: <Plug size={18} />,
          label: "Integration",
          children: [{ label: "Integrations", href: "#" }],
        },
        {
          icon: <Smartphone size={18} />,
          label: "Mobile Application",
          children: [{ label: "Mobile Settings", href: "#" }],
        },
        {
          icon: <Server size={18} />,
          label: "System Administration",
          children: [{ label: "Administration", href: "#" }],
        },
        { icon: <Key size={18} />, label: "API Access", href: "#" },
        { icon: <Settings size={18} />, label: "Settings", href: "#" },
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
                <button
                  onClick={() => item.children && toggleExpand(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200",
                    item.active
                      ? "bg-gradient-to-r from-[#3b82f6]/15 via-[#3b82f6]/10 to-transparent text-[#3b82f6] font-medium"
                      : "text-muted-foreground hover:bg-gradient-to-r hover:from-[#3b82f6]/10 hover:via-[#3b82f6]/5 hover:to-transparent hover:text-[#3b82f6] hover:translate-x-1"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                  {item.children && (
                    <span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>
                {item.children && expandedItems.includes(item.label) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-md transition-all duration-200",
                          child.active
                            ? "text-[#3b82f6] font-medium"
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
