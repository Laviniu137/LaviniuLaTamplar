Param(
    [Parameter(Mandatory=$true)][string]$Url,
    [int]$MaxRetries = 5,
    [int]$BaseSleep = 2,
    [string[]]$GhArgs
)

Write-Host "gh-api-retry.ps1: POST $Url (max $MaxRetries tries)"

for ($i = 1; $i -le $MaxRetries; $i++) {
    Write-Host "Attempt $i of $MaxRetries..."
    try {
        gh api -X POST $Url @GhArgs
        Write-Host "gh api succeeded"
        exit 0
    } catch {
        $rc = $LASTEXITCODE
        Write-Host "gh api failed (exit $rc)"
        if ($i -eq $MaxRetries) {
            Write-Host "Reached max retries — exiting with $rc"
            exit $rc
        }
        $sleep = $BaseSleep * [math]::Pow(2, $i - 1)
        Write-Host "Sleeping $sleep seconds before retry..."
        Start-Sleep -Seconds $sleep
    }
}
