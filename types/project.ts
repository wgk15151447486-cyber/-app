export const ROOM_TYPES = [
  "bedroom",
  "living_room",
  "studio",
  "entire_home",
  "hotel_room",
  "other",
] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const PURPOSES = [
  "personal_use",
  "long_term_rental",
  "short_term_rental",
  "hotel_operation",
] as const;

export type Purpose = (typeof PURPOSES)[number];

export const BUDGET_TYPES = ["low", "medium", "high", "custom"] as const;

export type BudgetType = (typeof BUDGET_TYPES)[number];

export const PROJECT_STATUSES = [
  "draft",
  "in_progress",
  "completed",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface Project {
  id: string;
  user_id: string;
  title: string;
  room_type: RoomType;
  purpose: Purpose;
  budget_type: BudgetType;
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  location_country: string | null;
  location_city: string | null;
  status: ProjectStatus;
  is_paid: boolean;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  user_id: string;
  title: string;
  room_type: RoomType;
  purpose: Purpose;
  budget_type: BudgetType;
  budget_min?: number | null;
  budget_max?: number | null;
  currency?: string;
  location_country?: string | null;
  location_city?: string | null;
  status?: ProjectStatus;
}

export interface ProjectUpdate {
  title?: string;
  room_type?: RoomType;
  purpose?: Purpose;
  budget_type?: BudgetType;
  budget_min?: number | null;
  budget_max?: number | null;
  currency?: string;
  location_country?: string | null;
  location_city?: string | null;
  status?: ProjectStatus;
  is_paid?: boolean;
  paid_at?: string | null;
}
