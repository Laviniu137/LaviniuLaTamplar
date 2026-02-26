#!/usr/bin/env bash
set -euo pipefail

# Usage: gh-api-retry.sh "repos/OWNER/REPO/pages/telemetry" [--input payload.json]
# Example: ./gh-api-retry.sh "repos/$GITHUB_REPOSITORY/pages/telemetry"

URL="$1"
shift || true
ARGS=("$@")

MAX_RETRIES=${MAX_RETRIES:-5}
BASE_SLEEP=${BASE_SLEEP:-2}

echo "gh-api-retry: POST $URL (max $MAX_RETRIES tries)"

for attempt in $(seq 1 "$MAX_RETRIES"); do
  echo "Attempt $attempt/$MAX_RETRIES..."
  if gh api -X POST "$URL" "${ARGS[@]}"; then
    echo "gh api succeeded"
    exit 0
  else
    rc=$?
    echo "gh api failed (exit $rc)"
    if [ "$attempt" -eq "$MAX_RETRIES" ]; then
      echo "Reached max retries — exiting with $rc"
      exit $rc
    fi
    sleep_seconds=$(( BASE_SLEEP * 2 ** (attempt - 1) ))
    echo "Sleeping $sleep_seconds s before retry..."
    sleep "$sleep_seconds"
  fi
done
