import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import type { Project } from "@/types/project";

export async function getUserProjects(): Promise<Project[]> {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Project[]) ?? [];
}
