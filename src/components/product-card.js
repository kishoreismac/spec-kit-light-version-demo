export function productCardTemplate(product) {
  return `
    <article class="card" data-product-id="${product.id}">
      <img class="card-image" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-content">
        <p class="pill">${product.category.replace('-', ' ')}</p>
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <button class="ghost-button" type="button" data-product-detail="${product.id}">View details</button>
      </div>
    </article>
  `
}
