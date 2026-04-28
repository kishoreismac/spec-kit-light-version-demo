// @ts-nocheck
"use client";

import { Category } from "@/models/product";

type Props = {
  categories: Array<Category | "All">;
  active: Category | "All";
  onChange: (value: Category | "All") => void;
};

export function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <label>
      <span className="muted">Category</span>
      <select
        aria-label="Filter products by category"
        value={active}
        onChange={(event) => onChange(event.target.value as Category | "All")}
        className="ml-2 rounded-md border px-3 py-2"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}
