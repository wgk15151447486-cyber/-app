import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { getRequirements } from "@/lib/requirements/get-requirements";
import { DesignRequirementsForm } from "@/components/projects/design-requirements-form";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function RequirementsPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  const requirements = await getRequirements(projectId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Design Requirements</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Project: {project.title}
          </p>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          &larr; Back to project
        </Link>
      </div>

      <DesignRequirementsForm projectId={projectId} existing={requirements} />
    </div>
  );
}
