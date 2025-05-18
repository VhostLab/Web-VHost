// public/scripts/slide-up.js
(() => {
  const els = document.querySelectorAll('.slide-up');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  els.forEach(el => obs.observe(el));
})();
