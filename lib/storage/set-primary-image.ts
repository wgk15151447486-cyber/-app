"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";

interface SetPrimaryInput {
  projectId: string;
  imageId: string;
}

export async function setPrimaryImage(input: SetPrimaryInput) {
  const user = await requireUser();

  // Verify project ownership
  await getProject(input.projectId);

  const supabase = await createClient();

  // Verify the target image belongs to this user and project
  const { data: target, error: findError } = await supabase
    .from("project_images")
    .select("*")
    .eq("id", input.imageId)
    .eq("project_id", input.projectId)
    .eq("user_id", user.id)
    .single();

  if (findError || !target) {
    throw new Error("Image not found.");
  }

  // Set all images of this project to not primary
  await supabase
    .from("project_images")
    .update({ is_primary: false })
    .eq("project_id", input.projectId)
    .eq("user_id", user.id);

  // Set the target image as primary
  await supabase
    .from("project_images")
    .update({ is_primary: true })
    .eq("id", input.imageId)
    .eq("user_id", user.id);

  revalidatePath(`/projects/${input.projectId}/upload`);
}
