Jeux Olympiques 2024 - Frontend
Ce dépôt contient le code source du frontend de l'application des Jeux Olympiques 2024. Il s'agit d'une application web statique servie par Nginx, avec des fonctionnalités interactives développées en HTML, CSS (Sass) et JavaScript pur. Le déploiement est géré via Docker sur Heroku.

Technologies Utilisées
HTML5
CSS3 (avec préprocesseur Sass)
JavaScript (modules ESM)
Nginx : Serveur web pour servir les fichiers statiques et proxy inverse pour l'API backend.
Docker : Conteneurisation de l'application pour un déploiement facilité.
Heroku : Plateforme de déploiement (utilisant le buildpack container).
GitHub Actions : Workflow de CI/CD pour le déploiement continu sur Heroku.
Parcel (détecté via node_modules, pour le bundling/compilation des assets, notamment Sass).
Structure du Projet
D:.
├───.dockerignore
├───admin.html               # Page de connexion de l'administrateur
├───Dockerfile               # Fichier Docker pour construire l'image du frontend avec Nginx
├───index.html               # Page d'accueil principale de l'application
├───init.sh                  # Script d'initialisation du conteneur Nginx (substitution de variables d'env)
├───package-lock.json
├───package.json             # Dépendances Node.js (Sass)
├───.github
│   └───workflows
│       └───deploy.yml       # Workflow GitHub Actions pour le déploiement Heroku
├───dist                     # Répertoire de sortie après compilation (CSS, JS, assets)
│   ├───assets
│   │   ├───icons
│   │   └───image
│   ├───css
│   │   └───main.css         # CSS compilé
│   ├───js
│   │   ├───api              # Scripts JavaScript pour les appels API (login, signup, admin)
│   │   ├───components       # Composants JavaScript réutilisables
│   │   └───pages            # Scripts JavaScript spécifiques aux pages
│   ├───pages
│   │   ├───home-admin.html  # Tableau de bord de l'administrateur
│   │   └───shop.html        # Page de la boutique
│   └───scss                 # Fichiers source Sass
│       ├───abstracts
│       ├───base
│       ├───components
│       ├───layout
│       ├───pages
│       ├───themes
│       └───vendors
└───nginx                    # Configuration Nginx
    └───nginx.conf.template  # Template de configuration Nginx avec variables d'environnement
Installation et Lancement en Développement
Cloner le dépôt :

git clone https://github.com/MakhloufiAdnan/bloc3_Jo2024_front.git
cd bloc3_Jo2024_front 
Installer les dépendances Node.js :

npm install
Compilateur CSS (Sass) :

npm run build-css

Lancer le Backend :
Assurez-vous que votre application Spring Boot backend est en cours d'exécution et accessible sur http://localhost:8080.

Construire et Lancer le conteneur Docker du Frontend :
Dans le répertoire racine du frontend, construisez l'image Docker, puis lancez-la :

docker build -t jo2024-frontend-nginx .
docker run -p 80:80 -e API_BASE_URL=http://host.docker.internal:8080 -e PORT=80 --name jo2024-front jo2024-frontend-nginx
API_BASE_URL: Variable d'environnement pour que Nginx sache où proxifier les requêtes API. http://host.docker.internal:8080 permet au conteneur Docker d'atteindre le service Spring Boot sur votre machine hôte (pour Docker Desktop).
PORT: Le port sur lequel Nginx écoute dans le conteneur.
Si host.docker.internal ne fonctionne pas (ex: sur Linux), utilisez l'adresse IP de votre machine hôte (http://<YOUR_HOST_IP>:8080).
Accéder à l'application :
Ouvrez votre navigateur web et accédez à http://localhost/.

Points à Noter (Développement et Sécurité)
Login Admin : La page admin.html est la page de connexion de l'administrateur. Le login est géré via une requête AJAX vers /api/admin/auth/login. Après une connexion réussie, la redirection se fait vers /pages/home-admin.html.
Compromis de Sécurité Temporaire : Pour faciliter le développement, les endpoints admin et la page home-admin.html peuvent être temporairement autorisés publiquement dans le backend (WebSecurityConfig.java). Ceci est EXTRÊMEMENT DANGEREUX en production et doit être retiré.
Logins Sociaux (Google/Facebook) : Les boutons sont présents mais les fonctionnalités handleGoogleLogin() et handleFacebookLogin() sont actuellement des stubs (fonctions vides).
Structure des chemins JS :
/js/api/ : Contient les scripts responsables des interactions avec l'API backend.
/js/components/ : Contient des scripts pour des composants UI réutilisables.
/js/pages/ : Contient des scripts spécifiques à certaines pages (ex: accessibility.js, favoriteService.js).
Déploiement sur Heroku
Le déploiement est automatisé via GitHub Actions. Tout push sur la branche main déclenchera le workflow deploy.yml, qui construira l'image Docker du frontend et la déploiera sur l'application Heroku configurée.

Variables d'environnement Heroku (Secrets GitHub) requises :

HEROKU_EMAIL
HEROKU_API_KEY
HEROKU_APP_NAME_FE (par exemple, bloc3-jo2024-front-eff05b08aaa7)
HEROKU_APP_NAME_BE (par exemple, bloc3-jo2024-back)

