# Connect GRAIG to the website's telemetry (run once on the HP 8200).
#
# Generates one shared secret and writes it to both ends, without printing it:
#   - GRAIG:   GRAIG_SITE_OPS_TOKEN in C:\Jarvis\sonofgraig-jarvis\backend\.env
#   - website: OPS_TOKEN in ~/sog-website/.env.production.local on the T110,
#              then restarts sog-website so it takes effect.
# Re-running replaces the token on both ends (a rotation).
#
#   powershell -ExecutionPolicy Bypass -File ops\graig\connect-graig.ps1
$ErrorActionPreference = 'Stop'
$envFile = 'C:\Jarvis\sonofgraig-jarvis\backend\.env'
$key = "$env:USERPROFILE\.ssh\graig_t110"
$t110 = 'graig@100.87.178.52'

$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$token = -join ($bytes | ForEach-Object { $_.ToString('x2') })

# 1. GRAIG's .env (replace the line if present, else append)
$lines = @(Get-Content $envFile -Encoding UTF8 | Where-Object { $_ -notmatch '^GRAIG_SITE_OPS_TOKEN=' })
$lines += "GRAIG_SITE_OPS_TOKEN=$token"
Set-Content -Path $envFile -Value $lines -Encoding UTF8
Write-Host '1/2 GRAIG .env updated'

# 2. The website on the T110 (token over stdin, never on a command line)
$remote = 'f=~/sog-website/.env.production.local; read -r T; touch "$f"; chmod 600 "$f"; ' +
          'grep -v "^OPS_TOKEN=" "$f" > "$f.tmp" || true; echo "OPS_TOKEN=$T" >> "$f.tmp"; mv "$f.tmp" "$f"; ' +
          'sudo systemctl restart sog-website && sleep 4 && systemctl is-active sog-website'
$token | ssh -i $key -o BatchMode=yes $t110 $remote
if ($LASTEXITCODE -ne 0) { throw 'T110 step failed - GRAIG has the new token but the website does not' }
Write-Host '2/2 website updated and restarted'

# 3. Prove it: the summary answers 200 with the token, 401 without.
$ok = (Invoke-WebRequest -UseBasicParsing 'https://sonofgraig.com/api/ops/summary' -Headers @{ 'X-Ops-Token' = $token }).StatusCode
Write-Host "summary with token: $ok (expect 200)"
Write-Host 'Now restart GRAIG''s backend (tools\restart_backend_admin.ps1) so he reads the new .env.'
