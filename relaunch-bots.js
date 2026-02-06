// relaunch-bots.js
// Reads data/projects.json and starts bots under PM2 using data/bots/<id>.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dataDir = path.join(__dirname, 'data');
const projectsFile = path.join(dataDir, 'projects.json');
const botsDir = path.join(dataDir, 'bots');

if (!fs.existsSync(projectsFile)) {
  console.error('projects.json not found — nothing to relaunch');
  process.exit(0);
}

if (!fs.existsSync(botsDir)) fs.mkdirSync(botsDir, { recursive: true });

const raw = fs.readFileSync(projectsFile, 'utf8');
let projects = {};
try { projects = JSON.parse(raw || '{}'); } catch(e){ console.error('Failed to parse projects.json', e.message); process.exit(1); }

for (const id of Object.keys(projects)){
  const p = projects[id];
  if (!p || !p.code) continue;
  const file = path.join(botsDir, `${id}.js`);
  try { fs.writeFileSync(file, p.code, { mode: 0o644 }); } catch(e){ console.error('Failed to write bot file', file, e.message); continue; }
  try {
    // Start via pm2 so bots are supervised independently
    console.log('Starting bot with pm2:', id);
    execSync(`pm2 start ${file} --name bot-${id} --update-env`, { stdio: 'inherit' });
  } catch (e) {
    console.error('pm2 start failed for', id, e.message);
  }
}

console.log('Relaunch script finished.');
