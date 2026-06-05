const express = require('express');
const fs = require('fs').promises; // Utilisation des promesses pour l'asynchrone
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json()); // Remplace body-parser (intégré nativement dans Express)
app.use(express.static('public'));

const appsFile = path.join(__dirname, 'apps.json');

/**
 * Charge les applications de manière asynchrone (ne bloque pas le serveur)
 */
async function loadApps() {
    try {
        const data = await fs.readFile(appsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si le fichier n'existe pas, on l'initialise proprement
        if (error.code === 'ENOENT') {
            await fs.writeFile(appsFile, '[]', 'utf8');
            return [];
        }
        throw error;
    }
}

/**
 * Sauvegarde les applications de manière asynchrone
 */
async function saveApps(apps) {
    await fs.writeFile(appsFile, JSON.stringify(apps, null, 2), 'utf8');
}

/* =========================================
   ROUTES API (Async / Await)
   ========================================= */

// Obtenir toutes les apps
app.get('/apps', async (req, res) => {
    try {
        const apps = await loadApps();
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la lecture des applications' });
    }
});

// Ajouter une app
app.post('/apps', async (req, res) => {
    try {
        const { name, command, icon } = req.body;
        if (!name || !command) {
            return res.status(400).json({ error: 'Nom et commande requis' });
        }

        const apps = await loadApps();
        apps.push({ name, command, icon: icon || '' });
        
        await saveApps(apps);
        res.status(201).json({ message: 'Application ajoutée avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout' });
    }
});

// Modifier une app
app.put('/apps/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, command, icon } = req.body;

        const apps = await loadApps();
        if (isNaN(id) || !apps[id]) {
            return res.status(404).json({ error: 'Application introuvable' });
        }

        apps[id] = { name, command, icon: icon || '' };
        
        await saveApps(apps);
        res.json({ message: 'Application modifiée avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la modification' });
    }
});

// Supprimer une app
app.delete('/apps/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        
        const apps = await loadApps();
        if (isNaN(id) || !apps[id]) {
            return res.status(404).json({ error: 'Application introuvable' });
        }

        apps.splice(id, 1);
        
        await saveApps(apps);
        res.json({ message: 'Application supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});

// Lancer une app
app.post('/launch', (req, res) => {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: 'Commande manquante' });

    // Exécution de la commande
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`[EXEC ERROR] : ${error.message}`);
            return res.status(500).json({ error: 'Erreur lors du lancement de l\'application' });
        }
        
        if (stderr) {
            console.warn(`[EXEC WARNING] : ${stderr}`);
        }

        res.json({ message: 'Application lancée avec succès' });
    });
});

// Gestion des erreurs globales (Fallthrough)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur interne est survenue' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`✅ Serveur démarré sur : http://localhost:${port}`);
});
