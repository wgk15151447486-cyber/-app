import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import type { EditRequest } from "@/types/edit";

export async function getEditRequests(
  variantId: string
): Promise<EditRequest[]> {
  const user = await requireUser();

  // Verify variant ownership
  await getDesignVariant(variantId);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("edit_requests")
    .select("*")
    .eq("design_variant_id", variantId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as EditRequest[];
}

export async function getEditCount(variantId: string): Promise<number> {
  const user = await requireUser();

  await getDesignVariant(variantId);

  const supabase = await createClient();

  const { count, error } = await supabase
    .from("edit_requests")
    .select("*", { count: "exact", head: true })
    .eq("design_variant_id", variantId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}
