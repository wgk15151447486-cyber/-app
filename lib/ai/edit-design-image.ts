import type { DesignVariant } from "@/types/design";

interface ImageEditInstructionInput {
  variant: Pick<DesignVariant, "title" | "image_url" | "style_tags">;
  instruction: string;
}

/**
 * Builds a DALL-E image edit instruction based on the user's text instruction.
 * Does NOT call any image editing API — only generates the instruction string.
 * Full image editing can be implemented in a future task.
 */
export function buildImageEditInstruction(
  input: ImageEditInstructionInput
): string {
  const { variant, instruction } = input;

  const parts = [
    "Using the existing room render as a base,",
    `apply this change: ${instruction}.`,
    `Style context: ${variant.title} — ${variant.style_tags.join(", ")}.`,
    "Make only the requested modification while keeping the rest of the room unchanged. Maintain the same lighting, camera angle, and overall composition.",
  ];

  return parts.join(" ").slice(0, 400);
}
