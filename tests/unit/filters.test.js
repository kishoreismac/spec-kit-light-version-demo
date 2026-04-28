import { describe, expect, test } from 'vitest'
import { filterProductsByCategory, getSortedCategories } from '../../src/lib/filters.js'

describe('filters', () => {
  test('sorts categories by sortOrder', () => {
    const input = [
      { key: 'b', sortOrder: 2 },
      { key: 'a', sortOrder: 1 }
    ]

    const sorted = getSortedCategories(input)
    expect(sorted[0].key).toBe('a')
    expect(sorted[1].key).toBe('b')
  })

  test('filters products by selected category', () => {
    const products = [
      { id: '1', category: 'milk' },
      { id: '2', category: 'cheese' }
    ]

    expect(filterProductsByCategory(products, 'milk')).toHaveLength(1)
    expect(filterProductsByCategory(products, null)).toHaveLength(2)
    expect(filterProductsByCategory(products, 'butter')).toHaveLength(0)
  })

  test('returns new sorted array without mutating input', () => {
    const categories = [
      { key: 'c', sortOrder: 3 },
      { key: 'a', sortOrder: 1 },
      { key: 'b', sortOrder: 2 }
    ]

    const sorted = getSortedCategories(categories)
    expect(sorted.map((item) => item.key)).toEqual(['a', 'b', 'c'])
    expect(categories.map((item) => item.key)).toEqual(['c', 'a', 'b'])
  })
})
