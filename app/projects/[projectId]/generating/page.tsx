import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function GeneratingPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:py-32">
      <Loader2 className="mx-auto size-8 animate-spin text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Generating Design Variants
      </h1>
      <p className="mt-2 text-muted-foreground">
        Project: {project.title}
      </p>
      <p className="mt-8 rounded-xl border bg-card px-6 py-12 text-muted-foreground">
        AI generation will be implemented in Task 8.
      </p>
      <Link
        href={`/projects/${project.id}/requirements`}
        className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        &larr; Back to requirements
      </Link>
    </div>
  );
}
