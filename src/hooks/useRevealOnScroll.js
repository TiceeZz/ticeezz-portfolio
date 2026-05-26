import { useRef, useEffect } from 'react';

/**
 * Intersection Observer hook for scroll-triggered reveal.
 * Observes elements matching `selector` within the returned ref's subtree.
 * Adds `is-visible` class when ≥10% of the element enters the viewport.
 * Batches DOM writes via requestAnimationFrame to avoid layout thrashing.
 * Each element is unobserved after revealing (one-shot, no re-trigger).
 */
export default function useRevealOnScroll({
  selector = '.reveal-item',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(selector);
    if (!items.length) return;

    const pending = new Set();
    let raf = null;

    const flush = () => {
      pending.forEach(el => el.classList.add('is-visible'));
      pending.clear();
      raf = null;
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pending.add(entry.target);
          observer.unobserve(entry.target);
        }
      });
      if (pending.size && !raf) {
        raf = requestAnimationFrame(flush);
      }
    }, { threshold, rootMargin });

    items.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [selector, threshold, rootMargin]);

  return containerRef;
}
