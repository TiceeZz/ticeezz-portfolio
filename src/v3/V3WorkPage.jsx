import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useV3Theme from './useV3Theme';
import { getV3CaseStudy } from './data/v3CaseStudies';
import './v3.css';

export default function V3WorkPage() {
  const { slug } = useParams();
  const [theme, setTheme] = useV3Theme();
  const data = getV3CaseStudy(slug);
  const study = data?.study;

  const [tab, setTab] = useState(0);
  const [viewMode, setViewMode] = useState('stream');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [scrollPct, setScrollPct] = useState(0);

  useLayoutEffect(() => {
    setTab(0);
    setLightboxIdx(null);
    setViewMode(study?.defaultView || 'stream');
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prevBehavior;
  }, [slug, study?.defaultView]);

  useDocumentTitle(
    study ? `${study.title} — TiceeZz v3` : 'Project Not Found — TiceeZz v3',
    study?.desc || 'TiceeZz Design Case Study'
  );

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollPct(Math.min(100, Math.round((window.scrollY / max) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, tab]);

  const currentSection = study?.sections?.[tab];
  const images = currentSection?.images || [];
  const isVideo = currentSection?.type === 'video';

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImg = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : i > 0 ? i - 1 : images.length - 1)),
    [images.length]
  );
  const nextImg = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : i < images.length - 1 ? i + 1 : 0)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIdx, closeLightbox, prevImg, nextImg]);

  if (!study) {
    return (
      <div className="v3-root" data-v3-theme={theme}>
        <div className="v3-work-empty">
          <p>未找到该项目案例。</p>
          <Link to="/v3" className="v3-action-primary">← 返回作品展厅</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="v3-root" data-v3-theme={theme}>
      {/* Sticky V3 Case Study Header */}
      <header className="v3-header is-scrolled">
        <div className="v3-header__progress" style={{ width: `${scrollPct}%` }} />
        <div className="v3-header__inner">
          <Link to="/v3" className="v3-work-back">
            <span>←</span>
            <span>返回展厅</span>
          </Link>

          <div className="v3-work-crumb">
            <em>{study.num}</em>
            <span>{study.title}</span>
          </div>

          <div className="v3-header__right">
            <div className="v3-theme-switch" role="group" aria-label="切换主题">
              <button
                className={`v3-theme-btn${theme === 'light' ? ' is-active' : ''}`}
                onClick={() => setTheme('light')}
              >
                浅色
              </button>
              <button
                className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                深色
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="v3-work">
        {/* Editorial Hero Header */}
        <div className="v3-container v3-work__hero">
          <div className="v3-work__meta-bar">
            <span className="v3-kicker">{study.num} / {study.stage}</span>
            <span className="v3-mono-tag">{study.year}</span>
          </div>

          <div className="v3-work__head-grid">
            <div>
              <h1 className="v3-work__title">{study.title}</h1>
              <div className="v3-work__en">{study.enTitle}</div>
            </div>

            <div className="v3-work__summary-col">
              <p className="v3-work__desc">{study.desc}</p>
              <div className="v3-work__role">
                <span>ROLE</span>
                <strong>{study.role}</strong>
              </div>
              <div className="v3-work__kws">
                {study.keywords.map((kw) => (
                  <span key={kw}>{kw}</span>
                ))}
              </div>
            </div>
          </div>

          {study.highlights && (
            <div className="v3-work__highlights">
              {study.highlights.map((h) => (
                <div key={h.label} className="v3-work__hl">
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Full-Width Cover Plate */}
          <div className={`v3-work__cover${study.isDevicePlate ? ' is-device' : ''}`}>
            <img
              src={study.cover}
              alt={study.title}
              className={study.isDevicePlate ? 'is-device' : ''}
            />
          </div>
        </div>

        {/* Sticky Section Controls: Tabs + Stream/Grid View Switch */}
        <div className="v3-work__controls-wrap">
          <div className="v3-container v3-work__controls">
            <div className="v3-filter-tabs" role="tablist">
              {study.sections.map((sec, idx) => {
                const count = sec.type === 'video' ? sec.videos?.length || 0 : sec.images?.length || 0;
                return (
                  <button
                    key={sec.label}
                    role="tab"
                    aria-selected={tab === idx}
                    className={`v3-filter-tab${tab === idx ? ' is-active' : ''}`}
                    onClick={() => setTab(idx)}
                  >
                    <span>{sec.label}</span>
                    <sup>{String(count).padStart(2, '0')}</sup>
                  </button>
                );
              })}
            </div>

            {!isVideo && images.length > 1 && (
              <div className="v3-work__view-toggle" role="group" aria-label="视图模式">
                <button
                  className={viewMode === 'stream' ? 'is-active' : ''}
                  onClick={() => setViewMode('stream')}
                >
                  沉浸长流
                </button>
                <button
                  className={viewMode === 'grid' ? 'is-active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  双列快览
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Visual Presentation Area (Uncropped Natural Proportions) */}
        <div className="v3-container v3-work__content">
          {isVideo ? (
            <div className="v3-work__videos">
              {currentSection.videos.map((v, i) => (
                <div key={i} className="v3-work__video-block">
                  <div className="v3-work__video-head">
                    <span>VIDEO {String(i + 1).padStart(2, '0')}</span>
                    <h3>{v.title}</h3>
                  </div>
                  {v.embedUrl ? (
                    <div className="v3-work__iframe-wrap">
                      <iframe
                        src={v.embedUrl}
                        title={v.title}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : v.poster ? (
                    <img src={v.poster} alt={v.title} className="v3-work__video-poster" />
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className={`v3-work__gallery is-${viewMode}`}>
              {images.map((src, i) => (
                <button
                  key={src}
                  className="v3-work__slide"
                  onClick={() => setLightboxIdx(i)}
                  aria-label={`放大查看第 ${i + 1} 页`}
                >
                  <img
                    src={src}
                    alt={`${study.title} — ${i + 1}`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                  <span className="v3-work__slide-idx">
                    {String(i + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Seamless Prev / Next Case Navigation inside /v3 */}
        <div className="v3-container v3-work__pager">
          {data.prev ? (
            <Link to={`/v3/work/${data.prev.slug}`} className="v3-work__pager-link">
              <span>← PREVIOUS</span>
              <strong>{data.prev.title}</strong>
            </Link>
          ) : (
            <Link to="/v3" className="v3-work__pager-link">
              <span>← BACK</span>
              <strong>返回 V3 首页</strong>
            </Link>
          )}

          {data.next ? (
            <Link to={`/v3/work/${data.next.slug}`} className="v3-work__pager-link is-right">
              <span>NEXT CASE →</span>
              <strong>{data.next.title}</strong>
            </Link>
          ) : (
            <Link to="/v3" className="v3-work__pager-link is-right">
              <span>EXHIBITION →</span>
              <strong>回到全部展厅</strong>
            </Link>
          )}
        </div>
      </main>

      {/* V3 Native Lightbox */}
      {lightboxIdx !== null && images[lightboxIdx] && (
        <div className="v3-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="v3-lightbox__top" onClick={(e) => e.stopPropagation()}>
            <span>
              {study.title} · {String(lightboxIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button onClick={closeLightbox} aria-label="关闭灯箱">✕</button>
          </div>
          <div className="v3-lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <button className="v3-lightbox__nav" onClick={prevImg} aria-label="上一张">←</button>
            <img src={images[lightboxIdx]} alt={`${study.title} ${lightboxIdx + 1}`} />
            <button className="v3-lightbox__nav" onClick={nextImg} aria-label="下一张">→</button>
          </div>
        </div>
      )}
    </div>
  );
}
