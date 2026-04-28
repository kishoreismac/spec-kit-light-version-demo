import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/filtering";

describe("filterProducts", () => {
  it("returns all products for All category", () => {
    expect(filterProducts(products, "All")).toHaveLength(products.length);
  });

  it("returns only Office products for Office category", () => {
    const result = filterProducts(products, "Office");

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => item.category === "Office")).toBe(true);
  });
});
