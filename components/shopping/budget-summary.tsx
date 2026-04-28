import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BudgetTotals } from "@/lib/shopping/get-shopping-list";

interface Props {
  totals: BudgetTotals;
}

export function BudgetSummary({ totals }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold tabular-nums">{totals.itemCount}</p>
            <p className="text-xs text-muted-foreground">
              item{totals.itemCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold tabular-nums">
              ${totals.priceMinTotal.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">price min total</p>
          </div>
          <div>
            <p className="text-2xl font-bold tabular-nums">
              ${totals.priceMaxTotal.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">price max total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
