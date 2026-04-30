import type { Project } from "@/types/project";
import type { DesignRequirements } from "@/types/requirements";
import type { AiDesignVariantOutput } from "@/types/ai";

interface BuildImagePromptInput {
  variant: AiDesignVariantOutput;
  project: Pick<Project, "room_type">;
  requirements?: Pick<DesignRequirements, "preferred_styles"> | null;
}

export function buildImagePrompt(input: BuildImagePromptInput): string {
  const { variant, project, requirements } = input;

  const parts: string[] = [
    "Photorealistic interior design render of a",
    project.room_type.replace(/_/g, " "),
    "for a short-term rental listing photo.",
    "",
    `Design style: ${variant.title} — ${variant.subtitle}.`,
    variant.design_summary,
    "",
    `Style keywords: ${variant.style_tags.join(", ")}.`,
  ];

  if (requirements?.preferred_styles?.length) {
    parts.push(
      `Preferred aesthetics: ${requirements.preferred_styles.join(", ")}.`
    );
  }

  parts.push(
    "",
    "The image should look like a professional real estate listing photo: well-lit with natural light, clean composition, inviting atmosphere, high resolution, no people, no watermarks, no text overlays. Show the room fully furnished and staged exactly as described above."
  );

  return parts.join(" ").slice(0, 1000);
}
