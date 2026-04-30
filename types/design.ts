export const VARIANT_TYPES = [
  "low_budget_refresh",
  "photo_friendly_airbnb",
  "cozy_premium",
  "durable_easy_clean",
] as const;

export type VariantType = (typeof VARIANT_TYPES)[number];

export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"] as const;

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

export const GENERATION_STATUSES = [
  "pending",
  "processing",
  "completed",
  "failed",
] as const;

export type GenerationStatus = (typeof GENERATION_STATUSES)[number];

export interface DesignVariant {
  id: string;
  project_id: string;
  user_id: string;
  variant_type: VariantType;
  title: string;
  subtitle: string | null;
  design_summary: string | null;
  why_it_works: string | null;
  style_tags: string[];
  estimated_budget_min: number | null;
  estimated_budget_max: number | null;
  currency: string;
  difficulty_level: DifficultyLevel;
  maintenance_level: string | null;
  best_for: string[];
  image_url: string | null;
  image_storage_path: string | null;
  prompt_used: string | null;
  ai_model: string | null;
  generation_status: GenerationStatus;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

export interface DesignVariantInsert {
  project_id: string;
  user_id: string;
  variant_type: VariantType;
  title: string;
  subtitle?: string | null;
  design_summary?: string | null;
  why_it_works?: string | null;
  style_tags?: string[];
  estimated_budget_min?: number | null;
  estimated_budget_max?: number | null;
  currency?: string;
  difficulty_level?: DifficultyLevel;
  maintenance_level?: string | null;
  best_for?: string[];
  image_url?: string | null;
  image_storage_path?: string | null;
  prompt_used?: string | null;
  ai_model?: string | null;
  generation_status?: GenerationStatus;
  is_locked?: boolean;
}

export interface DesignVariantUpdate {
  variant_type?: VariantType;
  title?: string;
  subtitle?: string | null;
  design_summary?: string | null;
  why_it_works?: string | null;
  style_tags?: string[];
  estimated_budget_min?: number | null;
  estimated_budget_max?: number | null;
  currency?: string;
  difficulty_level?: DifficultyLevel;
  maintenance_level?: string | null;
  best_for?: string[];
  image_url?: string | null;
  image_storage_path?: string | null;
  generation_status?: GenerationStatus;
  is_locked?: boolean;
}
