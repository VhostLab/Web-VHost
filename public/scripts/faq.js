// public/scripts/faq.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button[data-faq-index]').forEach(btn => {
      const idx = btn.dataset.faqIndex;
      const ans = document.querySelector(`.faq-answer[data-faq-index="${idx}"]`);
      const icon = btn.querySelector('.plus-icon');
      btn.addEventListener('click', () => {
        const open = !ans.classList.toggle('hidden');
        icon.textContent = open ? '−' : '+';
      });
    });
  });
  