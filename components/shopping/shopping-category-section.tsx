import { Badge } from "@/components/ui/badge";
import { ShoppingItemCard } from "@/components/shopping/shopping-item-card";
import type { ShoppingItem } from "@/types/shopping";

const categoryLabels: Record<string, string> = {
  furniture: "Furniture",
  lighting: "Lighting",
  decor: "Decor",
  bedding: "Bedding",
  curtains: "Curtains",
  rugs: "Rugs",
  wall_art: "Wall Art",
  plants: "Plants",
  storage: "Storage",
  other: "Other",
};

interface Props {
  category: string;
  items: ShoppingItem[];
  isPaid: boolean;
}

export function ShoppingCategorySection({ category, items, isPaid }: Props) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {categoryLabels[category] ?? category}
        </h2>
        <Badge variant="secondary" className="text-[10px]">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <ShoppingItemCard key={item.id} item={item} isPaid={isPaid} />
        ))}
      </div>
    </section>
  );
}
