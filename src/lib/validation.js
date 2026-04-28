const requiredProductFields = [
  'id',
  'slug',
  'name',
  'category',
  'shortDescription',
  'detailDescription',
  'image'
]

export function validateCatalogData(data) {
  if (!data || !Array.isArray(data.categories) || !Array.isArray(data.products)) {
    throw new Error('Catalog data is unavailable at the moment.')
  }

  const categoryKeys = new Set(data.categories.map((category) => category.key))
  const ids = new Set()
  const slugs = new Set()

  for (const product of data.products) {
    for (const field of requiredProductFields) {
      if (!product[field] || typeof product[field] !== 'string') {
        throw new Error('One or more products are incomplete.')
      }
    }

    if (ids.has(product.id) || slugs.has(product.slug)) {
      throw new Error('Product data contains duplicate entries.')
    }

    if (!categoryKeys.has(product.category)) {
      throw new Error('Product category mapping is invalid.')
    }

    ids.add(product.id)
    slugs.add(product.slug)
  }

  return true
}
