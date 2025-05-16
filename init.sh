#!/bin/sh

# Valeurs par défaut 
export PORT="${PORT:-80}"
export API_BASE_URL="${API_BASE_URL:-http://localhost:8080}" 

echo "PORT is: $PORT"
echo "API_BASE_URL is: $API_BASE_URL"

# Substitution des variables dans nginx.conf.template et création de nginx.conf
# Utilise '|| exit 1' pour arrêter si la substitution échoue
envsubst '${PORT} ${API_BASE_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf || {
    echo "Erreur fatale: La génération de nginx.conf a échoué." >&2
    exit 1
}

# Debug : afficher le contenu généré 
echo "======= nginx.conf généré ======="
cat /etc/nginx/nginx.conf
echo "================================="

# Lancement de nginx en avant-plan pour que le conteneur reste actif
exec nginx -g 'daemon off;'