import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import type { ShoppingItem } from "@/types/shopping";

export async function getShoppingItemsForVariant(
  variantId: string
): Promise<ShoppingItem[]> {
  const user = await requireUser();

  // Verify variant ownership first
  await getDesignVariant(variantId);

  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("shopping_items")
    .select("*")
    .eq("design_variant_id", variantId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (items ?? []) as ShoppingItem[];
}
