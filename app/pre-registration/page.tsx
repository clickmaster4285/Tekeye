"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StepIndicator } from "@/components/registration/step-indicator";
import { Step1PersonalInfo } from "@/components/registration/step1-personal-info";
import { Step2VisitDetails } from "@/components/registration/step2-visit-details";
import { Step3Organization } from "@/components/registration/step3-organization";
import { Step4Consent } from "@/components/registration/step4-consent";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const steps = [
  { number: 1, title: "Visitor Personal Information" },
  { number: 2, title: "Visit Details" },
  { number: 3, title: "Organization & Information" },
  { number: 4, title: "Security & Consent" },
];

export default function PreRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    visitorType: "individual",
    fullName: "",
    gender: "",
    cnicNumber: "",
    passportNumber: "",
    nationality: "",
    dateOfBirth: "",
    mobileNumber: "",
    emailAddress: "",
    residentialAddress: "",
    // Step 2
    visitPurpose: "",
    visitDescription: "",
    departmentToVisit: "",
    hostOfficerName: "",
    hostOfficerDesignation: "",
    preferredVisitDate: "",
    preferredTimeSlot: "",
    expectedDuration: "",
    preferredViewVisit: "in-host",
    // Step 3
    organizationName: "",
    organizationType: "",
    ntnRegistrationNo: "",
    designation: "",
    officeAddress: "",
    // Step 4
    disclaimerAccepted: false,
    termsAccepted: false,
    previousVisitReference: "",
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar activePath="/pre-registration" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-foreground">
              Visitor Registration
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#3b82f6]">Pre-Registration Online</span>
          </div>

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">
              New Visitor Pre-Registration
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete the pre-registration fields to schedule a new visit
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator steps={steps} currentStep={currentStep} />

          {/* Form Content */}
          <div className="bg-background rounded-lg border border-border p-6 mt-6">
            {currentStep === 1 && (
              <Step1PersonalInfo
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 2 && (
              <Step2VisitDetails
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 3 && (
              <Step3Organization
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 4 && (
              <Step4Consent
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-transparent">
                Cancel
              </Button>
              <button className="text-[#3b82f6] text-sm font-medium hover:underline">
                Save &amp; Continue
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`bg-transparent ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : "border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10"}`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
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
  );
}
