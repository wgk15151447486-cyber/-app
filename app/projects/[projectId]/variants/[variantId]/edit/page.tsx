import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import { getEditRequests } from "@/lib/edit/get-edit-requests";
import { EditRequestForm } from "@/components/edit/edit-request-form";
import { EditHistory } from "@/components/edit/edit-history";

export const dynamic = "force-dynamic";

const MAX_FREE_EDITS = 1;
const MAX_PAID_EDITS = 5;

interface Props {
  params: Promise<{ projectId: string; variantId: string }>;
}

export default async function EditPage({ params }: Props) {
  const { projectId, variantId } = await params;

  const [project, variant, editRequests] = await Promise.all([
    getProject(projectId),
    getDesignVariant(variantId),
    getEditRequests(variantId),
  ]);

  const maxEdits = project.is_paid ? MAX_PAID_EDITS : MAX_FREE_EDITS;
  const usedEdits = editRequests.filter((r) => r.status !== "failed").length;
  const remainingEdits = Math.max(0, maxEdits - usedEdits);

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
        <span className="text-foreground">Edit</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Design Variant
        </h1>
        <p className="mt-1 text-base text-muted-foreground">
          {variant.title}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {remainingEdits > 0
            ? `${remainingEdits} of ${maxEdits} edits remaining`
            : "Edit limit reached"}
        </p>
      </div>

      {/* Edit form */}
      <EditRequestForm
        variantId={variantId}
        remainingEdits={remainingEdits}
      />

      {/* Edit history */}
      {editRequests.length > 0 && (
        <div className="mt-12">
          <EditHistory editRequests={editRequests} />
        </div>
      )}

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
