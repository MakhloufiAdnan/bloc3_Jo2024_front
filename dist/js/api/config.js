let determinedApiUrl;

// Vérifiez si le frontend est servi depuis votre domaine Heroku de production
if (window.location.hostname === 'bloc3-jo2024-front-eff05b08aaa7.herokuapp.com') {
    determinedApiUrl = 'https://bloc3-jo2024-back-1b523dbede86.herokuapp.com';
} else {
    // Sinon, supposez que c'est un environnement de développement local
    determinedApiUrl = 'http://localhost:8080';
}

const API_URL = determinedApiUrl;

export default API_URL;