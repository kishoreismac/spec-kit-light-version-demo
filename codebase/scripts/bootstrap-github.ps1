param(
  [Parameter(Mandatory = $false)]
  [string]$RepoName = "product-catalog-website",

  [Parameter(Mandatory = $false)]
  [string]$Visibility = "private",

  [Parameter(Mandatory = $false)]
  [string]$RemoteUrl = "",

  [Parameter(Mandatory = $false)]
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is required but was not found in PATH."
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$insideRepo = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0) {
  git init
}

git checkout -B $Branch

if (-not [string]::IsNullOrWhiteSpace($RemoteUrl)) {
  $existing = git remote get-url origin 2>$null
  if ($LASTEXITCODE -eq 0) {
    git remote set-url origin $RemoteUrl
  }
  else {
    git remote add origin $RemoteUrl
  }
}
elseif (Get-Command gh -ErrorAction SilentlyContinue) {
  try {
    $currentRemote = git remote get-url origin 2>$null
    if ($LASTEXITCODE -ne 0) {
      gh auth status | Out-Null
      gh repo create $RepoName --$Visibility --source . --remote origin --push
      Write-Host "GitHub repository created and initial push performed using GitHub CLI."
      exit 0
    }
  }
  catch {
    Write-Host "GitHub CLI is available but repository creation failed: $($_.Exception.Message)"
    Write-Host "You can rerun with -RemoteUrl <git-url> after creating the repository manually."
  }
}

git add .
$hasChanges = git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m "chore: bootstrap product catalog deployment automation"
}

$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  git push -u origin $Branch
  Write-Host "Initial push complete."
}
else {
  Write-Host "No remote origin configured."
  Write-Host "Set one with: git remote add origin <url>"
  Write-Host "Then push with: git push -u origin $Branch"
}
