import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DesignVariant } from "@/types/design";

const difficultyLabels: Record<string, string> = {
  easy: "Easy — suitable for beginners",
  medium: "Medium — some DIY experience helpful",
  hard: "Hard — professional installation recommended",
};

interface Props {
  variant: DesignVariant;
}

export function VariantInfoCards({ variant }: Props) {
  return (
    <div className="space-y-6">
      {/* Design Summary */}
      {variant.design_summary && (
        <Card>
          <CardHeader>
            <CardTitle>Design Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {variant.design_summary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Why It Works */}
      {variant.why_it_works && (
        <Card>
          <CardHeader>
            <CardTitle>Why This Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {variant.why_it_works}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Best For */}
      {variant.best_for.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Best For</CardTitle>
            <CardDescription>
              This variant is ideal for the following use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {variant.best_for.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Budget & Difficulty */}
      <Card>
        <CardHeader>
          <CardTitle>Budget &amp; Difficulty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Estimated Budget
              </p>
              <p className="mt-1 text-lg font-semibold">
                {variant.estimated_budget_min != null &&
                variant.estimated_budget_max != null
                  ? `$${variant.estimated_budget_min.toLocaleString()} – $${variant.estimated_budget_max.toLocaleString()}`
                  : "Not specified"}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  {variant.currency}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Difficulty
              </p>
              <p className="mt-1 font-medium">
                {difficultyLabels[variant.difficulty_level] ??
                  variant.difficulty_level}
              </p>
            </div>
          </div>
          {variant.maintenance_level && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Maintenance
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {variant.maintenance_level}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
