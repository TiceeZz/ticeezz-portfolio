import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const positions = new Map();

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default function ScrollRestoration() {
  const { pathname } = useLocation();
  const retries = useRef([]);

  useLayoutEffect(() => {
    // clear any pending retries from previous route
    retries.current.forEach(clearTimeout);
    retries.current = [];

    const saved = positions.get(pathname);
    if (saved != null) {
      const restore = () => window.scrollTo(0, saved);
      // try immediately (before paint)
      restore();
      // retry: after paint, after short delay, after longer delay for images/fonts
      retries.current.push(
        setTimeout(restore, 0),
        setTimeout(restore, 50),
        setTimeout(restore, 150),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

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
