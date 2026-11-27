import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import V3AmbientCanvas from './V3AmbientCanvas';
import V3Magnetic from './V3Magnetic';
import { HERO_PLATES } from '../data/v3Data';

const TICKER_ITEMS = [
  { en: 'UX DESIGN', cn: '用户体验' },
  { en: 'PRODUCT & PSS', cn: '产品与服务系统' },
  { en: 'AI WORKFLOW', cn: 'AI 驱动设计' },
  { en: 'SPATIAL & VISUAL', cn: '空间与视觉表达' },
  { en: '2018 — 2026', cn: '作品档案' },
];

export default function V3Hero({ theme }) {
  const [active, setActive] = useState(0);
  const swipeRef = useRef({ x: 0, y: 0, swiped: false });

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_PLATES.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  const current = HERO_PLATES[active];

  const onPlateTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    swipeRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      swiped: false,
    };
  };

  const onPlateTouchEnd = (e) => {
    if (e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - swipeRef.current.x;
    const dy = e.changedTouches[0].clientY - swipeRef.current.y;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swipeRef.current.swiped = true;
      setActive((prev) =>
        dx < 0
          ? (prev + 1) % HERO_PLATES.length
          : (prev - 1 + HERO_PLATES.length) % HERO_PLATES.length
      );
    }
  };

  const onPlateClick = (e) => {
    if (swipeRef.current.swiped) {
      e.preventDefault();
      swipeRef.current.swiped = false;
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="v3-hero" id="v3-top">
      <V3AmbientCanvas theme={theme} />
      <div className="v3-hero__ambient" aria-hidden="true" />
      <div className="v3-hero__prism" aria-hidden="true" />

      <div className="v3-hero__body">
        <div className="v3-container v3-hero__top">
          <div className="v3-hero__headline-grid">
            <h1 className="v3-hero__title">
              <span className="v3-intro-mask">
                <span className="v3-hero__wordmark v3-intro-rise">TICEEZZ</span>
              </span>
              <span className="v3-intro-mask v3-intro-mask--sig">
                <span className="v3-hero__name-row v3-intro-rise v3-intro-rise--d1">
                  <span className="v3-hero__cn">童宗震</span>
                  <span className="v3-hero__sig">Tong Zongzhen</span>
                </span>
              </span>
            </h1>

            <div className="v3-hero__side v3-intro-rise v3-intro-rise--d2">
              <span className="v3-hero__role">UX · PRODUCT · AI DESIGN</span>
              <p className="v3-hero__lead">
                关注产品体验与服务流程，结合 AI 工具把想法更快变成可触摸的方案。
              </p>
              <div className="v3-hero__actions">
                <V3Magnetic>
                  <button className="v3-action-primary" onClick={() => scrollTo('v3-lineup')}>
                    <span>进入作品展厅</span>
                    <span className="v3-action-arrow">→</span>
                  </button>
                </V3Magnetic>
                <button className="v3-action-link" onClick={() => scrollTo('v3-keynote')}>
                  最新案例 · 航旅纵横
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="v3-container v3-hero__plate-wrap v3-intro-plate">
          <Link
            to={current.href}
            className={`v3-plate${current.isDevicePlate ? ' is-device' : ''}`}
            onTouchStart={onPlateTouchStart}
            onTouchEnd={onPlateTouchEnd}
            onClick={onPlateClick}
          >
            <span className="v3-plate-corner is-tl" aria-hidden="true" />
            <span className="v3-plate-corner is-tr" aria-hidden="true" />
            <span className="v3-plate-corner is-bl" aria-hidden="true" />
            <span className="v3-plate-corner is-br" aria-hidden="true" />
            {HERO_PLATES.map((plate, idx) => (
              <img
                key={plate.num}
                src={plate.img}
                alt={plate.title}
                className={`v3-plate__img${plate.isDevicePlate ? ' is-device' : ''}${idx === active ? ' is-active' : ''}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="v3-plate__scrim" />
            <div className="v3-plate__caption">
              <span className="v3-plate__num">{current.num}</span>
              <div className="v3-plate__titles">
                <strong>{current.title}</strong>
                <span>{current.sub}</span>
              </div>
              <span className="v3-plate__open">查看完整案例 ↗</span>
            </div>
          </Link>

          <div className="v3-plate-nav">
            {HERO_PLATES.map((plate, idx) => (
              <button
                key={plate.num}
                className={`v3-plate-nav__btn${idx === active ? ' is-active' : ''}`}
                onClick={() => setActive(idx)}
              >
                <span className="v3-plate-nav__bar">
                  <i key={idx === active ? `run-${active}` : 'idle'} />
                </span>
                <span className="v3-plate-nav__meta">
                  <em>{plate.num}</em>
                  <span>{plate.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bilingual Syne + Noto Sans SC Kinetic Ticker */}
      <div className="v3-hero-ticker" aria-hidden="true">
        <KineticMarquee speed={44} direction={-1} velocityFactor={0.3} slowOnHover repeat={4}>
          {TICKER_ITEMS.map((item, idx) => (
            <span key={idx} className="v3-ticker__chunk">
              <span className="v3-ticker__en">{item.en}</span>
              <span className="v3-ticker__cn">{item.cn}</span>
              <span className="v3-ticker__sep">/</span>
            </span>
          ))}
        </KineticMarquee>
      </div>
    </div>
  );
}
