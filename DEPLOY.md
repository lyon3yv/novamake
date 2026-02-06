Deployment guide — VPS (minimal)

1) Prepare VPS (Ubuntu example)

- Update system and install Node.js (16+ recommended, 18+ preferred):

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs build-essential
```

- Install `pm2` to keep the server running:

```bash
sudo npm install -g pm2
```

2) Clone repo and install dependencies

```bash
cd /srv
git clone <your-repo-url> discord-block-builder
cd discord-block-builder
npm install
```

3) Environment & start

- Set a strong `JWT_SECRET` environment variable in the VPS. Example using systemd or pm2 env config:

```bash
export JWT_SECRET="replace_with_secure_random"
# Start using pm2 so it restarts on reboot
pm2 start server.js --name discord-block-builder --env production
pm2 save
pm2 startup
```

4) Ports & reverse proxy

- Open firewall for port 3000 or use nginx as reverse proxy and serve via port 80/443 with TLS (recommended).

5) Data persistence

- All JSON files are stored in `/path/to/project/data/`. Make sure this directory is persisted (it's inside the repo folder by default). Backups: create periodic backups of `data/`.

6) Notes

- Bots are spawned as child processes by the server and will be killed if the server stops. For higher reliability, prefer running bot processes directly under `pm2` (or modify the server to re-launch bots on startup). Current server writes bot code to `data/bots/<id>.js` and spawns `node` to run it.

- To run bots manually with PM2:

```bash
pm2 start data/bots/<id>.js --name bot-<id>
```

- For production, use a reverse proxy (nginx) and HTTPS using Certbot.
For production, use a reverse proxy (nginx) and HTTPS using Certbot.

Automated files included in this repo:
- `setup-server.sh` — environment bootstrap for Ubuntu (installs Node, PM2, nginx, certbot).
- `deploy.sh` — rsync+ssh deploy helper to sync repo and restart PM2.
- `ecosystem.config.js` — PM2 configuration to run `server.js`.
- `nginx/discord-block-builder.conf` — example nginx site config (replace `example.com`).
- `relaunch-bots.js` — helper script to write `data/bots/<id>.js` and start each bot with PM2 (use on server boot).

Recommended deploy sequence (Ubuntu example):

1. SSH to VPS and run `setup-server.sh` as root (or run its steps manually).

2. Create a deploy user and clone the repo:

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
su - deploy
git clone <your-repo-url> discord-block-builder
cd discord-block-builder
npm install
```

3. Configure environment and PM2:

```bash
export JWT_SECRET="your_long_random_secret"
pm2 start ecosystem.config.js --env production
pm2 save
```

4. Install nginx config:

```bash
sudo ln -s /home/deploy/discord-block-builder/nginx/discord-block-builder.conf /etc/nginx/sites-available/discord-block-builder.conf
sudo ln -s /etc/nginx/sites-available/discord-block-builder.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

5. Obtain SSL with Certbot (replace domain):

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

6. Relaunch bots on server start (optional):

Use PM2 to run `relaunch-bots.js` at startup, or add it as a startup script. Example using PM2:

```bash
pm2 start relaunch-bots.js --name relaunch-bots
pm2 save
```

Notes & tips:
- Replace `example.com` in the nginx config with your actual domain and point DNS A record to the VPS IP.
- `deploy.sh` uses `rsync` and `ssh` to copy files and run a remote `npm install` + PM2 restart. Run it from your development machine.
- Back up the `data/` directory regularly; it contains `projects.json`, `users.json` and bot files.

If you want, I can also add a systemd unit instead of PM2 or produce an Ansible playbook for automated provisioning.
