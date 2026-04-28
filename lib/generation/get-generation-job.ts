import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";
import type { GenerationJob } from "@/types/generation";

export async function getGenerationJob(
  projectId: string
): Promise<GenerationJob | null> {
  const user = await requireUser();
  await getProject(projectId);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generation_jobs")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as GenerationJob | null;
}
