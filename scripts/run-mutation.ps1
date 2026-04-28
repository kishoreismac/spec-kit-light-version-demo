$ErrorActionPreference = 'Stop'

if (-not (Get-Command cosmic-ray -ErrorAction SilentlyContinue)) {
  Write-Host "cosmic-ray is not installed. Install with: pip install cosmic-ray"
  exit 1
}

$DbPath = ".cosmic-ray.sqlite"
$ReportPath = "reports/mutation/latest.txt"

if (Test-Path $DbPath) {
  Remove-Item $DbPath -Force
}

New-Item -ItemType Directory -Force -Path "reports/mutation" | Out-Null

cosmic-ray init tests/mutation/cosmic-ray.toml $DbPath
cosmic-ray exec $DbPath
cr-report $DbPath | Out-File -FilePath $ReportPath -Encoding utf8

Write-Host "Mutation report written to $ReportPath"
