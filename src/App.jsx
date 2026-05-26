import { lazy, Suspense, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './components/cursor/CursorContext';
import CursorDot from './components/cursor/CursorDot';
import CursorRing from './components/cursor/CursorRing';
import ScrollRestoration from './components/ScrollRestoration';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './pages/Home';

const Eclipse = lazy(() => import('./pages/Eclipse'));
const Musicfluere = lazy(() => import('./pages/Musicfluere'));
const Smartbath = lazy(() => import('./pages/Smartbath'));
const Fengjing = lazy(() => import('./pages/Fengjing'));
const Seed = lazy(() => import('./pages/Seed'));
const Aiworkflow = lazy(() => import('./pages/Aiworkflow'));
const Vcrutch = lazy(() => import('./pages/Vcrutch'));
const Graduation = lazy(() => import('./pages/Graduation'));
const Yimoji = lazy(() => import('./pages/Yimoji'));
const Giant = lazy(() => import('./pages/Giant'));
const Bamboo = lazy(() => import('./pages/Bamboo'));
const Sensible = lazy(() => import('./pages/Sensible'));
const Nile = lazy(() => import('./pages/Nile'));
const Sketching = lazy(() => import('./pages/Sketching'));
const Life = lazy(() => import('./pages/Life'));
const Pettravel = lazy(() => import('./pages/Pettravel'));
const Photography = lazy(() => import('./pages/Photography'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-dark)', color: 'var(--text-sub)',
    }}>
      Loading...
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const onLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <BrowserRouter>
      <CursorProvider>
        <CursorDot />
        <CursorRing />
        <ScrollRestoration />
        {loading && <LoadingScreen onComplete={onLoadComplete} />}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pettravel" element={<Pettravel />} />
            <Route path="/eclipse" element={<Eclipse />} />
            <Route path="/musicfluere" element={<Musicfluere />} />
            <Route path="/smartbath" element={<Smartbath />} />
            <Route path="/fengjing" element={<Fengjing />} />
            <Route path="/seed" element={<Seed />} />
            <Route path="/aiworkflow" element={<Aiworkflow />} />
            <Route path="/vcrutch" element={<Vcrutch />} />
            <Route path="/graduation" element={<Graduation />} />
            <Route path="/yimoji" element={<Yimoji />} />
            <Route path="/giant" element={<Giant />} />
            <Route path="/bamboo" element={<Bamboo />} />
            <Route path="/sensible" element={<Sensible />} />
            <Route path="/nile" element={<Nile />} />
            <Route path="/sketching" element={<Sketching />} />
            <Route path="/life" element={<Life />} />
            <Route path="/photography" element={<Photography />} />
          </Routes>
        </Suspense>
      </CursorProvider>
    </BrowserRouter>
  );
}
