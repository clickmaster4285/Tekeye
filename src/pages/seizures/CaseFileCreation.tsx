import { useEffect, useState } from "react"
import { FolderPlus, Plus } from "lucide-react"
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

const STORAGE_KEY = "wms_case_file_creation"

type CaseRow = { id: string; fir: string; created: string; status: string }

const defaultRows: CaseRow[] = [
  { id: "CF-2024-0841", fir: "FIR-2024-0841", created: "2024-02-04", status: "Open" },
  { id: "CF-2024-0840", fir: "FIR-2024-0840", created: "2024-02-03", status: "In Progress" },
]

function loadRows(): CaseRow[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CaseRow[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return defaultRows
}

function saveRows(rows: CaseRow[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

const STATUSES = ["Open", "In Progress", "Closed"]

export default function CaseFileCreationPage() {
  const [rows, setRows] = useState<CaseRow[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ fir: "", status: "Open" })

  useEffect(() => {
    setRows(loadRows())
  }, [])

  useEffect(() => {
    if (rows.length > 0) saveRows(rows)
  }, [rows])

  const openAddForm = () => {
    setForm({ fir: "", status: "Open" })
    setOpen(true)
  }

  const onSave = () => {
    if (!form.fir.trim()) return
    const id = `CF-2024-${String(Date.now()).slice(-4)}`
    const created = new Date().toISOString().slice(0, 10)
    setRows((prev) => [{ id, fir: form.fir.trim(), created, status: form.status }, ...prev])
    setForm({ fir: "", status: "Open" })
    setOpen(false)
  }

  return (
    <ModulePageLayout
      title="Case File Creation"
      description="Create and manage case files and related documents."
      breadcrumbs={[{ label: "WMS" }, { label: "Case File Creation" }]}
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Case Files</CardTitle>
              <CardDescription>Create and manage case file records</CardDescription>
            </div>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" onClick={openAddForm}>
              <Plus className="h-4 w-4 mr-2" /> New Case File
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>FIR Ref</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.fir}</TableCell>
                    <TableCell>{row.created}</TableCell>
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

      <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setForm({ fir: "", status: "Open" }) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Case File</DialogTitle>
            <p className="text-sm text-muted-foreground">Case ID will be auto-generated. Data saved locally.</p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>FIR Ref *</Label>
              <Input
                value={form.fir}
                onChange={(e) => setForm((p) => ({ ...p, fir: e.target.value }))}
                placeholder="e.g. FIR-2024-0841"
              />
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
