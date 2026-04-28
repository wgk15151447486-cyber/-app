import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { getProject } from "@/lib/projects/get-project";
import type { DesignVariant } from "@/types/design";

export interface DesignVariantWithItemCount extends DesignVariant {
  shopping_item_count: number;
}

export async function getDesignVariants(
  projectId: string
): Promise<DesignVariantWithItemCount[]> {
  const user = await requireUser();
  await getProject(projectId);

  const supabase = await createClient();

  const { data: variants, error } = await supabase
    .from("design_variants")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  if (!variants || variants.length === 0) {
    return [];
  }

  // Get shopping item counts per variant
  const variantIds = variants.map((v) => v.id);
  const { data: counts, error: countError } = await supabase
    .from("shopping_items")
    .select("design_variant_id")
    .in("design_variant_id", variantIds)
    .eq("user_id", user.id);

  if (countError) {
    throw new Error(countError.message);
  }

  const countMap = new Map<string, number>();
  for (const row of counts ?? []) {
    const vid = row.design_variant_id;
    countMap.set(vid, (countMap.get(vid) ?? 0) + 1);
  }

  return variants.map((v) => ({
    ...v,
    shopping_item_count: countMap.get(v.id) ?? 0,
  })) as DesignVariantWithItemCount[];
}
