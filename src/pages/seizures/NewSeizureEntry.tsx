"use client"

import { useState, useEffect } from "react"
import { ClipboardList, Plus, X } from "lucide-react"
import { ModulePageLayout } from "@/components/dashboard/module-page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function NewSeizureEntryPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ ref: "", dateTime: "", description: "", location: "", status: "Registered" })

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("seizureEntries")
    if (stored) setEntries(JSON.parse(stored))
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("seizureEntries", JSON.stringify(entries))
  }, [entries])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Auto-generate reference if empty
    const ref = formData.ref || `SZ-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`
    setEntries([{ ...formData, ref }, ...entries])
    setFormData({ ref: "", dateTime: "", description: "", location: "", status: "Registered" })
    setShowModal(false)
  }

  return (
    <ModulePageLayout
      title="New Seizure Entry"
      description="Record new seizure cases and related details."
      breadcrumbs={[{ label: "WMS" }, { label: "New Seizure Entry" }]}
    >
      <div className="grid gap-6">
        {/* Create Entry Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Create Seizure Entry</CardTitle>
              <CardDescription>Enter seizure details and attach supporting documents</CardDescription>
            </div>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" onClick={() => setShowModal(true)}>
              <Plus className="h-4 w-4 mr-2" /> New Entry
            </Button>
          </CardHeader>
        </Card>

        {/* Recent Entries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Seizure Entries</CardTitle>
            <CardDescription>Latest seizure records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((row) => (
                  <TableRow key={row.ref}>
                    <TableCell className="font-medium">{row.ref}</TableCell>
                    <TableCell>{row.dateTime}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#3b82f6]">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">New Seizure Entry</h2>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <Input
                placeholder="Seizure Reference"
                name="ref"
                value={formData.ref}
                onChange={handleInputChange}
              />
              <Input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                required
              />
              <Input
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <Input
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                Save Entry
              </Button>
            </form>
          </div>
        </div>
      )}
    </ModulePageLayout>
  )
}