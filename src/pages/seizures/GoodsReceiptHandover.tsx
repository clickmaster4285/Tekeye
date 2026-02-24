"use client"

import { useState, useEffect } from "react"
import { Package, ArrowRightLeft, CheckCircle, X } from "lucide-react"
import { ModulePageLayout } from "@/components/dashboard/module-page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function GoodsReceiptHandoverPage() {
  const [records, setRecords] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ ref: "", date: "", type: "Receipt", status: "Pending" })

  // Load existing data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("goodsRecords")
    if (stored) setRecords(JSON.parse(stored))
  }, [])

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem("goodsRecords", JSON.stringify(records))
  }, [records])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRecords([formData, ...records])
    setFormData({ ref: "", date: "", type: "Receipt", status: "Pending" })
    setShowModal(false)
  }

  return (
    <ModulePageLayout
      title="Goods Receipt & Handover"
      description="Record goods receipt and handover transactions."
      breadcrumbs={[{ label: "WMS" }, { label: "Goods Receipt & Handover" }]}
    >
      <div className="grid gap-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receipts Today</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">Goods received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Handovers Pending</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting handover</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Register Card */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <CardTitle>Receipt & Handover Register</CardTitle>
              <CardDescription>Recent goods receipt and handover records</CardDescription>
            </div>

            {/* Button to open modal */}
            <Button
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white mt-4 sm:mt-0"
              onClick={() => setShowModal(true)}
            >
              New Receipt
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((row) => (
                  <TableRow key={row.ref}>
                    <TableCell className="font-medium">{row.ref}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Completed" ? "default" : "secondary"}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#3b82f6]">
                        View
                      </Button>
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

            <h2 className="text-lg font-semibold mb-4">Add New Receipt / Handover</h2>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <Input
                placeholder="Reference"
                name="ref"
                value={formData.ref}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="Receipt">Receipt</option>
                <option value="Handover">Handover</option>
              </select>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                Save
              </Button>
            </form>
          </div>
        </div>
      )}
    </ModulePageLayout>
  )
}