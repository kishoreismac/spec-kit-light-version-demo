export function categoryFilterTemplate(categories, selectedCategory) {
  const options = categories
    .map(
      (category) =>
        `<option value="${category.key}" ${selectedCategory === category.key ? 'selected' : ''}>${category.label}</option>`
    )
    .join('')

  return `
    <label class="filter-label" for="category-filter">
      Category
      <select id="category-filter" name="category-filter">
        <option value="">All categories</option>
        ${options}
      </select>
    </label>
  `
}
