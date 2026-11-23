import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';

const V3_FONT_URL =
  'https://fonts.googleapis.com/css2?' +
  'family=Inter:wght@300;400;500;600;700&' +
  'family=JetBrains+Mono:wght@400;500&' +
  'family=Noto+Sans+SC:wght@300;400;500;700;900&' +
  'family=Satisfy&' +
  'family=Syne:wght@700;800&' +
  'display=swap';

export default function useV3Theme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('ticeezz-v3-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const id = 'v3-google-fonts-sans-v5';
    [
      'v3-google-fonts',
      'v3-google-fonts-v2',
      'v3-google-fonts-clean',
      'v3-google-fonts-clean-v3',
      'v3-google-fonts-sans-v4',
    ].forEach((old) => {
      const el = document.getElementById(old);
      if (el) el.remove();
    });

    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = V3_FONT_URL;
      document.head.appendChild(link);
    }

    document.body.classList.add('is-v3-active');
    return () => {
      document.body.classList.remove('is-v3-active');
      document.body.removeAttribute('data-v3-theme');
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-v3-theme', theme);
    try {
      localStorage.setItem('ticeezz-v3-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const switchTheme = useCallback(
    (next, event) => {
      if (next === theme) return;

      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Circular View Transition wave from pointer click origin
      if (
        typeof document !== 'undefined' &&
        typeof document.startViewTransition === 'function' &&
        !reduced
      ) {
        let x = window.innerWidth - 80;
        let y = 30;
        if (event && typeof event.clientX === 'number' && (event.clientX || event.clientY)) {
          x = event.clientX;
          y = event.clientY;
        } else if (event?.currentTarget?.getBoundingClientRect) {
          const rect = event.currentTarget.getBoundingClientRect();
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        }

        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        document.documentElement.classList.add('v3-theme-switching');
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setTheme(next);
          });
          document.body.setAttribute('data-v3-theme', next);
        });

        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius.toFixed(1)}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 560,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {});

        transition.finished.finally(() => {
          document.documentElement.classList.remove('v3-theme-switching');
        });
        return;
      }

      // Graceful instant fallback for browsers without View Transitions
      document.documentElement.classList.add('v3-theme-switching');
      setTheme(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove('v3-theme-switching');
        });
      });
    },
    [theme]
  );

  return [theme, switchTheme];
}
