// Page Load Progress Bar
// Muestra una barra de progreso durante la carga de la página

const progressBar = document.getElementById('page-load-progress');
if (!progressBar) {
  console.warn('Progress bar element not found');
} else {
  let progress = 0;
  let interval;

  // Función para actualizar el progreso
  const updateProgress = () => {
    if (progress < 90) {
      // Incremento rápido al inicio
      if (progress < 30) {
        progress += Math.random() * 10 + 5;
      }
      // Incremento medio
      else if (progress < 60) {
        progress += Math.random() * 5 + 2;
      }
      // Incremento lento cerca del final
      else {
        progress += Math.random() * 2 + 0.5;
      }

      progressBar.style.width = `${Math.min(progress, 90)}%`;
    }
  };

  // Iniciar el progreso
  progressBar.style.width = '0%';
  progressBar.style.opacity = '1';
  interval = setInterval(updateProgress, 100);

  // Cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      progress = 70;
      progressBar.style.width = '70%';
    });
  } else {
    progress = 70;
    progressBar.style.width = '70%';
  }

  // Cuando la página esté completamente cargada
  window.addEventListener('load', () => {
    clearInterval(interval);

    // Completar al 100%
    progressBar.style.width = '100%';

    // Ocultar después de 400ms
    setTimeout(() => {
      progressBar.style.opacity = '0';

      // Remover del DOM después de la transición
      setTimeout(() => {
        if (progressBar.parentNode) {
          progressBar.parentNode.removeChild(progressBar);
        }
      }, 400);
    }, 400);
  });
}
