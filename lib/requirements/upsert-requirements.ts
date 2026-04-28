"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";

interface UpsertInput {
  projectId: string;
  preferredStyles: string[];
  targetGoals: string[];
  constraints: string[];
  keepItems: string[];
  avoidItems: string[];
  freeText: string | null;
  allowWallPaint: boolean;
  allowDrilling: boolean;
  allowFloorChange: boolean;
  petFriendly: boolean;
  childFriendly: boolean;
  easyToClean: boolean;
}

export async function upsertRequirements(input: UpsertInput) {
  const user = await requireUser();

  // Verify project ownership
  await getProject(input.projectId);

  const supabase = await createClient();

  const { error } = await supabase.from("design_requirements").upsert(
    {
      project_id: input.projectId,
      user_id: user.id,
      preferred_styles: input.preferredStyles,
      target_goals: input.targetGoals,
      constraints: input.constraints,
      keep_items: input.keepItems,
      avoid_items: input.avoidItems,
      free_text: input.freeText,
      allow_wall_paint: input.allowWallPaint,
      allow_drilling: input.allowDrilling,
      allow_floor_change: input.allowFloorChange,
      pet_friendly: input.petFriendly,
      child_friendly: input.childFriendly,
      easy_to_clean: input.easyToClean,
    },
    { onConflict: "project_id" }
  );

  if (error) {
    throw new Error(error.message);
  }

  // Update project status to requirements_completed
  await supabase
    .from("projects")
    .update({ status: "requirements_completed" })
    .eq("id", input.projectId)
    .eq("user_id", user.id);

  revalidatePath(`/projects/${input.projectId}/requirements`);
}
