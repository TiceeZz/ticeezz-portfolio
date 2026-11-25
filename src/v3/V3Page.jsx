import useDocumentTitle from '../hooks/useDocumentTitle';
import useV3Theme from './useV3Theme';
import V3Nav from './components/V3Nav';
import V3Hero from './components/V3Hero';
import V3Keynote from './components/V3Keynote';
import V3Manifesto from './components/V3Manifesto';
import V3Exhibition from './components/V3Exhibition';
import V3Index from './components/V3Index';
import V3Filmstrip from './components/V3Filmstrip';
import V3Footer from './components/V3Footer';
import V3PrismAssistant from './components/V3PrismAssistant';
import './v3.css';

export default function V3Page() {
  const [theme, setTheme] = useV3Theme();

  useDocumentTitle(
    'TiceeZz (童宗震) | UX · Product · AI Design',
    'TiceeZz (童宗震) — UX · Product · AI-Driven Design Portfolio.'
  );

  return (
    <div className="v3-root" data-v3-theme={theme}>
      <V3Nav theme={theme} onThemeChange={setTheme} />
      <main className="v3-main">
        <V3Hero theme={theme} />
        <V3Keynote />
        <V3Manifesto />
        <V3Exhibition />
        <V3Index />
        <V3Filmstrip />
      </main>
      <V3Footer />
      <V3PrismAssistant theme={theme} onThemeChange={setTheme} />
    </div>
  );
}
