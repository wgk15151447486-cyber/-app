import { aiChatJson, getTextModel } from "@/lib/ai/client";
import { validateDesignVariants } from "@/lib/ai/schemas";
import { DESIGN_VARIANTS_PROMPT } from "@/lib/ai/prompts/design-variants";
import type { Project } from "@/types/project";
import type { DesignRequirements } from "@/types/requirements";
import type { AiRoomAnalysisOutput, AiDesignVariantsOutput } from "@/types/ai";

export async function generateDesignVariants(
  project: Project,
  requirements: DesignRequirements | null,
  roomAnalysis: AiRoomAnalysisOutput
): Promise<AiDesignVariantsOutput> {
  // Build permissions string
  const permissions: string[] = [];
  if (requirements?.allow_wall_paint) permissions.push("Wall painting allowed");
  if (requirements?.allow_drilling) permissions.push("Drilling/mounting allowed");
  if (requirements?.allow_floor_change) permissions.push("Floor changes allowed");
  if (requirements?.pet_friendly) permissions.push("Pet-friendly");
  if (requirements?.child_friendly) permissions.push("Child-friendly");
  if (requirements?.easy_to_clean) permissions.push("Easy to clean required");

  const analysisSummary = JSON.stringify(
    {
      room_summary: roomAnalysis.room_summary,
      detected_room_type: roomAnalysis.detected_room_type,
      detected_problems: roomAnalysis.detected_problems,
      lighting_analysis: roomAnalysis.lighting_analysis,
      color_analysis: roomAnalysis.color_analysis,
      layout_analysis: roomAnalysis.layout_analysis,
      improvement_opportunities: roomAnalysis.improvement_opportunities,
    },
    null,
    2
  );

  const prompt = DESIGN_VARIANTS_PROMPT
    .replace("{{room_analysis}}", analysisSummary)
    .replace("{{room_type}}", project.room_type)
    .replace("{{purpose}}", project.purpose)
    .replace("{{budget_type}}", project.budget_type)
    .replace("{{budget_min}}", project.budget_min?.toString() ?? "0")
    .replace("{{budget_max}}", project.budget_max?.toString() ?? "—")
    .replace("{{currency}}", project.currency)
    .replace("{{preferred_styles}}", requirements?.preferred_styles?.join(", ") || "None specified")
    .replace("{{target_goals}}", requirements?.target_goals?.join(", ") || "None specified")
    .replace("{{constraints}}", requirements?.constraints?.join(", ") || "None")
    .replace("{{keep_items}}", requirements?.keep_items?.join(", ") || "None")
    .replace("{{avoid_items}}", requirements?.avoid_items?.join(", ") || "None")
    .replace("{{permissions}}", permissions.length > 0 ? permissions.join("; ") : "No special permissions");

  const result = await aiChatJson<AiDesignVariantsOutput>(
    [
      { role: "user", content: prompt },
    ],
    { model: getTextModel(), temperature: 0.8, maxTokens: 8192 }
  );

  return validateDesignVariants(result);
}
