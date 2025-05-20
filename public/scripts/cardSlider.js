import { CardData } from '../../src/scripts/cardData.js';

let activeIndex = 0;
let progress = 0;
const duration = 8000; // tiempo total por tarjeta (ms)
const intervalStep = 100; // intervalo de tick (ms)

const cards = document.querySelectorAll('.card');
const imgEl = document.getElementById('panel-image');

function tick() {
  progress += intervalStep;
  if (progress >= duration) {
    progress = 0;
    const prevBar = cards[activeIndex].querySelector('.progress-bar');
    if (prevBar) prevBar.style.width = '0%';
    cards[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % cards.length;
    cards[activeIndex].classList.add('active');
    imgEl.src = CardData[activeIndex].image;
  }
  updateProgressBar();
}

function updateProgressBar() {
  const bar = cards[activeIndex].querySelector('.progress-bar');
  if (bar) {
    bar.style.width = `${(progress / duration) * 100}%`;
  }
}


// Inicialización
cards[activeIndex].classList.add('active');
imgEl.src = CardData[activeIndex].image;
setInterval(tick, intervalStep);

// Permitir clic manual para activar tarjeta
cards.forEach(card => {
  card.addEventListener('click', () => {
    const prevBar = cards[activeIndex].querySelector('.progress-bar');
    if (prevBar) prevBar.style.width = '0%';
    cards[activeIndex].classList.remove('active');
    activeIndex = Number(card.dataset.index);
    progress = 0;
    cards[activeIndex].classList.add('active');
    imgEl.src = CardData[activeIndex].image;
  });
});

