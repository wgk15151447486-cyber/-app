export const SHOPPING_CATEGORIES = [
  "furniture",
  "lighting",
  "decor",
  "bedding",
  "curtains",
  "rugs",
  "wall_art",
  "plants",
  "storage",
  "other",
] as const;

export type ShoppingCategory = (typeof SHOPPING_CATEGORIES)[number];

export const SHOPPING_PRIORITIES = [
  "essential",
  "recommended",
  "optional",
] as const;

export type ShoppingPriority = (typeof SHOPPING_PRIORITIES)[number];

export interface ShoppingItem {
  id: string;
  design_variant_id: string;
  project_id: string;
  user_id: string;
  category: ShoppingCategory;
  name: string;
  description: string | null;
  reason: string | null;
  recommended_size: string | null;
  recommended_color: string | null;
  material: string | null;
  quantity: number;
  price_min: number | null;
  price_max: number | null;
  currency: string;
  priority: ShoppingPriority;
  product_url: string | null;
  supplier_name: string | null;
  affiliate_code: string | null;
  image_url: string | null;
  is_locked: boolean;
  created_at: string;
}

export interface ShoppingItemInsert {
  design_variant_id: string;
  project_id: string;
  user_id: string;
  category: ShoppingCategory;
  name: string;
  description?: string | null;
  reason?: string | null;
  recommended_size?: string | null;
  recommended_color?: string | null;
  material?: string | null;
  quantity?: number;
  price_min?: number | null;
  price_max?: number | null;
  currency?: string;
  priority?: ShoppingPriority;
  product_url?: string | null;
  supplier_name?: string | null;
  affiliate_code?: string | null;
  image_url?: string | null;
  is_locked?: boolean;
}

export interface ShoppingItemUpdate {
  category?: ShoppingCategory;
  name?: string;
  description?: string | null;
  reason?: string | null;
  recommended_size?: string | null;
  recommended_color?: string | null;
  material?: string | null;
  quantity?: number;
  price_min?: number | null;
  price_max?: number | null;
  currency?: string;
  priority?: ShoppingPriority;
  product_url?: string | null;
  supplier_name?: string | null;
  affiliate_code?: string | null;
  image_url?: string | null;
  is_locked?: boolean;
}
