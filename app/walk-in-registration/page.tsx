"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { WalkInStepIndicator } from "@/components/walk-in/step-indicator"
import { WalkInStep1BasicInfo } from "@/components/walk-in/step1-basic-info"
import { Step3DocumentUpload } from "@/components/registration/step3-document-upload"
import { Step5QRCodeGeneration } from "@/components/registration/step5-qr-code-generation"
import { WalkInStep4TimeSlot } from "@/components/walk-in/step4-time-slot"
import { WalkInStep5HostSelection } from "@/components/walk-in/step5-host-selection"
import { WalkInStep6VisitPurpose } from "@/components/walk-in/step6-visit-purpose"
import { WalkInStep2Security } from "@/components/walk-in/step2-security"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, MoreHorizontal, UserPlus } from "lucide-react"
import Link from "next/link"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (parts[0]) return parts[0].slice(0, 2).toUpperCase()
  return "??"
}

const initialRegistrations = [
  { name: "Ahmed Ali", initials: "AA", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", type: "Pre-Registration" as const, department: "Engineering", status: "Checked In" as const, time: "10:04 AM" },
  { name: "Hassan Shahib", initials: "HS", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", type: "Pre-Registration" as const, department: "Sales", status: "Approved" as const, time: "8:29 PM" },
  { name: "Nazia Afzal", initials: "NA", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", type: "Walk-In" as const, department: "", status: "Pending Docs" as const, time: "00:55 PM" },
  { name: "Muhammad Khan", initials: "MK", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", type: "Pre-Registration" as const, department: "Operations", status: "Checked In" as const, time: "01:04 PM" },
]

function getStatusStyle(status: string) {
  switch (status) {
    case "Checked In": return "bg-[#dbeafe] text-[#3b82f6]"
    case "Approved": return "bg-[#dcfce7] text-[#22c55e]"
    case "Pending Docs": return "bg-[#fef9c3] text-[#ca8a04]"
    default: return "bg-muted text-muted-foreground"
  }
}

const initialFormData = {
  registrationType: "",
  fullName: "",
  cnicPassport: "",
  nationality: "",
  mobileNumber: "",
  photoCapture: "",
  visitPurpose: "",
  department: "",
  hostName: "",
  location: "",
  documentType: "",
  documentNo: "",
  issuingAuthority: "",
  expiryDate: "",
  frontImage: "",
  backImage: "",
  supportDocType: "",
  applicationLetter: "",
  letterRefNo: "",
  additionalDocument: "",
  uploadProcedure: "",
  qrCodeId: "",
  visitorRefNumber: "",
  visitDate: "",
  timeValidityStart: "",
  timeValidityEnd: "",
  accessZone: "",
  entryGate: "",
  expiryStatus: "",
  scanCount: "",
  generatedOn: "",
  generatedBy: "",
  preferredDate: "",
  preferredTimeSlot: "",
  departmentForSlot: "",
  slotDuration: "",
  hostId: "",
  hostFullName: "",
  hostDesignation: "",
  hostDepartment: "",
  visitType: "",
  visitPurposeDescription: "",
  referenceNumber: "",
  watchlistCheckStatus: "",
  approverRequired: "",
  temporaryAccessGranted: "",
  guardRemarks: "",
}

export default function WalkInRegistrationPage() {
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState(initialRegistrations)
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    ...initialFormData,
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    const name = formData.fullName || "Unknown Visitor"
    const newEntry = {
      name,
      initials: getInitials(name),
      avatar: formData.photoCapture || "",
      type: "Walk-In" as const,
      department: formData.department || formData.departmentForSlot || "—",
      status: "Approved" as const,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    }
    setRegistrations((prev) => [newEntry, ...prev])
    toast({
      title: "Walk-In Registration saved",
      description: `${name} has been added to the list. (Dummy save.)`,
    })
    setShowForm(false)
    setCurrentStep(1)
    setFormData({ ...initialFormData })
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setCurrentStep(1)
    setFormData({ ...initialFormData })
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px] min-w-0">
        <Header />
        <main className="flex-1 p-6">
          <div className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-foreground">Visitor Registration</Link>
            <span className="mx-2">/</span>
            <span className="text-[#3b82f6]">
              {showForm ? "New Walk-In" : "Walk-In Registration"}
            </span>
          </div>

          {!showForm ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Walk-In Registration</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    View and manage walk-in registrations. Add a new visitor to start.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setFormData({ ...initialFormData })
                    setCurrentStep(1)
                    setShowForm(true)
                  }}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Walk-In Registration
                </Button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-foreground">Recent Registrations</h2>
                  <button className="text-sm text-[#3b82f6] hover:underline">View All</button>
                </div>
                <div className="bg-background rounded-xl border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Visitor Name</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Department</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={reg.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{reg.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium text-foreground">{reg.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground">{reg.type}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground">{reg.department || "—"}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(reg.status)}`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground">{reg.time}</span>
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
            </>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-foreground">New Walk-In Registration</h1>
                <p className="text-sm text-muted-foreground">
                  Complete the walk-in registration fields to schedule a visit.
                </p>
              </div>

              <WalkInStepIndicator currentStep={currentStep} />

              <div className="bg-background rounded-lg border border-border p-6 mt-6">
                {currentStep === 1 && (
                  <WalkInStep1BasicInfo formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 2 && (
                  <Step3DocumentUpload formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 3 && (
                  <Step5QRCodeGeneration formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 4 && (
                  <WalkInStep4TimeSlot formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 5 && (
                  <WalkInStep5HostSelection formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 6 && (
                  <WalkInStep6VisitPurpose formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 7 && (
                  <WalkInStep2Security formData={formData} updateFormData={updateFormData} />
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="bg-transparent" onClick={handleCancelForm}>
                    Back to list
                  </Button>
                  <button className="text-[#3b82f6] text-sm font-medium hover:underline">
                    Save &amp; Continue
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`bg-transparent ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : "border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10"}`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  {currentStep < 7 ? (
                    <Button onClick={nextStep} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">
                      Submit
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
