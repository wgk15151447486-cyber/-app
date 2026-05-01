import { aiChatJson, getTextModel } from "@/lib/ai/client";
import { validateEditResponse } from "@/lib/ai/schemas";
import { EDIT_REQUEST_PROMPT } from "@/lib/ai/prompts/edit-request";
import type { DesignVariant } from "@/types/design";
import type { Project } from "@/types/project";

interface EditDesignVariantInput {
  variant: Pick<
    DesignVariant,
    "title" | "design_summary" | "style_tags" | "estimated_budget_min" | "estimated_budget_max" | "currency" | "difficulty_level" | "best_for"
  >;
  project: Pick<Project, "room_type">;
  instruction: string;
}

interface EditDesignVariantOutput {
  updatedDesignSummary: string;
  imageEditInstruction: string;
  aiModel: string;
  promptUsed: string;
}

export async function editDesignVariant(
  input: EditDesignVariantInput
): Promise<EditDesignVariantOutput> {
  const { variant, project, instruction } = input;
  const aiModel = getTextModel();

  const prompt = EDIT_REQUEST_PROMPT
    .replace("{{current_summary}}", variant.design_summary ?? "")
    .replace("{{title}}", variant.title)
    .replace("{{style_tags}}", variant.style_tags.join(", "))
    .replace("{{room_type}}", project.room_type)
    .replace("{{budget_min}}", variant.estimated_budget_min?.toString() ?? "0")
    .replace("{{budget_max}}", variant.estimated_budget_max?.toString() ?? "—")
    .replace("{{currency}}", variant.currency)
    .replace("{{difficulty_level}}", variant.difficulty_level)
    .replace("{{best_for}}", variant.best_for?.join(", ") ?? "All guests")
    .replace("{{instruction}}", instruction);

  const result = await aiChatJson<{
    updated_design_summary: string;
    image_edit_instruction: string;
  }>(
    [{ role: "user", content: prompt }],
    { model: aiModel, temperature: 0.7, maxTokens: 2048 }
  );

  const validated = validateEditResponse(result);

  return {
    updatedDesignSummary: validated.updated_design_summary,
    imageEditInstruction: validated.image_edit_instruction,
    aiModel,
    promptUsed: prompt,
  };
}
