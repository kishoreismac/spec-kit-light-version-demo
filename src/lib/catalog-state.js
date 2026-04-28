export function createInitialState() {
  return {
    selectedCategory: null,
    selectedProductId: null,
    status: 'loading',
    message: null
  }
}

export function setReadyState(state) {
  return {
    ...state,
    status: 'ready',
    message: null
  }
}

export function setEmptyState(state, message) {
  return {
    ...state,
    selectedProductId: null,
    status: 'empty',
    message
  }
}

export function setErrorState(state, message) {
  return {
    ...state,
    selectedProductId: null,
    status: 'error',
    message
  }
}

export function selectCategory(state, category) {
  return {
    ...state,
    selectedCategory: category,
    selectedProductId: null
  }
}

export function selectProduct(state, productId) {
  return {
    ...state,
    selectedProductId: productId
  }
}
