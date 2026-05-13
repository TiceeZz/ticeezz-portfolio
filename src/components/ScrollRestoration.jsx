import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const positions = new Map();

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// jump instantly, overriding CSS scroll-behavior: smooth
function jump(y) {
  const el = document.documentElement;
  const prev = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  el.style.scrollBehavior = prev;
}

export default function ScrollRestoration() {
  const { pathname } = useLocation();
  const retries = useRef([]);

  useLayoutEffect(() => {
    retries.current.forEach(clearTimeout);
    retries.current = [];

    const saved = positions.get(pathname);
    if (saved != null) {
      const restore = () => jump(saved);
      restore();
      retries.current.push(
        setTimeout(restore, 0),
        setTimeout(restore, 50),
        setTimeout(restore, 150),
        setTimeout(restore, 400),
      );
    } else {
      jump(0);
    }

    const onScroll = () => positions.set(pathname, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
