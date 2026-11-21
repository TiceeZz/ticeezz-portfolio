import { useEffect, useRef } from 'react';

/**
 * Velocity-reactive continuous horizontal marquee banner.
 * Reacts smoothly to page scroll velocity with spring damping,
 * supports opposing directions, hover slowdown, and reduced motion.
 */
export default function KineticMarquee({
  children,
  speed = 48, // px per second
  direction = -1, // -1 = left, 1 = right
  velocityFactor = 0.28,
  pauseOnHover = false,
  slowOnHover = false,
  className = '',
  trackClassName = '',
  repeat = 3,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const hoverState = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let smoothBoost = 0;
    let offset = 0;
    let groupWidth = group.getBoundingClientRect().width || 1;

    const ro = new ResizeObserver(() => {
      const nextWidth = group.getBoundingClientRect().width;
      if (nextWidth > 0) groupWidth = nextWidth;
    });
    ro.observe(group);

    const onScroll = () => {
      const curr = window.scrollY;
      const delta = curr - lastScrollY;
      lastScrollY = curr;
      // Clamp extreme jump deltas (e.g. anchor scroll)
      scrollVelocity = Math.max(-90, Math.min(90, delta));
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.9;
      smoothBoost += (scrollVelocity - smoothBoost) * 0.12;

      const hoverScale = hoverState.current
        ? pauseOnHover
          ? 0
          : slowOnHover
          ? 0.22
          : 1
        : 1;

      if (!prefersReduced) {
        const baseStep = direction * speed * dt * hoverScale;
        const boostStep = direction * Math.abs(smoothBoost) * velocityFactor * 16 * dt * hoverScale;
        offset += baseStep + boostStep;

        if (offset <= -groupWidth) offset += groupWidth;
        if (offset > 0) offset -= groupWidth;

        track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed, direction, velocityFactor, pauseOnHover, slowOnHover]);

  return (
    <div
      ref={containerRef}
      className={`v3-marquee ${className}`}
      onMouseEnter={() => { hoverState.current = true; }}
      onMouseLeave={() => { hoverState.current = false; }}
    >
      <div ref={trackRef} className={`v3-marquee__track ${trackClassName}`}>
        {Array.from({ length: repeat }).map((_, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? groupRef : undefined}
            className="v3-marquee__group"
            aria-hidden={idx > 0 ? 'true' : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
