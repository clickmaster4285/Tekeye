"use client"

import { Clock, LogIn, UserCheck, Calendar } from "lucide-react"
import { ModulePageLayout } from "@/components/dashboard/module-page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AttendancePage() {
  return (
    <ModulePageLayout
      title="Attendance"
      description="Track check-in/check-out and daily attendance records."
      breadcrumbs={[{ label: "HR" }, { label: "Attendance" }]}
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Present Today
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">240</div>
              <p className="text-xs text-muted-foreground mt-1">Checked in</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Absent
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">On leave / absent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Late Today
              </CardTitle>
              <LogIn className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">After 09:15</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground mt-1">Working days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Attendance</CardTitle>
              <CardDescription>Check-in and check-out log for current day</CardDescription>
            </div>
            <div className="flex gap-2">
              <Input type="date" className="w-40" defaultValue="2024-02-04" />
              <Button variant="outline">Export</Button>
              <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">
                Mark Attendance
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "EMP-001", name: "Sarah Martin", dept: "Operations", in: "08:45", out: "—", status: "Present" },
                  { id: "EMP-002", name: "Ahmed Khan", dept: "IT", in: "09:00", out: "—", status: "Present" },
                  { id: "EMP-003", name: "Fatima Ali", dept: "HR", in: "08:52", out: "—", status: "Present" },
                  { id: "EMP-004", name: "Hassan Raza", dept: "Warehouse", in: "09:18", out: "—", status: "Late" },
                  { id: "EMP-005", name: "Zainab Hussain", dept: "Finance", in: "—", out: "—", status: "On Leave" },
                ].map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono">{row.id}</TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.dept}</TableCell>
                    <TableCell>{row.in}</TableCell>
                    <TableCell>{row.out}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.status === "Present"
                            ? "default"
                            : row.status === "Late"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ModulePageLayout>
  )
}
