import { useState } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import { KEYNOTE_PILLARS } from '../data/v3Data';

export default function V3Keynote() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div id="v3-keynote" className="v3-keynote">
      <div className="v3-container">
        <div className="v3-section-head">
          <div className="v3-section-head__left">
            <span className="v3-kicker">01 / FEATURED</span>
            <h2 className="v3-section-title">航旅纵横 · 宠物出行</h2>
          </div>
          <Link to="/pettravel" className="v3-btn v3-btn--primary">
            <span>查看完整提案</span>
            <span className="v3-btn__arrow">↗</span>
          </Link>
        </div>

        <div className="v3-keynote__grid">
          <div className="v3-keynote__pillars">
            {KEYNOTE_PILLARS.map((p, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={p.id}
                  className={`v3-pillar-item${active ? ' is-active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                  aria-pressed={active}
                >
                  <div className="v3-pillar-item__head">
                    <span className="v3-pillar-item__id">{p.id}</span>
                    <h3>{p.title}</h3>
                    <div className="v3-pillar-item__metric">
                      <strong>{p.metric}</strong>
                      <span>{p.metricLabel}</span>
                    </div>
                  </div>
                  <p className="v3-pillar-item__summary">{p.summary}</p>
                </button>
              );
            })}
          </div>

          <div className="v3-keynote__stage">
            <div className="v3-keynote__stage-glow" aria-hidden="true" />
            <img
              src="/images/projects/pet-travel/iphone-mockup.webp"
              alt="航旅纵横宠物出行界面展示"
              className="v3-keynote__mockup"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Crossed Dual-Track Blue Kinetic Ribbons */}
      <div className="v3-cross-ribbons" aria-hidden="true">
        <div className="v3-cross-ribbon v3-cross-ribbon--dark">
          <KineticMarquee speed={48} direction={1} velocityFactor={0.3} repeat={4}>
            <span className="v3-ribbon-item">EXHIBITION LINEUP</span>
            <span className="v3-ribbon-dot">◆</span>
            <span className="v3-ribbon-item">SCROLL TO EXPLORE</span>
            <span className="v3-ribbon-dot">◆</span>
            <span className="v3-ribbon-item">2018 — 2026</span>
            <span className="v3-ribbon-dot">◆</span>
          </KineticMarquee>
        </div>
        <div className="v3-cross-ribbon v3-cross-ribbon--blue">
          <KineticMarquee speed={62} direction={-1} velocityFactor={0.38} repeat={4}>
            <span className="v3-ribbon-item">航旅纵横</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">ECLIPSE</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">尊严的具现</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">EASYGOING</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">枫泾文创</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">AHRC SEED</span>
            <span className="v3-ribbon-dot">/</span>
          </KineticMarquee>
        </div>
      </div>
    </div>
  );
}
