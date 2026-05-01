import { createClient } from "@/lib/supabase/server";
import { matchProductsToShoppingItem } from "@/lib/products/match-products-to-shopping-items";
import type { ShoppingItem } from "@/types/shopping";
import type { Project } from "@/types/project";
import type { DesignRequirements } from "@/types/requirements";

/**
 * Enriches shopping items with product catalog matches for items
 * that don't already have a product_url set.
 * Returns ShoppingItem[] with product_url and supplier_name populated.
 */
export async function matchShoppingItems(
  items: ShoppingItem[],
  project: Project,
  requirements?: DesignRequirements | null
): Promise<ShoppingItem[]> {
  const enriched: ShoppingItem[] = [];

  for (const item of items) {
    // Skip items that already have a product URL
    if (item.product_url) {
      enriched.push(item);
      continue;
    }

    try {
      const matches = await matchProductsToShoppingItem(
        item,
        project,
        requirements
      );

      if (matches.length > 0) {
        const best = matches[0];

        // Persist the match in the database for future use
        const supabase = await createClient();
        await supabase
          .from("shopping_items")
          .update({
            product_url: best.product_url,
            supplier_name: best.supplier_name,
          })
          .eq("id", item.id);

        enriched.push({
          ...item,
          product_url: best.product_url,
          supplier_name: best.supplier_name,
        });
        continue;
      }
    } catch {
      // Matching is best-effort, silently fall through
    }

    enriched.push(item);
  }

  return enriched;
}
