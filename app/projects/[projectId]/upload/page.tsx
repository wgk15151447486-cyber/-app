import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function UploadPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:py-32">
      <h1 className="text-3xl font-bold tracking-tight">Upload Photos</h1>
      <p className="mt-2 text-muted-foreground">
        Project: {project.title}
      </p>
      <p className="mt-8 rounded-xl border bg-card px-6 py-12 text-muted-foreground">
        Image upload will be implemented in Task 5.
      </p>
      <Link
        href={`/projects/${project.id}`}
        className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        &larr; Back to project
      </Link>
    </div>
  );
}
