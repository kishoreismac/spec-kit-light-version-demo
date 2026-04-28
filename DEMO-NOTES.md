# Demo Notes

## Walkthrough Sequence

1. Open home page and explain catalog focus.
2. Navigate to catalog.
3. Filter by category.
4. Open a product detail panel.
5. Show responsive behavior with mobile and desktop viewport widths.

## Reliability Checks

- Build succeeds: npm run build
- Unit tests pass: npm run test
- Integration smoke passes: npm run test:integration
- Optional live browser run: npm run test:integration:headed

## Recovery Scenarios

- If no products match a category, the page provides a clear no-results message.
- If data loading fails, the page provides a clear service message.
