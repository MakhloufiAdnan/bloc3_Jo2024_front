document.addEventListener("DOMContentLoaded", function () {
  // Sélection des conteneurs principaux dans le DOM
  const containerOffers = document.querySelector(".container-offers");
  const containerPurchaseSummary = document.querySelector(".container-purchase-summary");

  // Données fictives pour simuler les offres 
  const typeOffer = ["Offre Solo", "Offre Duo", "Offre Famille"];
  const priceOffer = ["35€", "60€", "100€"]; 
  const nameTest = ["Athlétisme", "Basketball", "Cyclisme", "Football", "Golf", "Handball", "Judo", "Natation", "Tennis", "Volleyball"];
  const country = ["Allemagne", "Belgique", "Canada", "Etats-Unis", "Ghana", "Hongrie", "Italie", "Kenya"];
  const placeOfTest = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Lille", "Strasbourg", "Nice", "Rennes"];

  let offerCount = 0; // Compteur pour générer des ID uniques pour chaque carte d'offre

  // Fonction pour créer une carte d'offre individuelle
  function createOfferCard() {
    let offerIndex = offerCount++; // Incrémente le compteur pour un ID unique

    // Sélection aléatoire de données pour la carte (pour la démonstration)
    let randomOffer = Math.floor(Math.random() * typeOffer.length);
    let randomSport = Math.floor(Math.random() * nameTest.length);
    let randomCountry = Math.floor(Math.random() * country.length);
    let randomPlace = Math.floor(Math.random() * placeOfTest.length);

    const offerCard = document.createElement("div");
    offerCard.classList.add("offer-cards"); // Classe principale de la carte d'offre

    // Structure HTML de la carte d'offre
    // Les chemins vers les icônes sont déjà corrigés ici (utilisent /assets/icons/)
    offerCard.innerHTML = `
      <div class="container-description box-offers">
        <div class="first-container box-offer">
          <div class="container-type">
            <p>Type d'offre :</p>
            <p class="offre" id="var-offer-${offerIndex}">${typeOffer[randomOffer]}</p>
          </div>
          <div class="container-type">
            <p>Prix :</p>
            <p class="prix" id="var-price-${offerIndex}">${priceOffer[randomOffer]}</p>
          </div>
        </div>
        <div class="second-container box-offer">
          <div class="container-type">
            <p id="name-test-${offerIndex}">${nameTest[randomSport]}</p>
          </div>
          <div class="container-type">
            <div class="country-name">
              <p>Pays :</p>
              <p id="country-${offerIndex}">${country[randomCountry]}</p>
            </div>
            <div class="test-medal">
              <div id="medal">
                <img src="/assets/icons/medal-gold.svg" alt="Icône de médaille d'or">
              </div>
            </div>
          </div>
        </div>
        <div class="third-container box-offer">
          <div class="container-type">
            <p>Date de l'épreuve :</p>
            <p id="date-test-${offerIndex}">12/06/2024</p> {/* Date exemple */}
          </div>
          <div class="container-type">
            <p>Lieu de l’épreuve :</p>
            <p id="place-test-${offerIndex}">${placeOfTest[randomPlace]}</p>
          </div>
        </div> 
      </div>
      <div class="container-choice-offers box-offers">
        <div class="offers-icons">
          <p>Choix de l'offre</p>
          <div class="offer-icons">
            <img class="offer-icon" src="/assets/icons/icon-1ticket.svg" alt="Icône offre solo">
            <img class="offer-icon" src="/assets/icons/icon-2tickets.svg" alt="Icône offre duo">
            <img class="offer-icon" src="/assets/icons/icon-4tickets.svg" alt="Icône offre famille">
          </div>
        </div>
        <div class="box-quantity">
          <button class="less-btn btn-quantity" data-id="${offerIndex}">-</button>
          <input class="quantity" type="text" id="quantity-${offerIndex}" value="1" readonly> {/* readonly pour éviter saisie manuelle non gérée */}
          <button class="more-btn btn-quantity" data-id="${offerIndex}">+</button>
        </div>
        <div class="box-add">
          <button class="btn-shop add-btn" data-id="${offerIndex}">Ajouter au panier</button>
        </div>
      </div>
    `;

    // Ajoute la carte d'offre créée au conteneur des offres dans le DOM
    if (ContainerOffers) {
        ContainerOffers.appendChild(offerCard);
    } else {
        console.error("Le conteneur '.container-offers' est introuvable pour ajouter la carte.");
        return; // Arrête si le conteneur principal n'existe pas
    }
    

    // Gestion de la quantité (boutons + et -)
    const lessButton = offerCard.querySelector(".less-btn");
    const moreButton = offerCard.querySelector(".more-btn");
    const quantityInput = offerCard.querySelector(`#quantity-${offerIndex}`); // Cible plus précisément

    if (lessButton && quantityInput) {
        lessButton.addEventListener("click", function () {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
    }

    if (moreButton && quantityInput) {
        moreButton.addEventListener("click", function () {
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1; // Pas de limite supérieure définie ici
        });
    }

    // Gestion de l'ajout au panier
    const addButton = offerCard.querySelector(".add-btn");
    if (addButton) {
        addButton.addEventListener("click", function () {
            // Vérifie que le conteneur pour le résumé d'achat existe
            if (ContainerPurchaseSummary) {
                createPurchaseSummary(offerIndex);
            } else {
                console.error("Le conteneur '.container-purchase-summary' est introuvable pour ajouter le résumé.");
            }
        });
    }
  }

  // Fonction pour créer et afficher un résumé d'achat
  function createPurchaseSummary(offerIndex) {
    // Récupération des informations de l'offre depuis le DOM
    const nameTestElement = document.getElementById(`name-test-${offerIndex}`);
    const dateTestElement = document.getElementById(`date-test-${offerIndex}`);
    const placeTestElement = document.getElementById(`place-test-${offerIndex}`);
    const varOfferElement = document.getElementById(`var-offer-${offerIndex}`);
    const varPriceElement = document.getElementById(`var-price-${offerIndex}`);
    const quantityElement = document.getElementById(`quantity-${offerIndex}`);

    // Vérification que tous les éléments nécessaires existent
    if (!nameTestElement || !dateTestElement || !placeTestElement || !varOfferElement || !varPriceElement || !quantityElement) {
        console.error(`Impossible de créer le résumé d'achat pour l'offre ${offerIndex}, un ou plusieurs éléments sont manquants.`);
        return;
    }

    const purchaseSummary = document.createElement("div");
    purchaseSummary.classList.add("purchase-summary");

    // Nettoyage du prix pour le calcul (enlève "€" et autres caractères non numériques)
    const priceString = varPriceElement.textContent.replace(/[^0-9]/g, '');
    const price = parseInt(priceString);
    const quantity = parseInt(quantityElement.value);
    const totalPrice = isNaN(price) || isNaN(quantity) ? 'N/A' : (price * quantity) + "€";


    purchaseSummary.innerHTML = `
      <div class="purchase-summary-title">
        <span class="recap">${nameTestElement.textContent}</span>
        <span class="recap">${dateTestElement.textContent}</span>
        <span class="recap place-test">${placeTestElement.textContent}</span>
      </div>
      <div class="purchase-summary-content">
        <p class="offre">${varOfferElement.textContent}</p>
        <p class="prix">${varPriceElement.textContent}</p>
        <p>Quantité : ${quantityElement.value}</p>
        <div class="total-price">
          <p>Total : </p>
          <p>${totalPrice}</p>
        </div>
      </div>
    `;

    ContainerPurchaseSummary.appendChild(purchaseSummary);
  }

  // Générer une carte d'offre initiale au chargement de la page
  if (ContainerOffers) {
    createOfferCard(); 
    if (ContainerPurchaseSummary && document.getElementById(`name-test-0`)) {
        createPurchaseSummary(0); 
    }
  } else {
    console.warn("Élément '.container-offers' non trouvé sur cette page. Aucune carte d'offre ne sera générée initialement.");
  }
});

console.log("Script ComponentShopOffer.js chargé (chemins vérifiés, commentaires ajoutés)");