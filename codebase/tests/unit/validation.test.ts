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

  it("rejects items with missing required fields", () => {
    const invalid = [
      {
        ...products[0],
        id: "",
      },
    ];

    const result = validateProducts(invalid as typeof products);
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes("missing required fields"))).toBe(true);
  });

  it("rejects items with incomplete descriptive content", () => {
    const invalid = [
      {
        ...products[0],
        shortDescription: "",
      },
    ];

    const result = validateProducts(invalid as typeof products);
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes("incomplete content"))).toBe(true);
  });

  it("rejects unsupported category values", () => {
    const invalid = [
      {
        ...products[0],
        category: "Unknown",
      },
    ];

    const result = validateProducts(invalid as unknown as typeof products);
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes("unsupported category"))).toBe(true);
  });
});
