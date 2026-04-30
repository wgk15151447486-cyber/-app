import Link from "next/link";
import { requireAdmin } from "@/lib/admin/require-admin";
import { getProducts } from "@/lib/products/get-products";
import { ProductTable } from "@/components/admin/product-table";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await getProducts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Catalog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your internal product database. {products.length} products.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          &larr; Dashboard
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
