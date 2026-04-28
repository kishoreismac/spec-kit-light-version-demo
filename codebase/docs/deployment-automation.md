# Automated Deployment Path

This runbook defines executable commands and workflow order for Git, GitHub, and Azure deployment automation.

## 1) Git initialization

From repository root:

```powershell
Set-Location "c:\Work\Spec-Kit Light Version-Demo\codebase"
git init
git checkout -B main
```

## 2) Create GitHub repository (GitHub CLI when available)

```powershell
gh auth login
gh repo create product-catalog-website --private --source . --remote origin --push
```

If GitHub CLI is not available, create the repository in GitHub UI and continue with remote setup.

## 3) Remote origin setup

```powershell
git remote add origin https://github.com/<owner>/product-catalog-website.git
```

If `origin` already exists:

```powershell
git remote set-url origin https://github.com/<owner>/product-catalog-website.git
```

## 4) Initial commit

```powershell
git add .
git commit -m "feat: product catalog MVP with automated Azure deployment"
```

## 5) Push to GitHub

```powershell
git push -u origin main
```

## Optional one-command bootstrap

```powershell
./scripts/bootstrap-github.ps1 -RepoName "product-catalog-website" -Visibility "private"
```

For manual remote flow:

```powershell
./scripts/bootstrap-github.ps1 -RemoteUrl "https://github.com/<owner>/product-catalog-website.git"
```

## Required GitHub secrets

Configure these in repository settings > Secrets and variables > Actions:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_RESOURCE_GROUP`
- `AZURE_LOCATION`
- `AZURE_STORAGE_ACCOUNT`
- `APP_URL` (optional for endpoint checks)

Example using GitHub CLI:

```powershell
gh secret set AZURE_CLIENT_ID --body "<client-id>"
gh secret set AZURE_TENANT_ID --body "<tenant-id>"
gh secret set AZURE_SUBSCRIPTION_ID --body "<subscription-id>"
gh secret set AZURE_RESOURCE_GROUP --body "<resource-group-name>"
gh secret set AZURE_LOCATION --body "eastus"
gh secret set AZURE_STORAGE_ACCOUNT --body "<globally-unique-storage-account>"
gh secret set APP_URL --body "https://<your-storage-account>.z13.web.core.windows.net"
```

## Azure account setup commands

Login and select subscription:

```powershell
az login
az account set --subscription <subscription-id>
```

Create service principal for GitHub OIDC (recommended):

```powershell
az ad app create --display-name "catalog-gh-actions"
# Then configure federated credentials for the repo and environment in Entra ID.
```

Grant contributor on target resource group:

```powershell
az role assignment create \
  --assignee <app-client-id> \
  --role Contributor \
  --scope /subscriptions/<sub-id>/resourceGroups/<rg-name>
```

## Infrastructure workflow through GitHub Actions

Workflow: `.github/workflows/infra-azure.yml`

What it does:
- Azure login using OIDC secrets
- Resource group creation
- Bicep deployment from `codebase/infra/azure/main.bicep`
- Static website endpoint output

## Application deployment workflow through GitHub Actions

Workflow: `.github/workflows/deploy.yml`

What it does:
- Waits for successful infra workflow
- Builds static output from `codebase`
- Uploads built files to Azure Storage `$web` container
- Runs endpoint checks when `APP_URL` is set

## Workflow trigger order

1. `Azure Infra` runs first:
   - manual dispatch, or
   - push affecting infra workflow/Bicep files on `main`
2. `App Deploy` runs second:
   - automatically on successful `Azure Infra` via `workflow_run`, or
   - manual dispatch
3. `monitoring-check` runs after deploy in `App Deploy` when `APP_URL` is configured
