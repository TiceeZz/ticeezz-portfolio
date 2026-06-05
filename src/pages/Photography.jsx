import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const xh = (i) => `/images/photography/photo_${String(i).padStart(2, '0')}.jpg`;
const ru = (i) => `/images/photography/ruo_${String(i).padStart(2, '0')}.jpg`;

const series = [
  {
    id: 'xiaohu',
    title: '小胡的写真',
    sub: 'Natural Light Portraits',
    cover: xh(1),
    images: Array.from({ length: 8 }, (_, i) => xh(i + 1)),
    tone: 'warm',
    desc: '以自然光线捕捉真实情感与戏剧性光影，定格胶片颗粒下的情绪张力。',
  },
  {
    id: 'ifexist',
    title: '假如存在',
    sub: 'Experimental Visual Poetry',
    cover: ru(1),
    images: Array.from({ length: 9 }, (_, i) => ru(i + 1)),
    tone: 'cool',
    desc: '以实验性视觉语言探讨身体、空间与虚无的关系。',
  },
];

/* ── Disc component ── */
function FilmDisc({ s, index, onSelect }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onSelect(s)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', userSelect: 'none',
        transition: 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)',
        transform: hover ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Disc */}
      <div style={{
        width: 'clamp(240px, 28vw, 360px)',
        height: 'clamp(240px, 28vw, 360px)',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: hover
          ? '0 0 0 6px rgba(255,255,255,0.06), 0 24px 80px rgba(0,0,0,0.5)'
          : '0 0 0 2px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)',
        overflow: 'hidden',
        background: '#111',
        transform: hover ? 'rotate(3deg)' : 'rotate(0deg)',
      }}>
        {/* Cover image */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
        }}>
          <img
            src={s.cover}
            alt={s.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: s.tone === 'cool' ? 'brightness(0.7) saturate(0.6) contrast(1.08)' : 'brightness(0.82) saturate(0.9)',
              transition: 'filter 0.7s',
            }}
          />
          {/* Gradients */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.85) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.12) 0%, transparent 50%)',
          }} />
        </div>

        {/* Vinyl grooves */}
        {[72, 76, 80, 84, 88, 92, 96].map((pct) => (
          <div key={pct} style={{
            position: 'absolute', inset: `${100 - pct}%`,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Center label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '30%', height: '30%', borderRadius: '50%',
          background: 'rgba(10,12,16,0.92)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', gap: '2px',
        }}>
          <span style={{ fontSize: '8px', letterSpacing: '3px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            DISC {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{
            width: '16px', height: '2px', background: 'var(--ray-cyan)',
            margin: '4px 0',
          }} />
          <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600, letterSpacing: '1px' }}>
            {s.title}
          </span>
        </div>

        {/* Hover overlay ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid transparent',
          transition: 'border-color 0.7s',
          borderColor: hover ? 'rgba(255,255,255,0.2)' : 'transparent',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Label below disc */}
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <h3 style={{
          fontSize: '1.1rem', fontWeight: 600, color: '#fff', margin: '0 0 4px',
          letterSpacing: '1px',
        }}>{s.title}</h3>
        <p style={{
          fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px',
          textTransform: 'uppercase', margin: 0,
        }}>{s.sub}</p>
      </div>
    </div>
  );
}

/* ── Series Viewer (fullscreen) ── */
function SeriesViewer({ series: s, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [hoverImg, setHoverImg] = useState(false);
  let hideTimer = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => { setImgIdx(0); }, [s.id]);

  const go = (dir) => setImgIdx((i) => {
    const next = i + dir;
    if (next < 0) return s.images.length - 1;
    if (next >= s.images.length) return 0;
    return next;
  });

  const scheduleHide = () => {
    clearTimeout(hideTimer.current);
    setShowUI(true);
    hideTimer.current = setTimeout(() => setShowUI(false), 3000);
  };

  const imgFilter = s.tone === 'cool'
    ? (hoverImg ? 'brightness(0.95) saturate(0.85)' : 'brightness(0.8) contrast(1.06) saturate(0.65)')
    : (hoverImg ? 'brightness(1) saturate(1)' : 'brightness(0.9) saturate(0.92)');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#05070a' }}
      onMouseMove={scheduleHide}
      onClick={() => setShowUI((v) => !v)}
    >
      {/* Image */}
      <img
        key={imgIdx}
        src={s.images[imgIdx]}
        alt=""
        loading="eager"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: imgFilter,
          transition: 'filter 0.5s',
        }}
        onMouseEnter={() => setHoverImg(true)}
        onMouseLeave={() => setHoverImg(false)}
      />

      {/* UI overlay — fades out after idle */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: showUI ? 1 : 0,
        transition: 'opacity 0.6s',
        pointerEvents: showUI ? 'auto' : 'none',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Top */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '24px 28px',
          background: 'linear-gradient(to bottom, rgba(5,7,10,0.8) 0%, transparent 100%)',
        }}>
          <button onClick={onClose} style={closeBtn}>✕</button>
          <div style={{ textAlign: 'center', paddingTop: '4px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', letterSpacing: '2px' }}>{s.title}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '3px', marginTop: '4px', textTransform: 'uppercase' }}>{s.sub}</div>
          </div>
          <div style={{ width: '44px' }} />
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          padding: '24px 28px 28px',
          background: 'linear-gradient(to top, rgba(5,7,10,0.85) 0%, transparent 100%)',
        }}>
          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <button onClick={() => go(-1)} style={navBtnStyle}>‹</button>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px', letterSpacing: '2px', minWidth: '64px', textAlign: 'center' }}>
              {imgIdx + 1} / {s.images.length}
            </span>
            <button onClick={() => go(1)} style={navBtnStyle}>›</button>
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', maxWidth: '90vw', overflowX: 'auto' }}>
            {s.images.map((src, i) => (
              <div key={i} onClick={(e) => { e.stopPropagation(); setImgIdx(i); }} style={{
                width: '44px', height: '44px', flexShrink: 0, cursor: 'pointer',
                borderRadius: '3px', overflow: 'hidden',
                border: i === imgIdx ? '2px solid #fff' : '2px solid rgba(255,255,255,0.12)',
                opacity: i === imgIdx ? 1 : 0.45,
                transition: 'opacity 0.3s, border-color 0.3s',
              }}>
                <img
                  src={src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const closeBtn = {
  background: 'none', border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff', fontSize: '16px', width: '44px', height: '44px', borderRadius: '50%',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const navBtnStyle = {
  padding: '10px 24px', fontSize: '13px', letterSpacing: '2px',
  color: '#fff', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', cursor: 'pointer',
};

/* ══════════════════════════════
   MAIN PAGE
   ══════════════════════════════ */
export default function Photography() {
  const [active, setActive] = useState(null);

  if (active) return <SeriesViewer series={active} onClose={() => setActive(null)} />;

  return (
    <div style={{
      minHeight: '100vh', background: '#06080c', color: '#fff',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Back */}
      <div style={{ padding: '28px 4% 0', position: 'relative', zIndex: 2 }}>
        <Link to="/" style={{ color: 'var(--text-sub)', fontSize: '12px', letterSpacing: '3px', textDecoration: 'none', textTransform: 'uppercase' }}>← Back to Home</Link>
      </div>

      {/* Center content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 4% 80px', gap: 'clamp(40px, 8vh, 80px)',
      }}>
        {/* Masthead */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '10px', letterSpacing: '4px', color: 'var(--ray-cyan)', border: '1px solid var(--ray-cyan)', padding: '3px 12px', borderRadius: '3px', display: 'inline-block' }}>PORTRAIT PHOTOGRAPHY</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginTop: '20px', letterSpacing: '-2px', lineHeight: 1 }}>
            人像摄影
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Select a disc to explore
          </p>
        </div>

        {/* Discs */}
        <div style={{ display: 'flex', gap: 'clamp(40px, 8vw, 100px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {series.map((s, i) => (
            <FilmDisc key={s.id} s={s} index={i} onSelect={setActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
