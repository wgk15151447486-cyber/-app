"use client";

import { useState } from "react";
import { ProductForm } from "@/components/admin/product-form";
import { toggleProductActive } from "@/lib/products/update-product";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";

const categoryLabels: Record<string, string> = {
  bedding: "Bedding",
  curtains: "Curtains",
  rugs: "Rugs",
  lighting: "Lighting",
  wall_art: "Wall Art",
  plants: "Plants",
  storage: "Storage",
  small_furniture: "Small Furniture",
  decor: "Decor",
  other: "Other",
};

interface Props {
  products: Product[];
}

export function ProductTable({ products }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      {/* Create button */}
      {!showCreate && (
        <button
          type="button"
          onClick={() => {
            setShowCreate(true);
            setEditingId(null);
          }}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + Add Product
        </button>
      )}

      {/* Create form */}
      {showCreate && (
        <div className="rounded-lg border p-4">
          <ProductForm
            onDone={() => setShowCreate(false)}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Supplier
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                Active
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {categoryLabels[product.category] ?? product.category}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {product.price != null
                    ? `$${product.price.toLocaleString()} ${product.currency}`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {product.supplier_name ?? "—"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={async () => {
                      await toggleProductActive(product.id, !product.is_active);
                    }}
                    className="cursor-pointer"
                  >
                    <Badge
                      variant={product.is_active ? "default" : "secondary"}
                    >
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(
                        editingId === product.id ? null : product.id
                      );
                      setShowCreate(false);
                    }}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {editingId === product.id ? "Cancel" : "Edit"}
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No products in catalog yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Inline edit form */}
      {editingId && (
        <div className="rounded-lg border p-4">
          <ProductForm
            product={
              products.find((p) => p.id === editingId) ?? undefined
            }
            onDone={() => setEditingId(null)}
          />
        </div>
      )}
    </div>
  );
}
