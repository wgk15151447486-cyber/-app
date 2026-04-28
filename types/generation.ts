export const JOB_TYPES = [
  "room_analysis",
  "design_variant",
  "shopping_list",
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const JOB_STATUSES = [
  "queued",
  "processing",
  "completed",
  "failed",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface GenerationJob {
  id: string;
  project_id: string;
  user_id: string;
  job_type: JobType;
  status: JobStatus;
  progress: number;
  input_payload: Record<string, unknown>;
  output_payload: Record<string, unknown> | null;
  error_message: string | null;
  ai_model: string | null;
  cost_estimate: number | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface GenerationJobInsert {
  project_id: string;
  user_id: string;
  job_type: JobType;
  status?: JobStatus;
  progress?: number;
  input_payload?: Record<string, unknown>;
  ai_model?: string | null;
  cost_estimate?: number | null;
}

export interface GenerationJobUpdate {
  status?: JobStatus;
  progress?: number;
  output_payload?: Record<string, unknown>;
  error_message?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
}
