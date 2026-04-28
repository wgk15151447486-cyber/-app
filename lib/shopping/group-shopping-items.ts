import type { ShoppingItem } from "@/types/shopping";
import { SHOPPING_CATEGORIES } from "@/types/shopping";

export type GroupedShoppingItems = Record<string, ShoppingItem[]>;

/**
 * Group shopping items by category, in the order defined by SHOPPING_CATEGORIES.
 * Categories with no items are omitted from the result.
 */
export function groupShoppingItems(items: ShoppingItem[]): GroupedShoppingItems {
  const groups: GroupedShoppingItems = {};

  for (const item of items) {
    const cat = item.category;
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(item);
  }

  // Preserve category display order
  const ordered: GroupedShoppingItems = {};
  for (const cat of SHOPPING_CATEGORIES) {
    if (groups[cat] && groups[cat].length > 0) {
      ordered[cat] = groups[cat];
    }
  }

  // Include any categories not in the predefined list (shouldn't happen, but safe)
  for (const cat of Object.keys(groups)) {
    if (!ordered[cat]) {
      ordered[cat] = groups[cat];
    }
  }

  return ordered;
}
