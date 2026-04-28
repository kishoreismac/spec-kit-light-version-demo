# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog-smoke.spec.ts >> catalog flow works
- Location: tests\e2e\catalog-smoke.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Conference Room Chair' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'Conference Room Chair' }) resolved to 2 elements:
    1) <h3 class="mt-2 text-lg font-semibold">Conference Room Chair</h3> aka getByRole('button', { name: 'Conference Room Chair Office' })
    2) <h2 class="mt-2 text-xl font-semibold">Conference Room Chair</h2> aka locator('h2')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Conference Room Chair' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]
  - generic [ref=e12]:
    - banner [ref=e13]:
      - generic [ref=e14]:
        - link "Northwind Catalog" [ref=e15] [cursor=pointer]:
          - /url: /
        - navigation "Primary" [ref=e16]:
          - link "Home" [ref=e17] [cursor=pointer]:
            - /url: /
          - link "Catalog" [ref=e18] [cursor=pointer]:
            - /url: /catalog
    - main [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]:
          - heading "Product Catalog" [level=1] [ref=e22]
          - paragraph [ref=e23]: Browse products by category and view full details.
        - generic [ref=e24]:
          - text: Category
          - combobox "Filter products by category" [ref=e25]:
            - option "All"
            - option "Office" [selected]
            - option "Home"
            - option "Outdoor"
            - option "Accessories"
      - generic [ref=e26]:
        - region "Catalog products" [ref=e27]:
          - article [ref=e28]:
            - button "Executive Desk Organizer Office Executive Desk Organizer Clean desktop storage for daily essentials." [ref=e29]:
              - img "Executive Desk Organizer" [ref=e30]
              - paragraph [ref=e31]: Office
              - heading "Executive Desk Organizer" [level=3] [ref=e32]
              - paragraph [ref=e33]: Clean desktop storage for daily essentials.
          - article [ref=e34]:
            - button "Conference Room Chair Office Conference Room Chair Comfortable seating with a professional look." [active] [ref=e35]:
              - img "Conference Room Chair" [ref=e36]
              - paragraph [ref=e37]: Office
              - heading "Conference Room Chair" [level=3] [ref=e38]
              - paragraph [ref=e39]: Comfortable seating with a professional look.
          - article [ref=e40]:
            - button "Acoustic Divider Panel Office Acoustic Divider Panel Improve workspace focus and privacy." [ref=e41]:
              - img "Acoustic Divider Panel" [ref=e42]
              - paragraph [ref=e43]: Office
              - heading "Acoustic Divider Panel" [level=3] [ref=e44]
              - paragraph [ref=e45]: Improve workspace focus and privacy.
        - complementary [ref=e46]:
          - img "Conference Room Chair" [ref=e47]
          - paragraph [ref=e48]: Office
          - heading "Conference Room Chair" [level=2] [ref=e49]
          - paragraph [ref=e50]: Ergonomic support and durable upholstery designed for long meetings and guest seating.
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("catalog flow works", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   await expect(page.getByRole("link", { name: "Browse Catalog" })).toBeVisible();
  6  | 
  7  |   await page.getByRole("link", { name: "Browse Catalog" }).click();
  8  |   await expect(page.getByRole("heading", { name: "Product Catalog" })).toBeVisible();
  9  | 
  10 |   await page.getByLabel("Filter products by category").selectOption("Office");
  11 |   await expect(page.getByText("Conference Room Chair")).toBeVisible();
  12 | 
  13 |   await page.getByRole("button", { name: /Conference Room Chair/i }).click();
> 14 |   await expect(page.getByRole("heading", { name: "Conference Room Chair" })).toBeVisible();
     |                                                                              ^ Error: expect(locator).toBeVisible() failed
  15 | });
  16 | 
```