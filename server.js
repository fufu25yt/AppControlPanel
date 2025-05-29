const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const appsFile = path.join(__dirname, 'apps.json');

// Charger les applications depuis le fichier JSON
function loadApps() {
    if (!fs.existsSync(appsFile)) fs.writeFileSync(appsFile, '[]');
    return JSON.parse(fs.readFileSync(appsFile, 'utf8'));
}

// Sauvegarder les applications dans le fichier JSON
function saveApps(apps) {
    fs.writeFileSync(appsFile, JSON.stringify(apps, null, 2));
}

// Routes API

// Obtenir toutes les apps
app.get('/apps', (req, res) => {
    const apps = loadApps();
    res.json(apps);
});

// Ajouter une app
app.post('/apps', (req, res) => {
    const { name, command, icon } = req.body;
    if (!name || !command) return res.status(400).json({ error: 'Nom et commande requis' });

    const apps = loadApps();
    apps.push({ name, command, icon });
    saveApps(apps);
    res.status(201).json({ message: 'Application ajoutée' });
});

// Modifier une app
app.put('/apps/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, command, icon } = req.body;

    const apps = loadApps();
    if (!apps[id]) return res.status(404).json({ error: 'App introuvable' });

    apps[id] = { name, command, icon };
    saveApps(apps);
    res.json({ message: 'Application modifiée' });
});

// Supprimer une app
app.delete('/apps/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const apps = loadApps();
    if (!apps[id]) return res.status(404).json({ error: 'App introuvable' });

    apps.splice(id, 1);
    saveApps(apps);
    res.json({ message: 'Application supprimée' });
});

// Lancer une app
app.post('/launch', (req, res) => {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: 'Commande manquante' });

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Erreur lancement :', error);
            return res.status(500).json({ error: 'Erreur lancement application' });
        }
        res.json({ message: 'Application lancée' });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
