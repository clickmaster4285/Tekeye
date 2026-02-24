import { useEffect, useState } from "react"
import { Video, CheckCircle, Wifi, Settings } from "lucide-react"
import { ModulePageLayout } from "@/components/dashboard/module-page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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

const STORAGE_KEY = "wms_camera_integration"

type CameraRow = {
  id: string
  location: string
  wh: string
  zone: string
  active: boolean
  recording: boolean
}

const defaultCameras: CameraRow[] = [
  { id: "CAM-WH001-01", location: "Main Gate", wh: "WH-001", zone: "Z-A01", active: true, recording: true },
  { id: "CAM-WH001-02", location: "Receiving Dock", wh: "WH-001", zone: "Z-A01", active: true, recording: true },
  { id: "CAM-WH001-03", location: "Bulk Storage A", wh: "WH-001", zone: "Z-B02", active: false, recording: false },
  { id: "CAM-WH001-04", location: "Picking Zone", wh: "WH-001", zone: "Z-C03", active: true, recording: true },
  { id: "CAM-WH001-05", location: "Staging Area", wh: "WH-001", zone: "Z-C03", active: true, recording: true },
  { id: "CAM-WH001-06", location: "Loading Dock", wh: "WH-001", zone: "Z-A01", active: true, recording: true },
  { id: "CAM-WH001-07", location: "Dispatch", wh: "WH-001", zone: "Z-B02", active: false, recording: false },
  { id: "CAM-WH002-01", location: "North Gate", wh: "WH-002", zone: "Z-A01-N", active: true, recording: true },
  { id: "CAM-WH002-02", location: "South Gate", wh: "WH-002", zone: "Z-A01-S", active: true, recording: true },
  { id: "CAM-WH002-03", location: "Perimeter", wh: "WH-002", zone: "Z-P01", active: true, recording: true },
]

function loadCameras(): CameraRow[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CameraRow[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return defaultCameras
}

function saveCameras(rows: CameraRow[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

const emptyForm = (): Omit<CameraRow, "id"> => ({
  location: "",
  wh: "WH-001",
  zone: "Z-A01",
  active: true,
  recording: true,
})

export default function CameraIntegrationPage() {
  const [rows, setRows] = useState<CameraRow[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm())

  useEffect(() => {
    setRows(loadCameras())
  }, [])

  useEffect(() => {
    if (rows.length > 0) saveCameras(rows)
  }, [rows])

  const openAddForm = () => {
    setForm(emptyForm())
    setOpen(true)
  }

  const onSave = () => {
    if (!form.location.trim()) return
    const id = `CAM-${Date.now().toString(36).toUpperCase().slice(-6)}`
    setRows((prev) => [{ id, ...form }, ...prev])
    setForm(emptyForm())
    setOpen(false)
  }

  const activeCount = rows.filter((r) => r.active).length
  const recordingCount = rows.filter((r) => r.recording).length

  return (
    <ModulePageLayout
      title="Camera Integration"
      description="Connect and manage CCTV cameras for warehouse surveillance and audit trails."
      breadcrumbs={[{ label: "WMS" }, { label: "Camera Integration" }]}
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Cameras
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rows.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all sites</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Online
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Active / {rows.length} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recording
              </CardTitle>
              <Wifi className="h-4 w-4 text-[#3b82f6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recordingCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Active recording</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Integration
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NVR</div>
              <p className="text-xs text-muted-foreground mt-1">Primary system</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Camera List</CardTitle>
              <CardDescription>Manage camera feeds and link to warehouse locations</CardDescription>
            </div>
            <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" onClick={openAddForm}>
              Add Camera
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Camera ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Status (Active/Inactive)</TableHead>
                  <TableHead>Recording</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.wh}</TableCell>
                    <TableCell>{row.zone}</TableCell>
                    <TableCell>
                      <Badge variant={row.active ? "default" : "secondary"}>
                        {row.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={row.recording} disabled />
                        <span className="text-sm text-muted-foreground">
                          {row.recording ? "On" : "Off"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#3b82f6]">
                        View Feed
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setForm(emptyForm()) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Camera</DialogTitle>
            <p className="text-sm text-muted-foreground">Camera ID will be auto-generated.</p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Main Gate"
              />
            </div>
            <div className="space-y-2">
              <Label>Warehouse</Label>
              <Select value={form.wh} onValueChange={(v) => setForm((p) => ({ ...p, wh: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WH-001">WH-001</SelectItem>
                  <SelectItem value="WH-002">WH-002</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Zone</Label>
              <Input
                value={form.zone}
                onChange={(e) => setForm((p) => ({ ...p, zone: e.target.value }))}
                placeholder="e.g. Z-A01"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.active}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))}
                />
                <Label>Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.recording}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, recording: v }))}
                />
                <Label>Recording</Label>
              </div>
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
