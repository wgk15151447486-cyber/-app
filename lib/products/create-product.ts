"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import type { ProductInsert } from "@/types/product";

export async function createProduct(input: Omit<ProductInsert, "user_id">) {
  await requireAdmin();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_catalog")
    .insert({
      category: input.category,
      name: input.name,
      description: input.description ?? null,
      style_tags: input.style_tags ?? [],
      suitable_room_types: input.suitable_room_types ?? [],
      suitable_purposes: input.suitable_purposes ?? [],
      color: input.color ?? null,
      material: input.material ?? null,
      size_text: input.size_text ?? null,
      price: input.price ?? null,
      currency: input.currency ?? "USD",
      supplier_name: input.supplier_name ?? null,
      product_url: input.product_url,
      affiliate_code: input.affiliate_code ?? null,
      image_url: input.image_url ?? null,
      country: input.country ?? null,
      is_active: input.is_active ?? true,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");

  return data;
}
