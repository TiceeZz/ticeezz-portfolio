import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import V3AmbientCanvas from './V3AmbientCanvas';
import V3Magnetic from './V3Magnetic';
import { HERO_PLATES } from '../data/v3Data';

const TICKER_ITEMS = [
  'UX & SERVICE DESIGN',
  'AI-NATIVE PROTOTYPING',
  'PRODUCT ARCHITECTURE',
  'SHANGHAI · 2018 — 2026',
];

export default function V3Hero({ theme }) {
  const [active, setActive] = useState(0);
  const heroRef = useRef(null);
  const swipeRef = useRef({ x: 0, y: 0, swiped: false });

  useEffect(() => {
    let inView = true;
    const el = heroRef.current;
    const io =
      el && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
            },
            { threshold: 0.05 }
          )
        : null;
    if (io && el) io.observe(el);

    const id = setInterval(() => {
      if (inView && !document.hidden) {
        setActive((prev) => (prev + 1) % HERO_PLATES.length);
      }
    }, 5600);
    return () => {
      clearInterval(id);
      io?.disconnect();
    };
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
    <div ref={heroRef} className="v3-hero" id="v3-top">
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
              <span className="v3-hero__role">AI-NATIVE PRODUCT &amp; UX DESIGNER</span>
              <p className="v3-hero__lead">
                聚焦复杂业务体验与服务系统设计，把推演直接推进至可交互产品。
              </p>
              <div className="v3-hero__actions">
                <V3Magnetic>
                  <button className="v3-action-primary" onClick={() => scrollTo('v3-keynote')}>
                    <span>阅读双代表作</span>
                    <span className="v3-action-arrow">→</span>
                  </button>
                </V3Magnetic>
                <div className="v3-hero__quick-cases" aria-label="双代表作直达">
                  <Link to="/v3/work/pettravel" className="v3-action-link">
                    <em className="v3-ord-inline">01</em>
                    <span>航旅纵横</span>
                  </Link>
                  <span className="v3-hero__case-sep" aria-hidden="true">/</span>
                  <Link to="/v3/work/veriframe" className="v3-action-link">
                    <em className="v3-ord-inline">02</em>
                    <span>Veriframe · 澄矩</span>
                  </Link>
                </div>
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
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding={idx === 0 ? 'sync' : 'async'}
              />
            ))}
            <div className="v3-plate__scrim" />
            <div className="v3-plate__caption">
              <span className="v3-plate__num">{current.num}</span>
              <div className="v3-plate__titles">
                <strong>{current.title}</strong>
                <span>{current.sub}</span>
              </div>
              <span className="v3-plate__open">查看完整案例 →</span>
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

      <div className="v3-hero-ticker" aria-hidden="true">
        <KineticMarquee speed={42} direction={-1} velocityFactor={0.28} slowOnHover repeat={4}>
          {TICKER_ITEMS.map((label, idx) => (
            <span key={idx} className="v3-ticker__chunk">
              <span className="v3-ticker__en">{label}</span>
              <span className="v3-ticker__sep">·</span>
            </span>
          ))}
        </KineticMarquee>
      </div>
    </div>
  );
}
