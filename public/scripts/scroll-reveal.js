// Scroll Reveal Animation Script
// MEJORA #11: Efectos visuales - scroll reveal y animaciones

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Opcional: dejar de observar después de activar
      // observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

// Observar todos los elementos con clases reveal
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach(el => observer.observe(el));
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

// Para navegación de Astro (si usas View Transitions)
document.addEventListener('astro:page-load', initScrollReveal);
