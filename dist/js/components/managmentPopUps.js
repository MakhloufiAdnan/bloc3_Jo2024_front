import { isAuthenticated, logout } from '/js/api/authUtils.js';
import { getFavorites } from '/js/pages/favoriteService.js'; 
import { attachLoginFormListener } from '/js/api/login.js'; 

// Déclaration des références aux éléments de la popup de connexion.
const popupConnection = document.getElementById("popup-Connection");
const connectedSection = popupConnection ? popupConnection.querySelector(".connected") : null;
const disconnectedSection = popupConnection ? popupConnection.querySelector(".disconnected") : null;
const logoutBtn = popupConnection ? popupConnection.querySelector("#logout-btn") : null;

/**
 * Met à jour l'affichage de la popup de connexion (sections connecté/déconnecté)
 * en fonction de l'état d'authentification de l'utilisateur.
 */
export function updateAuthUIState() {
    if (!popupConnection || !connectedSection || !disconnectedSection) {
        console.warn("managmentPopUps.js: Éléments de la popup de connexion introuvables. Vérifiez la structure HTML.");
        return;
    }

    if (isAuthenticated()) {
        connectedSection.style.display = "block";
        disconnectedSection.style.display = "none";
    } else {
        connectedSection.style.display = "none";
        disconnectedSection.style.display = "block";
    }
}

// Attache l'écouteur du bouton de déconnexion UNE SEULE FOIS au chargement du script.
// Ceci est fait hors du DOMContentLoaded pour s'assurer qu'il est attaché une seule fois
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        logout(); // Déconnecte l'utilisateur
        closePopup(popupConnection); // Ferme la popup après déconnexion.
        updateAuthUIState(); // Met à jour l'affichage de l'UI pour refléter l'état déconnecté.
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Mappage des IDs de boutons à leurs IDs de popup correspondants.
    const popupMapping = {
        "openPopupConnection": "popup-Connection",
        "openPopupSignup": "popup-inscription",
        "openPopupAccessibility": "popup-Accessibility",
        "openPopupFavorites": "popup-My-favorit"
    };

    let isPopupOpen = false; // Variable pour suivre l'état d'ouverture d'une popup.

    // Gère les clics sur les éléments qui sont censés ouvrir une popup.
    document.addEventListener("click", (e) => {
        // Vérifie si l'élément cliqué a la classe "text-icons" et qu'aucune popup n'est déjà ouverte.
        if (e.target.classList.contains("text-icons") && !isPopupOpen) {
            e.preventDefault(); // Empêche le comportement par défaut du lien.
            const popupId = popupMapping[e.target.id]; // Récupère l'ID de la popup à ouvrir.
            if (popupId) {
                openPopup(popupId); // Ouvre la popup spécifiée.
            }
        }

        // Gère les clics sur les boutons de fermeture ou l'arrière-plan de la popup pour la fermer.
        if (e.target.classList.contains("close-btn") || e.target.classList.contains("popup")) {
            closePopup(e.target.closest(".popup")); // Ferme la popup parente la plus proche.
        }
    });

    /**
     * Ouvre une popup spécifique.
     * @param {string} popupId - L'ID de la popup à ouvrir.
     */
    function openPopup(popupId) {
        if (isPopupOpen) return; // N'ouvre pas de nouvelle popup si une est déjà ouverte.

        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add("show"); // Ajoute la classe 'show' pour rendre la popup visible.
            isPopupOpen = true;

            // Met à jour le contenu ou attache les écouteurs spécifiques à la popup ouverte.
            if (popupId === 'popup-Connection') {
                updateAuthUIState(); // Met à jour l'affichage de la section "connecté/déconnecté".
                // Attache l'écouteur du formulaire de connexion SEULEMENT si l'utilisateur n'est PAS déjà connecté.
                if (!isAuthenticated()) {
                    attachLoginFormListener(); 
                }
            } else if (popupId === 'popup-My-favorit') {
                updateFavoritesPopup(); // Met à jour le contenu de la popup des favoris.
            }
        }
    }

    /**
     * Ferme une popup spécifique.
     * @param {HTMLElement} popup - L'élément DOM de la popup à fermer.
     */
    function closePopup(popup) {
        if (popup) {
            popup.classList.remove("show"); // Supprime la classe 'show' pour cacher la popup.
            isPopupOpen = false; // Réinitialise l'état d'ouverture.
        }
    }

    // Attache les écouteurs d'événements pour les icônes mobiles.
    const iconsMobile = [
        { id: "icon-user-mobile", popup: "popup-Connection" },
        { id: "icon-accessibility-mobile", popup: "popup-Accessibility" },
        { id: "icon-love-mobile", popup: "popup-My-favorit" }
    ];
    iconsMobile.forEach(({ id, popup }) => {
        document.getElementById(id)?.addEventListener("click", () => openPopup(popup));
    });

    // Attache les écouteurs d'événements pour les liens de la sidebar.
    const linksSideBar = [
        { id: "login-sidebar", popup: "popup-Connection" },
        { id: "inscription-sidebar", popup: "popup-inscription" }
    ];
    linksSideBar.forEach(({ id, popup }) => {
        document.getElementById(id)?.addEventListener("click", () => openPopup(popup));
    });

    /**
     * Met à jour le contenu de la popup des favoris.
     */
    function updateFavoritesPopup() {
        const favoritesContainer = document.getElementById("favorites-list");
        if (!favoritesContainer) {
            console.warn("managmentPopUps.js: Conteneur de favoris introuvable.");
            return;
        }

        if (!isAuthenticated()) {
            favoritesContainer.innerHTML = "<p>Un compte est nécessaire pour accéder à vos favoris.</p>";
        } else {
            const favoris = getFavorites(); // Récupère la liste des favoris.
            favoritesContainer.innerHTML = favoris.length > 0 ? `
                <ul>
                  ${favoris.map(fav => `<li><a href="${fav.link}">${fav.title}</a></li>`).join("")}
                </ul>
            ` : "<p>Aucun favori enregistré.</p>";
        }
    }

    // Appel initial pour mettre à jour l'état de l'interface utilisateur au chargement de la page.
    // Cela garantit que les éléments "connecté"/"déconnecté" sont corrects avant même qu'une popup ne soit ouverte.
    updateAuthUIState(); 
});