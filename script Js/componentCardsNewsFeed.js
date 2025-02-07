const imageCardsNewsFeed = ["ceremonie ouverture.jpg", "Football-OLY-2-visu-site-611x378.jpg", "mission accueil service.png", "Volontaires-JO-2024-768x580.jpg"];
const textDataCardsNewsFeed = [
  { title: "Cérémonie d'ouverture des Jeux Olympiques de Paris 2024.", 
    paragraph: "La cérémonie d'ouverture des Jeux olympiques de Paris se tient, ce vendredi 26 juillet en soirée, sur la Seine, entre le Pont d'Austerlitz et le Pont d'Iéna, dans un format inédit sur lequel mise beaucoup l'Etat français, les organisateurs et le CIO, afin de dépoussiérer le genre et démarrer ces JO par un coup d'éclat. Au total, une vingtaine d'artistes devraient se succéder sur scène, pour un spectacle grandiose qui devrait durer trois heures et demie. Toutes les barques avec les athlètes embarqueront un peu avant le pont d'Austerlitz, au niveau du Jardin des Plantes. Il s'ensuit un trajet de six kilomètres sous plus de huit ponts et passerelles parisiens, avant l'arrivée au Pont d'Iéna, face à la Tour Eiffel. C'est là que le président français Emmanuel Macron déclarera ouverte la XXXIIIe Olympiade." },

  { title: "Quelle sera la première épreuve des Jeux olympiques ?", 
    paragraph: "Si la cérémonie d'ouverture des JO 2024 aura lieu ce vendredi 26 juillet, les épreuves sportives des Jeux olympiques de Paris commenceront deux jours avant. Les Jeux olympiques 2024 de Paris vont officiellement démarrer ce mercredi 24 juillet, soit deux jours avant la cérémonie d’ouverture programmée vendredi sur la Seine. Et la toute première épreuve qui lancera cette 33ᵉ olympiade sera le football. En effet, deux matchs seront au programme dès 15h chez les hommes : Ouzbékistan-Espagne au Parc des Princes à Paris et Argentine-Maroc au stade Geoffroy-Guichard à Saint-Etienne. Plusieurs autres rencontres sont prévues, ce mercredi, comme celui de l’équipe de France de Thierry Henry contre les Etats-Unis (21h)." },

  { title: "Surveillez attentivement les jauges de sécurité pour éviter les débordements", 
    paragraph: "Un événement comme les Jeux Olympiques qui accueillent beaucoup de monde nécessitent une surveillance accrue des jauges de sécurité dans les ERP (établissement recevant du public) pour ne pas la dépasser et pour garantir la sécurité des participants. Des systèmes existent ainsi pour recevoir des alertes automatiques de jauge dès qu'un certain niveau est atteint. Par exemple : première alerte à 80% d'occupation pour pouvoir ralentir les entrées, deuxième alerte à 90% pour arrêter les entrées le temps que la jauge diminue. En mettant en œuvre ces stratégies, Paris peut offrir une expérience exceptionnelle aux visiteurs tout en minimisant les problèmes liés à l'affluence." },

  { title: "Les Volontaires, acteurs essentiels des Jeux Olympiques et Paralympiques de Paris 2024", 
    paragraph: "Pour organiser les Jeux Olympiques et Paralympiques, Paris 2024 engagera entre 35 000 et 45 000 volontaires, à titre bénévole. Visages de Paris 2024 et de la France aux yeux du monde entier, les volontaires jouent un rôle essentiel dans le succès des Jeux. Présents pour faciliter l’expérience des athlètes, des spectateurs et de toutes les parties prenantes des Jeux sur l’ensemble des sites officiels en France (sites de compétition, villages des athlètes, aéroports…), les volontaires auront un rôle clé lors de ces Jeux. " } 
];

// Sélectionne l'élément parent des cartes
const cardsNewsFeed = document.querySelector(".cards-news-feed");

if (!cardsNewsFeed) {
  console.error("Erreur : Élément '.cards-news-feed' introuvable.");
} else {
  // Crée un fragment de document pour améliorer les performances
  const fragmentCardsNewsFeed = document.createDocumentFragment();

  // Boucle sur les données et crée les cartes
  imageCardsNewsFeed.forEach((imageSrcCards, index) => {
    if (!textDataCardsNewsFeed[index]) {
      console.warn(`Données textuelles manquantes pour l'image: ${imageSrcCards}`);
      return;
    }

    // Création de la carte
    const card = document.createElement("div");
    card.classList.add("section-display");

    // Ajout de la classe pour inverser le texte
    if (index%2 === 0) {
      card.classList.add("right-text-content");
    } 

    // Div article
    const textContentCardsFeed = document.createElement("article");
    textContentCardsFeed.classList.add("text-content-cards-feed");

    // Ajout de l'image
    const img = document.createElement("img");
    img.src = `Photos/${imageSrcCards}`;
    img.alt = textDataCardsNewsFeed[index].title;
    img.classList.add("illustration");

    // Ajout du titre
    const title = document.createElement("h2");
    title.textContent = textDataCardsNewsFeed[index].title;
    title.classList.add("title-news-feed");

    // Ajout du paragraphe
    const paragraph = document.createElement("p");
    paragraph.textContent = textDataCardsNewsFeed[index].paragraph;
    paragraph.classList.add("paragraph-news-feed");

    // Structure de la carte
    textContentCardsFeed.appendChild(title);
    textContentCardsFeed.appendChild(paragraph);
    card.appendChild(textContentCardsFeed);
    card.appendChild(img);

    // Ajout au fragment
    fragmentCardsNewsFeed.appendChild(card);
  });

  // Ajout final au DOM
  cardsNewsFeed.appendChild(fragmentCardsNewsFeed);
}
