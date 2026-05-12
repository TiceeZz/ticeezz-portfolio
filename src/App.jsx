import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './components/cursor/CursorContext';
import CursorDot from './components/cursor/CursorDot';
import CursorRing from './components/cursor/CursorRing';
import Home from './pages/Home';

const Musicfluere = lazy(() => import('./pages/Musicfluere'));
const Smartbath = lazy(() => import('./pages/Smartbath'));
const Aiworkflow = lazy(() => import('./pages/Aiworkflow'));
const Vcrutch = lazy(() => import('./pages/Vcrutch'));
const Graduation = lazy(() => import('./pages/Graduation'));
const Sketching = lazy(() => import('./pages/Sketching'));
const Life = lazy(() => import('./pages/Life'));
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
  return (
    <BrowserRouter>
      <CursorProvider>
        <CursorDot />
        <CursorRing />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/musicfluere" element={<Musicfluere />} />
            <Route path="/smartbath" element={<Smartbath />} />
            <Route path="/aiworkflow" element={<Aiworkflow />} />
            <Route path="/vcrutch" element={<Vcrutch />} />
            <Route path="/graduation" element={<Graduation />} />
            <Route path="/sketching" element={<Sketching />} />
            <Route path="/life" element={<Life />} />
            <Route path="/photography" element={<Photography />} />
          </Routes>
        </Suspense>
      </CursorProvider>
    </BrowserRouter>
  );
}
