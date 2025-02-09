// déclaration des variables globales
let compteur = 0; 
let timer, elements, slides, slideWidth, next, prev, speed, transition;

window.onload = () => {
  const imagesHero = document.querySelector('.images-hero');

  // récupération data-speed
  speed = imagesHero.dataset.speed;
  transition = imagesHero.dataset.transition;

  
  elements = document.querySelector('.group-hero');
  console.log(elements);
  
  // clone 1ère image + injection dans diaporama
  let firstSlide = elements.firstElementChild.cloneNode(true);
  elements.appendChild(firstSlide);

  slides = Array.from(elements.children);
  console.log(slides);
  // récupération taille de l'écran
  slideWidth = imagesHero.getBoundingClientRect().width;

  // récupération des chevrons
  next = document.querySelector("#nav-right");
  prev = document.querySelector("#nav-left");

  // recupération des clic chevrons
  next.addEventListener('click', slideNext);
  prev.addEventListener('click', slidePrev);

  // lancement du diaporama
  timer = setInterval(slideNext, speed);

  // gestion du survol arret du diaporama
  imagesHero.addEventListener('mouseover', stopTimer);
  imagesHero.addEventListener('mouseout', startTimer);
}

//fonction point suivant :

function slideNext() {
  compteur++;
  elements.style.transition = transition+'ms linear';

  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;

  // défilement images
  setTimeout(function() {
    if(compteur >= slides.length - 1) {
      compteur = 0;
      elements.style.transition = 'unset';
      elements.style.transform = `translateX(0)`;
    }
  }, transition);
}

function slidePrev() {
  compteur--;
  elements.style.transition = transition+'ms linear';

  if (compteur < 0) {
    compteur = slides.length - 1;
    let decal = -slideWidth * compteur;
    elements.style.transition = 'unset';
    elements.style.transform = `translateX(${decal}px)`;
    setTimeout(slidePrev, 1);
  }
  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;
}

// fonction stopper et reprendre le diaporama
function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(slideNext, speed);
}