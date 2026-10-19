import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'star' | 'petal' | 'heart';
  angle: number;
  spin: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ density = 28 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = isHeadless ? Math.min(12, density) : density;
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: ((i * 137.5) % 100) * (width / 100),
      y: ((i * 73.1) % 100) * (height / 100),
      size: (i % 4) + 2.5,
      speedY: ((i % 3) + 1) * 0.28,
      speedX: ((i % 5) - 2) * 0.12,
      opacity: 0.25 + (i % 5) * 0.12,
      type: i % 5 === 0 ? 'heart' : i % 3 === 0 ? 'petal' : 'star',
      angle: (i * 45) % 360,
      spin: ((i % 3) - 1) * 0.01,
    }));

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === 'star') {
          ctx.fillStyle = '#E8D3A8';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'petal') {
          ctx.fillStyle = '#D98A9C';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.8, 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Gentle heart particle
          ctx.fillStyle = '#F4D3DC';
          const s = p.size * 0.45;
          ctx.beginPath();
          ctx.moveTo(0, s);
          ctx.bezierCurveTo(-s * 2, -s, -s * 3, s, 0, s * 3);
          ctx.bezierCurveTo(s * 3, s, s * 2, -s, 0, s);
          ctx.fill();
        }

        ctx.restore();

        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;
          p.angle += p.spin;

          if (p.y > height + 20) {
            p.y = -15;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -15;
          if (p.x < -20) p.x = width + 15;
        }
      }
    };

    // Draw first static frame immediately
    drawFrame();

    if (prefersReducedMotion || isHeadless) {
      // In headless browser or reduced-motion mode, throttle or keep static so software rendering never stalls screenshots
      const interval = isHeadless
        ? window.setInterval(() => {
            if (!document.hidden) drawFrame();
          }, 250)
        : null;
      return () => {
        window.removeEventListener('resize', handleResize);
        if (interval) clearInterval(interval);
      };
    }

    let rafId: number;
    const animate = () => {
      if (!document.hidden) {
        drawFrame();
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
    />
  );
};
