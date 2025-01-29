// Icônes et textes dynamiques
const iconTop = ["icon-user.svg", "icon-accessibility.svg", "icon-love.svg", "icon-basket.svg"];
const textData = [
  { text1: "Me connecter", text2: "M'inscrire" },
  { text1: "Accessibilité" },
  { text1: "Mes Favoris" },
  { text1: "Mon panier" }
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
  hoverIconImage.src = `icons/${iconTop[index]}`;
  hoverIconImage.alt = iconTop[index].replace(".svg", "");
  hoverIconImage.classList.add("icon");
  hoverIconTop.appendChild(hoverIconImage);
  ellipseIcons.appendChild(hoverIconTop);

  const hoverText = document.createElement("div");
  hoverText.classList.add("hover-text");
  hoverIcons.appendChild(hoverText);

  const textIcon1 = document.createElement("div");
  textIcon1.classList.add("text-icons");
  textIcon1.textContent = textData[index].text1;
  hoverText.appendChild(textIcon1);

  if (textData[index].text2 !== undefined) {
    const dividingLine = document.createElement("div");
    dividingLine.classList.add("dividing-line");
    hoverText.appendChild(dividingLine);

    const textIcon2 = document.createElement("div");
    textIcon2.classList.add("text-icons");
    textIcon2.textContent = textData[index].text2;
    hoverText.appendChild(textIcon2);
  }

  iconElement.appendChild(hoverIcons);

  let hideTimeout;

  iconElement.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    hoverIcons.style.opacity = "1";
    hoverIcons.style.visibility = "visible";
    hoverIcons.style.pointerEvents = "auto";
    iconElement.querySelector("img").style.opacity = "0"; // Cache l'icône de base
  });

  iconElement.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      hoverIcons.style.opacity = "0";
      hoverIcons.style.visibility = "hidden";
      hoverIcons.style.pointerEvents = "none";
      iconElement.querySelector("img").style.opacity = "1"; // Réaffiche l'icône
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
      iconElement.querySelector("img").style.opacity = "1"; // Réaffiche l'icône
    }, 200);
  });
});