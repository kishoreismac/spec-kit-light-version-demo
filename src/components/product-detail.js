export function productDetailTemplate(product) {
  if (!product) {
    return `
      <section class="detail-panel" aria-live="polite">
        <h2>Product details</h2>
        <p>Select a product to view complete information.</p>
      </section>
    `
  }

  return `
    <section class="detail-panel" aria-live="polite">
      <img class="detail-image" src="${product.image}" alt="${product.name}" />
      <div>
        <p class="pill">${product.category.replace('-', ' ')}</p>
        <h2>${product.name}</h2>
        <p>${product.detailDescription}</p>
      </div>
    </section>
  `
}
