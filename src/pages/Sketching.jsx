import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const works = [
  { src: '/images/sketching/colored-pencil.png', title: '彩铅写实', medium: 'Colored Pencil', desc: '以极其细腻的超写实彩铅技法刻画自然张力与细节美学。' },
  { src: '/images/sketching/gouache.png', title: '水粉静物', medium: 'Gouache', desc: '在色彩层叠中探索光线与质感的微妙平衡。' },
  { src: '/images/sketching/marker-1.png', title: '马克笔表现 (一)', medium: 'Marker', desc: '快速捕捉形体与空间关系的设计表达。' },
  { src: '/images/sketching/marker-2.png', title: '马克笔表现 (二)', medium: 'Marker', desc: '以线条疏密与笔触方向建构产品体量感。' },
];

function useReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return refs;
}

const rv = (d = 0) => ({
  opacity: 0, transform: 'translateY(36px)',
  transition: 'opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
  transitionDelay: `${d}s`,
});

export default function Sketching() {
  const r = useReveal();

  return (
    <div style={{ minHeight: '100vh', background: '#06080c', color: '#fff' }}>
      {/* Back & Title */}
      <div style={{ padding: '30px 4% 0' }}>
        <Link to="/" style={{ color: 'var(--text-sub)', fontSize: '12px', letterSpacing: '3px', textDecoration: 'none', textTransform: 'uppercase' }}>← Back to Home</Link>
      </div>

      <header style={{ padding: '80px 6% 60px', maxWidth: '760px' }}>
        <span ref={(el) => { r.current[0] = el; }} style={rv(0)}>
          <span style={{ fontSize: '10px', letterSpacing: '4px', color: 'var(--ray-cyan)', border: '1px solid var(--ray-cyan)', padding: '3px 12px', borderRadius: '3px', display: 'inline-block' }}>VISUAL THINKING</span>
        </span>
        <h1 ref={(el) => { r.current[1] = el; }} style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 800, marginTop: '20px', letterSpacing: '-2px', lineHeight: 1, ...rv(0.1) }}>
          手绘作品
        </h1>
        <p ref={(el) => { r.current[2] = el; }} style={{ color: 'var(--text-sub)', marginTop: '20px', fontSize: '1rem', lineHeight: 2.1, maxWidth: '540px', ...rv(0.2) }}>
          灵感原点的纸笔记录，以<strong style={{ color: '#fff' }}>彩铅、水粉与马克笔</strong>探索形态、光影与质感——
          手绘不只是技法练习，更是设计师观察世界、内化表达的底层语言。
        </p>
      </header>

      {/* Gallery */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4% 120px' }}>

        {/* 1 — Colored Pencil: full-width hero */}
        <div ref={(el) => { r.current[10] = el; }} style={{ marginBottom: '80px', ...rv(0.15) }}>
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px',
            overflow: 'hidden', background: 'rgba(255,255,255,0.015)',
          }}>
            <img src={works[0].src} alt={works[0].title} style={{ width: '100%', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px', padding: '0 4px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 3px' }}>{works[0].title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, letterSpacing: '1px' }}>{works[0].desc}</p>
            </div>
            <span style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--ray-cyan)', border: '1px solid rgba(0,242,255,0.25)', padding: '3px 10px', borderRadius: '3px' }}>{works[0].medium}</span>
          </div>
        </div>

        {/* 2 & 3 — Gouache + Marker 1: side by side */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '80px' }}>
          {[works[1], works[2]].map((w, i) => (
            <div key={w.title} ref={(el) => { r.current[11 + i] = el; }} style={{ flex: 1, ...rv(0.2 + i * 0.15) }}>
              <div style={{
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px',
                overflow: 'hidden', background: 'rgba(255,255,255,0.015)',
              }}>
                <img src={w.src} alt={w.title} style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '14px', padding: '0 4px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: '0 0 3px' }}>{w.title}</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, letterSpacing: '0.5px' }}>{w.desc}</p>
                </div>
                <span style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--ray-cyan)', border: '1px solid rgba(0,242,255,0.25)', padding: '3px 8px', borderRadius: '3px', whiteSpace: 'nowrap', marginLeft: '12px' }}>{w.medium}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 — Marker 2: large closer */}
        <div ref={(el) => { r.current[13] = el; }} style={{ maxWidth: '900px', margin: '0 auto', ...rv(0.3) }}>
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px',
            overflow: 'hidden', background: 'rgba(255,255,255,0.015)',
          }}>
            <img src={works[3].src} alt={works[3].title} style={{ width: '100%', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px', padding: '0 4px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 3px' }}>{works[3].title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, letterSpacing: '1px' }}>{works[3].desc}</p>
            </div>
            <span style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--ray-cyan)', border: '1px solid rgba(0,242,255,0.25)', padding: '3px 10px', borderRadius: '3px' }}>{works[3].medium}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
