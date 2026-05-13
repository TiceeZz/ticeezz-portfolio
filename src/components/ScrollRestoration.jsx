import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const positions = new Map();

export default function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    const saved = positions.get(pathname);
    if (saved != null) {
      // restore scroll on return, whether POP or PUSH
      window.scrollTo(0, saved);
      const frame = requestAnimationFrame(() => window.scrollTo(0, saved));
      return () => cancelAnimationFrame(frame);
    } else {
      window.scrollTo(0, 0);
    }

    const onScroll = () => positions.set(pathname, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      positions.set(pathname, window.scrollY);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}
