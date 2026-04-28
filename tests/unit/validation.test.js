import { describe, expect, test } from 'vitest'
import { validateCatalogData } from '../../src/lib/validation.js'

describe('validation', () => {
  const baseProduct = {
    id: 'p1',
    slug: 'milk-1',
    name: 'Milk 1L',
    category: 'milk',
    shortDescription: 'Fresh milk',
    detailDescription: 'Fresh milk for daily meals.',
    image: '/images/milk.svg'
  }

  test('accepts valid dataset', () => {
    const data = {
      categories: [{ key: 'milk', label: 'Milk', sortOrder: 0 }],
      products: [baseProduct]
    }

    expect(validateCatalogData(data)).toBe(true)
  })

  test('throws on duplicate products', () => {
    const data = {
      categories: [{ key: 'milk', label: 'Milk', sortOrder: 0 }],
      products: [baseProduct, { ...baseProduct, slug: 'milk-2' }]
    }

    expect(() => validateCatalogData(data)).toThrow()
  })

  test('throws on duplicate slug', () => {
    const data = {
      categories: [{ key: 'milk', label: 'Milk', sortOrder: 0 }],
      products: [baseProduct, { ...baseProduct, id: 'p2' }]
    }

    expect(() => validateCatalogData(data)).toThrow('duplicate entries')
  })

  test('throws when product category is unknown', () => {
    const data = {
      categories: [{ key: 'milk', label: 'Milk', sortOrder: 0 }],
      products: [{ ...baseProduct, category: 'cheese' }]
    }

    expect(() => validateCatalogData(data)).toThrow('category mapping is invalid')
  })

  test('throws when required product field is missing', () => {
    const data = {
      categories: [{ key: 'milk', label: 'Milk', sortOrder: 0 }],
      products: [{ ...baseProduct, image: '' }]
    }

    expect(() => validateCatalogData(data)).toThrow('incomplete')
  })
})
