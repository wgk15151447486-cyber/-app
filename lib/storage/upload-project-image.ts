"use server";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGES_PER_PROJECT,
} from "@/types/image";
import type { ProjectImage } from "@/types/image";

interface UploadInput {
  projectId: string;
  storagePath: string;
  imageUrl: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
}

export async function uploadProjectImage(
  input: UploadInput
): Promise<ProjectImage> {
  const user = await requireUser();

  // Verify ownership
  const project = await getProject(input.projectId);

  // Validate mime type
  if (!ALLOWED_MIME_TYPES.includes(input.mimeType as (typeof ALLOWED_MIME_TYPES)[number])) {
    throw new Error("Only JPEG, PNG, and WebP images are allowed.");
  }

  // Validate file size
  if (input.fileSize > MAX_FILE_SIZE) {
    throw new Error("Image must be under 10 MB.");
  }

  // Validate storage path belongs to this user
  const expectedPrefix = `users/${user.id}/projects/${input.projectId}/`;
  if (!input.storagePath.startsWith(expectedPrefix)) {
    throw new Error("Invalid storage path.");
  }

  const supabase = await createClient();

  // Check existing image count
  const { count, error: countError } = await supabase
    .from("project_images")
    .select("*", { count: "exact", head: true })
    .eq("project_id", input.projectId)
    .eq("user_id", user.id);

  if (countError) {
    throw new Error("Failed to check image count.");
  }

  if ((count ?? 0) >= MAX_IMAGES_PER_PROJECT) {
    throw new Error(`Maximum of ${MAX_IMAGES_PER_PROJECT} images per project.`);
  }

  // Determine if this is the first image (will be primary)
  const isFirst = (count ?? 0) === 0;

  // Insert the row
  const { data, error } = await supabase
    .from("project_images")
    .insert({
      project_id: input.projectId,
      user_id: user.id,
      image_url: input.imageUrl,
      storage_path: input.storagePath,
      image_role: "room_photo",
      is_primary: isFirst,
      width: input.width ?? null,
      height: input.height ?? null,
      file_size: input.fileSize,
      mime_type: input.mimeType,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to save image record.");
  }

  // If project is still in draft status, update to images_uploaded
  if (project.status === "draft") {
    await supabase
      .from("projects")
      .update({ status: "images_uploaded" })
      .eq("id", input.projectId)
      .eq("user_id", user.id);
  }

  return data as ProjectImage;
}
