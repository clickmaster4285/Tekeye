const VISITOR_STORAGE_KEY = "vms_visitors_local";

export type VisitorRecord = {
  id: number;
  full_name: string;
  visitor_type: string;
  department_to_visit: string;
  cnic_number: string;
  passport_number: string;
  created_at: string;
};

function readVisitors(): VisitorRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as VisitorRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeVisitors(rows: VisitorRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(rows));
}

export async function fetchVisitors(): Promise<VisitorRecord[]> {
  return readVisitors();
}

export async function createVisitor(payload: Record<string, unknown>) {
  const rows = readVisitors();
  const nextId =
    rows.length === 0 ? 1 : Math.max(...rows.map((r) => r.id)) + 1;

  const fullName = String(payload.full_name ?? payload.fullName ?? "Unknown Visitor");
  const visitorType = String(payload.visitor_type ?? payload.registration_type ?? "individual");
  const department = String(payload.department_to_visit ?? payload.department ?? "admin");
  const cnic = String(payload.cnic_number ?? payload.cnic_passport ?? "");
  const passport = String(payload.passport_number ?? "");

  const newRow: VisitorRecord = {
    id: nextId,
    full_name: fullName,
    visitor_type: visitorType,
    department_to_visit: department,
    cnic_number: cnic,
    passport_number: passport,
    created_at: new Date().toISOString(),
  };

  writeVisitors([newRow, ...rows]);
  return newRow;
}
