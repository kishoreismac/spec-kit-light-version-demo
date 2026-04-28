import catalogData from '../data/products.json'
import { productCardTemplate } from '../components/product-card.js'
import { productDetailTemplate } from '../components/product-detail.js'
import { categoryFilterTemplate } from '../components/category-filter.js'
import { statusMessageTemplate } from '../components/status-message.js'
import { getSortedCategories, filterProductsByCategory } from '../lib/filters.js'
import {
  createInitialState,
  setReadyState,
  setEmptyState,
  setErrorState,
  selectCategory,
  selectProduct
} from '../lib/catalog-state.js'
import { validateCatalogData } from '../lib/validation.js'
import { toFriendlyErrorMessage } from '../lib/errors.js'

function renderCatalog(app, state, categories, products) {
  const filteredProducts = filterProductsByCategory(products, state.selectedCategory)
  const selectedProduct = filteredProducts.find((item) => item.id === state.selectedProductId) || null

  let viewState = state
  if (viewState.status === 'ready' && filteredProducts.length === 0) {
    viewState = setEmptyState(viewState, 'No products are available in this category yet. Please select another category.')
  }

  const cardMarkup = filteredProducts.map((product) => productCardTemplate(product)).join('')

  app.innerHTML = `
    <section class="catalog-header">
      <div>
        <p class="eyebrow">Product catalog</p>
        <h1>Find the right dairy products for your needs.</h1>
      </div>
      ${categoryFilterTemplate(categories, viewState.selectedCategory)}
    </section>

    ${statusMessageTemplate(viewState.status, viewState.message)}

    <section class="catalog-grid" aria-live="polite">
      ${cardMarkup || '<p class="status-message">No products to display right now.</p>'}
    </section>

    ${productDetailTemplate(selectedProduct)}
  `

  const filterSelect = app.querySelector('#category-filter')
  if (filterSelect) {
    filterSelect.addEventListener('change', (event) => {
      const value = event.target.value || null
      const updatedState = selectCategory(setReadyState(viewState), value)
      renderCatalog(app, updatedState, categories, products)
    })
  }

  app.querySelectorAll('[data-product-detail]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-product-detail')
      const updatedState = selectProduct(setReadyState(viewState), id)
      renderCatalog(app, updatedState, categories, products)
    })
  })
}

export async function renderCatalogPage(app) {
  let state = createInitialState()

  try {
    validateCatalogData(catalogData)
    const categories = getSortedCategories(catalogData.categories)
    const products = catalogData.products
    state = setReadyState(state)
    renderCatalog(app, state, categories, products)
  } catch (error) {
    state = setErrorState(state, toFriendlyErrorMessage(error))
    app.innerHTML = `
      <section class="catalog-header">
        <div>
          <p class="eyebrow">Product catalog</p>
          <h1>Find the right dairy products for your needs.</h1>
        </div>
      </section>
      ${statusMessageTemplate(state.status, state.message)}
    `
  }
}
