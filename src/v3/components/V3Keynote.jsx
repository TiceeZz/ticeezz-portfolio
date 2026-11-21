import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import V3Magnetic from './V3Magnetic';
import { KEYNOTE_PILLARS } from '../data/v3Data';

export default function V3Keynote() {
  const [activeIdx, setActiveIdx] = useState(0);
  const revealRef = useV3Reveal(0.1);
  const tiltRef = useRef(null);
  const current = KEYNOTE_PILLARS[activeIdx];

  const onStageMove = (e) => {
    const el = tiltRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
  };

  const onStageLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div id="v3-keynote" className="v3-keynote">
      <div ref={revealRef} className="v3-container v3-reveal">
        <div className="v3-keynote__grid">
          <div className="v3-keynote__head">
            <span className="v3-kicker">01 / FEATURED PROPOSAL · 2026</span>
            <h2 className="v3-keynote__title">
              航旅纵横 · 宠物出行
              <span className="v3-title-sub-en">Pet Travel UX Proposal</span>
            </h2>
          </div>

          <div className="v3-keynote__body">
            <div className="v3-pillar-list">
              {KEYNOTE_PILLARS.map((p, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={p.id}
                    className={`v3-pillar-row${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveIdx(i)}
                    aria-pressed={isActive}
                  >
                    <div className="v3-pillar-row__top">
                      <span className="v3-pillar-row__id">{p.id}</span>
                      <h3>{p.title}</h3>
                      <span className="v3-pillar-row__tag">{p.focusTag}</span>
                    </div>
                    <p className="v3-pillar-row__summary">{p.summary}</p>
                  </button>
                );
              })}
            </div>

            <div className="v3-keynote__cta">
              <V3Magnetic>
                <Link to="/v3/work/pettravel" className="v3-action-primary">
                  <span>阅读 22 页完整提案</span>
                  <span className="v3-action-arrow">↗</span>
                </Link>
              </V3Magnetic>
            </div>
          </div>

          <div className="v3-keynote__visual">
            <div className="v3-keynote__halo" aria-hidden="true" />
            <Link
              ref={tiltRef}
              to="/v3/work/pettravel"
              onPointerMove={onStageMove}
              onPointerLeave={onStageLeave}
              className={`v3-keynote__stage-frame is-${current.stageKind}`}
              aria-label={`查看 ${current.title} 完整界面方案`}
            >
              <div className="v3-keynote__glare" aria-hidden="true" />
              {KEYNOTE_PILLARS.map((p, idx) => (
                <img
                  key={p.id}
                  src={p.stageImg}
                  alt={p.title}
                  className={`v3-keynote__stage-img is-${p.stageKind}${idx === activeIdx ? ' is-active' : ''}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </Link>

            <div className="v3-keynote__stage-caption">
              <span>{current.stageCaption}</span>
              <div className="v3-keynote__stage-dots" aria-hidden="true">
                {KEYNOTE_PILLARS.map((p, idx) => (
                  <button
                    key={p.id}
                    className={idx === activeIdx ? 'is-active' : ''}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`切换到 ${p.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
