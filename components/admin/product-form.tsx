"use client";

import { useState } from "react";
import { createProduct } from "@/lib/products/create-product";
import { updateProduct } from "@/lib/products/update-product";
import { PRODUCT_CATEGORIES } from "@/types/product";
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
  product?: Product;
  onDone: () => void;
}

export function ProductForm({ product, onDone }: Props) {
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<(typeof PRODUCT_CATEGORIES)[number]>(
    (product?.category as (typeof PRODUCT_CATEGORIES)[number]) ?? "decor"
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [currency, setCurrency] = useState(product?.currency ?? "USD");
  const [supplierName, setSupplierName] = useState(
    product?.supplier_name ?? ""
  );
  const [productUrl, setProductUrl] = useState(product?.product_url ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [color, setColor] = useState(product?.color ?? "");
  const [material, setMaterial] = useState(product?.material ?? "");
  const [sizeText, setSizeText] = useState(product?.size_text ?? "");
  const [country, setCountry] = useState(product?.country ?? "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [styleTags, setStyleTags] = useState(
    product?.style_tags?.join(", ") ?? ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!name.trim() || !productUrl.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const data = {
        name: name.trim(),
        category: category as typeof PRODUCT_CATEGORIES[number],
        description: description.trim() || null,
        price: price ? parseFloat(price) : null,
        currency: currency || "USD",
        supplier_name: supplierName.trim() || null,
        product_url: productUrl.trim(),
        image_url: imageUrl.trim() || null,
        color: color.trim() || null,
        material: material.trim() || null,
        size_text: sizeText.trim() || null,
        country: country.trim() || null,
        is_active: isActive,
        style_tags: styleTags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        suitable_room_types: product?.suitable_room_types ?? [],
        suitable_purposes: product?.suitable_purposes ?? [],
      };

      if (isEdit) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">
        {isEdit ? "Edit Product" : "Add Product"}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Product name"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Category</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as (typeof PRODUCT_CATEGORIES)[number]
              )
            }
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat] ?? cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="99.00"
          />
        </div>

        {/* Currency */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Currency</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="USD"
          />
        </div>

        {/* Product URL */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Product URL *</label>
          <input
            type="url"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="https://example.com/product"
          />
        </div>

        {/* Supplier */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Supplier</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Supplier name"
          />
        </div>

        {/* Color */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="e.g. White / Walnut"
          />
        </div>

        {/* Material */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Material</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="e.g. Cotton / Solid wood"
          />
        </div>

        {/* Size */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Size</label>
          <input
            type="text"
            value={sizeText}
            onChange={(e) => setSizeText(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder='e.g. 18"x18"'
          />
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label className="text-xs font-medium">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="US"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="https://placehold.co/600x400"
          />
        </div>

        {/* Description */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Short product description"
          />
        </div>

        {/* Style Tags */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium">
            Style Tags (comma-separated)
          </label>
          <input
            type="text"
            value={styleTags}
            onChange={(e) => setStyleTags(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="modern, cozy, premium"
          />
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is-active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="size-4 accent-primary"
          />
          <label htmlFor="is-active" className="text-xs font-medium">
            Active (visible to users)
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !name.trim() || !productUrl.trim()}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving…"
            : isEdit
              ? "Update Product"
              : "Create Product"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
