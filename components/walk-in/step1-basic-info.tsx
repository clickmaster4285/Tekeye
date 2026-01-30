"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Camera, MapPin } from "lucide-react"

interface WalkInStep1Props {
  formData: {
    registrationType: string
    fullName: string
    cnicPassport: string
    nationality: string
    mobileNumber: string
    photoCapture: string
    visitPurpose: string
    department: string
    hostName: string
    location: string
  }
  updateFormData: (data: Partial<WalkInStep1Props["formData"]>) => void
}

export function WalkInStep1BasicInfo({
  formData,
  updateFormData,
}: WalkInStep1Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">
        Basic Visitor Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Registration Type
          </Label>
          <Select
            value={formData.registrationType}
            onValueChange={(value) =>
              updateFormData({ registrationType: value })
            }
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Walk-in" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="walk-in">Walk-in</SelectItem>
              <SelectItem value="appointment">Appointment</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Full Name <span className="text-muted-foreground text-xs">(as per CNIC/Passport)</span>
          </Label>
          <Input
            placeholder="e.g. Muhammad Ali Hassan"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className="bg-background"
          />
        </div>

        {/* CNIC / Passport Number */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            CNIC / Passport Number <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="XXXXX-XXXXXXX-X"
            value={formData.cnicPassport}
            onChange={(e) => updateFormData({ cnicPassport: e.target.value })}
            className="bg-background"
          />
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Nationality
          </Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) => updateFormData({ nationality: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Pakistani" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pakistani">Pakistani</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="british">British</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Mobile Number
          </Label>
          <Input
            placeholder="0300-0000000"
            value={formData.mobileNumber}
            onChange={(e) => updateFormData({ mobileNumber: e.target.value })}
            className="bg-background"
          />
        </div>

        {/* Photo Capture */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Photo Capture
          </Label>
          <div className="relative">
            <Input
              placeholder="Take Photo"
              value={formData.photoCapture}
              onChange={(e) => updateFormData({ photoCapture: e.target.value })}
              className="bg-background pr-10"
              readOnly
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Camera className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Visit Purpose */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Visit Purpose
          </Label>
          <Input
            placeholder="Enter the brief purpose of this visit"
            value={formData.visitPurpose}
            onChange={(e) => updateFormData({ visitPurpose: e.target.value })}
            className="bg-background"
          />
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Department
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) => updateFormData({ department: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select the department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Host Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Host Name
          </Label>
          <Select
            value={formData.hostName}
            onValueChange={(value) => updateFormData({ hostName: value })}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select the hosting official Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
              <SelectItem value="ahmed-ali">Ahmed Ali</SelectItem>
              <SelectItem value="sarah-khan">Sarah Khan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Location
          </Label>
          <div className="relative">
            <Input
              placeholder="Choose on map"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              className="bg-background pr-10"
              readOnly
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
