# Étape 1 : Construire l'application avec Node.js
FROM node:lts-alpine3.21 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et package-lock.json
COPY package.json package-lock.json ./

#Installer les dépendances du projet
RUN npm install

# Installer sass globalement
RUN npm install -g sass

# Copier tous les fichiers source du frontend
COPY . .

# Créer le dossier dist/css avant de compiler le SCSS
RUN mkdir -p dist/css || (echo "Build CSS failed" && exit 1)
RUN npm run build-css || (echo "Frontend build failed" && exit 1)

# Étape 2 : Configurer le serveur Nginx pour servir les fichiers compilés
FROM nginx:stable-alpine3.20

# script d'entrée + config template
COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template

# Ajoute la variable d'environnement à exposer à Nginx
ENV API_BASE_URL=localhost:8080
ENV ENVIRONMENT=development

COPY init.sh /init.sh
RUN chmod +x /init.sh

# Copier les fichiers compilés dans Nginx (tout le dossier dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Healthcheck basique nginx
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
CMD wget --spider -q http://localhost || exit 1

# Lancement dynamique
ENTRYPOINT ["/init.sh"]