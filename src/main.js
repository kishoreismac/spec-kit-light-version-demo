import './styles/tokens.css'
import './styles/app.css'
import { renderHomePage } from './pages/home.js'
import { renderCatalogPage } from './pages/catalog.js'

const app = document.querySelector('#app')
const page = document.body.dataset.page

if (!app) {
  throw new Error('App root not found')
}

if (page === 'catalog') {
  await renderCatalogPage(app)
} else {
  renderHomePage(app)
}
