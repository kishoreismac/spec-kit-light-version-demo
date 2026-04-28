param(
  [Parameter(Mandatory = $true)]
  [string]$SiteUrl
)

$ErrorActionPreference = 'Stop'

$homeStatus = (Invoke-WebRequest -Uri "$SiteUrl/" -UseBasicParsing).StatusCode
$catalogStatus = (Invoke-WebRequest -Uri "$SiteUrl/catalog/" -UseBasicParsing).StatusCode

if ($homeStatus -ne 200 -or $catalogStatus -ne 200) {
  throw "Monitoring check failed. Home=$homeStatus Catalog=$catalogStatus"
}

Write-Host "Monitoring check passed. Home=$homeStatus Catalog=$catalogStatus"
