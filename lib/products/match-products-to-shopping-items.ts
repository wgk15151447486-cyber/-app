import { createClient } from "@/lib/supabase/server";
import type { ShoppingItem } from "@/types/shopping";
import type { Project } from "@/types/project";
import type { DesignRequirements } from "@/types/requirements";
import type { Product } from "@/types/product";

interface ScoredProduct extends Product {
  score: number;
}

/**
 * Match a shopping item to catalog products using a simple scoring algorithm.
 * Matches by category (exact), style tags (overlap), room type, purpose, and currency.
 * Returns up to 5 results sorted by relevance score descending.
 */
export async function matchProductsToShoppingItem(
  shoppingItem: ShoppingItem,
  project: Project,
  requirements?: DesignRequirements | null
): Promise<ScoredProduct[]> {
  const supabase = await createClient();

  // Fetch active products in the same category
  const { data: products, error } = await supabase
    .from("product_catalog")
    .select("*")
    .eq("category", shoppingItem.category)
    .eq("is_active", true)
    .eq("currency", shoppingItem.currency);

  if (error || !products || products.length === 0) {
    return [];
  }

  const scored: ScoredProduct[] = products.map((product: Product) => {
    let score = 0;

    // Category match (already filtered, but give base score)
    if (product.category === shoppingItem.category) {
      score += 3;
    }

    // Style tag overlap with requirements preferred_styles
    if (requirements && requirements.preferred_styles.length > 0) {
      const styleOverlap = product.style_tags.filter((tag) =>
        requirements.preferred_styles.includes(tag)
      ).length;
      score += styleOverlap;
    }

    // Room type match
    if (product.suitable_room_types.includes(project.room_type)) {
      score += 2;
    }

    // Purpose match
    if (product.suitable_purposes.includes(project.purpose)) {
      score += 2;
    }

    return { ...product, score };
  });

  // Sort by score descending, take top 5
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 5);
}
