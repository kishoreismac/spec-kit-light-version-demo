import { describe, expect, test } from 'vitest'
import {
  createInitialState,
  selectCategory,
  selectProduct,
  setEmptyState,
  setErrorState,
  setReadyState
} from '../../src/lib/catalog-state.js'

describe('catalog-state', () => {
  test('creates loading state by default', () => {
    const state = createInitialState()
    expect(state.status).toBe('loading')
    expect(state.selectedCategory).toBeNull()
  })

  test('switches to ready and supports selection', () => {
    let state = setReadyState(createInitialState())
    state = selectCategory(state, 'fresh-milk')
    state = selectProduct(state, 'p001')

    expect(state.status).toBe('ready')
    expect(state.selectedCategory).toBe('fresh-milk')
    expect(state.selectedProductId).toBe('p001')
  })

  test('handles empty and error states', () => {
    const emptyState = setEmptyState(createInitialState(), 'No products available.')
    const errorState = setErrorState(createInitialState(), 'Unable to load catalog.')

    expect(emptyState.status).toBe('empty')
    expect(errorState.status).toBe('error')
  })
})
