import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const positions = new Map();

// disable browser's native scroll restoration to avoid conflicts
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default function ScrollRestoration() {
  const { pathname } = useLocation();

  // useLayoutEffect fires before paint — no flash of wrong scroll position
  useLayoutEffect(() => {
    const saved = positions.get(pathname);
    if (saved != null) {
      window.scrollTo(0, saved);
      // re-apply after one frame in case layout shifts from images/fonts
      const frame = requestAnimationFrame(() => window.scrollTo(0, saved));
      return () => cancelAnimationFrame(frame);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // track scroll position on this path
  useEffect(() => {
    const onScroll = () => positions.set(pathname, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      positions.set(pathname, window.scrollY);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}
