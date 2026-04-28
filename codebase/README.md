# Northwind Product Catalog

Clean, responsive product catalog website with two public pages: Home and Catalog.

## Quick Start

1. Install dependencies:
	`npm install`
2. Start local server:
	`npm run dev`
3. Open:
	`http://localhost:3000`

## Commands

- `npm run dev` start development server
- `npm run build` create production build
- `npm run start` run production server
- `npm run lint` run lint checks
- `npm run typecheck` run TypeScript checks
- `npm run test` run unit tests
- `npm run test:e2e` run browser smoke tests
- `npm run test:e2e:headed` run browser smoke tests in headed mode
- `npm run test:mutation` run mutation testing

## Repository Setup and First Push

Run helper script:
`./scripts/setup-repo.ps1 -RemoteUrl <your-repository-url>`

Then push:
1. `git add .`
2. `git commit -m "feat: implement product catalog MVP"`
3. `git push -u origin 002-product-catalog-mvp`

## Deployment and Monitoring

- CI workflow: `.github/workflows/ci.yml`
- Infrastructure workflow: `.github/workflows/infra-azure.yml`
- Deployment workflow: `.github/workflows/deploy.yml`
- Set `APP_URL` as repository secret for endpoint checks.
- Monitoring verification guide: `infra/monitoring.md`
- Full automation runbook: `docs/deployment-automation.md`

Bootstrap command:
- `./scripts/bootstrap-github.ps1 -RepoName "product-catalog-website" -Visibility "private"`

## Scope Guardrails

Included:
- Home page
- Catalog page
- Category filtering
- In-page detail panel
- Friendly empty/error states

Excluded:
- Shopping cart
- Checkout and payments
- Customer accounts
- Admin roles
- Advanced analytics
