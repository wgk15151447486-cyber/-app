export const EDIT_REQUEST_STATUSES = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const;

export type EditRequestStatus = (typeof EDIT_REQUEST_STATUSES)[number];

export interface EditRequest {
  id: string;
  project_id: string;
  design_variant_id: string;
  user_id: string;
  instruction: string;
  before_image_url: string | null;
  after_image_url: string | null;
  after_image_storage_path: string | null;
  updated_design_summary: string | null;
  image_edit_instruction: string | null;
  prompt_used: string | null;
  ai_model: string | null;
  status: EditRequestStatus;
  created_at: string;
  completed_at: string | null;
}

export interface EditRequestInsert {
  project_id: string;
  design_variant_id: string;
  user_id: string;
  instruction: string;
  before_image_url?: string | null;
  after_image_url?: string | null;
  after_image_storage_path?: string | null;
  updated_design_summary?: string | null;
  image_edit_instruction?: string | null;
  prompt_used?: string | null;
  ai_model?: string | null;
  status?: EditRequestStatus;
}
