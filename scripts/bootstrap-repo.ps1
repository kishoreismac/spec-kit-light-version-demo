param(
  [string]$RepoName = 'spec-kit-light-version-demo',
  [string]$Owner,
  [ValidateSet('public', 'private')]
  [string]$Visibility = 'public',
  [string]$RemoteUrl,
  [string]$Branch = 'main',
  [switch]$InitialPush,
  [switch]$CreateGitHubRepo
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'git is required but was not found in PATH.'
}

if (-not (Test-Path '.git')) {
  git init
}

$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) {
  git checkout -b $Branch
} elseif ($currentBranch -ne $Branch) {
  git checkout -B $Branch
}

$existingRemote = $null
try {
  $existingRemote = (git remote get-url origin 2>$null)
} catch {
  $existingRemote = $null
}

if (-not $RemoteUrl -and $CreateGitHubRepo) {
  if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Warning 'GitHub CLI is not installed. User-executed command required:'
    Write-Host '  gh repo create <owner>/<repo> --public --source . --remote origin'
  } else {
    gh auth status 1>$null 2>$null
    if ($LASTEXITCODE -ne 0) {
      Write-Warning 'GitHub CLI is installed but not authenticated. User-executed command required:'
      Write-Host '  gh auth login'
    } else {
      if (-not $Owner) {
        $Owner = (gh api user --jq '.login')
      }

      if (-not $Owner) {
        throw 'Unable to determine GitHub owner. Provide -Owner explicitly.'
      }

      $fullRepo = "$Owner/$RepoName"
      Write-Host "Creating repository: $fullRepo"
      gh repo create $fullRepo --$Visibility --source . --remote origin 1>$null
      $RemoteUrl = "https://github.com/$fullRepo.git"
    }
  }
}

if (-not $RemoteUrl) {
  if (-not $existingRemote) {
    Write-Warning 'No remote configured. User-executed command required:'
    Write-Host '  git remote add origin <your-git-url>'
  }
} else {
  if (-not $existingRemote) {
    git remote add origin $RemoteUrl
  } else {
    git remote set-url origin $RemoteUrl
  }
}

if ($InitialPush) {
  git add .
  git commit -m 'Initial product catalog setup' 2>$null

  $remoteAfterSetup = $null
  try {
    $remoteAfterSetup = (git remote get-url origin 2>$null)
  } catch {
    $remoteAfterSetup = $null
  }
  if (-not $remoteAfterSetup) {
    Write-Warning 'Push skipped because origin is not configured. Configure origin and run:'
    Write-Host "  git push -u origin $Branch"
  } else {
    git push -u origin $Branch
  }
}

if ($RemoteUrl) {
  Write-Host "Repository configured with origin: $RemoteUrl"
}
