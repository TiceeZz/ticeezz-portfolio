import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAsyncGSAP from '../../hooks/useAsyncGSAP';
import { V3_PROJECTS } from '../data/v3Data';

const FILTERS = [
  { id: 'all', cn: '全部', count: V3_PROJECTS.length },
  {
    id: 'postgrad',
    cn: '硕士 & 最新',
    count: V3_PROJECTS.filter((p) => p.stageGroup === 'postgrad').length,
  },
  {
    id: 'undergrad',
    cn: '本科',
    count: V3_PROJECTS.filter((p) => p.stageGroup === 'undergrad').length,
  },
];

export default function V3Exhibition() {
  const [filter, setFilter] = useState('all');
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 960 : true
  );

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);
  const gst = useAsyncGSAP();

  const items = useMemo(() => {
    if (filter === 'all') return V3_PROJECTS;
    return V3_PROJECTS.filter((p) => p.stageGroup === filter);
  }, [filter]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 960px)');
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop || !gst) return;
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const { gsap, ScrollTrigger } = gst;
    setProgress(0);
    setActiveIndex(0);

    const ctx = gsap.context(() => {
      gsap.set(track, { x: 0, skewX: 0 });
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.38, ease: 'power3.out' });
      const clampSkew = gsap.utils.clamp(-3.2, 3.2);
      let skewResetTimer = null;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(400, getDistance() * 1.05)}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            track.style.setProperty('--pan-p', String(self.progress));
            const vel = self.getVelocity();
            skewTo(clampSkew(vel / -420));
            clearTimeout(skewResetTimer);
            skewResetTimer = setTimeout(() => skewTo(0), 90);
            const idx = Math.min(
              items.length - 1,
              Math.max(0, Math.round(self.progress * (items.length - 1)))
            );
            setActiveIndex(idx);
          },
        },
      });

      stRef.current = tween.scrollTrigger;
    }, section);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      stRef.current = null;
      ctx.revert();
    };
  }, [isDesktop, gst, items]);

  const onMobileScroll = () => {
    if (isDesktop) return;
    const vp = viewportRef.current;
    if (!vp) return;
    const max = Math.max(1, vp.scrollWidth - vp.clientWidth);
    const p = Math.min(1, Math.max(0, vp.scrollLeft / max));
    setProgress(p);
    setActiveIndex(Math.min(items.length - 1, Math.round(p * (items.length - 1))));
  };

  const jumpToCard = (idx) => {
    const clamped = Math.max(0, Math.min(items.length - 1, idx));
    if (isDesktop && stRef.current) {
      const st = stRef.current;
      const ratio = items.length > 1 ? clamped / (items.length - 1) : 0;
      const targetY = st.start + (st.end - st.start) * ratio;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else if (viewportRef.current) {
      const card = trackRef.current?.children?.[clamped];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <div id="v3-lineup" ref={sectionRef} className="v3-exhibition">
      <div className="v3-exhibition__shell">
        <div className="v3-exhibition__top">
          <div>
            <span className="v3-kicker">02 / PROJECT EXHIBITION · 2018—2026</span>
            <h2 className="v3-exhibition__heading">作品展厅</h2>
          </div>

          <div className="v3-exhibition__controls">
            <div className="v3-filter-tabs" role="tablist" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`v3-filter-tab${filter === f.id ? ' is-active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  <span>{f.cn}</span>
                  <sup>{String(f.count).padStart(2, '0')}</sup>
                </button>
              ))}
            </div>

            <div className="v3-exhibition__arrows">
              <button
                className="v3-arrow-btn"
                onClick={() => jumpToCard(activeIndex - 1)}
                disabled={activeIndex <= 0}
                aria-label="Previous project"
              >
                ←
              </button>
              <button
                className="v3-arrow-btn"
                onClick={() => jumpToCard(activeIndex + 1)}
                disabled={activeIndex >= items.length - 1}
                aria-label="Next project"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Unobstructed Full-Bleed Gallery Track with Focus Depth & Image Parallax */}
        <div
          ref={viewportRef}
          className="v3-exhibition__viewport"
          onScroll={onMobileScroll}
        >
          <div ref={trackRef} className="v3-exhibition__track">
            {items.map((proj, idx) => (
              <Link
                key={proj.num}
                to={proj.href}
                className={`v3-work-plate${idx === activeIndex ? ' is-focused' : ''}`}
              >
                <div className={`v3-work-plate__media${proj.isDevicePlate ? ' is-device' : ''}`}>
                  <img
                    src={proj.displayImg}
                    alt={proj.title}
                    className={`v3-work-plate__img${proj.isDevicePlate ? ' is-device' : ''}`}
                    loading={idx < 3 ? 'eager' : 'lazy'}
                  />
                </div>

                <div className="v3-work-plate__meta">
                  <div className="v3-work-plate__left">
                    <div className="v3-work-plate__title-line">
                      <span className="v3-work-plate__num">{proj.num}</span>
                      <h3>{proj.title}</h3>
                    </div>
                    <p>{proj.subtitle}</p>
                  </div>
                  <div className="v3-work-plate__right">
                    <span className="v3-work-plate__year">{proj.year}</span>
                    <span className="v3-work-plate__arrow">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="v3-exhibition__bottom">
          <div className="v3-exhibition__counter">
            <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
            <span>/</span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </div>

          <div className="v3-exhibition__rail">
            <div
              className="v3-exhibition__rail-fill"
              style={{ width: `${Math.max(5, progress * 100)}%` }}
            />
          </div>

          <span className="v3-exhibition__cue">
            {isDesktop ? '滚轮横向浏览 →' : '左右滑动 →'}
          </span>
        </div>
      </div>
    </div>
  );
}
