import type {
  AiRoomAnalysisOutput,
  AiDesignVariantsOutput,
} from "@/types/ai";
import { SHOPPING_CATEGORIES } from "@/types/shopping";
import { VARIANT_TYPES } from "@/types/design";

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
      if (typeof item.category !== "string" || !validCategories.has(item.category)) {
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
