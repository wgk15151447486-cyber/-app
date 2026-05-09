import { aiImage, getImageModel } from "@/lib/ai/client";
import { buildImagePrompt } from "@/lib/ai/build-image-prompt";
import { saveGeneratedImage } from "@/lib/storage/save-generated-image";
import type { Project } from "@/types/project";
import type { DesignRequirements } from "@/types/requirements";
import type { AiDesignVariantOutput } from "@/types/ai";

interface GenerateDesignImageInput {
  variant: AiDesignVariantOutput;
  variantId: string;
  project: Pick<Project, "room_type">;
  userId: string;
  projectId: string;
  requirements?: DesignRequirements | null;
}

interface GenerateDesignImageResult {
  imageUrl: string;
  storagePath: string;
  promptUsed: string;
  aiModel: string;
}

export async function generateDesignImage(
  input: GenerateDesignImageInput
): Promise<GenerateDesignImageResult> {
  const { variant, variantId, project, userId, projectId, requirements } =
    input;

  const prompt = buildImagePrompt({ variant, project, requirements });
  const imageModel = getImageModel();

  // Mock/placeholder image — no real API call
  if (imageModel === "mock") {
    const placeholderUrl =
      "https://placehold.co/1024x1024/1a1a2e/e0e0e0?text=" +
      encodeURIComponent(variant.title);
    return {
      imageUrl: placeholderUrl,
      storagePath: "",
      promptUsed: "mock (placeholder)",
      aiModel: "mock",
    };
  }

  // Generate image via DALL-E
  const tempUrl = await aiImage(prompt, { model: imageModel });

  // Download from OpenAI and save to Supabase Storage
  const { imageUrl, storagePath } = await saveGeneratedImage({
    imageUrl: tempUrl,
    userId,
    projectId,
    variantId,
  });

  return {
    imageUrl,
    storagePath,
    promptUsed: prompt,
    aiModel: imageModel,
  };
}
