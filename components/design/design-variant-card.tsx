/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DesignVariantWithItemCount } from "@/lib/design/get-design-variants";

const variantTypeLabels: Record<string, string> = {
  ai_recommended: "AI Recommended",
  alternative_a: "Alternative A",
  alternative_b: "Alternative B",
};

const difficultyLabels: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

interface Props {
  variant: DesignVariantWithItemCount;
}

export function DesignVariantCard({ variant }: Props) {
  const isRecommended = variant.variant_type === "ai_recommended";

  return (
    <Card
      className={`overflow-hidden transition-shadow hover:shadow-lg ${
        isRecommended ? "ring-2 ring-primary/50" : ""
      }`}
    >
      {/* Image */}
      <div className="aspect-video w-full bg-muted">
        {variant.image_url ? (
          <img
            src={variant.image_url}
            alt={variant.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-muted">
            <span className="text-sm text-muted-foreground">No preview</span>
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate">{variant.title}</CardTitle>
            {variant.subtitle && (
              <CardDescription className="mt-0.5">
                {variant.subtitle}
              </CardDescription>
            )}
          </div>
          {isRecommended && (
            <Badge className="shrink-0">Recommended</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Type & Difficulty */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline">
            {variantTypeLabels[variant.variant_type] ?? variant.variant_type}
          </Badge>
          <Badge variant="secondary">
            {difficultyLabels[variant.difficulty_level] ?? variant.difficulty_level}
          </Badge>
        </div>

        {/* Design summary */}
        {variant.design_summary && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {variant.design_summary}
          </p>
        )}

        {/* Style tags */}
        {variant.style_tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {variant.style_tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="ghost" className="text-xs">
                {tag.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        )}

        {/* Budget */}
        <div className="flex items-center justify-between border-t pt-3 text-sm">
          <span className="text-muted-foreground">Estimated budget</span>
          <span className="font-semibold">
            ${variant.estimated_budget_min?.toLocaleString()} – $
            {variant.estimated_budget_max?.toLocaleString()}{" "}
            {variant.currency}
          </span>
        </div>

        {/* Item count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shopping items</span>
          <span className="font-medium">
            {variant.shopping_item_count} items
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
