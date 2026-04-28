// @ts-nocheck
"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { EmptyState } from "@/components/empty-state";
import { Nav } from "@/components/nav";
import { ProductCard } from "@/components/product-card";
import { ProductDetailPanel } from "@/components/product-detail-panel";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/filtering";
import { validateProducts } from "@/lib/validation";
import { Category, Product } from "@/models/product";

const categories: Array<Category | "All"> = ["All", "Office", "Home", "Outdoor", "Accessories"];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [selectedId, setSelectedId] = useState<string | null>(products[0]?.id ?? null);

  const validation = useMemo(() => validateProducts(products), []);
  const filtered = useMemo(
    () => filterProducts(products, activeCategory),
    [activeCategory],
  );

  const selectedProduct: Product | null =
    filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  if (!validation.valid) {
    return (
      <div className="page-shell">
        <Nav />
        <main className="container error-box">
          <h1>We are unable to load the catalog right now.</h1>
          <p>Please refresh the page and try again.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Nav />
      <main className="container catalog-shell">
        <div className="catalog-toolbar">
          <div>
            <h1>Product Catalog</h1>
            <p className="muted">Browse products by category and view full details.</p>
          </div>
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={(value) => {
              setActiveCategory(value);
              setSelectedId(null);
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No products in this category"
            description="Try another category to view available products."
            actionLabel="Reset Filter"
            onAction={() => setActiveCategory("All")}
          />
        ) : (
          <div className="catalog-layout">
            <section className="product-grid" aria-label="Catalog products">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedProduct?.id === product.id}
                  onSelect={() => setSelectedId(product.id)}
                />
              ))}
            </section>
            <ProductDetailPanel product={selectedProduct} />
          </div>
        )}
      </main>
    </div>
  );
}
