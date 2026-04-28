import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import { getShoppingList } from "@/lib/shopping/get-shopping-list";
import { ShoppingList } from "@/components/shopping/shopping-list";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string; variantId: string }>;
}

export default async function ShoppingListPage({ params }: Props) {
  const { projectId, variantId } = await params;

  const [project, variant, shopData] = await Promise.all([
    getProject(projectId),
    getDesignVariant(variantId),
    getShoppingList(variantId),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href={`/projects/${projectId}/variants`}
          className="hover:text-foreground hover:underline"
        >
          Variants
        </Link>
        <span>/</span>
        <Link
          href={`/projects/${projectId}/variants/${variantId}`}
          className="truncate hover:text-foreground hover:underline"
        >
          {variant.title}
        </Link>
        <span>/</span>
        <span className="text-foreground">Shopping List</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {variant.title}
        </h1>
        <p className="mt-1 text-base text-muted-foreground">Shopping List</p>
      </div>

      {/* Shopping list content */}
      <ShoppingList
        grouped={shopData.grouped}
        totals={shopData.totals}
        isPaid={project.is_paid}
      />

      {/* Back link */}
      <div className="mt-8">
        <Link
          href={`/projects/${projectId}/variants/${variantId}`}
          className="inline-flex h-10 items-center justify-center rounded-lg border px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          &larr; Back to variant detail
        </Link>
      </div>
    </div>
  );
}
