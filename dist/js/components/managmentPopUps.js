import { isAuthenticated, logout } from '/js/api/authUtils.js';
import { getFavorites } from '/js/pages/favoriteService.js';

// Attend que le DOM soit entièrement chargé avant d'exécuter le script.
document.addEventListener("DOMContentLoaded", () => {
  // Mappage entre les ID des éléments déclencheurs et les ID des popups correspondantes.
  const popupMapping = {
    "openPopupConnection": "popup-Connection",       
    "openPopupSignup": "popup-inscription",         
    "openPopupAccessibility": "popup-Accessibility", 
    "openPopupFavorites": "popup-My-favorit"       
  };

  // Variable pour suivre si une popup est actuellement ouverte, afin d'éviter les superpositions.
  let isPopupOpen = false;

  // Gestionnaire d'événements global pour les clics sur le document.
  document.addEventListener("click", (e) => {
    // Vérifie si l'élément cliqué est un déclencheur de popup (classe "text-icons") 
    if (e.target.classList.contains("text-icons") && !isPopupOpen) {
      e.preventDefault(); // Empêche le comportement par défaut du lien 
      const popupId = popupMapping[e.target.id]; // Récupère l'ID de la popup à ouvrir.
      if (popupId) {
        openPopup(popupId);
        console.log(`Ouverture de la popup : ${popupId}`); // Message de débogage.
      }
    }

    // Vérifie si l'élément cliqué est un bouton de fermeture (classe "close-btn")
    // ou la popup elle-même (arrière-plan de la popup, classe "popup").
    if (e.target.classList.contains("close-btn") || e.target.classList.contains("popup")) {
      // Trouve l'élément popup parent le plus proche et le ferme.
      closePopup(e.target.closest(".popup"));
    }
  });

  // Fonction pour ouvrir une popup spécifique par son ID.
  function openPopup(popupId) {
    if (isPopupOpen) return; // Si une popup est déjà ouverte, ne rien faire.

    const popup = document.getElementById(popupId); // Récupère l'élément de la popup.
    if (popup) {
      popup.classList.add("show"); // Ajoute la classe "show" pour afficher la popup (via CSS).
      isPopupOpen = true; // Met à jour l'état.
      updatePopupContent(popupId); // Met à jour le contenu de la popup 
    }
  }

  // Fonction pour fermer une popup.
  function closePopup(popupElement) {
    if (popupElement) { // Vérifie que l'élément popup existe.
      popupElement.classList.remove("show"); // Retire la classe "show" pour cacher la popup.
      isPopupOpen = false; // Met à jour l'état, permettant d'ouvrir une autre popup.
    }
  }

  // Gestion des clics sur les icônes spécifiques au menu mobile.
  const iconsMobile = [
    { id: "icon-user-mobile", popup: "popup-Connection" },
    { id: "icon-accessibility-mobile", popup: "popup-Accessibility" },
    { id: "icon-love-mobile", popup: "popup-My-favorit" }
  ];
  iconsMobile.forEach(({ id, popup: popupIdToOpen }) => {
    const iconElement = document.getElementById(id);
    // Ajoute un écouteur de clic seulement si l'icône existe dans le DOM.
    iconElement?.addEventListener("click", () => openPopup(popupIdToOpen));
  });

  // Gestion des clics sur les liens spécifiques de la sidebar (menu latéral).
  const linksSideBar = [
    { id: "login-sidebar", popup: "popup-Connection" },
    { id: "inscription-sidebar", popup: "popup-inscription" }
  ];
  linksSideBar.forEach(({ id, popup: popupIdToOpen }) => {
    const linkElement = document.getElementById(id);
    // Ajoute un écouteur de clic seulement si le lien existe dans le DOM.
    linkElement?.addEventListener("click", () => openPopup(popupIdToOpen));
  });

  // Fonction pour mettre à jour le contenu des popups en fonction de leur type et de l'état de l'utilisateur.
  // Renommée de updatePopupConnection à updatePopupContent pour plus de généralité.
  function updatePopupContent(popupId) {
    // Mise à jour spécifique pour la popup de connexion.
    if (popupId === 'popup-Connection') {
      const popupConnection = document.getElementById("popup-Connection");
      if (!popupConnection) return; // S'assurer que la popup existe

      const connectedSection = popupConnection.querySelector(".connected");
      const disconnectedSection = popupConnection.querySelector(".disconnected");
      const logoutBtn = popupConnection.querySelector("#logout-btn");

      if (!connectedSection || !disconnectedSection || !logoutBtn) {
        console.error("Éléments manquants dans la popup de connexion.");
        return;
      }

      if (isAuthenticated()) { // Vérifie si l'utilisateur est connecté.
        // Affiche la section "connecté" et masque la section "déconnecté".
        connectedSection.style.display = "block";
        disconnectedSection.style.display = "none";

        // Ajoute un écouteur d'événement pour le bouton de déconnexion.
        // Le flag "listenerAttached" évite d'ajouter plusieurs fois le même écouteur.
        if (!logoutBtn.dataset.listenerAttached) {
            logoutBtn.addEventListener("click", () => {
                logout(); // Appelle la fonction de déconnexion.
                updatePopupContent('popup-Connection'); // Met à jour l'affichage de la popup.
                // Optionnel: fermer la popup après déconnexion
                // closePopup(popupConnection); 
            });
            logoutBtn.dataset.listenerAttached = 'true'; // Marque que l'écouteur a été ajouté.
        }
      } else {
        // Affiche la section "déconnecté" et masque la section "connecté".
        connectedSection.style.display = "none";
        disconnectedSection.style.display = "block";
      }
    }

    // Mise à jour spécifique pour la popup "Mes Favoris".
    if (popupId === 'popup-My-favorit') {
      const favoritesContainer = document.getElementById("favorites-list");
      if (!favoritesContainer) return; // S'assurer que le conteneur existe

      if (!isAuthenticated()) {
        // Si l'utilisateur n'est pas connecté, affiche un message l'invitant à se connecter.
        favoritesContainer.innerHTML = "<p>Un compte est nécessaire pour accéder à vos favoris.</p>";
      } else {
        // Si l'utilisateur est connecté, récupère et affiche ses favoris.
        const favoris = getFavorites(); // Récupère les favoris.
        if (favoris.length > 0) {
          favoritesContainer.innerHTML = `
            <ul>
              ${favoris.map(fav => `<li><a href="${fav.link}">${fav.title}</a></li>`).join("")}
            </ul>`;
        } else {
          favoritesContainer.innerHTML = "<p>Aucun favori enregistré.</p>";
        }
      }
    }
  }
});

console.log("Gestion des popups (managmentPopUps.js) chargée.");
