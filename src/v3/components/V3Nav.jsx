import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'v3-keynote', label: '精选' },
  { id: 'v3-lineup', label: '展厅' },
  { id: 'v3-index', label: '履历' },
  { id: 'v3-beyond', label: '设计之外' },
];

const EDITIONS = [
  {
    code: 'v3',
    date: '2026.11',
    title: '新版作品集',
    desc: '换了双主题，把注意力留给作品',
    to: null,
    current: true,
  },
  {
    code: 'v2',
    date: '2026.06',
    title: 'TiceeZz OS',
    desc: '试着把个人站做成桌面系统',
    to: '/v2',
    current: false,
  },
  {
    code: 'v1',
    date: '2026.05',
    title: '初版网站',
    desc: '第一次从零搭起来的暗黑版',
    to: '/v1',
    current: false,
  },
];

export default function V3Nav({ theme, onThemeChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [verOpen, setVerOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const verRef = useRef(null);

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

  useEffect(() => {
    if (!verOpen) return;
    const onDocClick = (e) => {
      if (verRef.current && !verRef.current.contains(e.target)) {
        setVerOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setVerOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [verOpen]);

  const jumpTo = useCallback((id) => {
    setMenuOpen(false);
    setVerOpen(false);
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
            <div className="v3-ver-wrap" ref={verRef}>
              <button
                type="button"
                className={`v3-ver-trigger${verOpen ? ' is-open' : ''}`}
                onClick={() => setVerOpen((v) => !v)}
                aria-expanded={verOpen}
                aria-haspopup="menu"
                title="切换网站版本"
              >
                <span>v3</span>
                <span className="v3-ver-caret" aria-hidden="true">▾</span>
              </button>

              {verOpen && (
                <div className="v3-ver-menu" role="menu" aria-label="网站版本">
                  <div className="v3-ver-menu__head">
                    <span>站点版本</span>
                    <em>2026</em>
                  </div>
                  <div className="v3-ver-menu__list">
                    {EDITIONS.map((ed) =>
                      ed.current ? (
                        <button
                          key={ed.code}
                          type="button"
                          className="v3-ver-item is-current"
                          onClick={() => setVerOpen(false)}
                          role="menuitem"
                        >
                          <div className="v3-ver-item__top">
                            <span className="v3-ver-item__code">{ed.code}</span>
                            <span className="v3-ver-item__date">{ed.date}</span>
                            <span className="v3-ver-item__badge">当前</span>
                          </div>
                          <strong>{ed.title}</strong>
                          <p>{ed.desc}</p>
                        </button>
                      ) : (
                        <Link
                          key={ed.code}
                          to={ed.to}
                          className="v3-ver-item"
                          onClick={() => setVerOpen(false)}
                          role="menuitem"
                        >
                          <div className="v3-ver-item__top">
                            <span className="v3-ver-item__code">{ed.code}</span>
                            <span className="v3-ver-item__date">{ed.date}</span>
                            <span className="v3-ver-item__go" aria-hidden="true">↗</span>
                          </div>
                          <strong>{ed.title}</strong>
                          <p>{ed.desc}</p>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

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
            <div className="v3-drawer__ed-label">其他版本</div>
            <div className="v3-drawer__versions">
              <Link to="/v2" onClick={() => setMenuOpen(false)}>v2 · TiceeZz OS ↗</Link>
              <Link to="/v1" onClick={() => setMenuOpen(false)}>v1 · 初版网站 ↗</Link>
            </div>
            <div className="v3-drawer__contact">1027208320@qq.com · SHANGHAI</div>
          </div>
        </div>
      </div>
    </>
  );
}
