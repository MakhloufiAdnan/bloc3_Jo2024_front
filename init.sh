#!/bin/sh

# Valeurs par défaut
export PORT="${PORT:-80}"
export API_BASE_URL="${API_BASE_URL:-http://host.docker.internal:8080}"

echo "PORT is: $PORT"
echo "API_BASE_URL is: $API_BASE_URL"

# Substitution des variables dans nginx.conf
envsubst '${PORT} ${API_BASE_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf || {
    echo "Erreur lors de la génération de nginx.conf" >&2
    exit 1
}

# Debug : afficher le contenu généré
echo "======= nginx.conf généré ======="
cat /etc/nginx/nginx.conf
echo "================================="

# Lancement de nginx
exec nginx -g 'daemon off;'
