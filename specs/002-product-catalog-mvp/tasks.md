# Tasks: Simple Product Catalog Website

**Input**: Design documents from `/specs/002-product-catalog-mvp/`  
**Prerequisites**: `plan.md`, `spec.md`  
**Scope Mode**: Compact demo build only (low-value tasks removed)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: `US1` browse, `US2` filter, `US3` detail, `SHARED` cross-cutting
- Each task includes file paths, command hints, automation mode, and auth needs

## Phase 1: Setup and Foundation

- [X] T001 [SHARED] Initialize web app baseline and scripts in `package.json`, `tsconfig.json`, `next.config.js`, `.gitignore`.
  - Command: `npm create next-app@latest . --ts --eslint --app --src-dir --use-npm`
  - Automation: Automated
  - Auth: No

- [X] T002 [P] [SHARED] Create core directories and base app shell in `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/catalog/page.tsx`, `src/styles/globals.css`.
  - Command: `mkdir -p src/app/catalog src/components src/data src/models src/lib src/styles tests/unit tests/e2e tests/mutation .github/workflows`
  - Automation: Manual edit + command assist
  - Auth: No

- [X] T003 [P] [SHARED] Define data types and category enum in `src/models/product.ts`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T004 [SHARED] Add 10-item seed dataset in `src/data/products.ts` matching locked shape.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T005 [SHARED] Add seed-data validation and filter utility in `src/lib/validation.ts`, `src/lib/filtering.ts`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

## Phase 2: User Story Implementation

- [X] T006 [US1] Implement Home page with business-facing CTA in `src/app/page.tsx` and nav in `src/components/nav.tsx`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T007 [US1] Implement Catalog page layout and product grid in `src/app/catalog/page.tsx`, `src/components/product-card.tsx`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T008 [US2] Implement category filter control and query state in `src/components/category-filter.tsx`, `src/app/catalog/page.tsx`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T009 [US3] Implement in-page detail panel and selection behavior in `src/components/product-detail-panel.tsx`, `src/app/catalog/page.tsx`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T010 [SHARED] Implement friendly empty/error states and image fallback in `src/components/empty-state.tsx`, `src/app/error.tsx`, `src/components/product-card.tsx`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T011 [SHARED] Apply mobile-first responsive styling in `src/styles/globals.css` and component class usage in `src/components/*.tsx`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

## Phase 3: Test and Demo Verification

- [X] T012 [P] [SHARED] Add unit tests for filtering and validation in `tests/unit/filtering.test.ts`, `tests/unit/validation.test.ts`.
  - Command: `npm run test -- tests/unit`
  - Automation: Automated execution
  - Auth: No

- [X] T013 [SHARED] Add headed live browser smoke tests in `tests/e2e/catalog-smoke.spec.ts`.
  - Command: `npx playwright test tests/e2e/catalog-smoke.spec.ts --headed`
  - Automation: Automated execution (interactive browser)
  - Auth: No

- [X] T014 [SHARED] Configure mutation testing in `tests/mutation/stryker.config.json` and add scripts in `package.json`.
  - Command: `npm run test:mutation`
  - Automation: Automated execution
  - Auth: No

- [X] T015 [SHARED] Generate mutation report artifacts to `reports/mutation/` and capture score in `specs/002-product-catalog-mvp/demo-notes.md`.
  - Command: `npm run test:mutation -- --reporters html clear-text json`
  - Automation: Automated execution + manual note capture
  - Auth: No

## Phase 4: Repo and CI/CD Automation

- [X] T016 [SHARED] Add repository bootstrap/push helper script in `scripts/setup-repo.ps1` (init, branch check, first push guidance).
  - Command: `./scripts/setup-repo.ps1`
  - Automation: Semi-automated (script)
  - Auth: Yes (GitHub auth for push)

- [X] T017 [SHARED] Add CI workflow in `.github/workflows/ci.yml` for lint, typecheck, unit tests, e2e smoke, mutation run.
  - Command: GitHub Actions on PR/push
  - Automation: Automated
  - Auth: Yes (GitHub Actions token context)

- [X] T018 [SHARED] Add deployment workflow in `.github/workflows/deploy.yml` for manual dispatch + main branch deploy.
  - Command: GitHub Actions workflow_dispatch / push main
  - Automation: Automated
  - Auth: Yes (deployment secrets)

- [X] T019 [SHARED] Add deployment target config and env template in `.github/workflows/deploy.yml`, `.env.example`, `README.md`.
  - Command: none
  - Automation: Manual edit
  - Auth: Yes (for real secret values)

## Phase 5: Infrastructure, Monitoring, and Finalization

- [X] T020 [SHARED] Provision minimal hosting + uptime checks using selected provider configuration (document provider-specific file under `infra/` if needed).
  - Command: provider CLI or portal steps documented in `specs/002-product-catalog-mvp/demo-notes.md`
  - Automation: Manual or provider-automated
  - Auth: Yes (cloud account)

- [X] T021 [SHARED] Verify post-deploy monitoring for `/` and `/catalog`, and record alert behavior in `specs/002-product-catalog-mvp/demo-notes.md`.
  - Command: monitoring check URL run or provider synthetic test
  - Automation: Semi-automated
  - Auth: Yes (monitoring dashboard)

- [X] T022 [SHARED] Finalize runbook docs in `README.md` with setup, run, test, mutation, deploy, and rollback quick commands.
  - Command: none
  - Automation: Manual edit
  - Auth: No

- [X] T023 [SHARED] Create final demo walkthrough notes and acceptance checklist in `specs/002-product-catalog-mvp/demo-notes.md`.
  - Command: none
  - Automation: Manual edit
  - Auth: No

## Dependency Order (Compact)

1. T001 -> T002 -> T003/T004 (parallel) -> T005
2. T005 -> T006 -> T007 -> T008 + T009 (parallel) -> T010 -> T011
3. T011 -> T012 + T013 (parallel) -> T014 -> T015
4. T015 -> T016 + T017 (parallel) -> T018 -> T019
5. T019 -> T020 -> T021 -> T022 + T023

## High-Value Cuts Applied

- No separate admin UI tasks
- No shopping/cart/payment/account tasks
- No advanced analytics/dashboard tasks
- No extra page expansion tasks beyond Home and Catalog
