import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";
import type { ProjectImage } from "@/types/image";

export async function getProjectImages(
  projectId: string
): Promise<ProjectImage[]> {
  const user = await requireUser();

  // Verify project ownership via getProject (throws notFound if not owner)
  await getProject(projectId);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProjectImage[]) ?? [];
}
