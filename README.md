# AppControlPanel

AppControlPanel est un panneau de contrôle simple et personnalisable pour lancer facilement vos applications favorites sous Windows via une interface web moderne. Il est destiné à faciliter la gestion et le lancement de logiciels depuis un navigateur, que ce soit pour un usage personnel, familial, ou pour un environnement d’entreprise.

## 🚀 Fonctionnalités principales

- **Interface web responsive** accessible depuis n’importe quel navigateur.
- **Ajout, modification et suppression d’applications** via une interface d’administration conviviale (`panel.html`).
- **Lancement direct** des applications installées sur votre système Windows.
- **Personnalisation** : thèmes variés et icônes personnalisées via URL.
- **Gestion simplifiée** des applications via un fichier `apps.json` généré automatiquement.
- **Séparation des interfaces** : une pour l’utilisateur (`user.html`), une pour l’administrateur (`panel.html`).

## 🔧 Prérequis

- Node.js (v16 ou supérieur recommandé)
- Git (optionnel, pour cloner depuis GitHub)

## ⚡ Installation rapide (Windows)

1. **Créez votre dossier de projet :**
    ```bash
    mkdir AppControlPanel
    cd AppControlPanel
    ```

2. **Structure du projet à respecter :**
    ```
    AppControlPanel/
    ├── public/
    │   ├── user.html
    │   ├── panel.html
    │   └── style.css
    ├── server.js
    └── apps.json (sera créé automatiquement)
    ```

3. **Initialisez le projet Node.js :**
    ```bash
    npm init -y
    ```

4. **Installez les dépendances :**
    ```bash
    npm install express cors body-parser
    ```

5. **Lancez le serveur :**
    ```bash
    node server.js
    ```

6. **Accédez à vos interfaces :**
    - Panneau admin : [http://localhost:9560/panel.html](http://localhost:9560/panel.html)
    - Interface utilisateur : [http://localhost:9560/user.html](http://localhost:9560/user.html)

## ✏️ Modifier ou ajouter des applications

Depuis `panel.html`, vous pouvez :
- Ajouter une application (nom, commande, icône)
- Modifier ou supprimer une application
- Lancer une application directement

⚠️ **Astuce Windows** : Utilisez des commandes telles que :
- `notepad`
- `start chrome`
- `"C:\\Program Files\\MyApp\\app.exe"`

## 🌈 Personnalisation

- Plusieurs thèmes intégrés
- Icônes personnalisables par URL
- Design responsive adapté à tous les écrans

## 📤 Déploiement GitHub

1. **Initialisez le dépôt :**
    ```bash
    git init
    git add .
    git commit -m "First commit: AppControlPanel"
    git branch -M main
    git remote add origin https://github.com/fufu25yt/AppControlPanel.git
    git push -u origin main
    ```

---

**Licence :** MIT  
**Auteur :** fufu25yt
