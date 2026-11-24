#!/bin/sh
set -e

cd /app
mkdir -p /app/data "$(dirname "${OPENAPI_PATH:-/tmp/job-notifier/openapi.yaml}")"

lock_hash="$(sha256sum package.json package-lock.json)"
if [ "$lock_hash" != "$(cat node_modules/.lock-hash 2>/dev/null)" ]; then
    npm ci --no-audit --no-fund
    echo "$lock_hash" > node_modules/.lock-hash
fi

node /app/scripts/init-db.js

node /app/scripts/generate-openapi.js

exec "$@"
