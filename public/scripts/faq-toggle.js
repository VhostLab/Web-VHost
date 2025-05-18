// public/scripts/faq-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-section details').forEach(detail => {
      const symbol = detail.querySelector('.faq-symbol');
      detail.addEventListener('toggle', () => {
        symbol.textContent = detail.open ? '−' : '+';
      });
    });
  });
  