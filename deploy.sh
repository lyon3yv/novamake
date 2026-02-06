#!/usr/bin/env bash
# deploy.sh
# Usage: ./deploy.sh user@host /path/to/remote/dir
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 user@host /remote/path"
  exit 1
fi

REMOTE=$1
REMOTE_DIR=$2

# Sync current directory (excluding node_modules) to remote
rsync -avz --exclude node_modules --exclude .git ./ ${REMOTE}:${REMOTE_DIR}

# Run remote install and restart with PM2
ssh ${REMOTE} <<'SSH'
  set -e
  cd "$REMOTE_DIR"
  # Ensure data directory exists and is writable
  mkdir -p "$REMOTE_DIR/data"
  chown -R $(whoami):$(whoami) "$REMOTE_DIR/data" || true
  npm install --production
  pm2 start ecosystem.config.js --env production || pm2 reload ecosystem.config.js --env production
  pm2 save
SSH

echo "Deploy completed to ${REMOTE}:${REMOTE_DIR}"
