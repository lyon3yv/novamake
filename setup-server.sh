#!/usr/bin/env bash
# setup-server.sh
# Ubuntu 20.04/22.04 minimal setup for Discord Block Builder
set -euo pipefail

# Usage: sudo ./setup-server.sh your_user
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root: sudo $0 <deploy-user>"
  exit 1
fi

DEPLOY_USER=${1:-www-data}
PROJECT_DIR=/home/$DEPLOY_USER/discord-block-builder

apt update && apt upgrade -y
apt install -y curl git build-essential nginx certbot python3-certbot-nginx

# Install Node 18.x (recommended)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Create deploy user home dir if missing
mkdir -p /home/$DEPLOY_USER
chown $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER

# Ensure project data directory will exist and be writable by deploy user
mkdir -p /home/$DEPLOY_USER/discord-block-builder/data
chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/discord-block-builder

echo "Setup complete. Next: clone your repo into $PROJECT_DIR and run npm install as the deploy user."

# Example commands to run as the deploy user (not run by this script):
# git clone <repo-url> $PROJECT_DIR
# cd $PROJECT_DIR
# npm install
# pm2 start ecosystem.config.js --env production
# pm2 save

exit 0
