"use client";

import { Product } from "@/models/product";

type Props = {
  product: Product;
  selected: boolean;
  onSelect: () => void;
};

export function ProductCard({ product, selected, onSelect }: Props) {
  return (
    <article className="card" data-selected={selected ? "true" : "false"}>
      <button type="button" onClick={onSelect}>
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(event) => {
            const image = event.currentTarget as HTMLImageElement;
            image.src = "/placeholder-product.svg";
          }}
        />
        <p className="tag mt-3">{product.category}</p>
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="muted mt-1">{product.shortDescription}</p>
      </button>
    </article>
  );
}
