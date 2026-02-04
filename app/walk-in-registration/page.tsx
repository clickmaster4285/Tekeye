"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { WalkInStepIndicator } from "@/components/walk-in/step-indicator"
import { WalkInStep1BasicInfo } from "@/components/walk-in/step1-basic-info"
import { WalkInStep2Security } from "@/components/walk-in/step2-security"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function WalkInRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Basic Visitor Information
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
    // Step 2 - Quick Security Screening
    watchlistCheckStatus: "",
    approverRequired: "",
    temporaryAccessGranted: "",
    guardRemarks: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Walk-In Registration submitted:", formData)
    alert("Walk-In Registration submitted successfully!")
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px] min-w-0">
        <Header />
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-2">
            Home / Visitor Registration /{" "}
            <span className="text-[#3b82f6]">Walk-In Registration</span>
          </div>

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">
              Walk-In Registration
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete the walk-in registration fields to schedule a visit.
            </p>
          </div>

          {/* Step Indicator */}
          <WalkInStepIndicator currentStep={currentStep} />

          {/* Form Content */}
          <div className="bg-background rounded-lg border p-6 mt-6">
            {currentStep === 1 && (
              <WalkInStep1BasicInfo
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 2 && (
              <WalkInStep2Security
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-transparent">
                Cancel
              </Button>
              <Button
                variant="link"
                className="text-[#3b82f6] hover:text-[#2563eb]"
              >
                Save & Continue
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <Button
                  onClick={prevStep}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              {currentStep < 2 ? (
                <Button
                  onClick={nextStep}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
