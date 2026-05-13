import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../../data/gallery';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import s from './ProjectDetail.module.css';

export default function ProjectDetail({ project, sections, cover, projectSlug }) {
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useDocumentTitle(
    `${project.title} | TiceeZz Portfolio`,
    project.desc ? project.desc.replace(/<[^>]+>/g, '') : project.title
  );

  const idx = allProjects.findIndex((p) => p.href === projectSlug);
  const prevProj = idx > 0 ? allProjects[idx - 1] : null;
  const nextProj = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  const current = sections[tab];
  const images = current?.images || [];
  const isVideo = current?.type === 'video';

  const openLightbox = (i) => {
    setLightbox(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };
  const lightboxPrev = () => setLightbox((i) => (i > 0 ? i - 1 : images.length - 1));
  const lightboxNext = () => setLightbox((i) => (i < images.length - 1 ? i + 1 : 0));

  const renderContent = () => {
    if (!isVideo) {
      return (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {images.map((src, i) => (
            <button key={i} onClick={() => openLightbox(i)} className={s.galleryItem}
              aria-label={`View ${current.label} image ${i + 1}`}>
              <img src={src} alt={`${current.label} ${i + 1}`} loading="lazy" />
              <div className={s.pageLabel}>
                {current.label} · {String(i + 1).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (!current.videos || current.videos.length === 0) {
      return (
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-line)',
          borderRadius: '8px', padding: '80px 20px', textAlign: 'center',
          color: 'var(--text-sub)',
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>视频展示区</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>即将更新，敬请期待</p>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {current.videos.map((v, i) => (
          <div key={i}>
            <h3 style={{
              color: '#fff', fontSize: '1rem', fontWeight: 600,
              marginBottom: '16px', letterSpacing: '1px',
            }}>{v.title}</h3>
            {v.poster ? (
              <div style={{
                position: 'relative', borderRadius: '8px', overflow: 'hidden',
                border: '1px solid var(--border-line)',
              }}>
                <img src={v.poster} alt={v.title}
                  style={{ width: '100%', display: 'block', filter: 'brightness(0.4)' }} />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    color: 'var(--text-sub)', fontSize: '14px',
                    letterSpacing: '3px', textTransform: 'uppercase',
                  }}>Video Available</span>
                  <span style={{
                    color: 'var(--text-muted)', fontSize: '12px',
                    letterSpacing: '1px',
                  }}>因版权原因暂不公开展示 · Copyright Restricted</span>
                </div>
              </div>
            ) : (
              <div style={{
                position: 'relative', paddingBottom: '56.25%', height: 0,
                borderRadius: '8px', overflow: 'hidden',
                border: '1px solid var(--border-line)',
                background: '#000',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '14px',
                  letterSpacing: '2px', zIndex: 0,
                }}>
                  加载中...
                </div>
                <iframe src={v.embedUrl}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  title={v.title}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: '#fff' }}>
      {/* Top bar */}
      <div style={{
        padding: '30px 4% 0', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <Link to="/" style={{
          color: 'var(--text-sub)', fontSize: '12px', letterSpacing: '3px',
          textDecoration: 'none', textTransform: 'uppercase',
        }}>
          ← Back to Home
        </Link>

        {(prevProj || nextProj) && (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {prevProj && (
              <Link to={prevProj.href} className={s.projNav}>
                ‹ {prevProj.title}
              </Link>
            )}
            {nextProj && (
              <Link to={nextProj.href} className={s.projNav}>
                {nextProj.title} ›
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Hero */}
      <div style={{
        width: '100%', height: '55vh', overflow: 'hidden', position: 'relative',
        marginTop: '20px',
      }}>
        <img src={cover} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,7,12,0.95) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', left: '4%', right: '4%',
        }}>
          <span style={{
            fontSize: '10px', letterSpacing: '4px', color: 'var(--ray-cyan)',
            border: '1px solid var(--ray-cyan)', padding: '4px 12px', borderRadius: '3px',
          }}>{project.tag}</span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
            marginTop: '20px', letterSpacing: '-1px',
          }}>{project.title}</h1>
          {project.desc && <p style={{
            color: 'var(--text-sub)', marginTop: '12px', fontSize: '1.05rem',
            maxWidth: '700px', lineHeight: 1.8,
          }} dangerouslySetInnerHTML={{ __html: project.desc }} />}
          {project.keywords && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              {project.keywords.map((k) => (
                <span key={k} style={{
                  fontSize: '11px', padding: '4px 12px',
                  background: 'rgba(255,255,255,0.06)', borderRadius: '4px',
                  color: 'var(--text-sub)',
                }}>{k}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      {sections.length > 1 && (
        <div className={s.tabs}>
          {sections.map((sec, i) => (
            <button key={sec.label}
              className={`${s.tab} ${tab === i ? s.tabActive : ''}`}
              onClick={() => setTab(i)}
            >
              {sec.label}
              {sec.type !== 'video' && <span className={s.tabCount}>{sec.images.length}</span>}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '40px 4% 80px' }}>
        {renderContent()}
      </div>

      {/* Bottom project nav */}
      {(prevProj || nextProj) && (
        <div style={{
          padding: '40px 4% 80px', borderTop: '1px solid var(--border-line)',
          display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap',
        }}>
          <div>
            {prevProj && (
              <Link to={prevProj.href} className={s.projNavLarge}>
                ‹ Previous<br />
                <span className={s.projNavTitle}>{prevProj.title}</span>
              </Link>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            {nextProj && (
              <Link to={nextProj.href} className={s.projNavLarge}>
                Next ›<br />
                <span className={s.projNavTitle}>{nextProj.title}</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close lightbox"
            style={{
              position: 'absolute', top: '20px', right: '20px', zIndex: 10,
              background: 'none', border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', fontSize: '20px', width: '40px', height: '40px',
              cursor: 'pointer', borderRadius: '50%',
            }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
            style={{
              position: 'absolute', left: '20px', zIndex: 10,
              background: 'none', border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', fontSize: '24px', width: '48px', height: '48px',
              cursor: 'pointer', borderRadius: '50%',
            }}>‹</button>
          <img src={images[lightbox]} alt={`${current.label} ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
          <button onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next image"
            style={{
              position: 'absolute', right: '20px', zIndex: 10,
              background: 'none', border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', fontSize: '24px', width: '48px', height: '48px',
              cursor: 'pointer', borderRadius: '50%',
            }}>›</button>
          <div style={{
            position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            color: 'var(--text-muted)', fontSize: '13px',
          }}>{lightbox + 1} / {images.length}</div>
        </div>
      )}
    </div>
  );
}
