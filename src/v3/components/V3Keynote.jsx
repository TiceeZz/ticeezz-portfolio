import { useState } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import { KEYNOTE_PILLARS } from '../data/v3Data';

export default function V3Keynote() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = KEYNOTE_PILLARS[activeIdx];

  return (
    <div id="v3-keynote" className="v3-keynote">
      <div className="v3-container">
        <div className="v3-section-head">
          <div className="v3-section-head__left">
            <span className="v3-kicker">01 // KEYNOTE SPOTLIGHT</span>
            <h2 className="v3-section-title">
              航旅纵横 <span className="v3-accent-dot">·</span> 宠物出行
            </h2>
          </div>
          <div className="v3-section-head__right">
            <span className="v3-meta-chip">2026 FEATURED CASE</span>
            <span className="v3-meta-chip">UX · EMOTIONAL · GROWTH</span>
          </div>
        </div>

        <div className="v3-keynote__grid">
          {/* Interactive 3-Pillar Explorer */}
          <div className="v3-keynote__panel">
            <p className="v3-keynote__intro">
              千亿宠物经济下的<strong>“信任基建”</strong>——直面活体托运中的资源盲盒与分离焦虑，
              以全链路数字化体验重构确定且安心的宠物飞行专线。
            </p>

            <div className="v3-pillar-tabs" role="tablist" aria-label="Core UX Pillars">
              {KEYNOTE_PILLARS.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === activeIdx}
                  className={`v3-pillar-tab${i === activeIdx ? ' is-active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="v3-pillar-tab__id">{p.id}</span>
                  <span className="v3-pillar-tab__title">{p.title}</span>
                </button>
              ))}
            </div>

            <div className="v3-pillar-card" key={current.id}>
              <div className="v3-pillar-card__top">
                <span className="v3-pillar-card__code">{current.code}</span>
                <div className="v3-pillar-card__metric">
                  <strong>{current.metric}</strong>
                  <span>{current.metricLabel}</span>
                </div>
              </div>
              <h3 className="v3-pillar-card__headline">{current.headline}</h3>
              <p className="v3-pillar-card__body">{current.body}</p>
            </div>

            <div className="v3-keynote__cta-row">
              <Link to="/pettravel" className="v3-btn v3-btn--acid">
                <span>阅读 22 页完整设计提案</span>
                <span className="v3-btn__arrow">↗</span>
              </Link>
              <span className="v3-keynote__hint">支持高清灯箱与全流程复盘</span>
            </div>
          </div>

          {/* Right Visual Showcase Stage */}
          <div className="v3-keynote__stage">
            <div className="v3-keynote__stage-grid" aria-hidden="true" />
            <div className="v3-keynote__stage-glow" aria-hidden="true" />
            <div className="v3-keynote__stage-badge">
              <span>LIVE FLIGHT TELEMETRY</span>
              <strong>PET CABIN · READY</strong>
            </div>
            <img
              src="/images/projects/pet-travel/iphone-mockup.webp"
              alt="航旅纵横宠物出行界面展示"
              className="v3-keynote__mockup"
              loading="eager"
            />
            <div className="v3-keynote__stage-foot">
              <span>01 PRE-CHECK</span>
              <span>02 ANTI-ERROR FORM</span>
              <span>03 FLIGHT TRACKING</span>
            </div>
          </div>
        </div>
      </div>

      {/* WeGame-inspired Crossed Dual-Track Kinetic Showcase Ribbons */}
      <div className="v3-cross-ribbons" aria-hidden="true">
        <div className="v3-cross-ribbon v3-cross-ribbon--dark">
          <KineticMarquee speed={52} direction={1} velocityFactor={0.32} repeat={4}>
            <span className="v3-ribbon-item">CURATED EXHIBITION LINEUP</span>
            <span className="v3-ribbon-dot">◆</span>
            <span className="v3-ribbon-item">SCROLL TO EXPLORE HORIZONTALLY</span>
            <span className="v3-ribbon-dot">◆</span>
            <span className="v3-ribbon-item">2018 — 2026 COMPLETE WORKS</span>
            <span className="v3-ribbon-dot">◆</span>
          </KineticMarquee>
        </div>
        <div className="v3-cross-ribbon v3-cross-ribbon--acid">
          <KineticMarquee speed={68} direction={-1} velocityFactor={0.4} repeat={4}>
            <span className="v3-ribbon-item">00 航旅纵横</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">01 ECLIPSE 汉斯格雅</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">02 尊严的具现</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">03 EASYGOING 医度</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">04 枫泾文创</span>
            <span className="v3-ribbon-dot">/</span>
            <span className="v3-ribbon-item">05 AHRC SEED</span>
            <span className="v3-ribbon-dot">/</span>
          </KineticMarquee>
        </div>
      </div>
    </div>
  );
}
