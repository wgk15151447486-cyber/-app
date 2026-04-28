import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { getDesignVariants } from "@/lib/design/get-design-variants";
import { DesignVariantGrid } from "@/components/design/design-variant-grid";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function VariantsPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  const variants = await getDesignVariants(projectId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Design Variants
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Project: {project.title}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            &larr; Project
          </Link>
          <Link
            href={`/projects/${project.id}/generating`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Regenerate
          </Link>
        </div>
      </div>

      <DesignVariantGrid variants={variants} />
    </div>
  );
}
