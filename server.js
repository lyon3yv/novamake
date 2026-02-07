const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Ensure data directory and required JSON files exist (VPS-friendly, relative paths)
const dataDir = path.join(__dirname, 'data');
const requiredFiles = ['users.json', 'projects.json', 'guilds.json', 'global.json'];

// Bot process registry (in-memory)
const botProcesses = {};

// JWT secret (override with env var in production)
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function ensureDataInfrastructure() {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true, mode: 0o755 });
            console.log('Created data directory:', dataDir);
        }

        requiredFiles.forEach((file) => {
            const filePath = path.join(dataDir, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '{}', { mode: 0o644 });
                console.log('Created data file:', filePath);
            } else {
                // Make sure file is not empty and has correct permissions where possible
                try {
                    const stats = fs.statSync(filePath);
                    if (stats.size === 0) fs.writeFileSync(filePath, '{}', { mode: 0o644 });
                    try { fs.chmodSync(filePath, 0o644); } catch (e) { /* noop on some platforms */ }
                } catch (e) {
                    console.warn('Warning checking file', filePath, e.message);
                }
            }
        });
    } catch (err) {
        console.error('Failed to ensure data infrastructure:', err);
        process.exit(1);
    }
}

// Initialize data files before server starts
ensureDataInfrastructure();

// Simple CORS for editor/dashboard usage (adjust in production)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Helper utilities for reading/writing JSON files in the data directory
function readJSON(filename) {
    const filePath = path.join(dataDir, filename);
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return raw.trim() ? JSON.parse(raw) : {};
    } catch (err) {
        console.warn('readJSON error', filePath, err.message);
        return {};
    }
}

function writeJSON(filename, obj) {
    const filePath = path.join(dataDir, filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), { mode: 0o644 });
        return true;
    } catch (err) {
        console.error('writeJSON error', filePath, err.message);
        return false;
    }
}

// Projects endpoints
app.get('/api/projects', authMiddleware, (req, res) => {
    const projects = readJSON('projects.json');
    res.json(projects);
});

app.get('/api/projects/:id', authMiddleware, (req, res) => {
    const projects = readJSON('projects.json');
    const id = req.params.id;
    if (!projects[id]) return res.status(404).json({ error: 'Project not found' });
    res.json(projects[id]);
});

app.post('/api/projects', authMiddleware, (req, res) => {
    const { id, name, xml, meta } = req.body;
    const projects = readJSON('projects.json');
    const projectId = id || Date.now().toString();
    projects[projectId] = { id: projectId, name: name || `Project ${projectId}`, xml: xml || '', code: req.body.code || '', meta: meta || {}, updatedAt: new Date().toISOString() };
    if (!writeJSON('projects.json', projects)) return res.status(500).json({ error: 'Failed to save project' });
    res.json(projects[projectId]);
});

// Update project (xml / code / name)
app.put('/api/projects/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    const { name, xml, code, meta } = req.body;
    const projects = readJSON('projects.json');
    if (!projects[id]) return res.status(404).json({ error: 'Project not found' });
    if (name !== undefined) projects[id].name = name;
    if (xml !== undefined) projects[id].xml = xml;
    if (code !== undefined) projects[id].code = code;
    if (meta !== undefined) projects[id].meta = meta;
    projects[id].updatedAt = new Date().toISOString();
    if (!writeJSON('projects.json', projects)) return res.status(500).json({ error: 'Failed to update project' });
    res.json(projects[id]);
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
    const projects = readJSON('projects.json');
    const id = req.params.id;
    if (!projects[id]) return res.status(404).json({ error: 'Project not found' });
    delete projects[id];
    if (!writeJSON('projects.json', projects)) return res.status(500).json({ error: 'Failed to delete project' });
    res.json({ ok: true });
});

// Simple user endpoints
app.get('/api/users', (req, res) => {
    const users = readJSON('users.json');
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const { id, data } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const users = readJSON('users.json');
    users[id] = data || {};
    if (!writeJSON('users.json', users)) return res.status(500).json({ error: 'Failed to save user' });
    res.json(users[id]);
});

// --- Authentication endpoints ---
app.post('/api/auth/register', (req, res) => {
    const { id, password } = req.body;
    if (!id || !password) return res.status(400).json({ error: 'Missing id or password' });
    const users = readJSON('users.json');
    if (users[id]) return res.status(409).json({ error: 'User exists' });
    const hash = bcrypt.hashSync(password, 8);
    users[id] = { id, passwordHash: hash, createdAt: new Date().toISOString() };
    if (!writeJSON('users.json', users)) return res.status(500).json({ error: 'Failed to save user' });
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ id, token });
});

app.post('/api/auth/login', (req, res) => {
    const { id, password } = req.body;
    if (!id || !password) return res.status(400).json({ error: 'Missing id or password' });
    const users = readJSON('users.json');
    const user = users[id];
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ id, token });
});

function getTokenFromRequest(r){
    // Authorization header preferred
    const auth = r.headers && r.headers.authorization;
    if (auth && typeof auth === 'string'){
        const parts = auth.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
    }
    // cookie fallback
    const cookie = r.headers && r.headers.cookie;
    if (cookie){
        const match = cookie.match(/(?:^|; )token=([^;]+)/);
        if (match) return decodeURIComponent(match[1]);
    }
    // localStorage is client-side; server can't read it
    return null;
}

function authMiddleware(req, res, next) {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: 'Missing authorization' });
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Autosave XML for a project (requires auth)
app.post('/api/project/:id/xml', authMiddleware, (req, res) => {
    const id = req.params.id;
    const { xml } = req.body;
    if (!xml) return res.status(400).json({ error: 'Missing xml' });
    const projects = readJSON('projects.json');
    const project = projects[id] || { id, name: `Project ${id}`, xml: '', meta: {} };
    project.xml = xml;
    project.updatedAt = new Date().toISOString();
    projects[id] = project;
    if (!writeJSON('projects.json', projects)) return res.status(500).json({ error: 'Failed to autosave xml' });
    res.json({ ok: true, updatedAt: project.updatedAt });
});

// --- Bot control endpoints ---
app.post('/api/bots/:id/start', authMiddleware, (req, res) => {
    const id = req.params.id;
    const projects = readJSON('projects.json');
    const project = projects[id];
    if (!project || !project.code) return res.status(400).json({ error: 'Project or code not found. Save project code before starting.' });

    const botDir = path.join(dataDir, 'bots');
    if (!fs.existsSync(botDir)) fs.mkdirSync(botDir, { recursive: true });
    const botFile = path.join(botDir, `${id}.js`);
    try {
        fs.writeFileSync(botFile, project.code, { mode: 0o644 });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to write bot file', details: err.message });
    }

    if (botProcesses[id]) return res.status(400).json({ error: 'Bot already running' });
    const child = spawn(process.execPath, [botFile], { stdio: 'ignore' });
    botProcesses[id] = { pid: child.pid, startedAt: new Date().toISOString() };
    res.json({ ok: true, pid: child.pid });
});

app.post('/api/bots/:id/stop', authMiddleware, (req, res) => {
    const id = req.params.id;
    const entry = botProcesses[id];
    if (!entry) return res.status(404).json({ error: 'Bot not running' });
    try {
        process.kill(entry.pid);
        delete botProcesses[id];
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to stop process', details: err.message });
    }
});

app.get('/api/bots', authMiddleware, (req, res) => {
    res.json(botProcesses);
});

// Protect dashboard route so only authenticated users can view it
app.get('/dashboard.html', (req, res) => {
    const token = getTokenFromRequest(req);
    if (!token) return res.redirect('/login.html');
    try { jwt.verify(token, JWT_SECRET); return res.sendFile(path.join(__dirname, 'dashboard.html')); }
    catch(e){ return res.redirect('/login.html'); }
});

// Serve landing page at root; login remains at /login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Editor route (access block editor explicitly)
app.get('/editor', (req, res) => {
    // Serve editor page; client will show an in-page login modal if not authenticated.
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para el despliegue futuro
app.post('/api/deploy', (req, res) => {
    const { code } = req.body;
    console.log("Recibiendo código para despliegue...");
    // Aquí irá la conexión con Pterodactyl
    res.status(200).send({ message: "Código recibido correctamente" });
});

app.listen(3000, () => {
    console.log('🚀 UNICORN ENGINE RUNNING: http://localhost:3000');
});