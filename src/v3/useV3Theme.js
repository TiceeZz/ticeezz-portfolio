import { useState, useEffect } from 'react';

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

  const switchTheme = (next) => {
    document.documentElement.classList.add('v3-theme-switching');
    setTheme(next);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('v3-theme-switching');
      });
    });
  };

  return [theme, switchTheme];
}
