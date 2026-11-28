import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RESUME_PDF_HREF, RESUME_DOWNLOAD_NAME } from '../data/v3Data';

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
  const [activeSection, setActiveSection] = useState('');
  const [copiedContact, setCopiedContact] = useState('');
  const verRef = useRef(null);
  const progressRef = useRef(null);

  const copyQuickContact = useCallback((key, val) => {
    navigator.clipboard?.writeText(val).catch(() => {});
    setCopiedContact(key);
    window.setTimeout(() => setCopiedContact(''), 2000);
  }, []);

  useEffect(() => {
    let prevScrolled = false;
    let prevActive = '';
    const onScroll = () => {
      const y = window.scrollY;
      const nextScrolled = y > 24;
      if (nextScrolled !== prevScrolled) {
        prevScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (progressRef.current) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const pct = Math.min(100, (y / max) * 100);
        progressRef.current.style.width = `${pct.toFixed(1)}%`;
      }

      // Lightweight ScrollSpy (only triggers React state when section actually changes)
      const probe = window.innerHeight * 0.36;
      let nextActive = '';
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) {
          nextActive = NAV_ITEMS[i].id;
          break;
        }
      }
      if (nextActive !== prevActive) {
        prevActive = nextActive;
        setActiveSection(nextActive);
      }
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

  const scrollToTop = useCallback(() => {
    setMenuOpen(false);
    setVerOpen(false);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const jumpTo = useCallback((id) => {
    setMenuOpen(false);
    setVerOpen(false);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <header className={`v3-header${scrolled ? ' is-scrolled' : ''}`}>
        <div ref={progressRef} className="v3-header__progress" />

        <div className="v3-header__inner">
          <button
            className="v3-brand"
            onClick={scrollToTop}
            aria-label="回到页面顶部"
          >
            <span className="v3-brand__mark" />
            <span className="v3-brand__name">TICEEZZ</span>
          </button>

          <nav className="v3-nav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`v3-nav-link${activeSection === item.id ? ' is-active' : ''}`}
                onClick={() => jumpTo(item.id)}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="v3-header__right">
            <a
              href={RESUME_PDF_HREF}
              download={RESUME_DOWNLOAD_NAME}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-nav-resume-btn"
              title="下载童宗震 PDF 简历"
            >
              简历 PDF ↓
            </a>

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
                onClick={(e) => onThemeChange('light', e)}
              >
                浅色
              </button>
              <button
                className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
                onClick={(e) => onThemeChange('dark', e)}
              >
                深色
              </button>
            </div>

            <button
              type="button"
              className={`v3-burger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
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
              onClick={(e) => onThemeChange('light', e)}
            >
              浅色主题
            </button>
            <button
              className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
              onClick={(e) => onThemeChange('dark', e)}
            >
              深色主题
            </button>
          </div>

          <div className="v3-drawer__list">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                className={`v3-drawer__item${activeSection === item.id ? ' is-active' : ''}`}
                onClick={() => jumpTo(item.id)}
              >
                <span className="v3-drawer__idx">{String(idx + 1).padStart(2, '0')}</span>
                <span className="v3-drawer__cn">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="v3-drawer__footer">
            <div className="v3-drawer__ed-label">简历与快速联系</div>
            <div className="v3-drawer__quick-contacts">
              <a
                href={RESUME_PDF_HREF}
                download={RESUME_DOWNLOAD_NAME}
                target="_blank"
                rel="noopener noreferrer"
                className="v3-drawer__contact-pill is-resume"
                onClick={() => setMenuOpen(false)}
              >
                下载 PDF 简历（2026 版） ↓
              </a>
              <button
                type="button"
                className="v3-drawer__contact-pill"
                onClick={() => copyQuickContact('email', '1027208320@qq.com')}
              >
                {copiedContact === 'email' ? '邮箱已复制 ✓' : '复制邮箱 · 1027208320@qq.com'}
              </button>
              <button
                type="button"
                className="v3-drawer__contact-pill"
                onClick={() => copyQuickContact('wechat', 'TiceeZz')}
              >
                {copiedContact === 'wechat' ? '微信号已复制 ✓' : '复制微信 · TiceeZz'}
              </button>
            </div>
            <div className="v3-drawer__contact">© 2026 TICEEZZ · SHANGHAI</div>
          </div>
        </div>
      </div>
    </>
  );
}
