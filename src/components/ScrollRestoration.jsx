import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const positions = new Map();

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function jump(y) {
  const el = document.documentElement;
  const prev = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  el.style.scrollBehavior = prev;
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

      const h = document.body.scrollHeight;
      if (h === lastHeight) {
        stableCount++;
        // After 3 consecutive stable checks, do one final jump and stop
        if (stableCount >= 3) {
          jump(target);
          return;
        }
      } else {
        stableCount = 0;
        lastHeight = h;
        jump(target);
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

