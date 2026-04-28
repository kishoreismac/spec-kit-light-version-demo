import { test, expect } from '@playwright/test'

test('visitor browses home and catalog, filters products, and opens details', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Quality products')

  await page.getByRole('link', { name: 'Explore catalog' }).click()
  await expect(page).toHaveURL(/\/catalog\/$/)

  const filter = page.getByLabel('Category')
  await filter.selectOption('cheese')

  await expect(page.getByRole('heading', { level: 3, name: /Mild Cheddar Block/i })).toBeVisible()
  await page.getByRole('button', { name: 'View details' }).first().click()

  await expect(page.getByRole('heading', { level: 2, name: /Mild Cheddar Block/i })).toBeVisible()
})
