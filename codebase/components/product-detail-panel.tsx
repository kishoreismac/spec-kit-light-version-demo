"use client";

import { Product } from "@/models/product";

type Props = {
  product: Product | null;
};

export function ProductDetailPanel({ product }: Props) {
  if (!product) {
    return (
      <aside className="card detail-panel">
        <h2>Select a product</h2>
        <p className="muted">Choose an item from the catalog to view details.</p>
      </aside>
    );
  }

  return (
    <aside className="card detail-panel">
      <img
        src={product.imageUrl}
        alt={product.name}
        onError={(event) => {
          const image = event.currentTarget as HTMLImageElement;
          image.src = "/placeholder-product.svg";
        }}
      />
      <p className="tag mt-3">{product.category}</p>
      <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
      <p className="muted mt-2">{product.fullDescription}</p>
    </aside>
  );
}
