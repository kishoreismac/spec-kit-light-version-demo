export function renderHomePage(app) {
  app.innerHTML = `
    <section class="hero-block">
      <p class="eyebrow">Fresh dairy selections</p>
      <h1>Quality products crafted for everyday kitchens.</h1>
      <p>
        Browse our curated range of milk, yogurt, cheese, and butter products
        prepared to support households and food businesses.
      </p>
      <a class="primary-button" href="/catalog/">Explore catalog</a>
    </section>

    <section class="feature-grid" aria-label="Highlights">
      <article>
        <h2>Curated selection</h2>
        <p>Only proven products are listed for a focused browsing experience.</p>
      </article>
      <article>
        <h2>Clear categories</h2>
        <p>Find products quickly using simple category filters.</p>
      </article>
      <article>
        <h2>Reliable quality</h2>
        <p>Each listing includes concise details to support confident choices.</p>
      </article>
    </section>
  `
}
