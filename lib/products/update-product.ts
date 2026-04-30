"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import type { ProductUpdate } from "@/types/product";

export async function updateProduct(
  productId: string,
  input: ProductUpdate
) {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase
    .from("product_catalog")
    .update(input)
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
}

export async function toggleProductActive(
  productId: string,
  isActive: boolean
) {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase
    .from("product_catalog")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
}
