# Étape 1 : Construire l'application et préparer les fichiers pour Nginx
FROM node:lts-alpine3.21 AS build

# Définir le répertoire de travail dans le conteneur de build
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances du projet 
RUN npm install

# Copier tous les fichiers du projet dans le conteneur de build
COPY . .

# Exécuter le script de build CSS.
RUN npm run build-css || (echo "CSS build failed" && exit 1)

# Créer un répertoire de sortie propre pour les fichiers à servir par Nginx
RUN mkdir -p /app/build_output/assets
RUN mkdir -p /app/build_output/js
RUN mkdir -p /app/build_output/css
RUN mkdir -p /app/build_output/pages # Pour les fichiers comme shop.html

# Copier les fichiers HTML racines
RUN cp /app/index.html /app/build_output/index.html
RUN cp /app/admin.html /app/build_output/admin.html

# Copier les assets, JS, et pages HTML supplémentaires depuis le dossier 'dist' original
RUN cp -r /app/dist/assets/. /app/build_output/assets/
RUN cp -r /app/dist/js/. /app/build_output/js/
RUN cp -r /app/dist/pages/. /app/build_output/pages/ # Copie home-admin.html, shop.html etc. dans build_output/pages/

# Copier le CSS compilé depuis /app/dist/css/
RUN cp -r /app/dist/css/. /app/build_output/css/

# Étape 2 : Configurer le serveur Nginx pour servir les fichiers compilés
FROM nginx:stable-alpine3.20

# Copier le script d'initialisation et le template de configuration Nginx
COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY init.sh /init.sh
RUN chmod +x /init.sh

# Copier les fichiers préparés depuis l'étape de build vers le webroot de Nginx
COPY --from=build /app/build_output /usr/share/nginx/html

# Exposer le port 
EXPOSE 80

# Healthcheck basique nginx (mis à jour pour utiliser $PORT si défini)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
CMD wget --spider -q http://localhost:${PORT:-80} || exit 1

# Point d'entrée pour lancer Nginx via init.sh
ENTRYPOINT ["/init.sh"]