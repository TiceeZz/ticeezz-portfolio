import { useState } from 'react';
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
    </>
  );
}
