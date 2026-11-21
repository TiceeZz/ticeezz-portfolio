import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'v3-keynote', label: 'KEYNOTE', cn: '精选' },
  { id: 'v3-lineup', label: 'LINEUP', cn: '展厅' },
  { id: 'v3-capabilities', label: 'CAPABILITIES', cn: '能力' },
  { id: 'v3-archive', label: 'ARCHIVE', cn: '履历' },
  { id: 'v3-beyond', label: 'BEYOND', cn: '影像' },
];

function useShanghaiClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTime(formatted);
      } catch {
        setTime('');
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function V3Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const clock = useShanghaiClock();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollPct(Math.min(100, Math.round((y / max) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const jumpTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <>
      <header className={`v3-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="v3-header__progress" style={{ width: `${scrollPct}%` }} />

        <div className="v3-header__inner">
          <button
            className="v3-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <span className="v3-brand__dot" />
            <span className="v3-brand__name">TICEEZZ</span>
            <span className="v3-brand__edition">SHOWCASE // V3</span>
          </button>

          <div className="v3-nav-links" role="navigation" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className="v3-nav-link"
                onClick={() => jumpTo(item.id)}
              >
                <span className="v3-nav-link__en">{item.label}</span>
                <span className="v3-nav-link__cn">{item.cn}</span>
              </button>
            ))}
          </div>

          <div className="v3-header__right">
            {clock && (
              <div className="v3-telemetry" title="Shanghai Local Time">
                <span className="v3-telemetry__city">SHA</span>
                <span className="v3-telemetry__time">{clock}</span>
              </div>
            )}

            <div className="v3-ver-switch" aria-label="Switch edition">
              <Link to="/" className="v3-ver-pill">v1</Link>
              <Link to="/v2" className="v3-ver-pill">OS v2</Link>
              <span className="v3-ver-pill is-active">v3</span>
            </div>

            <button
              className={`v3-burger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`v3-drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="v3-drawer__inner">
          <div className="v3-drawer__eyebrow">NAVIGATION // DIRECTORY</div>
          <div className="v3-drawer__list">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                className="v3-drawer__item"
                onClick={() => jumpTo(item.id)}
              >
                <span className="v3-drawer__idx">{String(idx + 1).padStart(2, '0')}</span>
                <span className="v3-drawer__en">{item.label}</span>
                <span className="v3-drawer__cn">{item.cn}</span>
              </button>
            ))}
          </div>

          <div className="v3-drawer__footer">
            <div className="v3-drawer__versions">
              <Link to="/" onClick={() => setMenuOpen(false)}>经典原版 v1 ↗</Link>
              <Link to="/v2" onClick={() => setMenuOpen(false)}>TiceeZz OS v2 ↗</Link>
            </div>
            <div className="v3-drawer__contact">1027208320@qq.com · SHANGHAI</div>
          </div>
        </div>
      </div>
    </>
  );
}
