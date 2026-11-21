import { useEffect, useRef } from 'react';

/**
 * Subtle, editorial scroll-reveal observer for V3 sections.
 * Adds `.is-revealed` once when the element enters the viewport.
 */
export default function useV3Reveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-revealed');
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          obs.unobserve(el);
        }
      },
      { threshold: Math.min(threshold, 0.04), rootMargin: '0px 0px 40px 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
