import { ShoppingCategorySection } from "@/components/shopping/shopping-category-section";
import { BudgetSummary } from "@/components/shopping/budget-summary";
import { LockedShoppingOverlay } from "@/components/shopping/locked-shopping-overlay";
import type { GroupedShoppingItems } from "@/lib/shopping/group-shopping-items";
import type { BudgetTotals } from "@/lib/shopping/get-shopping-list";

interface Props {
  grouped: GroupedShoppingItems;
  totals: BudgetTotals;
  isPaid: boolean;
  projectId: string;
}

export function ShoppingList({ grouped, totals, isPaid, projectId }: Props) {
  const categories = Object.keys(grouped);

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <p className="text-muted-foreground">No shopping items yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!isPaid && <LockedShoppingOverlay projectId={projectId} />}

      {categories.map((category) => (
        <ShoppingCategorySection
          key={category}
          category={category}
          items={grouped[category]}
          isPaid={isPaid}
        />
      ))}

      <BudgetSummary totals={totals} />
    </div>
  );
}
