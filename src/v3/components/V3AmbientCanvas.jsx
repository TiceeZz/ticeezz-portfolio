import { useEffect, useRef } from 'react';

/**
 * Interactive architectural dot-field canvas with pointer repulsion,
 * Klein-blue vector tension rays, and click-triggered elastic shockwave ripples.
 */
export default function V3AmbientCanvas({ theme }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let points = [];
    let rafId = 0;
    let visible = true;

    const mouse = { x: -9999, y: -9999, active: false };
    const ripples = []; // { x, y, r, maxR, alpha }

    const buildGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = width < 768 ? 44 : 50;
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * gap;
          const oy = r * gap;
          points.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };

    buildGrid();

    const ro = new ResizeObserver(buildGrid);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= -40 && x <= width + 40 && y >= -40 && y <= height + 40) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const onClick = (e) => {
      if (!visible) return;
      if (e.target?.closest?.('a, button')) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        ripples.push({ x, y, r: 10, maxR: Math.max(width, height) * 0.55, alpha: 0.9 });
        if (ripples.length > 4) ripples.shift();
      }
    };

    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onClick, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const RADIUS = 175;
    const RADIUS_SQ = RADIUS * RADIUS;

    const tick = (now) => {
      if (visible) {
        ctx.clearRect(0, 0, width, height);
        const isDark = themeRef.current === 'dark';
        const baseDot = isDark ? 'rgba(148, 190, 255, 0.18)' : 'rgba(0, 56, 255, 0.16)';
        const accentRgb = isDark ? '110, 174, 255' : '0, 56, 255';
        const t = now * 0.00085;

        // Advance active ripples
        for (let k = ripples.length - 1; k >= 0; k--) {
          const rp = ripples[k];
          rp.r += 11;
          rp.alpha *= 0.955;
          if (rp.r > rp.maxR || rp.alpha < 0.02) {
            ripples.splice(k, 1);
          } else {
            ctx.beginPath();
            ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${accentRgb}, ${(rp.alpha * 0.24).toFixed(3)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const waveX = Math.sin(t + p.oy * 0.012) * 1.5;
          const waveY = Math.cos(t + p.ox * 0.012) * 1.5;
          let tx = p.ox + waveX;
          let ty = p.oy + waveY;
          let prox = 0;

          if (mouse.active) {
            const dx = p.ox - mouse.x;
            const dy = p.oy - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < RADIUS_SQ && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              prox = 1 - dist / RADIUS;
              const push = prox * prox * 30;
              tx += (dx / dist) * push;
              ty += (dy / dist) * push;
            }
          }

          // Apply elastic ripple wave impulse
          for (let k = 0; k < ripples.length; k++) {
            const rp = ripples[k];
            const dx = p.ox - rp.x;
            const dy = p.oy - rp.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const band = Math.abs(dist - rp.r);
            if (band < 48) {
              const force = (1 - band / 48) * rp.alpha * 22;
              tx += (dx / dist) * force;
              ty += (dy / dist) * force;
              prox = Math.max(prox, (1 - band / 48) * rp.alpha * 0.85);
            }
          }

          p.vx = (p.vx + (tx - p.x) * 0.14) * 0.75;
          p.vy = (p.vy + (ty - p.y) * 0.14) * 0.75;
          p.x += p.vx;
          p.y += p.vy;

          if (prox > 0.05) {
            if (mouse.active) {
              const mdx = p.x - mouse.x;
              const mdy = p.y - mouse.y;
              if (mdx * mdx + mdy * mdy < RADIUS_SQ) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(${accentRgb}, ${(prox * (isDark ? 0.26 : 0.2)).toFixed(3)})`;
                ctx.lineWidth = 0.85;
                ctx.stroke();
              }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.4 + prox * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accentRgb}, ${(0.3 + prox * 0.65).toFixed(3)})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = baseDot;
            ctx.fill();
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onClick);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="v3-ambient-canvas" aria-hidden="true" />;
}
