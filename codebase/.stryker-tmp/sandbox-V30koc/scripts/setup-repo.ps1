param(
  [string]$RemoteUrl = ""
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git is not installed."
  exit 1
}

$insideRepo = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0) {
  git init
}

$currentBranch = git rev-parse --abbrev-ref HEAD
if ([string]::IsNullOrWhiteSpace($currentBranch)) {
  git checkout -b main
}

if (-not [string]::IsNullOrWhiteSpace($RemoteUrl)) {
  $hasRemote = git remote get-url origin 2>$null
  if ($LASTEXITCODE -ne 0) {
    git remote add origin $RemoteUrl
  }
}

Write-Host "Repository setup complete."
Write-Host "Next push command: git push -u origin $(git rev-parse --abbrev-ref HEAD)"
