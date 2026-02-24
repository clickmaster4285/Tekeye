import { useEffect, useState } from "react"
import { FileText, Scale, Plus } from "lucide-react"
import { ModulePageLayout } from "@/components/dashboard/module-page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STORAGE_KEY = "wms_fir_registration"

type FirRow = { no: string; date: string; station: string; status: string }

const defaultRows: FirRow[] = [
  { no: "FIR-2024-0841", date: "2024-02-04", station: "Customs Karachi", status: "Registered" },
  { no: "FIR-2024-0840", date: "2024-02-03", station: "Customs Lahore", status: "Under Investigation" },
]

function loadRows(): FirRow[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as FirRow[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return defaultRows
}

function saveRows(rows: FirRow[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

const STATIONS = ["Customs Karachi", "Customs Lahore", "Customs Islamabad", "Customs Rawalpindi", "Customs Faisalabad"]
const STATUSES = ["Registered", "Under Investigation", "Closed"]

export default function FirRegistrationPage() {
  const [rows, setRows] = useState<FirRow[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ date: "", station: "Customs Karachi", status: "Registered" })
  const [search, setSearch] = useState("")

  useEffect(() => {
    setRows(loadRows())
  }, [])

  useEffect(() => {
    if (rows.length > 0) saveRows(rows)
  }, [rows])

  const openAddForm = () => {
    setForm({ date: new Date().toISOString().slice(0, 10), station: "Customs Karachi", status: "Registered" })
    setOpen(true)
  }

  const onSave = () => {
    const no = `FIR-2024-${String(Date.now()).slice(-4)}`
    const date = form.date || new Date().toISOString().slice(0, 10)
    setRows((prev) => [{ no, date, station: form.station, status: form.status }, ...prev])
    setForm({ date: "", station: "Customs Karachi", status: "Registered" })
    setOpen(false)
  }

  const filtered = rows.filter(
    (r) =>
      !search.trim() ||
      r.no.toLowerCase().includes(search.toLowerCase()) ||
      r.station.toLowerCase().includes(search.toLowerCase())
  )
  const underInvestigation = rows.filter((r) => r.status === "Under Investigation").length

  return (
    <ModulePageLayout
      title="FIR Registration"
      description="Register and manage FIR (First Information Report) records."
      breadcrumbs={[{ label: "WMS" }, { label: "FIR Registration" }]}
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total FIRs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rows.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
              <Scale className="h-4 w-4 text-[#3b82f6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rows.length}</div>
              <p className="text-xs text-muted-foreground mt-1">New FIRs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Under Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{underInvestigation}</div>
              <p className="text-xs text-muted-foreground mt-1">Active</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>FIR Register</CardTitle>
              <CardDescription>Search and manage FIR records</CardDescription>
            </div>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" onClick={openAddForm}>
              <Plus className="h-4 w-4 mr-2" /> New FIR
            </Button>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by FIR number..."
              className="mb-4 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>FIR No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell className="font-medium">{row.no}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.station}</TableCell>
                    <TableCell><Badge variant="outline">{row.status}</Badge></TableCell>
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

      <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setForm({ date: "", station: "Customs Karachi", status: "Registered" }) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New FIR</DialogTitle>
            <p className="text-sm text-muted-foreground">FIR number auto-generated. Data saved locally.</p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Station</Label>
              <Select value={form.station} onValueChange={(v) => setForm((p) => ({ ...p, station: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={onSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ModulePageLayout>
  )
}
