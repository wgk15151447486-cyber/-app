import Link from "next/link";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import { getShoppingItemsForVariant } from "@/lib/shopping/get-shopping-items-for-variant";
import { getProject } from "@/lib/projects/get-project";
import { VariantDetailHeader } from "@/components/design/variant-detail-header";
import { VariantInfoCards } from "@/components/design/variant-info-cards";
import { ShoppingListPreview } from "@/components/shopping/shopping-list-preview";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string; variantId: string }>;
}

export default async function VariantDetailPage({ params }: Props) {
  const { projectId, variantId } = await params;

  // Ownership verified inside both helpers
  const [project, variant, items] = await Promise.all([
    getProject(projectId),
    getDesignVariant(variantId),
    getShoppingItemsForVariant(variantId),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Back link */}
      <Link
        href={`/projects/${projectId}/variants`}
        className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        &larr; Back to all variants
      </Link>

      {/* Header with image, title, badges, tags */}
      <VariantDetailHeader variant={variant} />

      {/* Info cards: summary, why it works, best for, budget */}
      <div className="mt-8">
        <VariantInfoCards variant={variant} />
      </div>

      {/* Shopping list preview */}
      <div className="mt-8">
        <ShoppingListPreview
          items={items}
          isPaid={project.is_paid}
          shoppingListHref={`/projects/${projectId}/variants/${variantId}/shopping-list`}
        />
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/projects/${projectId}/variants`}
          className="inline-flex h-10 items-center justify-center rounded-lg border px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          &larr; Back to all variants
        </Link>
        <Link
          href={`/projects/${projectId}/variants/${variantId}/edit`}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue Editing
        </Link>
      </div>
    </div>
  );
}
