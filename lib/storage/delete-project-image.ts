"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";

interface DeleteInput {
  projectId: string;
  imageId: string;
  storagePath: string;
}

export async function deleteProjectImage(input: DeleteInput) {
  const user = await requireUser();

  // Verify project ownership
  await getProject(input.projectId);

  const supabase = await createClient();

  // Find the target image
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

  const wasPrimary = target.is_primary;

  // Delete from storage
  await supabase.storage.from("project-images").remove([input.storagePath]);

  // Delete from database
  const { error: deleteError } = await supabase
    .from("project_images")
    .delete()
    .eq("id", input.imageId)
    .eq("project_id", input.projectId)
    .eq("user_id", user.id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  // If the deleted image was primary, promote the next oldest to primary
  if (wasPrimary) {
    const { data: remaining } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", input.projectId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1);

    if (remaining && remaining.length > 0) {
      await supabase
        .from("project_images")
        .update({ is_primary: true })
        .eq("id", remaining[0].id)
        .eq("user_id", user.id);
    }
  }

  revalidatePath(`/projects/${input.projectId}/upload`);
}
