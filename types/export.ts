export const EXPORT_TYPES = ["project_pdf"] as const;

export type ExportType = (typeof EXPORT_TYPES)[number];

export const EXPORT_STATUSES = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const;

export type ExportStatus = (typeof EXPORT_STATUSES)[number];

export interface Export {
  id: string;
  project_id: string;
  user_id: string;
  export_type: ExportType;
  file_url: string | null;
  storage_path: string | null;
  status: ExportStatus;
  created_at: string;
  completed_at: string | null;
}

export interface ExportInsert {
  project_id: string;
  user_id: string;
  export_type?: ExportType;
  file_url?: string | null;
  storage_path?: string | null;
  status?: ExportStatus;
}
