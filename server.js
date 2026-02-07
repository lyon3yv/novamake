const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { spawn } = require('child_process');
const https = require('https');
require('dotenv').config();

const app = express();

// --- CONFIGURACIÓN ---
const JWT_SECRET = process.env.JWT_SECRET || 'nova_ultra_secret_safe_2026';
const PAYPAL_CLIENT_ID = 'AQ8uY-S_fFiRxnD27te6sVOQSx8S60pCHYXBk1sK82e7oNXWVQR4QxhYaT2G3T4L5LSuHDxbPgheKwUd';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET; 
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- INFRAESTRUCTURA DE DATOS ---
const dataDir = path.join(__dirname, 'data');
const botsDir = path.join(dataDir, 'bots');
const requiredFiles = ['users.json', 'projects.json', 'guilds.json', 'global.json'];

function ensureDataInfrastructure() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(botsDir)) fs.mkdirSync(botsDir, { recursive: true });
    requiredFiles.forEach(file => {
        const filePath = path.join(dataDir, file);
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
    });
}
ensureDataInfrastructure();

// --- HELPERS ---
function readJSON(file) {
    try { return JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8') || '{}'); }
    catch (e) { return {}; }
}
function writeJSON(file, data) {
    fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    const token = auth && auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
    if (!token) return res.status(401).json({ error: 'Inicia sesión' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) { res.status(401).json({ error: 'Sesión expirada' }); }
}

// --- PAYPAL ACCESS TOKEN ---
async function getPayPalAccessToken() {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    const response = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const data = await response.json();
    return data.access_token;
}

// --- RUTAS DE PÁGINAS ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'landing.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/editor', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

// --- API AUTH ---
app.post('/api/auth/register', (req, res) => {
    const { id, password } = req.body;
    const users = readJSON('users.json');
    if (users[id]) return res.status(400).json({ error: 'Usuario ya existe' });
    users[id] = { id, passwordHash: bcrypt.hashSync(password, 8), createdAt: new Date(), role: 'free' };
    writeJSON('users.json', users);
    res.json({ token: jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' }), role: 'free' });
});

app.post('/api/auth/login', (req, res) => {
    const { id, password } = req.body;
    const users = readJSON('users.json');
    const user = users[id];
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: 'Credenciales inválidas' });
    res.json({ token: jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' }), role: user.role || 'free' });
});

// --- SISTEMA DE CÓDIGOS PROMOCIONALES (CON FIX DE COMILLAS) ---
app.post('/api/payments/check-promo', (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ valid: false });

    try {
        let rawCodes = process.env.PROMO_CODES || '{}';
        rawCodes = rawCodes.trim().replace(/^'|'$/g, ''); // Limpiar comillas simples accidentales
        const codes = JSON.parse(rawCodes);
        const discount = codes[code.toUpperCase()];

        if (discount !== undefined) {
            res.json({ valid: true, discount: discount });
        } else {
            res.status(404).json({ valid: false, message: "Código no válido" });
        }
    } catch (e) {
        console.error("Error al leer PROMO_CODES:", e.message);
        res.status(500).json({ error: "Error de configuración de descuentos" });
    }
});

// --- PAYPAL VERIFY ---
app.post('/api/payments/verify-order', authMiddleware, async (req, res) => {
    const { orderID } = req.body;
    try {
        const accessToken = await getPayPalAccessToken();
        const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const orderData = await response.json();

        if (orderData.status === 'COMPLETED') {
            const users = readJSON('users.json');
            if (users[req.user.id]) {
                users[req.user.id].role = 'pro';
                users[req.user.id].proSince = new Date();
                writeJSON('users.json', users);
                return res.json({ success: true, role: 'pro' });
            }
        }
        res.status(400).json({ error: "Pago no válido" });
    } catch (e) { res.status(500).json({ error: "Error en pasarela" }); }
});

// --- PROYECTOS (CRUD) ---
app.get('/api/projects', authMiddleware, (req, res) => res.json(readJSON('projects.json')));

app.post('/api/projects', authMiddleware, (req, res) => {
    const { name, xml, code } = req.body;
    const projects = readJSON('projects.json');
    const id = Date.now().toString();
    projects[id] = { id, name, xml: xml || '', code: code || '', owner: req.user.id, updatedAt: new Date() };
    writeJSON('projects.json', projects);
    res.json(projects[id]);
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
    const projects = readJSON('projects.json');
    const p = projects[req.params.id];
    if (p && p.owner === req.user.id) {
        p.xml = req.body.xml;
        p.code = req.body.code;
        p.updatedAt = new Date();
        writeJSON('projects.json', projects);
        res.json({ success: true });
    } else res.status(403).json({ error: "No autorizado" });
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
    const projects = readJSON('projects.json');
    if (projects[req.params.id]?.owner === req.user.id) {
        if (botProcesses[req.params.id]) {
            process.kill(botProcesses[req.params.id].pid);
            delete botProcesses[req.params.id];
        }
        delete projects[req.params.id];
        writeJSON('projects.json', projects);
        res.json({ success: true });
    } else res.status(403).json({ error: "No autorizado" });
});

// --- BOT ENGINE (CON MARCA DE AGUA FORZADA) ---
const botProcesses = {};

app.post('/api/bots/:id/start', authMiddleware, (req, res) => {
    const id = req.params.id;
    const users = readJSON('users.json');
    const user = users[req.user.id];
    const projects = readJSON('projects.json');
    const project = projects[id];

    if (!project || !project.code) return res.status(400).json({ error: 'Sin código' });
    if (project.owner !== req.user.id) return res.status(403).send();

    if (user.role !== 'pro') {
        const activeCount = Object.keys(botProcesses).filter(bid => projects[bid]?.owner === req.user.id).length;
        if (activeCount >= 1) return res.status(403).json({ error: 'Límite Free: 1 Bot. ¡Sube a Pro!' });
    }

    if (botProcesses[id]) return res.status(400).json({ error: 'Ya está encendido' });

    const botFile = path.join(botsDir, `${id}.js`);
    
    // --- LÓGICA DE MARCA DE AGUA ---
    let finalCode = project.code;
    if (user.role !== 'pro') {
        const watermarkSnippet = `
        // INYECCIÓN AUTOMÁTICA NOVA MAKE (FREE TIER)
        client.on('ready', () => {
            const updateNovaStatus = () => {
                if (client.user) {
                    client.user.setActivity('Hecho con Nova Make | make.novadefense.es', { type: 3 });
                }
            };
            updateNovaStatus();
            setInterval(updateNovaStatus, 30000); // Forzar cada 30 segundos
        });
        `;
        finalCode += watermarkSnippet;
    }

    fs.writeFileSync(botFile, finalCode);

    const child = spawn('node', [botFile]);
    const duration = user.role === 'pro' ? (30 * 24 * 60 * 60 * 1000) : (2 * 24 * 60 * 60 * 1000);
    const expiresAt = Date.now() + duration;

    botProcesses[id] = { 
        pid: child.pid, 
        startedAt: new Date(),
        expiresAt: new Date(expiresAt)
    };

    setTimeout(() => {
        if (botProcesses[id]) {
            process.kill(botProcesses[id].pid);
            delete botProcesses[id];
            console.log(`🛑 Ciclo terminado (${user.role}): ${id}`);
        }
    }, duration);

    child.on('exit', () => delete botProcesses[id]);
    res.json({ success: true, expiresAt: botProcesses[id].expiresAt });
});

app.post('/api/bots/:id/stop', authMiddleware, (req, res) => {
    const id = req.params.id;
    if (botProcesses[id]) {
        process.kill(botProcesses[id].pid);
        delete botProcesses[id];
        res.json({ success: true });
    } else res.status(404).json({ error: "No está corriendo" });
});

app.use(express.static(__dirname));
app.listen(PORT, () => {
    console.log(`
    ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ 
    ████╗  ██║██╔═══██╗██║   ██║██╔══██╗
    ██╔██╗ ██║██║   ██║██║   ██║███████║
    ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║
    ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║
    🚀 UNICORN ENGINE V2: ONLINE PORT ${PORT}
    `);
});