import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

interface GetProductsOptions {
  category?: string;
  isActive?: boolean;
  limit?: number;
}

export async function getProducts(
  options: GetProductsOptions = {}
): Promise<Product[]> {
  const supabase = await createClient();

  let query = supabase.from("product_catalog").select("*");

  if (options.category) {
    query = query.eq("category", options.category);
  }
  if (options.isActive !== undefined) {
    query = query.eq("is_active", options.isActive);
  }

  query = query.order("category", { ascending: true }).order("name", { ascending: true });

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Product[];
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_catalog")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    return null;
  }

  return data as Product;
}
