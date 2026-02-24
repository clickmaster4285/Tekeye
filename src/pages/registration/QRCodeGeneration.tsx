"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function QRCodeGenerationPage() {
  const [formData, setFormData] = useState({
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
  })

  const [savedQRCodes, setSavedQRCodes] = useState<any[]>([])

  // Load saved QR codes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("qrCodes")
    if (stored) setSavedQRCodes(JSON.parse(stored))
  }, [])

  // Save QR codes to localStorage whenever the array changes
  useEffect(() => {
    localStorage.setItem("qrCodes", JSON.stringify(savedQRCodes))
  }, [savedQRCodes])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSaveEntry = () => {
    // Auto-generate QR Code ID if empty
    const qrCodeId = formData.qrCodeId || `QR-${Date.now()}`
    setSavedQRCodes([{ ...formData, qrCodeId }, ...savedQRCodes])
    setFormData({
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
    })
    alert("QR Code entry saved successfully!")
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-2">
        Home / Visitor Registration / <span className="text-[#3b82f6]">QR Code Generation</span>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">QR Code Generation</h1>
        <p className="text-sm text-muted-foreground">
          Generate unique QR for visit authentication.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-background rounded-lg border border-border p-6 mb-6">
        <h2 className="text-lg font-medium text-foreground mb-6">QR Code Metadata</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code ID */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">QR Code ID</Label>
            <Input
              type="text"
              placeholder="Enter system generated ID"
              name="qrCodeId"
              value={formData.qrCodeId}
              onChange={handleInputChange}
              className="h-10 border-border"
            />
          </div>

          {/* Visitor Reference Number */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Visitor Reference Number</Label>
            <Input
              type="text"
              placeholder="Enter Reference Id"
              name="visitorRefNumber"
              value={formData.visitorRefNumber}
              onChange={handleInputChange}
              className="h-10 border-border"
            />
          </div>

          {/* Visit Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Visit Date</Label>
            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
              className="h-10 border-border"
            />
          </div>

          {/* Time Validity */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Time Validity</Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Start time"
                name="timeValidityStart"
                value={formData.timeValidityStart}
                onChange={handleInputChange}
                className="h-10 border-border flex-1"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="text"
                placeholder="End time"
                name="timeValidityEnd"
                value={formData.timeValidityEnd}
                onChange={handleInputChange}
                className="h-10 border-border flex-1"
              />
            </div>
          </div>

          {/* Access Zone */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Access Zone</Label>
            <Select
              value={formData.accessZone}
              onValueChange={(value) => setFormData({ ...formData, accessZone: value })}
            >
              <SelectTrigger className="h-10 border-border">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zone-a">Zone A</SelectItem>
                <SelectItem value="zone-b">Zone B</SelectItem>
                <SelectItem value="zone-c">Zone C</SelectItem>
                <SelectItem value="all">All Zones</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entry Gate */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Entry Gate</Label>
            <Select
              value={formData.entryGate}
              onValueChange={(value) => setFormData({ ...formData, entryGate: value })}
            >
              <SelectTrigger className="h-10 border-border">
                <SelectValue placeholder="Select gate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-gate">Main Gate</SelectItem>
                <SelectItem value="gate-1">Gate 1</SelectItem>
                <SelectItem value="gate-2">Gate 2</SelectItem>
                <SelectItem value="vip-gate">VIP Gate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expiry Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Expiry Status</Label>
            <Select
              value={formData.expiryStatus}
              onValueChange={(value) => setFormData({ ...formData, expiryStatus: value })}
            >
              <SelectTrigger className="h-10 border-border">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scan Count */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Scan Count</Label>
            <Input
              type="text"
              placeholder="Enter scan count"
              name="scanCount"
              value={formData.scanCount}
              onChange={handleInputChange}
              className="h-10 border-border"
            />
          </div>

          {/* Generated On */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Generated On</Label>
            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              name="generatedOn"
              value={formData.generatedOn}
              onChange={handleInputChange}
              className="h-10 border-border"
            />
          </div>

          {/* Generated By */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Generated By</Label>
            <Select
              value={formData.generatedBy}
              onValueChange={(value) => setFormData({ ...formData, generatedBy: value })}
            >
              <SelectTrigger className="h-10 border-border">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="operator">Operator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" onClick={handleSaveEntry}>
            Save QR Code
          </Button>
        </div>
      </div>

      {/* Saved QR Codes Table */}
      {savedQRCodes.length > 0 && (
        <div className="bg-background rounded-lg border border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Saved QR Codes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border text-sm">
              <thead className="bg-muted/10">
                <tr>
                  <th className="p-2 border border-border">QR ID</th>
                  <th className="p-2 border border-border">Visitor Ref</th>
                  <th className="p-2 border border-border">Visit Date</th>
                  <th className="p-2 border border-border">Access Zone</th>
                  <th className="p-2 border border-border">Entry Gate</th>
                  <th className="p-2 border border-border">Expiry Status</th>
                  <th className="p-2 border border-border">Scan Count</th>
                  <th className="p-2 border border-border">Generated On</th>
                  <th className="p-2 border border-border">Generated By</th>
                </tr>
              </thead>
              <tbody>
                {savedQRCodes.map((qr, idx) => (
                  <tr key={idx} className="hover:bg-muted/5">
                    <td className="p-2 border border-border">{qr.qrCodeId}</td>
                    <td className="p-2 border border-border">{qr.visitorRefNumber}</td>
                    <td className="p-2 border border-border">{qr.visitDate}</td>
                    <td className="p-2 border border-border">{qr.accessZone}</td>
                    <td className="p-2 border border-border">{qr.entryGate}</td>
                    <td className="p-2 border border-border">{qr.expiryStatus}</td>
                    <td className="p-2 border border-border">{qr.scanCount}</td>
                    <td className="p-2 border border-border">{qr.generatedOn}</td>
                    <td className="p-2 border border-border">{qr.generatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}