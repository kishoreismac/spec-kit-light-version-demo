// @ts-nocheck
export type Category = "Office" | "Home" | "Outdoor" | "Accessories";

export type Product = {
  id: string;
  name: string;
  category: Category;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
};
