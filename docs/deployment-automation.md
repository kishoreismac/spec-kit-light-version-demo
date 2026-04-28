# Deployment Automation Runbook

Date: 2026-04-28

This runbook supports local-to-cloud automation when a GitHub repository may not exist yet.

## 1) Git Initialization

Automated command:

```powershell
git init
git checkout -B main
```

## 2) GitHub Repository Creation (when available)

Preferred automated path (GitHub CLI installed and authenticated):

```powershell
./scripts/bootstrap-repo.ps1 -CreateGitHubRepo -Owner <github-user-or-org> -RepoName <repo-name> -Visibility public -InitialPush
```

If GitHub CLI is not installed or not authenticated, execute these commands manually and continue:

```powershell
gh auth login
gh repo create <owner>/<repo> --public --source . --remote origin
```

## 3) Remote Origin Setup

Automated via script when `-RemoteUrl` or `-CreateGitHubRepo` is provided.

Manual fallback command:

```powershell
git remote add origin <git-url>
```

## 4) Initial Commit

Automated via script when `-InitialPush` is used.

Manual fallback commands:

```powershell
git add .
git commit -m "Initial product catalog setup"
```

## 5) Push to GitHub

Automated via script when remote is configured and `-InitialPush` is used.

Manual fallback command:

```powershell
git push -u origin main
```

## 6) Required GitHub Secrets

Set these repository secrets before running infrastructure or application deployment workflows:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

Manual command pattern (user executes with authenticated gh):

```powershell
gh secret set AZURE_CLIENT_ID --body "<value>"
gh secret set AZURE_TENANT_ID --body "<value>"
gh secret set AZURE_SUBSCRIPTION_ID --body "<value>"
```

## 7) Required GitHub Variables

Set these repository variables before infrastructure provisioning:

- `AZURE_RESOURCE_GROUP`
- `AZURE_LOCATION`
- `AZURE_STORAGE_ACCOUNT`

Manual command pattern:

```powershell
gh variable set AZURE_RESOURCE_GROUP --body "<resource-group-name>"
gh variable set AZURE_LOCATION --body "<azure-region>"
gh variable set AZURE_STORAGE_ACCOUNT --body "<globally-unique-storage-name>"
```

Note: `SITE_URL` is automatically set by the infrastructure workflow after provisioning succeeds.

## 8) Infrastructure Workflow (runs first)

Workflow file: `.github/workflows/infra.yml`

What it does:
- Logs into Azure
- Creates/updates resource group
- Creates storage account
- Enables static website hosting
- Discovers website endpoint and stores it as repository variable `SITE_URL`

Trigger options:

```powershell
gh workflow run "Infrastructure Provisioning"
```

or push changes to `main` touching infra files.

## 9) Application Deployment Workflow (runs second)

Workflow file: `.github/workflows/deploy.yml`

Trigger order:
- Automatically triggered by successful completion of `Infrastructure Provisioning` via `workflow_run`
- Can also be manually dispatched

What it does:
- Builds the app
- Logs into Azure
- Uploads `dist` to `$web` container
- Verifies deployed home and catalog URLs

Manual trigger command:

```powershell
gh workflow run "Deploy Static Site"
```

## 10) Deployment Verification

Automated verification is included in deployment workflow and in monitoring workflow.

Manual verification command:

```powershell
./scripts/verify-monitoring.ps1 -SiteUrl "https://<your-site-endpoint>"
```

## Authentication and Permission Boundaries

- If `gh auth login` is required, user must execute it interactively.
- If Azure OIDC credentials are missing or unauthorized, user must provide correct Entra app/service principal and permissions.
- After these manual authentication steps, all remaining script/workflow steps are automatable.