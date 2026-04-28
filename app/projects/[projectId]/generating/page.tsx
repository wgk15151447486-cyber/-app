import { getProject } from "@/lib/projects/get-project";
import { getGenerationJob } from "@/lib/generation/get-generation-job";
import { GenerationProgress } from "@/components/generation/generation-progress";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function GeneratingPage({ params }: Props) {
  const { projectId } = await params;
  await getProject(projectId);

  const job = await getGenerationJob(projectId);

  return <GenerationProgress projectId={projectId} job={job} />;
}
