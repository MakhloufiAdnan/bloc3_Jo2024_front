// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => { 
  // Données pour les icônes : noms de fichiers et textes/liens associés
  const iconTop = ["icon-user.svg", "icon-accessibility.svg", "icon-love.svg", "icon-basket.svg"];
  const textData = [
    { text1: "Me connecter", text2: "M'inscrire", link1: "#login", link2: "#signup" },
    { text1: "Accessibilité", link1: "#accessibility" },
    { text1: "Mes Favoris", link1: "#favorites" },
    { text1: "Mon panier", link1: "#basket" } 
  ];

  // Sélectionne tous les éléments HTML qui servent de conteneurs pour les icônes
  const iconTopElements = document.querySelectorAll(".icon-top");

  // Si aucun conteneur d'icône n'est trouvé, affiche un avertissement et arrête le script
  if (iconTopElements.length === 0) {
    console.warn("Aucun élément avec la classe '.icon-top' n'a été trouvé. Le script componentIconsTopHeader ne s'initialisera pas.");
    return;
  }

  // Boucle sur chaque conteneur d'icône pour ajouter le contenu dynamique et les effets
  iconTopElements.forEach((iconElement, index) => {
    // Vérifie que les données de configuration existent pour l'index actuel
    if (!textData[index] || !iconTop[index]) {
      console.warn(`Configuration manquante pour l'icône à l'index ${index}.`);
      return; // Passe à l'icône suivante
    }

    // Crée le conteneur principal pour l'effet de survol
    const hoverIcons = document.createElement("div");
    hoverIcons.classList.add("hover-icons");

    // Crée le conteneur pour l'arrière-plan stylisé 
    const ellipseIcons = document.createElement("div");
    ellipseIcons.classList.add("ellipse-icons");
    hoverIcons.appendChild(ellipseIcons);

    // Crée l'élément pour l'ellipse/cercle lui-même 
    const ellipseIcon = document.createElement("div");
    ellipseIcon.classList.add("ellipse-icon");
    ellipseIcons.appendChild(ellipseIcon);

    // Crée le conteneur pour l'icône qui apparaît au survol
    const hoverIconTopContainer = document.createElement("div");
    hoverIconTopContainer.classList.add("hover-icon-top");
    const hoverIconImage = document.createElement("img");

    // Définit la source de l'image de l'icône de survol
    hoverIconImage.src = `/assets/icons/${iconTop[index]}`; 
    hoverIconImage.alt = iconTop[index].replace(".svg", ""); 
    hoverIconImage.classList.add("icon"); 
    hoverIconTopContainer.appendChild(hoverIconImage);
    ellipseIcons.appendChild(hoverIconTopContainer);

    // Crée le conteneur pour le texte (liens) qui apparaît au survol
    const hoverText = document.createElement("div");
    hoverText.classList.add("hover-text");
    hoverIcons.appendChild(hoverText);

    // Crée le premier lien (text1)
    const linkIcon1 = document.createElement("a");
    linkIcon1.classList.add("text-icons");
    linkIcon1.href = textData[index].link1 || "#"; // Href par défaut si non spécifié
    linkIcon1.textContent = textData[index].text1;
    hoverText.appendChild(linkIcon1);

    // Assigne des ID spécifiques aux liens pour déclencher les popups
    if (textData[index].text1 === "Me connecter") {
      linkIcon1.id = "openPopupConnection";
    } else if (textData[index].text1 === "Accessibilité") {
      linkIcon1.id = "openPopupAccessibility";
    } else if (textData[index].text1 === "Mes Favoris") {
      linkIcon1.id = "openPopupFavorites";
    } 

    // Gestion spécifique pour le lien "Mon panier"
    if (textData[index].text1 === "Mon panier") {
      linkIcon1.id = "openMonPanier"; // ID optionnel pour ce lien spécifique
      const shopPageLink = "/pages/shop.html" + (textData[index].link1 || ""); // textData[index].link1 est "#basket"
      linkIcon1.href = shopPageLink; 
    
      // Redirige vers la page boutique au clic
      linkIcon1.addEventListener("click", function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien (surtout si href="#...")
        window.location.href = shopPageLink; 
      });
    }

    // Crée le deuxième lien (text2) s'il est défini dans textData
    if (textData[index].text2 !== undefined) {
      const dividingLine = document.createElement("div");
      dividingLine.classList.add("dividing-line"); // Ligne de séparation
      hoverText.appendChild(dividingLine);

      const linkIcon2 = document.createElement("a");
      linkIcon2.classList.add("text-icons");
      linkIcon2.href = textData[index].link2 || "#";
      linkIcon2.textContent = textData[index].text2;
      hoverText.appendChild(linkIcon2);

      // Assigne un ID spécifique pour la popup d'inscription
      if (textData[index].text2 === "M'inscrire") {
        linkIcon2.id = "openPopupSignup";
      }
    }

    // Ajoute la structure de survol complète à l'élément icône d'origine
    iconElement.appendChild(hoverIcons);

    // Gestion des événements mouseenter/mouseleave pour afficher/masquer l'effet de survol
    let hideTimeout; // Variable pour gérer le délai avant de masquer
    const originalIconImg = iconElement.querySelector("img:not(.icon)"); // L'image initialement visible dans .icon-top

    // Fonction pour afficher l'effet de survol
    const showHover = () => {
      clearTimeout(hideTimeout); // Annule tout timeout de masquage en cours
      hoverIcons.style.opacity = "1";
      hoverIcons.style.visibility = "visible";
      hoverIcons.style.pointerEvents = "auto"; // Permet les clics sur les liens
      if (originalIconImg) {
        originalIconImg.style.opacity = "0"; // Masque l'icône d'origine
      }
    };

    // Fonction pour démarrer le processus de masquage de l'effet de survol
    const startHideHover = () => {
      hideTimeout = setTimeout(() => {
        hoverIcons.style.opacity = "0";
        hoverIcons.style.visibility = "hidden";
        hoverIcons.style.pointerEvents = "none"; // Empêche les interactions quand c'est caché
        if (originalIconImg) {
          originalIconImg.style.opacity = "1"; // Réaffiche l'icône d'origine
        }
      }, 200); // Délai de 200ms avant de masquer
    };

    // Attache les écouteurs d'événements
    iconElement.addEventListener("mouseenter", showHover);
    iconElement.addEventListener("mouseleave", startHideHover);
    hoverIcons.addEventListener("mouseenter", showHover); // Si la souris entre dans le contenu du survol, on annule le masquage
    hoverIcons.addEventListener("mouseleave", startHideHover); // Si la souris quitte le contenu du survol
  });
  
  console.log("componentIconsTopHeader.js chargé (chemins originaux corrigés, commentaires ajoutés)");
});
