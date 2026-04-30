import { createClient } from "@/lib/supabase/server";

interface SaveGeneratedImageInput {
  imageUrl: string;
  userId: string;
  projectId: string;
  variantId: string;
}

interface SaveGeneratedImageResult {
  imageUrl: string;
  storagePath: string;
}

export async function saveGeneratedImage(
  input: SaveGeneratedImageInput
): Promise<SaveGeneratedImageResult> {
  const { imageUrl, userId, projectId, variantId } = input;

  const supabase = await createClient();

  // Download the AI-generated image
  const downloadRes = await fetch(imageUrl);
  if (!downloadRes.ok) {
    throw new Error(
      `Failed to download generated image: ${downloadRes.status}`
    );
  }

  const contentType = downloadRes.headers.get("content-type") ?? "image/png";
  const blob = await downloadRes.blob();

  if (blob.size === 0) {
    throw new Error("Downloaded image is empty");
  }

  const storagePath = `users/${userId}/projects/${projectId}/generated/${variantId}.png`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(storagePath, blob, {
      upsert: true,
      contentType,
    });

  if (uploadError) {
    throw new Error(
      `Failed to upload image to storage: ${uploadError.message}`
    );
  }

  const { data: urlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(storagePath);

  return {
    imageUrl: urlData.publicUrl,
    storagePath,
  };
}
