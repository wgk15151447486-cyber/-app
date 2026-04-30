export const PRODUCT_CATEGORIES = [
  "bedding",
  "curtains",
  "rugs",
  "lighting",
  "wall_art",
  "plants",
  "storage",
  "small_furniture",
  "decor",
  "other",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description: string | null;
  style_tags: string[];
  suitable_room_types: string[];
  suitable_purposes: string[];
  color: string | null;
  material: string | null;
  size_text: string | null;
  price: number | null;
  currency: string;
  supplier_name: string | null;
  product_url: string;
  affiliate_code: string | null;
  image_url: string | null;
  country: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductInsert {
  category: ProductCategory;
  name: string;
  description?: string | null;
  style_tags?: string[];
  suitable_room_types?: string[];
  suitable_purposes?: string[];
  color?: string | null;
  material?: string | null;
  size_text?: string | null;
  price?: number | null;
  currency?: string;
  supplier_name?: string | null;
  product_url: string;
  affiliate_code?: string | null;
  image_url?: string | null;
  country?: string | null;
  is_active?: boolean;
}

export interface ProductUpdate {
  category?: ProductCategory;
  name?: string;
  description?: string | null;
  style_tags?: string[];
  suitable_room_types?: string[];
  suitable_purposes?: string[];
  color?: string | null;
  material?: string | null;
  size_text?: string | null;
  price?: number | null;
  currency?: string;
  supplier_name?: string | null;
  product_url?: string;
  affiliate_code?: string | null;
  image_url?: string | null;
  country?: string | null;
  is_active?: boolean;
}
