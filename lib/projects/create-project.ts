"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import type { RoomType, Purpose, BudgetType } from "@/types/project";

interface CreateProjectInput {
  title: string;
  room_type: RoomType;
  purpose: Purpose;
  budget_type: BudgetType;
  budget_min?: number | null;
  budget_max?: number | null;
  currency?: string;
  location_country?: string | null;
  location_city?: string | null;
}

export async function createProject(input: CreateProjectInput) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      title: input.title,
      room_type: input.room_type,
      purpose: input.purpose,
      budget_type: input.budget_type,
      budget_min: input.budget_min ?? null,
      budget_max: input.budget_max ?? null,
      currency: input.currency ?? "USD",
      location_country: input.location_country ?? null,
      location_city: input.location_city ?? null,
      status: "draft",
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create project");
  }

  revalidatePath("/dashboard");
  redirect(`/projects/${data.id}/upload`);
}
