import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import { HERO_REEL } from '../data/v3Data';

const TICKER_ITEMS = [
  'UX ARCHITECTURE',
  'PRODUCT SYSTEMS',
  'AI-DRIVEN WORKFLOW',
  'SERVICE DESIGN (PSS)',
  'INTERACTIVE PROTOTYPING',
  'SHANGHAI · EST. 1999',
  '11 CURATED WORKS',
];

export default function V3Hero() {
  const [activeReel, setActiveReel] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReel((prev) => (prev + 1) % HERO_REEL.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_REEL[activeReel];

  const scrollToLineup = () => {
    const el = document.getElementById('v3-lineup');
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth',
      });
    }
  };

  const scrollToKeynote = () => {
    const el = document.getElementById('v3-keynote');
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="v3-hero" id="v3-top">
      {/* Subtle architectural crosshair grid & ghost background kinetic watermark */}
      <div className="v3-hero__grid-bg" aria-hidden="true" />
      <div className="v3-hero__ghost-wrap" aria-hidden="true">
        <KineticMarquee speed={24} direction={-1} velocityFactor={0.18} repeat={3}>
          <span className="v3-hero__ghost-word">TICEEZZ STUDIO</span>
          <span className="v3-hero__ghost-sep">/</span>
          <span className="v3-hero__ghost-word">DIGITAL SHOWCASE</span>
          <span className="v3-hero__ghost-sep">/</span>
        </KineticMarquee>
      </div>

      <div className="v3-hero__stage">
        {/* Left editorial headline */}
        <div className="v3-hero__left">
          <div className="v3-hero__eyebrow">
            <span className="v3-live-dot" />
            <span>DIGITAL EXHIBITION · 2026 EDITION</span>
            <span className="v3-eyebrow-sep">//</span>
            <span>DONGHUA MA · RANK 1/121</span>
          </div>

          <h1 className="v3-hero__title">
            <span className="v3-hero__title-row">TICEEZZ</span>
            <span className="v3-hero__title-row v3-hero__title-row--accent">
              <span className="v3-hero__cn">童宗震</span>
              <span className="v3-hero__slash">×</span>
              <span className="v3-hero__outline">DESIGN</span>
            </span>
          </h1>

          <p className="v3-hero__lead">
            在 <strong>体验架构 (UX)</strong>、<strong>智能硬件产品</strong> 与{' '}
            <strong>AI 驱动工作流</strong> 的交汇处，把复杂系统重构为有温度、有确定性的数字体验。
          </p>

          <div className="v3-hero__actions">
            <button className="v3-btn v3-btn--acid" onClick={scrollToLineup}>
              <span>进入作品展厅</span>
              <span className="v3-btn__badge">11 WORKS</span>
              <span className="v3-btn__arrow">→</span>
            </button>
            <button className="v3-btn v3-btn--ghost" onClick={scrollToKeynote}>
              <span>最新提案 · 航旅纵横</span>
            </button>
          </div>

          <div className="v3-hero__stats">
            <div className="v3-stat">
              <span className="v3-stat__val">11<small>+</small></span>
              <span className="v3-stat__lbl">完整落地与研究案例</span>
            </div>
            <div className="v3-stat">
              <span className="v3-stat__val">04</span>
              <span className="v3-stat__lbl">国家级/国际级设计奖项</span>
            </div>
            <div className="v3-stat">
              <span className="v3-stat__val">2W<small>+</small></span>
              <span className="v3-stat__lbl">自媒体与设计研究读者</span>
            </div>
          </div>
        </div>

        {/* Right live showcase reel */}
        <div className="v3-hero__right">
          <div className="v3-reel">
            <div className="v3-reel__topbar">
              <span className="v3-reel__rec">
                <i /> SHOWREEL PREVIEW
              </span>
              <span className="v3-reel__counter">
                {String(activeReel + 1).padStart(2, '0')} / {String(HERO_REEL.length).padStart(2, '0')}
              </span>
            </div>

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
                <div className="v3-reel__tag">{current.tag}</div>
                <div className="v3-reel__title-row">
                  <h3>{current.title}</h3>
                  <span className="v3-reel__go">VIEW ↗</span>
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
                  <span className="v3-reel__tab-num">{item.num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signature High-Voltage Acid Kinetic Ticker Ribbon */}
      <div className="v3-hero__ticker">
        <KineticMarquee speed={62} direction={-1} velocityFactor={0.36} slowOnHover repeat={4}>
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
