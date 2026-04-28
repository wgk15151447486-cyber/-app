import { Badge } from "@/components/ui/badge";
import type { ShoppingItem } from "@/types/shopping";

const priorityLabels: Record<string, string> = {
  essential: "Essential",
  recommended: "Recommended",
  optional: "Optional",
};

const priorityVariants: Record<string, string> = {
  essential: "default",
  recommended: "secondary",
  optional: "outline",
} as const;

interface Props {
  item: ShoppingItem;
  isPaid: boolean;
}

export function ShoppingItemCard({ item, isPaid }: Props) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border bg-card p-4">
      <div className="min-w-0 flex-1 space-y-1.5">
        {/* Name + priority */}
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{item.name}</p>
          <Badge
            variant={
              (priorityVariants[item.priority] as "default") ?? "default"
            }
            className="shrink-0 text-[10px]"
          >
            {priorityLabels[item.priority] ?? item.priority}
          </Badge>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}

        {/* Meta row: size, color, material */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {item.recommended_size && (
            <span>Size: {item.recommended_size}</span>
          )}
          {item.recommended_color && (
            <span>Color: {item.recommended_color}</span>
          )}
          {isPaid && item.material && <span>Material: {item.material}</span>}
        </div>

        {/* Reason — paid only */}
        {isPaid && item.reason && (
          <p className="text-xs text-muted-foreground italic">
            {item.reason}
          </p>
        )}

        {/* Product link — paid only */}
        {isPaid && item.product_url && (
          <a
            href={item.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View product
          </a>
        )}

        {/* Supplier — paid only */}
        {isPaid && item.supplier_name && (
          <p className="text-xs text-muted-foreground">
            Supplier: {item.supplier_name}
          </p>
        )}
      </div>

      {/* Price + quantity */}
      <div className="shrink-0 text-right">
        {item.price_min != null && item.price_max != null ? (
          <p className="text-sm font-semibold tabular-nums">
            ${item.price_min} – ${item.price_max}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">—</p>
        )}
        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
      </div>
    </div>
  );
}
