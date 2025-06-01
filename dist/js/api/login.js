import { saveToken, isAuthenticated } from '/js/api/authUtils.js';
import { showPopup, validateEmail } from '/js/api/formUtils.js';
import { updateAuthUIState } from '/js/components/managmentPopUps.js'; 

/**
 * Attache l'écouteur d'événement 'submit' au formulaire de connexion.
 * Cette fonction doit être appelée lorsque la popup de connexion est rendue visible
 * ou lorsque le formulaire est ajouté au DOM.
 */
export function attachLoginFormListener() {
    const form = document.getElementById("auth-form");

    if (!form) {
        console.warn("Formulaire de connexion (auth-form) introuvable pour attachement. La popup n'est peut-être pas ouverte ou son ID est incorrect.");
        return;
    }

    // Supprime l'écouteur existant avant d'en ajouter un nouveau pour éviter les doublons.
    form.removeEventListener("submit", handleSubmit);
    form.addEventListener("submit", handleSubmit);

    // Initialise les écouteurs d'entrée pour réinitialiser les styles d'erreur lors de la saisie.
    form.email.addEventListener('input', () => form.email.classList.remove("error-input"));
    form.password.addEventListener('input', () => form.password.classList.remove("error-input"));
}

/**
 * Gère la soumission du formulaire de connexion.
 * @param {Event} e - L'événement de soumission du formulaire.
 */
async function handleSubmit(e) {
    e.preventDefault(); // Empêche le rechargement par défaut de la page lors de la soumission du formulaire.

    const form = e.target; // Obtient la référence au formulaire qui a déclenché l'événement.
    const email = form.email.value.trim();
    const password = form.password.value;
    const rememberMe = form.rememberMe?.checked; // Utilise l'opérateur de chaînage optionnel

    // Réinitialise les styles d'erreur visuels sur les champs.
    form.email.classList.remove("error-input");
    form.password.classList.remove("error-input");

    // Validations côté client.
    if (!validateEmail(email)) {
        form.email.classList.add("error-input");
        showPopup("Veuillez entrer un email valide.", "error");
        return;
    }

    if (!password) {
        form.password.classList.add("error-input");
        showPopup("Le mot de passe est requis.", "error");
        return;
    }

    try {
        // Envoie la requête de connexion au backend.
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest", // Indique que la requête est une requête AJAX.
                //"X-CSRF-Token": getCsrfToken() -> désactivé
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            // Gère les réponses d'erreur HTTP (ex: 401 Unauthorized, 400 Bad Request).
            const errData = await response.json().catch(() => ({ message: "Réponse inattendue du serveur." }));
            showPopup(errData.message || "Échec de la connexion.", "error");

            // Marque les champs en erreur si le backend renvoie des informations spécifiques (ex: {message: "Email invalide", field: "email"}).
            if (errData.field === 'email') form.email.classList.add("error-input");
            if (errData.field === 'password') form.password.classList.add("error-input");
            return; // Arrête l'exécution si la réponse n'est pas "ok".
        }

        // Connexion réussie : extrait le token, le sauvegarde et met à jour l'interface.
        const { token } = await response.json();
        saveToken(token, rememberMe);
        showPopup("Connexion réussie !", "success");

        // Ferme la popup de connexion.
        const popupConnection = document.getElementById("popup-Connection");
        if (popupConnection) {
            popupConnection.classList.remove("show"); 
        }

        // Met à jour l'interface utilisateur générale (ex: changer le bouton "Connexion" en "Déconnexion").
        // Cette fonction est exportée de managmentPopUps.js et met à jour les sections de l'UI.
        updateAuthUIState(); 

        // Aucune redirection `window.location.href` 
        // La page reste la même, et l'UI est mise à jour pour refléter l'état connecté.
        // Si une redirection est souhaitée, elle doit être gérée par une logique plus globale ou par updateAuthUIState.

    } catch (err) {
        // Gère les erreurs de réseau ou d'autres exceptions non liées à la réponse HTTP.
        console.error("login.js: Erreur générale lors de la connexion:", err);
        showPopup(err.message || "Erreur lors de la connexion.", "error");
    }
}