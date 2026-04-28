import { Product } from "@/models/product";

type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateProducts(items: Product[]): ValidationResult {
  const allowedCategories = new Set(["Office", "Home", "Outdoor", "Accessories"]);
  const errors: string[] = [];

  if (items.length === 0) {
    errors.push("The catalog dataset is empty.");
  }

  for (const item of items) {
    if (!item.id || !item.name || !item.category) {
      errors.push(`Product ${item.id || "<missing-id>"} is missing required fields.`);
    }

    if (item.category && !allowedCategories.has(item.category)) {
      errors.push(`Product ${item.id} has unsupported category.`);
    }

    if (!item.shortDescription || !item.fullDescription || !item.imageUrl) {
      errors.push(`Product ${item.id} has incomplete content.`);
    }
  }

  return { valid: errors.length === 0, errors };
}
