import { useEffect, useRef, useState } from 'react';

/**
 * Velocity-reactive continuous horizontal marquee banner on desktop,
 * automatically switching to a zero-JS, GPU compositor-thread CSS animation
 * on mobile / coarse-pointer devices (paused when offscreen) for 120fps scrolling.
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
  const [isTouchMode] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 960)
  );
  const [inView, setInView] = useState(true);

  const effectiveRepeat = isTouchMode ? 2 : repeat;

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!container || !track || !group) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchMode) {
      const updateDuration = () => {
        const w = group.getBoundingClientRect().width || 600;
        const sec = Math.max(14, Math.round(w / Math.max(16, speed)));
        track.style.setProperty('--marquee-dur', `${sec}s`);
      };
      updateDuration();
      const io = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0.01 }
      );
      io.observe(container);
      return () => io.disconnect();
    }

    let rafId = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let smoothBoost = 0;
    let offset = 0;
    let visible = true;
    let groupWidth = group.getBoundingClientRect().width || 1;

    const ro = new ResizeObserver(() => {
      const nextWidth = group.getBoundingClientRect().width;
      if (nextWidth > 0) groupWidth = nextWidth;
    });
    ro.observe(group);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) lastTime = performance.now();
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    const onScroll = () => {
      if (!visible) return;
      const curr = window.scrollY;
      const delta = curr - lastScrollY;
      lastScrollY = curr;
      scrollVelocity = Math.max(-90, Math.min(90, delta));
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now) => {
      if (visible && !prefersReduced) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        scrollVelocity *= 0.9;
        smoothBoost += (scrollVelocity - smoothBoost) * 0.12;

        const hoverScale = hoverState.current
          ? pauseOnHover
            ? 0
            : slowOnHover
            ? 0.22
            : 1
          : 1;

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
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [isTouchMode, speed, direction, velocityFactor, pauseOnHover, slowOnHover]);

  const touchClasses = isTouchMode
    ? `is-css-marquee${direction > 0 ? ' is-reverse' : ''}${!inView ? ' is-paused' : ''}`
    : '';

  return (
    <div
      ref={containerRef}
      className={`v3-marquee ${className}`}
      onMouseEnter={!isTouchMode ? () => { hoverState.current = true; } : undefined}
      onMouseLeave={!isTouchMode ? () => { hoverState.current = false; } : undefined}
    >
      <div ref={trackRef} className={`v3-marquee__track ${touchClasses} ${trackClassName}`}>
        {Array.from({ length: effectiveRepeat }).map((_, idx) => (
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
