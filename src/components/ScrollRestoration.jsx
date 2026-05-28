import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const positions = new Map();

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function jump(y) {
  window.scrollTo(0, y);
}

export default function ScrollRestoration() {
  const { pathname } = useLocation();
  const timers = useRef([]);
  const watching = useRef(false);

  useLayoutEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    watching.current = true;

    const saved = positions.get(pathname);
    const target = saved != null ? saved : 0;

    // Jump immediately
    jump(target);

    // Keep jumping to top while page height is still settling
    // (lazy components, images, iframes cause layout shifts)
    let lastHeight = document.body.scrollHeight;
    let stableCount = 0;
    const MAX_WATCH_MS = 4000;
    const CHECK_INTERVAL = 120;
    const start = Date.now();

    function tick() {
      if (!watching.current) return;

      // Read all layout values first to avoid forced reflow
      const h = document.body.scrollHeight;
      if (h === lastHeight) {
        stableCount++;
        if (stableCount >= 3) {
          // Batch write after read
          requestAnimationFrame(() => jump(target));
          return;
        }
      } else {
        stableCount = 0;
        lastHeight = h;
        requestAnimationFrame(() => jump(target));
      }

      if (Date.now() - start < MAX_WATCH_MS) {
        timers.current.push(setTimeout(tick, CHECK_INTERVAL));
      }
    }
    timers.current.push(setTimeout(tick, CHECK_INTERVAL));

    const onScroll = () => positions.set(pathname, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      watching.current = false;
      timers.current.forEach(clearTimeout);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}

