export function getSortedCategories(categories) {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function filterProductsByCategory(products, selectedCategory) {
  if (!selectedCategory) {
    return products
  }
  return products.filter((product) => product.category === selectedCategory)
}
