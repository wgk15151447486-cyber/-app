/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import type { DesignVariant } from "@/types/design";

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
  variant: DesignVariant;
}

export function VariantDetailHeader({ variant }: Props) {
  return (
    <div className="space-y-6">
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
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

      {/* Title & subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {variant.title}
        </h1>
        {variant.subtitle && (
          <p className="mt-1.5 text-base text-muted-foreground">
            {variant.subtitle}
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge>
          {variantTypeLabels[variant.variant_type] ?? variant.variant_type}
        </Badge>
        <Badge variant="secondary">
          {difficultyLabels[variant.difficulty_level] ?? variant.difficulty_level}
        </Badge>
        {variant.maintenance_level && (
          <Badge variant="outline">
            Maintenance: {variant.maintenance_level}
          </Badge>
        )}
      </div>

      {/* Style tags */}
      {variant.style_tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {variant.style_tags.map((tag) => (
            <Badge key={tag} variant="ghost" className="text-xs">
              {tag.replace(/_/g, " ")}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
