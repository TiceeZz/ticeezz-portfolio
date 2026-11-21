import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/layout/Nav';
import GlobalRays from '../components/layout/GlobalRays';
import Cube3D from '../components/layout/Cube3D';
import Hero from '../components/sections/Hero';
import LatestWork from '../components/sections/LatestWork';
import Resume from '../components/sections/Resume';
import Skills from '../components/sections/Skills';
import Gallery from '../components/sections/Gallery';
import BeyondDesign from '../components/sections/BeyondDesign';
import Footer from '../components/layout/Footer';
import AIFab from '../components/ai/AIFab';
import AIChatPanel from '../components/ai/AIChatPanel';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle(
    'TiceeZz (Tong Zongzhen) | UX · Product · AI Design',
    'TiceeZz (Tong Zongzhen) — UX · Product · AI-Driven Design Portfolio. 童宗震设计作品集。'
  );
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <GlobalRays />
      <Cube3D />
      <Nav />
      <Hero />
      <LatestWork />
      <Gallery />
      <Resume />
      <Skills />
      <BeyondDesign />
      <Footer />
      <AIFab onClick={() => setChatOpen(true)} />
      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      <Link
        to="/"
        style={{
          position: 'fixed',
          left: '20px',
          bottom: '22px',
          zIndex: 90,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '999px',
          background: 'rgba(10, 14, 24, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 240, 255, 0.32)',
          color: '#e6f4ff',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <span style={{ opacity: 0.65 }}>v1 初版</span>
        <span style={{ color: '#00f0ff', fontWeight: 600 }}>返回新版 ↗</span>
      </Link>
    </>
  );
}
