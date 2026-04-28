import { Category, Product } from "@/models/product";

export function filterProducts(
  items: Product[],
  activeCategory: Category | "All",
): Product[] {
  if (activeCategory === "All") {
    return items;
  }

  return items.filter((item) => item.category === activeCategory);
}
