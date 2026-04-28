import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LockKeyhole } from "lucide-react";
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
  items: ShoppingItem[];
  isPaid: boolean;
}

export function ShoppingListPreview({ items, isPaid }: Props) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shopping List Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No shopping items yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Shopping List Preview</CardTitle>
          <span className="text-sm text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {!isPaid && (
          <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <LockKeyhole className="size-4 shrink-0" />
            Complete payment to unlock full pricing and purchase links.
          </div>
        )}

        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
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
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.category}</span>
                  {item.recommended_size && (
                    <>
                      <span>·</span>
                      <span>{item.recommended_size}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>Qty: {item.quantity}</span>
                </div>
                {item.reason && isPaid && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.reason}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-right">
                {isPaid ? (
                  <>
                    {item.price_min != null && item.price_max != null ? (
                      <p className="text-sm font-semibold">
                        ${item.price_min} – ${item.price_max}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">—</p>
                    )}
                    {item.product_url && (
                      <a
                        href={item.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View product
                      </a>
                    )}
                  </>
                ) : (
                  <LockKeyhole className="size-3.5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t pt-3">
          <button
            disabled
            className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
          >
            View Full Shopping List
          </button>
          <span className="text-xs text-muted-foreground">
            Coming in Task 10
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
