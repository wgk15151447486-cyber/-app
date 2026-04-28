import { getShoppingItemsForVariant } from "@/lib/shopping/get-shopping-items-for-variant";
import { groupShoppingItems } from "@/lib/shopping/group-shopping-items";
import type { ShoppingItem } from "@/types/shopping";
import type { GroupedShoppingItems } from "@/lib/shopping/group-shopping-items";

export interface BudgetTotals {
  itemCount: number;
  priceMinTotal: number;
  priceMaxTotal: number;
}

export interface ShoppingListData {
  items: ShoppingItem[];
  grouped: GroupedShoppingItems;
  totals: BudgetTotals;
}

export async function getShoppingList(
  variantId: string
): Promise<ShoppingListData> {
  const items = await getShoppingItemsForVariant(variantId);

  const grouped = groupShoppingItems(items);

  const totals: BudgetTotals = {
    itemCount: items.length,
    priceMinTotal: items.reduce(
      (sum, item) => sum + (item.price_min ?? 0),
      0
    ),
    priceMaxTotal: items.reduce(
      (sum, item) => sum + (item.price_max ?? 0),
      0
    ),
  };

  return { items, grouped, totals };
}
