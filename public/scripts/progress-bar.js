// Progress Bar Script
// MEJORA #10: Loading States - Barra de progreso al hacer scroll

const updateProgressBar = () => {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Calcular porcentaje de scroll
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

  // Actualizar el ancho del progress bar
  progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
};

// Actualizar al hacer scroll
window.addEventListener('scroll', updateProgressBar, { passive: true });

// Actualizar al cargar
window.addEventListener('load', updateProgressBar);

// Para navegación de Astro
document.addEventListener('astro:page-load', updateProgressBar);
