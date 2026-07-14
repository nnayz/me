/**
 * Pointer trail — a subtle physical trace on the stage.
 * Off on touch devices and when the user prefers reduced motion.
 */
import { useEffect, useRef } from 'react';

type Point = { life: number; x: number; y: number };

export default function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Point[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      // Reset (not accumulate) the transform so 1 unit = 1 CSS pixel.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      points.push({ life: 1, x: e.clientX, y: e.clientY });
      if (points.length > 60) points.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = document.documentElement.classList.contains('dark');
      const base = dark ? '255,255,255' : '10,10,10';

      for (const p of points) {
        p.life -= 0.045;
        if (p.life <= 0) continue;
        ctx.globalAlpha = p.life * 0.5;
        ctx.fillStyle = `rgba(${base},1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5 * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      points = points.filter((p) => p.life > 0);
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 h-screen w-screen"
      ref={ref}
    />
  );
}
