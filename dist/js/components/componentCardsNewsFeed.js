// Base de données pour les cartes de la section 2 (Fil d'actualité)
const imageCardsNewsFeed = ["ceremonie-ouverture.jpg", "Football-OLY-2-visu-site-611x378.jpg", "mission-accueil-service.png", "Volontaires-JO-2024-768x580.jpg"];
const textDataCardsNewsFeed = [
  { title: "Cérémonie d'ouverture des Jeux Olympiques de Paris 2024.", 
    paragraph: "La cérémonie d'ouverture des Jeux olympiques de Paris se tient, ce vendredi 26 juillet en soirée, sur la Seine, entre le Pont d'Austerlitz et le Pont d'Iéna, dans un format inédit sur lequel mise beaucoup l'Etat français, les organisateurs et le CIO, afin de dépoussiérer le genre et démarrer ces JO par un coup d'éclat. Au total, une vingtaine d'artistes devraient se succéder sur scène, pour un spectacle grandiose qui devrait durer trois heures et demie. Toutes les barques avec les athlètes embarqueront un peu avant le pont d'Austerlitz, au niveau du Jardin des Plantes. Il s'ensuit un trajet de six kilomètres sous plus de huit ponts et passerelles parisiens, avant l'arrivée au Pont d'Iéna, face à la Tour Eiffel. C'est là que le président français Emmanuel Macron déclarera ouverte la XXXIIIe Olympiade." },

  { title: "Quelle sera la première épreuve des Jeux olympiques ?", 
    paragraph: "Si la cérémonie d'ouverture des JO 2024 aura lieu ce vendredi 26 juillet, les épreuves sportives des Jeux olympiques de Paris commenceront deux jours avant. Les Jeux olympiques 2024 de Paris vont officiellement démarrer ce mercredi 24 juillet, soit deux jours avant la cérémonie d’ouverture programmée vendredi sur la Seine. Et la toute première épreuve qui lancera cette 33ᵉ olympiade sera le football. En effet, deux matchs seront au programme dès 15h chez les hommes : Ouzbékistan-Espagne au Parc des Princes à Paris et Argentine-Maroc au stade Geoffroy-Guichard à Saint-Etienne. Plusieurs autres rencontres sont prévues, ce mercredi, comme celui de l’équipe de France de Thierry Henry contre les Etats-Unis (21h)." },

  { title: "Surveillez attentivement les jauges de sécurité pour éviter les débordements", 
    paragraph: "Un événement comme les Jeux Olympiques qui accueillent beaucoup de monde nécessitent une surveillance accrue des jauges de sécurité dans les ERP (établissement recevant du public) pour ne pas la dépasser et pour garantir la sécurité des participants. Des systèmes existent ainsi pour recevoir des alertes automatiques de jauge dès qu'un certain niveau est atteint. Par exemple : première alerte à 80% d'occupation pour pouvoir ralentir les entrées, deuxième alerte à 90% pour arrêter les entrées le temps que la jauge diminue. En mettant en œuvre ces stratégies, Paris peut offrir une expérience exceptionnelle aux visiteurs tout en minimisant les problèmes liés à l'affluence." },

  { title: "Les Volontaires, acteurs essentiels des Jeux Olympiques et Paralympiques de Paris 2024", 
    paragraph: "Pour organiser les Jeux Olympiques et Paralympiques, Paris 2024 engagera entre 35 000 et 45 000 volontaires, à titre bénévole. Visages de Paris 2024 et de la France aux yeux du monde entier, les volontaires jouent un rôle essentiel dans le succès des Jeux. Présents pour faciliter l’expérience des athlètes, des spectateurs et de toutes les parties prenantes des Jeux sur l’ensemble des sites officiels en France (sites de compétition, villages des athlètes, aéroports…), les volontaires auront un rôle clé lors de ces Jeux." } 
];

// Base de données pour les cartes de la section 5 (Meilleurs moments / Porteurs de la flamme)
const imageCardsNewsFeed2 = ["mascotte-JO.jpg", "carte-flamme-olympique.png"];
const textDataCardsNewsFeed2 = [
  { title: "Les porteurs de la flamme olympique des JO de Paris.", 
    paragraph: " Lors de sa traversée de l’Hexagone, la torche est portée par des figures exceptionnelles. Jeunes et moins jeunes, personnes valides ou porteuses de handicap, tous ont un parcours remarquable et incarnent l’esprit des Jeux. Ce ne sont pas moins de 11 000 porteurs qui vont se relayer pour faire voyager la flamme olympique. Celle-ci a été allumée le 16 avril 2024, selon une tradition antique, à Olympie, en Grèce. Elle a pris place à bord du Belem, ce grand voilier français, qui a traversé la mer Méditerranée pour arriver à Marseille le 8 mai. Elle enflammera enfin la vasque le 26 juillet, lors de la cérémonie d’ouverture des Jeux Olympiques de Paris. Le nageur Florent Manaudou a été le premier ambassadeur du flambeau à son arrivée en France." },

  { title: "Visualisez le parcours du relais de la flamme olympique en France jusqu'au 26 juillet.", 
    paragraph: "La torche, arrivée le 8 mai à Marseille, va parcourir 12 000 km sur tout le territoire national, dans l'Hexagone et en outre-mer, en faisant la part belle au patrimoine français. Des étapes aussi attendues que celles du Tour de France. Soixante-quatre départements vont voir passer le relais de la flamme olympique, qui a débarqué sur le sol français mercredi 8 mai à Marseille, après un voyage de dix jours depuis la Grèce à bord du voilier Belem. Le coup d'envoi d'un marathon de 79 jours jusqu'au début des Jeux de Paris, le 26 juillet, et l'allumage de la flamme au jardin des Tuileries par un dernier relayeur dont l'identité fait l'objet de toutes les spéculations. L'un des axes majeurs du parcours vise à mettre en valeur le patrimoine français, avec des passages dans des sites historiques emblématiques : la grotte de Lascaux (Dordogne), le Mont-Saint-Michel (Manche), les plages du Débarquement (plusieurs départements de Normandie), le Mémorial de Verdun (Meuse), le site archéologique d'Alésia (Côte-d'Or), les remparts de Carcassonne (Aude) et le château de Versailles (Yvelines) dans la dernière ligne droite. Les sites naturels ne sont pas en reste, avec un passage dans la vallée du Mont-Blanc (Haute-Savoie), au Pic du Midi ou encore dans les gorges du Verdon.Pour mettre l'accent sur les richesses du pays, la gastronomie sera également à l'honneur, avec un saut dans les vignobles les plus réputés (Saint-Emilion, Chablis, les Coteaux du Layon...), tout comme la culture (le Louvre-Lens, le musée de la BD d'Angoulême, le palais des Festivals à Cannes) et bien sûr le sport (Roland-Garros, le Stade de France, le stade Vélodrome ou le 'chaudron' de Geoffroy-Guichard à Saint-Etienne). En revanche, les deux seules autres villes françaises qui ont accueilli des Jeux (d'hiver), Grenoble et Albertville, ne sont pas concernées par ce relais de la flamme." }
];

// Attend que le DOM soit entièrement chargé avant d'exécuter le script.
document.addEventListener("DOMContentLoaded", () => {

  // Fonction générique pour créer et ajouter des cartes d'actualités à un élément parent donné.
  function createCards(imageArray, textArray, parentElement) {
    // Vérifie si l'élément parent fourni existe dans le DOM.
    if (!parentElement) {
      console.error("Erreur : L'élément parent fourni à createCards est introuvable dans le DOM.");
      return; // Arrête l'exécution si le parent n'est pas trouvé.
    }

    // Utilise un DocumentFragment pour optimiser les performances lors de l'ajout de plusieurs éléments au DOM.
    const fragment = document.createDocumentFragment();

    // Boucle sur chaque source d'image pour créer une carte correspondante.
    imageArray.forEach((imageSrc, index) => {
      // Vérifie s'il existe des données textuelles correspondantes pour l'image actuelle.
      if (!textArray[index]) {
        console.warn(`Données textuelles manquantes pour l'image : ${imageSrc} à l'index ${index}. La carte ne sera pas créée.`);
        return; // Passe à l'image suivante.
      }

      // Crée l'élément principal de la carte.
      const card = document.createElement("div");
      card.classList.add("section-display"); // Classe de base pour la mise en page de la carte.
      // Ajoute une classe pour alterner la position du texte (droite/gauche) si l'index est pair.
      if (index % 2 === 0) {
        card.classList.add("right-text-content");
      }

      // Crée l'élément <article> pour contenir le texte de la carte.
      const textContentElement = document.createElement("article");
      textContentElement.classList.add("text-content-cards-feed");

      // Crée l'élément <img> pour l'illustration de la carte.
      const img = document.createElement("img");
      img.src = `/assets/image/${imageSrc}`; 
      img.alt = textArray[index].title; // Texte alternatif descriptif pour l'image.
      img.classList.add("illustration"); // Classe pour styler l'image.

      // Gestionnaire d'erreur pour le chargement de l'image.
      img.onerror = () => {
        console.error(`Image non trouvée ou erreur de chargement pour : ${img.src}. Remplacement par une image par défaut.`);
        img.src = "/assets/image/default.jpg"; 
        img.alt = "Image par défaut non disponible"; // Met à jour l'alt pour l'image de secours.
      };

      // Crée l'élément <h2> pour le titre de la carte.
      const title = document.createElement("h2");
      title.textContent = textArray[index].title;
      title.classList.add("title-news-feed");

      // Crée l'élément <p> pour le paragraphe de la carte.
      const paragraph = document.createElement("p");
      paragraph.textContent = textArray[index].paragraph;
      paragraph.classList.add("paragraph-news-feed");

      // Ajoute le titre et le paragraphe à l'élément <article>.
      textContentElement.appendChild(title);
      textContentElement.appendChild(paragraph);

      // Ajoute l'article (texte) et l'image à la carte.
      // L'ordre dépendra de la mise en page souhaitée (image avant ou après texte).
      // Si 'right-text-content' met le texte à droite, l'image devrait être à gauche.
      card.appendChild(textContentElement); // Ou img en premier si le texte est à droite par défaut
      card.appendChild(img);
      
      // Ajoute la carte complétée au DocumentFragment.
      fragment.appendChild(card);
    });

    // Ajoute toutes les cartes (contenues dans le fragment) à l'élément parent dans le DOM.
    parentElement.appendChild(fragment);
  }

  // Cible spécifiquement le conteneur pour la section 2.
  const sec2FeedContainer = document.querySelector(".cards-news-feed.sec2");
  if (sec2FeedContainer) {
    createCards(imageCardsNewsFeed, textDataCardsNewsFeed, sec2FeedContainer);
    console.log("Cartes d'actualités pour la section 2 chargées.");
  } else {
    console.warn("Conteneur '.cards-news-feed.sec2' non trouvé. Aucune carte générée pour la section 2.");
  }

  // Logique pour la section 5 : utilise setInterval pour vérifier périodiquement si l'élément .sec5 est disponible.
  // Utile si .sec5 est ajouté au DOM plus tard par un autre script ou une action utilisateur.
  const checkSection5Interval = setInterval(() => {
    const sec5FeedContainer = document.querySelector(".cards-news-feed.sec5"); // Cible spécifiquement le conteneur de la section 5.
  
    if (sec5FeedContainer) {
      createCards(imageCardsNewsFeed2, textDataCardsNewsFeed2, sec5FeedContainer);
      console.log("Cartes d'actualités pour la section 5 chargées.");
      clearInterval(checkSection5Interval); // Arrête l'intervalle une fois que les cartes sont créées.
    }
    // Si sec5FeedContainer n'est pas trouvé, l'intervalle continue de vérifier.
    // Vous pourriez ajouter une condition pour arrêter l'intervalle après un certain temps pour éviter une boucle infinie.
  }, 500); // Vérifie toutes les 500 millisecondes.
});

console.log("Script componentCardsNewsFeed.js chargé (chemins corrigés, commentaires ajoutés).");
