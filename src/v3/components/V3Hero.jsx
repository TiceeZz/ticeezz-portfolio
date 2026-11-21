import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import { HERO_REEL } from '../data/v3Data';

const TICKER_ITEMS = [
  'UX ARCHITECTURE',
  'PRODUCT DESIGN',
  'AI WORKFLOW',
  'SERVICE SYSTEMS',
  'SHANGHAI · 2026',
];

export default function V3Hero() {
  const [activeReel, setActiveReel] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReel((prev) => (prev + 1) % HERO_REEL.length);
    }, 4400);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_REEL[activeReel];

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="v3-hero" id="v3-top">
      <div className="v3-hero__grid-bg" aria-hidden="true" />
      <div className="v3-hero__glow" aria-hidden="true" />
      <div className="v3-hero__ghost-wrap" aria-hidden="true">
        <KineticMarquee speed={22} direction={-1} velocityFactor={0.16} repeat={3}>
          <span className="v3-hero__ghost-word">TICEEZZ</span>
          <span className="v3-hero__ghost-sep">/</span>
          <span className="v3-hero__ghost-word">PORTFOLIO</span>
          <span className="v3-hero__ghost-sep">/</span>
        </KineticMarquee>
      </div>

      <div className="v3-hero__stage">
        <div className="v3-hero__left">
          <div className="v3-hero__eyebrow">
            <span className="v3-live-dot" />
            <span>UX · PRODUCT · AI DESIGN</span>
          </div>

          <h1 className="v3-hero__title">
            <span>TICEEZZ</span>
            <span className="v3-hero__cn">童宗震</span>
          </h1>

          <p className="v3-hero__lead">
            以体验架构与 AI 工作流，重构有温度的数字产品。
          </p>

          <div className="v3-hero__actions">
            <button className="v3-btn v3-btn--primary" onClick={() => jump('v3-lineup')}>
              <span>探索作品展厅</span>
              <span className="v3-btn__arrow">→</span>
            </button>
            <button className="v3-btn v3-btn--ghost" onClick={() => jump('v3-keynote')}>
              <span>最新提案</span>
            </button>
          </div>
        </div>

        <div className="v3-hero__right">
          <div className="v3-reel">
            <Link to={current.href} className="v3-reel__viewport">
              {HERO_REEL.map((item, idx) => (
                <img
                  key={item.num}
                  src={item.img}
                  alt={item.title}
                  className={`v3-reel__img${idx === activeReel ? ' is-active' : ''}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ))}
              <div className="v3-reel__scrim" />
              <div className="v3-reel__caption">
                <span className="v3-reel__tag">{current.tag}</span>
                <div className="v3-reel__title-row">
                  <h3>{current.title}</h3>
                  <span className="v3-reel__go">↗</span>
                </div>
              </div>
            </Link>

            <div className="v3-reel__tabs">
              {HERO_REEL.map((item, idx) => (
                <button
                  key={item.num}
                  className={`v3-reel__tab${idx === activeReel ? ' is-active' : ''}`}
                  onClick={() => setActiveReel(idx)}
                  aria-label={`Preview ${item.title}`}
                >
                  <span className="v3-reel__tab-bar">
                    <i key={idx === activeReel ? `run-${activeReel}` : 'idle'} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cobalt Kinetic Ribbon */}
      <div className="v3-hero__ticker">
        <KineticMarquee speed={56} direction={-1} velocityFactor={0.34} slowOnHover repeat={4}>
          {TICKER_ITEMS.map((text, idx) => (
            <span key={idx} className="v3-ticker__chunk">
              <span className="v3-ticker__text">{text}</span>
              <span className="v3-ticker__star" aria-hidden="true">✦</span>
            </span>
          ))}
        </KineticMarquee>
      </div>
    </div>
  );
}
