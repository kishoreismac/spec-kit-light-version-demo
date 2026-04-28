// @ts-nocheck
import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { validateProducts } from "@/lib/validation";

describe("validateProducts", () => {
  it("accepts complete product data", () => {
    const result = validateProducts(products);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects empty data", () => {
    const result = validateProducts([]);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("empty");
  });
});
