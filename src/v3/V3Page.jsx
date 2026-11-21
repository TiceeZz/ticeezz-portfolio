import { useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import V3Nav from './components/V3Nav';
import V3Hero from './components/V3Hero';
import V3Keynote from './components/V3Keynote';
import V3Exhibition from './components/V3Exhibition';
import V3Capabilities from './components/V3Capabilities';
import V3Archive from './components/V3Archive';
import V3Filmstrip from './components/V3Filmstrip';
import V3Footer from './components/V3Footer';
import './v3.css';

export default function V3Page() {
  useDocumentTitle(
    'TiceeZz Showcase v3 | UX · Product · AI Design',
    'TiceeZz (童宗震) — Digital Showcase v3 Edition. 横幅动态展厅与交互式作品集预览。'
  );

  useEffect(() => {
    // Load Space Grotesk + JetBrains Mono asynchronously without blocking initial paint
    const id = 'v3-google-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap';
      document.head.appendChild(link);
    }

    // Ensure native smooth cursor & clean dark body background while viewing /v3
    document.body.classList.add('is-v3-active');
    return () => {
      document.body.classList.remove('is-v3-active');
    };
  }, []);

  return (
    <div className="v3-root">
      <V3Nav />
      <main className="v3-main">
        <V3Hero />
        <V3Keynote />
        <V3Exhibition />
        <V3Capabilities />
        <V3Archive />
        <V3Filmstrip />
      </main>
      <V3Footer />
    </div>
  );
}
