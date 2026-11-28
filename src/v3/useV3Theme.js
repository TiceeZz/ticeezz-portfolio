import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import '@fontsource/syne/latin-700.css';
import '@fontsource/syne/latin-800.css';
import '@fontsource-variable/geist/index.css';
import '@fontsource-variable/geist-mono/index.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';

export default function useV3Theme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('ticeezz-v3-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    [
      'v3-google-fonts',
      'v3-google-fonts-v2',
      'v3-google-fonts-clean',
      'v3-google-fonts-clean-v3',
      'v3-google-fonts-sans-v4',
      'v3-google-fonts-sans-v5',
    ].forEach((old) => {
      const el = document.getElementById(old);
      if (el) el.remove();
    });

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
        (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 768);

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
