🚀 Installation (Windows)
1. 🔧 Prérequis

    Node.js installé (v16 ou + recommandé)

    Git (optionnel pour cloner depuis GitHub)

2. 📁 Crée ton dossier de projet

mkdir AppControlPanel
cd AppControlPanel

3. 📄 Crée la structure suivante :

AppControlPanel/
├── public/
│   ├── user.html
│   ├── panel.html
│   └── style.css
├── server.js
└── apps.json (sera créé automatiquement)

Tu peux copier-coller les fichiers server.js, panel.html, user.html que je t’ai donnés. Si tu veux, je peux les renvoyer.
4. 📦 Initialise le projet Node.js

npm init -y

5. 📚 Installe les dépendances

npm install express cors body-parser

6. ▶️ Lance le serveur

node server.js

Ton panneau est dispo sur :
📍 http://localhost:3000/panel.html — panneau admin
📍 http://localhost:3000/user.html — interface utilisateur
✏️ Modifier ou ajouter des apps

    Depuis panel.html, tu peux :

        Ajouter une app (nom + commande + icône)

        Modifier ou supprimer

        Lancer directement

⚠️ Sur Windows, mets des commandes comme :

notepad
start chrome
"C:\\Program Files\\MyApp\\app.exe"

🌈 Personnalisation

    Plusieurs thèmes dans l’interface

    Icônes personnalisées via URL

    Design responsive

📤 Déploiement GitHub

    Crée un dépôt sur GitHub : AppControlPanel

    Pousse tes fichiers :

git init
git add .
git commit -m "First commit: AppControlPanel"
git branch -M main
git remote add origin https://github.com/fufu25yt/AppControlPanel.git
git push -u origin main
