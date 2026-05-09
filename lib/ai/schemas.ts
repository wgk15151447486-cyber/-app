import type {
  AiRoomAnalysisOutput,
  AiDesignVariantsOutput,
} from "@/types/ai";
import { SHOPPING_CATEGORIES, type ShoppingCategory } from "@/types/shopping";
import { VARIANT_TYPES } from "@/types/design";

const CATEGORY_ALIASES: Record<string, ShoppingCategory> = {
  // Singular → plural forms
  rug: "rugs",
  carpet: "rugs",
  mat: "rugs",
  curtain: "curtains",
  drape: "curtains",
  drapes: "curtains",
  blinds: "curtains",
  window_treatment: "curtains",
  // Art variations
  art: "wall_art",
  artwork: "wall_art",
  painting: "wall_art",
  poster: "wall_art",
  print: "wall_art",
  // Furniture variations
  small_furniture: "furniture",
  furnishing: "furniture",
  sofa: "furniture",
  couch: "furniture",
  chair: "furniture",
  table: "furniture",
  desk: "furniture",
  bed: "furniture",
  nightstand: "furniture",
  dresser: "furniture",
  ottoman: "furniture",
  bench: "furniture",
  bookshelf: "furniture",
  headboard: "furniture",
  // Lighting variations
  lamp: "lighting",
  light: "lighting",
  ceiling_light: "lighting",
  floor_lamp: "lighting",
  // Plant variations
  plant: "plants",
  greenery: "plants",
  greens: "plants",
  tree: "plants",
  // Storage variations
  shelf: "storage",
  cabinet: "storage",
  organizer: "storage",
  bin: "storage",
  basket: "storage",
  rack: "storage",
  // Bedding variations
  pillow: "bedding",
  blanket: "bedding",
  sheets: "bedding",
  duvet: "bedding",
  comforter: "bedding",
  throw: "bedding",
  mattress: "bedding",
  // Decor variations
  accessory: "decor",
  accessories: "decor",
  candle: "decor",
  vase: "decor",
  mirror: "decor",
  clock: "decor",
  tray: "decor",
  basket_decor: "decor",
  // Other / misc
  misc: "other",
  miscellaneous: "other",
};

export function normalizeShoppingCategory(input: string): ShoppingCategory {
  const normalized = input.trim().toLowerCase();
  // Direct match
  if (SHOPPING_CATEGORIES.includes(normalized as ShoppingCategory)) {
    return normalized as ShoppingCategory;
  }
  // Alias lookup
  if (CATEGORY_ALIASES[normalized]) {
    return CATEGORY_ALIASES[normalized];
  }
  // Substring match (e.g. "wall_art_decor" → "wall_art")
  for (const cat of SHOPPING_CATEGORIES) {
    if (normalized.includes(cat)) {
      return cat;
    }
  }
  // Fallback
  return "decor";
}

export interface AiEditResponse {
  updated_design_summary: string;
  image_edit_instruction: string;
}

export function validateRoomAnalysis(
  data: unknown
): AiRoomAnalysisOutput {
  const d = data as Record<string, unknown>;

  if (typeof d.room_summary !== "string") {
    throw new Error("Missing or invalid room_summary");
  }
  if (typeof d.detected_room_type !== "string") {
    throw new Error("Missing or invalid detected_room_type");
  }
  if (!Array.isArray(d.detected_existing_items)) {
    throw new Error("Missing or invalid detected_existing_items");
  }
  for (const item of d.detected_existing_items) {
    if (typeof item.name !== "string" || typeof item.category !== "string") {
      throw new Error("Invalid detected_existing_items entry");
    }
  }
  if (!Array.isArray(d.detected_problems)) {
    throw new Error("Missing or invalid detected_problems");
  }
  for (const p of d.detected_problems) {
    if (typeof p.issue !== "string" || typeof p.description !== "string") {
      throw new Error("Invalid detected_problems entry");
    }
  }
  if (typeof d.lighting_analysis !== "string") {
    throw new Error("Missing or invalid lighting_analysis");
  }
  if (typeof d.color_analysis !== "string") {
    throw new Error("Missing or invalid color_analysis");
  }
  if (typeof d.layout_analysis !== "string") {
    throw new Error("Missing or invalid layout_analysis");
  }
  if (!Array.isArray(d.improvement_opportunities)) {
    throw new Error("Missing or invalid improvement_opportunities");
  }

  return d as unknown as AiRoomAnalysisOutput;
}

const validCategories = new Set<string>(SHOPPING_CATEGORIES);
const validVariantTypes = new Set<string>(VARIANT_TYPES);
const validPriorities = new Set(["essential", "recommended", "optional"]);
const validDifficulties = new Set(["easy", "medium", "hard"]);

export function validateDesignVariants(
  data: unknown
): AiDesignVariantsOutput {
  const d = data as Record<string, unknown>;

  if (!Array.isArray(d.variants)) {
    throw new Error("Missing or invalid variants array");
  }

  if (d.variants.length !== 4) {
    throw new Error(
      `Expected exactly 4 variants, got ${d.variants.length}`
    );
  }

  for (const v of d.variants) {
    if (typeof v.variant_type !== "string" || !validVariantTypes.has(v.variant_type)) {
      throw new Error(`Invalid variant_type: ${v.variant_type}`);
    }
    if (typeof v.title !== "string" || !v.title.trim()) {
      throw new Error("Missing variant title");
    }
    if (typeof v.design_summary !== "string" || !v.design_summary.trim()) {
      throw new Error("Missing variant design_summary");
    }
    if (typeof v.estimated_budget_min !== "number") {
      throw new Error("Missing variant estimated_budget_min");
    }
    if (typeof v.estimated_budget_max !== "number") {
      throw new Error("Missing variant estimated_budget_max");
    }
    if (typeof v.currency !== "string") {
      throw new Error("Missing variant currency");
    }
    if (typeof v.difficulty_level !== "string" || !validDifficulties.has(v.difficulty_level)) {
      throw new Error(`Invalid difficulty_level: ${v.difficulty_level}`);
    }
    if (!Array.isArray(v.style_tags)) {
      throw new Error("Missing variant style_tags");
    }
    if (!Array.isArray(v.best_for)) {
      throw new Error("Missing variant best_for");
    }
    if (!Array.isArray(v.shopping_items) || v.shopping_items.length === 0) {
      throw new Error("Missing variant shopping_items");
    }

    for (const item of v.shopping_items) {
      if (typeof item.category !== "string") {
        throw new Error("Missing shopping item category");
      }
      item.category = normalizeShoppingCategory(item.category);
      if (!validCategories.has(item.category)) {
        throw new Error(`Invalid shopping item category: ${item.category}`);
      }
      if (typeof item.name !== "string" || !item.name.trim()) {
        throw new Error("Missing shopping item name");
      }
      if (typeof item.priority !== "string" || !validPriorities.has(item.priority)) {
        throw new Error(`Invalid shopping item priority: ${item.priority}`);
      }
      if (typeof item.quantity !== "number" || item.quantity < 1) {
        throw new Error("Invalid shopping item quantity");
      }
      if (typeof item.price_min !== "number") {
        throw new Error("Missing shopping item price_min");
      }
      if (typeof item.price_max !== "number") {
        throw new Error("Missing shopping item price_max");
      }
    }
  }

  return d as unknown as AiDesignVariantsOutput;
}

export function validateEditResponse(
  data: unknown
): AiEditResponse {
  const d = data as Record<string, unknown>;

  if (typeof d.updated_design_summary !== "string" || !d.updated_design_summary.trim()) {
    throw new Error("Missing or invalid updated_design_summary in edit response");
  }

  if (typeof d.image_edit_instruction !== "string" || !d.image_edit_instruction.trim()) {
    throw new Error("Missing or invalid image_edit_instruction in edit response");
  }

  return d as unknown as AiEditResponse;
}
