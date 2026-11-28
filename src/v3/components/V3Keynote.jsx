import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import V3Magnetic from './V3Magnetic';
import { KEYNOTE_CASES } from '../data/v3Data';

export function renderStyledMetric(raw) {
  const str = String(raw || '');
  const hasNumericLead = /([0-9]|< ?[0-9]+|SHA-256|3D)/.test(str);

  if (!hasNumericLead) {
    const tokens = str.split(/(→|×)/g).filter(Boolean);
    return tokens.map((token, i) => {
      const trimmed = token.trim();
      if (trimmed === '→' || trimmed === '×') {
        return (
          <span key={i} className="v3-metric-arrow" aria-hidden="true">
            {trimmed}
          </span>
        );
      }
      return (
        <span key={i} className="v3-metric-headline">
          {token}
        </span>
      );
    });
  }

  const parts =
    str.match(/([0-9]+(?:[.–-][0-9]+)?%?|< ?[0-9]+|SHA-256|3D|→|×|[^\d→×]+)/g) || [str];
  return parts.map((token, i) => {
    const trimmed = token.trim();
    if (!trimmed) return <span key={i}>{token}</span>;
    if (trimmed === '→' || trimmed === '×') {
      return (
        <span key={i} className="v3-metric-arrow" aria-hidden="true">
          {trimmed}
        </span>
      );
    }
    if (/^([0-9]|<|SHA-256|3D)/.test(trimmed)) {
      return (
        <span key={i} className="v3-metric-num">
          {token}
        </span>
      );
    }
    return (
      <span key={i} className="v3-metric-unit">
        {token}
      </span>
    );
  });
}

export default function V3Keynote() {
  const [caseIdx, setCaseIdx] = useState(0);
  const [pillarIdx, setPillarIdx] = useState(0);
  const revealRef = useV3Reveal(0.08);
  const tiltRef = useRef(null);
  const touchSwipeRef = useRef({ x: 0, y: 0, swiped: false });

  const activeCase = KEYNOTE_CASES[caseIdx] || KEYNOTE_CASES[0];
  const pillars = activeCase.pillars;
  const current = pillars[pillarIdx] || pillars[0];

  const handleSelectCase = (nextIdx) => {
    setCaseIdx(nextIdx);
    setPillarIdx(0);
  };

  const onStageTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchSwipeRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, swiped: false };
  };

  const onStageTouchEnd = (e) => {
    if (e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchSwipeRef.current.x;
    const dy = e.changedTouches[0].clientY - touchSwipeRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      touchSwipeRef.current.swiped = true;
      setPillarIdx((prev) =>
        dx < 0 ? (prev + 1) % pillars.length : (prev - 1 + pillars.length) % pillars.length
      );
    }
  };

  const onStageClick = (e) => {
    if (touchSwipeRef.current.swiped) {
      e.preventDefault();
      touchSwipeRef.current.swiped = false;
    }
  };

  const onStageMove = (e) => {
    const el = tiltRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 5;
    const rx = (0.5 - py) * 4;
    el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
  };

  const onStageLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div id="v3-keynote" className="v3-keynote" data-keynote-case={activeCase.key}>
      <div ref={revealRef} className="v3-container v3-reveal">
        <div className="v3-keynote__top-bar">
          <div>
            <span className="v3-kicker">01 / DUAL FLAGSHIPS</span>
            <h2 className="v3-keynote__sec-heading">双代表作深度拆解</h2>
          </div>

          <div className="v3-keynote__dual-cards" role="tablist" aria-label="切换精选代表作拆解">
            {KEYNOTE_CASES.map((item, idx) => {
              const isSelected = idx === caseIdx;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`v3-keynote__case-card${isSelected ? ' is-active' : ''}`}
                  onClick={() => handleSelectCase(idx)}
                >
                  <div className="v3-keynote__case-card-top">
                    <span className="v3-keynote__case-num">{item.num}</span>
                    <span className="v3-keynote__case-badge">{item.badge}</span>
                  </div>
                  <strong className="v3-keynote__case-name">{item.title}</strong>
                  <p className="v3-keynote__case-brief">{item.cardBrief}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="v3-keynote__grid">
          <div className="v3-keynote__head">
            <div className="v3-keynote__metrics">
              {activeCase.metrics.map((m) => (
                <div key={m.label} className="v3-keynote__metric">
                  <strong>{renderStyledMetric(m.value)}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="v3-keynote__body">
            <div className="v3-pillar-list">
              {pillars.map((p, i) => {
                const isActive = i === pillarIdx;
                return (
                  <button
                    key={`${activeCase.key}-${p.id}`}
                    className={`v3-pillar-row${isActive ? ' is-active' : ''}`}
                    onClick={() => setPillarIdx(i)}
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
                <Link to={activeCase.href} className="v3-action-primary">
                  <span className="v3-keynote__cta-desktop">{activeCase.ctaLabel}</span>
                  <span className="v3-keynote__cta-mobile">{activeCase.mobileCtaLabel}</span>
                  <span className="v3-action-arrow">↗</span>
                </Link>
              </V3Magnetic>
            </div>
          </div>

          <div className="v3-keynote__visual">
            <div className="v3-keynote__halo" aria-hidden="true" />
            <Link
              ref={tiltRef}
              to={activeCase.href}
              onPointerMove={onStageMove}
              onPointerLeave={onStageLeave}
              onTouchStart={onStageTouchStart}
              onTouchEnd={onStageTouchEnd}
              onClick={onStageClick}
              className={`v3-keynote__stage-frame is-${current.stageKind}`}
              aria-label={`查看 ${activeCase.title} — ${current.title} 完整方案`}
            >
              <div className="v3-keynote__glare" aria-hidden="true" />
              {pillars.map((p, idx) => (
                <img
                  key={`${activeCase.key}-${p.id}`}
                  src={p.stageImg}
                  alt={`${activeCase.title} · ${p.title}`}
                  className={`v3-keynote__stage-img is-${p.stageKind}${idx === pillarIdx ? ' is-active' : ''}`}
                  decoding="async"
                />
              ))}
            </Link>

            <div className="v3-keynote__stage-caption">
              <span>{current.stageCaption}</span>
              <div className="v3-keynote__stage-dots" aria-hidden="true">
                {pillars.map((p, idx) => (
                  <button
                    key={`${activeCase.key}-${p.id}`}
                    className={idx === pillarIdx ? 'is-active' : ''}
                    onClick={() => setPillarIdx(idx)}
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
