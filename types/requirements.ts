export interface DesignRequirements {
  id: string;
  project_id: string;
  user_id: string;
  preferred_styles: string[];
  target_goals: string[];
  constraints: string[];
  keep_items: string[];
  avoid_items: string[];
  free_text: string | null;
  allow_wall_paint: boolean;
  allow_drilling: boolean;
  allow_floor_change: boolean;
  pet_friendly: boolean;
  child_friendly: boolean;
  easy_to_clean: boolean;
  created_at: string;
  updated_at: string;
}

export interface DesignRequirementsInsert {
  project_id: string;
  user_id: string;
  preferred_styles?: string[];
  target_goals?: string[];
  constraints?: string[];
  keep_items?: string[];
  avoid_items?: string[];
  free_text?: string | null;
  allow_wall_paint?: boolean;
  allow_drilling?: boolean;
  allow_floor_change?: boolean;
  pet_friendly?: boolean;
  child_friendly?: boolean;
  easy_to_clean?: boolean;
}

// ---- Predefined options ----

export const STYLE_OPTIONS = [
  { value: "cream", label: "Cream" },
  { value: "nordic", label: "Nordic" },
  { value: "japanese", label: "Japanese" },
  { value: "wabi_sabi", label: "Wabi Sabi" },
  { value: "vintage", label: "Vintage" },
  { value: "luxury", label: "Luxury" },
  { value: "hotel", label: "Hotel" },
  { value: "airbnb_photo_friendly", label: "Airbnb Photo Friendly" },
  { value: "ai_recommend", label: "AI Recommend" },
] as const;

export const GOAL_OPTIONS = [
  { value: "cozy", label: "Cozy" },
  { value: "premium", label: "Premium" },
  { value: "photo_friendly", label: "Photo Friendly" },
  { value: "rental_friendly", label: "Rental Friendly" },
  { value: "easy_to_clean", label: "Easy to Clean" },
  { value: "low_cost", label: "Low Cost" },
  { value: "couple_friendly", label: "Couple Friendly" },
  { value: "business_travel_friendly", label: "Business Travel Friendly" },
] as const;

export const CONSTRAINT_OPTIONS = [
  { value: "no_wall_paint", label: "No Wall Paint" },
  { value: "no_floor_change", label: "No Floor Change" },
  { value: "no_drilling", label: "No Drilling" },
  { value: "keep_bed", label: "Keep Bed" },
  { value: "keep_sofa", label: "Keep Sofa" },
  { value: "keep_desk", label: "Keep Desk" },
  { value: "pet_friendly", label: "Pet Friendly" },
  { value: "child_friendly", label: "Child Friendly" },
] as const;

export const PERMISSION_TOGGLES = [
  { key: "allow_wall_paint", label: "Allow wall painting" },
  { key: "allow_drilling", label: "Allow drilling / mounting" },
  { key: "allow_floor_change", label: "Allow floor changes" },
  { key: "pet_friendly", label: "Pet friendly" },
  { key: "child_friendly", label: "Child friendly" },
  { key: "easy_to_clean", label: "Easy to clean" },
] as const;
