import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";
import type { DesignRequirements } from "@/types/requirements";

export async function getRequirements(
  projectId: string
): Promise<DesignRequirements | null> {
  const user = await requireUser();

  // Verify project ownership
  await getProject(projectId);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("design_requirements")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as DesignRequirements | null;
}
