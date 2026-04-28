import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import type { Project } from "@/types/project";

export async function getProject(projectId: string): Promise<Project> {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  // RLS will return no rows if user doesn't own the project
  if (error || !data) {
    notFound();
  }

  // Double-check ownership at the application layer
  if (data.user_id !== user.id) {
    notFound();
  }

  return data as Project;
}
