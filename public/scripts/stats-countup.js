// public/scripts/stats-countup.js
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.stat-value');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    elements.forEach(el => observer.observe(el));
  
    function animate(el) {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const isFloat = target % 1 !== 0;
      const duration = 2000; // 2s
      let startTime = null;
  
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        let current = target * progress;
        if (isFloat) {
          current = current.toFixed(1);
        } else {
          current = Math.floor(current);
        }
        el.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
  
      requestAnimationFrame(step);
    }
  });
  