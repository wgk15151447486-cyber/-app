import { createClient } from "@/lib/supabase/server";
import { aiChatJson, getVisionModel, getProviderName } from "@/lib/ai/client";
import { validateRoomAnalysis } from "@/lib/ai/schemas";
import { ROOM_ANALYSIS_PROMPT } from "@/lib/ai/prompts/room-analysis";
import type { Project } from "@/types/project";
import type { DesignRequirements } from "@/types/requirements";
import type { AiRoomAnalysisOutput } from "@/types/ai";

export async function analyzeRoom(
  project: Project,
  requirements: DesignRequirements | null
): Promise<AiRoomAnalysisOutput> {
  const supabase = await createClient();

  // Fetch project images
  const { data: images } = await supabase
    .from("project_images")
    .select("image_url")
    .eq("project_id", project.id)
    .order("is_primary", { ascending: false })
    .limit(3);

  // Build permissions string
  const permissions: string[] = [];
  if (requirements?.allow_wall_paint) permissions.push("Wall painting allowed");
  if (requirements?.allow_drilling) permissions.push("Drilling/mounting allowed");
  if (requirements?.allow_floor_change) permissions.push("Floor changes allowed");
  if (requirements?.pet_friendly) permissions.push("Pet-friendly");
  if (requirements?.child_friendly) permissions.push("Child-friendly");
  if (requirements?.easy_to_clean) permissions.push("Easy to clean required");

  // Build the prompt
  let prompt = ROOM_ANALYSIS_PROMPT
    .replace("{{room_type}}", project.room_type)
    .replace("{{purpose}}", project.purpose)
    .replace("{{location}}", [project.location_city, project.location_country].filter(Boolean).join(", ") || "Unknown")
    .replace("{{budget_type}}", project.budget_type)
    .replace("{{budget_min}}", project.budget_min?.toString() ?? "0")
    .replace("{{budget_max}}", project.budget_max?.toString() ?? "—")
    .replace("{{currency}}", project.currency)
    .replace("{{preferred_styles}}", requirements?.preferred_styles?.join(", ") || "None specified")
    .replace("{{target_goals}}", requirements?.target_goals?.join(", ") || "None specified")
    .replace("{{constraints}}", requirements?.constraints?.join(", ") || "None")
    .replace("{{keep_items}}", requirements?.keep_items?.join(", ") || "None")
    .replace("{{avoid_items}}", requirements?.avoid_items?.join(", ") || "None")
    .replace("{{free_text}}", requirements?.free_text || "None")
    .replace("{{permissions}}", permissions.length > 0 ? permissions.join("; ") : "No special permissions");

  const provider = getProviderName();

  // Build messages — use vision image inputs only for OpenAI
  const userContent: Array<Record<string, unknown>> = [];

  if (provider === "openai" && images && images.length > 0) {
    for (const img of images) {
      userContent.push({
        type: "image_url",
        image_url: { url: img.image_url, detail: "high" },
      });
    }
  }

  // For non-vision providers, include image URLs as text context
  if (provider !== "openai" && images && images.length > 0) {
    const imageUrls = images.map((img) => img.image_url).join("\n  ");
    prompt += `\n\nRoom photo URLs (for context — these are images of the room):\n  ${imageUrls}\n\nPlease analyze the room based on the provided project context, requirements, and the fact that the user has uploaded these room photos.`;
  }

  userContent.push({ type: "text", text: prompt });

  const result = await aiChatJson<AiRoomAnalysisOutput>(
    [
      { role: "user", content: userContent as unknown as string },
    ],
    { model: getVisionModel(), temperature: 0.4, maxTokens: 4096 }
  );

  return validateRoomAnalysis(result);
}
