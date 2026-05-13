import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const positions = new Map();

export default function ScrollRestoration() {
  const { pathname, key } = useLocation();
  const navType = useNavigationType();
  const saved = useRef(false);

  useEffect(() => {
    if (navType === 'POP') {
      const y = positions.get(key);
      if (y != null) {
        saved.current = true;
        window.scrollTo(0, y);
        saved.current = false;
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, key, navType]);

  useEffect(() => {
    const onScroll = () => {
      if (!saved.current) positions.set(key, window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      positions.set(key, window.scrollY);
      window.removeEventListener('scroll', onScroll);
    };
  }, [key]);

  return null;
}
