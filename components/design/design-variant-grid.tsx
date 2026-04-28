import { DesignVariantCard } from "@/components/design/design-variant-card";
import type { DesignVariantWithItemCount } from "@/lib/design/get-design-variants";

interface Props {
  variants: DesignVariantWithItemCount[];
  projectId: string;
}

export function DesignVariantGrid({ variants, projectId }: Props) {
  if (variants.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <p className="text-muted-foreground">No design variants yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Go to the requirements page and click &quot;Generate design variants&quot; to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {variants.map((variant) => (
        <DesignVariantCard
          key={variant.id}
          variant={variant}
          href={`/projects/${projectId}/variants/${variant.id}`}
        />
      ))}
    </div>
  );
}
