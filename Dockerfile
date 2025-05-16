# Étape 1 : Construire l'application avec Node.js
FROM node:lts-alpine3.21 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Installer Sass globalement
RUN npm install -g sass

# Copier tous les fichiers source
COPY . .

# Compiler le SCSS
RUN mkdir -p dist/css && npm run build-css

# Étape 2 : Configurer le serveur Nginx
FROM nginx:stable-alpine3.20

# Copier le script d'initialisation et le rendre exécutable
COPY init.sh /init.sh
RUN chmod +x /init.sh

# Copier le template de configuration nginx
COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template

# Copier les fichiers compilés
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Healthcheck basique
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
CMD wget --spider -q http://localhost || exit 1

# Démarrer nginx via script d’entrée
ENTRYPOINT ["/init.sh"]
