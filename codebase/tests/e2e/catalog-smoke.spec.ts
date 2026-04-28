import { test, expect } from "@playwright/test";

test("catalog flow works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Browse Catalog" })).toBeVisible();

  await page.getByRole("link", { name: "Browse Catalog" }).click();
  await expect(page.getByRole("heading", { name: "Product Catalog" })).toBeVisible();

  await page.getByLabel("Filter products by category").selectOption("Office");
  await expect(page.getByText("Conference Room Chair")).toBeVisible();

  await page.getByRole("button", { name: /Conference Room Chair/i }).click();
  await expect(page.locator(".detail-panel h2", { hasText: "Conference Room Chair" })).toBeVisible();
});
