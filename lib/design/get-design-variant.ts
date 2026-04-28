import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import type { DesignVariant } from "@/types/design";

export async function getDesignVariant(variantId: string): Promise<DesignVariant> {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: variant, error } = await supabase
    .from("design_variants")
    .select("*")
    .eq("id", variantId)
    .single();

  if (error || !variant) {
    notFound();
  }

  // Verify the variant belongs to this user's project
  if (variant.user_id !== user.id) {
    notFound();
  }

  return variant as DesignVariant;
}
