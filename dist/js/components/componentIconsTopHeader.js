//  Icônes et textes dynamiques
const iconTop = ["icon-user.svg", "icon-accessibility.svg", "icon-love.svg", "icon-basket.svg"];
const textData = [
  { text1: "Me connecter", text2: "M'inscrire", link1: "#login", link2: "#signup" },
  { text1: "Accessibilité", link1: "#accessibility" },
  { text1: "Mes Favoris", link1: "#favorites" },
  { text1: "Mon panier", link1: "#basket" } 
];

// Sélectionne les icônes
const iconTopElements = document.querySelectorAll(".icon-top");

  // Ajoute dynamiquement les éléments de hover
  iconTopElements.forEach((iconElement, index) => {
    const hoverIcons = document.createElement("div");
    hoverIcons.classList.add("hover-icons");

    const ellipseIcons = document.createElement("div");
    ellipseIcons.classList.add("ellipse-icons");
    hoverIcons.appendChild(ellipseIcons);

    const ellipseIcon = document.createElement("div");
    ellipseIcon.classList.add("ellipse-icon");
    ellipseIcons.appendChild(ellipseIcon);

    const hoverIconTop = document.createElement("div");
    hoverIconTop.classList.add("hover-icon-top");
    const hoverIconImage = document.createElement("img");
    // CHEMIN CORRIGÉ ICI :
    hoverIconImage.src = `/assets/icons/${iconTop[index]}`; 
    hoverIconImage.alt = iconTop[index].replace(".svg", "");
    hoverIconImage.classList.add("icon");
    hoverIconTop.appendChild(hoverIconImage);
    ellipseIcons.appendChild(hoverIconTop);

    const hoverText = document.createElement("div");
    hoverText.classList.add("hover-text");
    hoverIcons.appendChild(hoverText);

    // Création du premier lien
    const linkIcon = document.createElement("a");
    linkIcon.classList.add("text-icons");
    linkIcon.href = textData[index].link1 || "#"; 
    linkIcon.textContent = textData[index].text1;
    hoverText.appendChild(linkIcon);

    // Ajout d'ID spécifique pour popup sur linkIcon (text1)
    if (textData[index].text1 === "Me connecter") {
      linkIcon.id = "openPopupConnection";
    } else if (textData[index].text1 === "Accessibilité") {
      linkIcon.id = "openPopupAccessibility";
    } else if (textData[index].text1 === "Mes Favoris") {
      linkIcon.id = "openPopupFavorites";
    } 

    //lien vers panier
    if (textData[index].text1 === "Mon panier") {
      linkIcon.id = "openMonPanier"; // ID pour le lien panier
      // CHEMIN CORRIGÉ ICI :
      const shopLink = "/pages/shop.html" + (textData[index].link1 || ""); // Assure que link1 existe, sinon ancre simple
      linkIcon.href = shopLink; 
    
      // L'event listener n'est pas strictement nécessaire si href est correct,
      // mais si vous le gardez, corrigez aussi le chemin ici.
      linkIcon.addEventListener("click", function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien si vous naviguez manuellement
        window.location.href = shopLink; 
      });
    }

    // Création du deuxième lien si disponible
    if (textData[index].text2 !== undefined) {
      const dividingLine = document.createElement("div");
      dividingLine.classList.add("dividing-line");
      hoverText.appendChild(dividingLine);

      const linkIcon2 = document.createElement("a");
      linkIcon2.classList.add("text-icons");
      linkIcon2.href = textData[index].link2 || "#"; 
      linkIcon2.textContent = textData[index].text2;
      hoverText.appendChild(linkIcon2);

      // Ajout d'ID spécifique pour popup
      if (textData[index].text2 === "M'inscrire") {
        linkIcon2.id = "openPopupSignup";
      }
    }

    iconElement.appendChild(hoverIcons);

    let hideTimeout;

    iconElement.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      hoverIcons.style.opacity = "1";
      hoverIcons.style.visibility = "visible";
      hoverIcons.style.pointerEvents = "auto";
      const imgInIconElement = iconElement.querySelector("img");
      if (imgInIconElement) {
          imgInIconElement.style.opacity = "0"; 
      }
    });

    iconElement.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        hoverIcons.style.opacity = "0";
        hoverIcons.style.visibility = "hidden";
        hoverIcons.style.pointerEvents = "none";
        const imgInIconElement = iconElement.querySelector("img");
        if (imgInIconElement) {
            imgInIconElement.style.opacity = "1"; 
        }
      }, 200);
    });

    hoverIcons.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
    });

    hoverIcons.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        hoverIcons.style.opacity = "0";
        hoverIcons.style.visibility = "hidden";
        hoverIcons.style.pointerEvents = "none";
        const imgInIconElement = iconElement.querySelector("img");
        if (imgInIconElement) {
            imgInIconElement.style.opacity = "1";
        }
      }, 200);
    });
  });
  
console.log("componentIcons, chargé");