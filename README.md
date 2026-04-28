# DairyFresh Product Catalog

A compact, client-facing product catalog website with:
- Home page and catalog page
- Category filtering
- In-page product detail section
- Responsive layout for mobile and desktop
- Friendly empty and error handling

## Quick Start

```powershell
npm install
npm run dev
```

Open:
- http://localhost:5173/
- http://localhost:5173/catalog/

## Validation Commands

```powershell
npm run lint
npm run test
npm run build
npm run test:integration
npm run test:integration:headed
```

## Mutation Testing

```powershell
pip install cosmic-ray
npm run mutation
```

Mutation output:
- reports/mutation/latest.txt

## Repository Bootstrap and Initial Push

```powershell
./scripts/bootstrap-repo.ps1 -RemoteUrl <git-url> -Branch main -InitialPush
```

Requires Git authentication for your remote provider.

Or create and push a new GitHub repository automatically when GitHub CLI is available:

```powershell
./scripts/bootstrap-repo.ps1 -CreateGitHubRepo -Owner <github-user-or-org> -RepoName <repo-name> -Visibility public -InitialPush
```

## Deployment and Monitoring

- CI workflow: .github/workflows/ci.yml
- Infrastructure workflow (runs first): .github/workflows/infra.yml
- Deployment workflow (runs after infrastructure): .github/workflows/deploy.yml
- Monitoring workflow: .github/workflows/monitor.yml

Deployment automation runbook:
- docs/deployment-automation.md

Set repository variable `SITE_URL` (or run infrastructure workflow to set it automatically).
