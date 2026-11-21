import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'v3-keynote', label: '精选' },
  { id: 'v3-lineup', label: '展厅' },
  { id: 'v3-index', label: '履历' },
  { id: 'v3-beyond', label: '设计之外' },
];

export default function V3Nav({ theme, onThemeChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
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
            <span className="v3-brand__mark" />
            <span className="v3-brand__name">TICEEZZ</span>
          </button>

          <nav className="v3-nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className="v3-nav-link"
                onClick={() => jumpTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="v3-header__right">
            <div className="v3-theme-switch" role="group" aria-label="切换主题">
              <button
                className={`v3-theme-btn${theme === 'light' ? ' is-active' : ''}`}
                onClick={() => onThemeChange('light')}
              >
                浅色
              </button>
              <button
                className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
                onClick={() => onThemeChange('dark')}
              >
                深色
              </button>
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
          <div className="v3-drawer__theme-row">
            <button
              className={`v3-theme-btn${theme === 'light' ? ' is-active' : ''}`}
              onClick={() => onThemeChange('light')}
            >
              浅色主题
            </button>
            <button
              className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
              onClick={() => onThemeChange('dark')}
            >
              深色主题
            </button>
          </div>

          <div className="v3-drawer__list">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                className="v3-drawer__item"
                onClick={() => jumpTo(item.id)}
              >
                <span className="v3-drawer__idx">{String(idx + 1).padStart(2, '0')}</span>
                <span className="v3-drawer__cn">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="v3-drawer__footer">
            <div className="v3-drawer__versions">
              <Link to="/" onClick={() => setMenuOpen(false)}>原版 v1 ↗</Link>
              <Link to="/v2" onClick={() => setMenuOpen(false)}>TiceeZz OS ↗</Link>
            </div>
            <div className="v3-drawer__contact">1027208320@qq.com · SHANGHAI</div>
          </div>
        </div>
      </div>
    </>
  );
}
