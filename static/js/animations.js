// Lightweight Canvas Particle System & IntersectionObserver reveals
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 24 }, (_, i) => ({
    x: ((i * 97) % 100) * (width / 100),
    y: ((i * 53) % 100) * (height / 100),
    r: (i % 3) + 2,
    vy: ((i % 3) + 1) * 0.25,
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      ctx.fillStyle = 'rgba(232, 211, 168, 0.45)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reducedMotion) {
        p.y += p.vy;
        if (p.y > height) p.y = -10;
      }
    }
    if (!reducedMotion && !document.hidden) {
      requestAnimationFrame(render);
    }
  }
  render();
})();
