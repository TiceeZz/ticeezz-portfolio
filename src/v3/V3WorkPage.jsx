import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useV3Theme from './useV3Theme';
import V3Lightbox from './components/V3Lightbox';
import V3PrismAssistant from './components/V3PrismAssistant';
import PetTravelPrototype from './components/pet-proto/PetTravelPrototype';
import VeriframeShowcaseEmbed from './components/VeriframeShowcaseEmbed';
import VeriframeBrandPlate from './components/VeriframeBrandPlate';
import { renderStyledMetric } from './components/V3Keynote';
import { getV3CaseStudy } from './data/v3CaseStudies';
import './v3.css';

function V3WorkVideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    el.play().catch(() => {});
  };

  return (
    <div className="v3-work__iframe-wrap">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button
          type="button"
          className="v3-video-play-overlay"
          onClick={handleStart}
          aria-label={`播放 ${title}`}
        >
          <span className="v3-video-play-btn">
            <span className="v3-video-play-tri" aria-hidden="true" />
            <span className="v3-video-play-label">播放演示影片</span>
            <span className="v3-video-play-dur">0:48</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function V3WorkPage() {
  const { slug } = useParams();
  const [theme, setTheme] = useV3Theme();
  const data = getV3CaseStudy(slug);
  const study = data?.study;

  const [tab, setTab] = useState(0);
  const [viewMode, setViewMode] = useState('stream');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [copiedDesktopUrl, setCopiedDesktopUrl] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 899px)').matches : false
  );
  const progressRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 899px)');
    const onChange = (e) => setIsMobileViewport(e.matches);
    setIsMobileViewport(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const visibleSections = useMemo(
    () => (study?.sections || []).filter((sec) => !(isMobileViewport && sec.desktopOnly)),
    [study, isMobileViewport]
  );
  const hasHiddenDesktopWorkbench = Boolean(
    isMobileViewport && study?.sections?.some((sec) => sec.desktopOnly)
  );
  const activeTab = Math.min(tab, Math.max(0, visibleSections.length - 1));

  const copyDesktopLink = useCallback(() => {
    const shareUrl =
      typeof window !== 'undefined' && window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'localhost'
        ? window.location.href
        : `https://ticeezz-portfolio.pages.dev/v3/work/${slug}`;
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopiedDesktopUrl(true);
    window.setTimeout(() => setCopiedDesktopUrl(false), 2200);
  }, [slug]);

  const handleTabChange = useCallback((idx) => {
    setTab(idx);
    const el = heroRef.current;
    if (!el) return;
    const targetTop = el.getBoundingClientRect().bottom + window.scrollY - 60;
    if (window.scrollY > targetTop + 8) {
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  }, []);

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
    study ? `${study.title} — TiceeZz` : 'Project Not Found — TiceeZz',
    study?.desc || 'TiceeZz Design Case Study'
  );

  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, (window.scrollY / max) * 100);
      progressRef.current.style.width = `${pct.toFixed(1)}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, activeTab]);

  const currentSection = visibleSections[activeTab];
  const images = currentSection?.images || [];
  const isVideo = currentSection?.type === 'video';
  const isPrototype = currentSection?.type === 'prototype';
  const hasRichMediaFirst =
    visibleSections[0]?.type === 'prototype' || visibleSections[0]?.type === 'video';
  const protoSectionIdx = visibleSections.findIndex((s) => s.type === 'prototype');
  const gallerySectionIdx = visibleSections.findIndex((s) => !s.type && s.images?.length > 0);
  const showControlsBar = !(isMobileViewport && visibleSections.length <= 1);

  if (!study) {
    return (
      <div className="v3-root" data-v3-theme={theme}>
        <div className="v3-work-empty">
          <p>未找到该项目案例。</p>
          <Link to="/" className="v3-action-primary">← 返回作品展厅</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="v3-root" data-v3-theme={theme} data-case={study.slug}>
      {/* Sticky V3 Case Study Header */}
      <header className="v3-header is-scrolled">
        <div ref={progressRef} className="v3-header__progress" />
        <div className="v3-header__inner">
          <Link to="/" className="v3-work-back">
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
                onClick={(e) => setTheme('light', e)}
              >
                浅色
              </button>
              <button
                className={`v3-theme-btn${theme === 'dark' ? ' is-active' : ''}`}
                onClick={(e) => setTheme('dark', e)}
              >
                深色
              </button>
            </div>
            <button
              type="button"
              className="v3-theme-mobile-btn"
              onClick={(e) => setTheme(theme === 'light' ? 'dark' : 'light', e)}
              aria-label="切换浅色或深色主题"
            >
              {theme === 'light' ? '深色' : '浅色'}
            </button>
          </div>
        </div>
      </header>

      <main className="v3-work">
        {/* Optional full-bleed hero plate (used by Veriframe) */}
        {study.heroPlate && (
          <div className="v3-work__heroplate">
            <img src={study.heroPlate} alt={study.title} />
            <div className="v3-container v3-work__heroplate-inner">
              <div className="v3-work__heroplate-text">
                {study.heroMark && (
                  <img className="v3-work__heroplate-mark" src={study.heroMark} alt="" aria-hidden="true" />
                )}
                <span className="v3-work__heroplate-kicker">
                  {study.num} · {study.stage}
                </span>
                {study.heroEn ? (
                  <h1 className="is-split" aria-label={study.title}>
                    <span className="v3-work__heroplate-en">{study.heroEn}</span>
                    <span className="v3-work__heroplate-sep" aria-hidden="true"> · </span>
                    <span className="v3-work__heroplate-cn">{study.heroCn}</span>
                  </h1>
                ) : (
                  <h1>{study.title}</h1>
                )}
                <p>{study.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Hero Header */}
        <div ref={heroRef} className={`v3-container v3-work__hero${study.heroPlate ? ' has-plate' : ''}`}>
          {!study.heroPlate && (
            <div className="v3-work__meta-bar">
              <span className="v3-kicker">{study.num} / {study.stage}</span>
              <span className="v3-mono-tag">{study.year}</span>
            </div>
          )}

          <div className="v3-work__head-grid">
            {study.heroPlate ? (
              <p className="v3-work__lede">{study.desc}</p>
            ) : (
              <div>
                <h1 className="v3-work__title">{study.title}</h1>
                <div className="v3-work__en">{study.enTitle}</div>
              </div>
            )}

            <div className="v3-work__summary-col">
              {!study.heroPlate && <p className="v3-work__desc">{study.desc}</p>}
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
                  <strong>{renderStyledMetric(h.value)}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Optional intro plates shown before the tabs */}
          {study.introPlates && (
            <div className="v3-work__intro-plates">
              {study.introPlates.map((src) => (
                <img key={src} src={src} alt={`${study.title} 设计说明`} loading="lazy" />
              ))}
            </div>
          )}

          {/* Full-Width Cover Plate — skipped when a heroPlate, video, or live prototype leads */}
          {!hasRichMediaFirst && !study.heroPlate && (
            <div className={`v3-work__cover${study.isDevicePlate ? ' is-device' : ''}`}>
              <img
                src={study.cover}
                alt={study.title}
                className={study.isDevicePlate ? 'is-device' : ''}
              />
            </div>
          )}
        </div>

        {/* Sticky Section Controls: hidden on mobile when only a single section exists */}
        {showControlsBar && (
          <div className="v3-work__controls-wrap">
            <div className="v3-container v3-work__controls">
              <div className="v3-filter-tabs" role="tablist">
                {visibleSections.map((sec, idx) => {
                  const badge =
                    sec.badge ||
                    (sec.type === 'prototype'
                      ? 'LIVE'
                      : String(sec.type === 'video' ? sec.videos?.length || 0 : sec.images?.length || 0).padStart(2, '0'));
                  return (
                    <button
                      key={sec.label}
                      role="tab"
                      aria-selected={activeTab === idx}
                      className={`v3-filter-tab${activeTab === idx ? ' is-active' : ''}`}
                      onClick={() => handleTabChange(idx)}
                    >
                      {sec.type === 'prototype' && <span className="ptp-live-dot" aria-hidden="true" />}
                      <span>{sec.label}</span>
                      <sup>{badge}</sup>
                    </button>
                  );
                })}
              </div>

              {!isVideo && !isPrototype && images.length > 1 && (
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
        )}

        {/* Visual Presentation Area (Uncropped Natural Proportions / Live Prototype) */}
        <div className="v3-container v3-work__content">
          {hasHiddenDesktopWorkbench && (
            <div className="v3-work__desktop-note" role="note">
              <div className="v3-work__desktop-note-copy">
                <span>DESKTOP WORKBENCH · 电脑端交互体验</span>
                <strong>已展开 13 页设计推导（轻触画板支持双指放大）</strong>
                <p>
                  三栏实时工作台按桌面视口（1440×900）设计，可在电脑浏览器打开体验完整合规审签与多尺寸导出。
                </p>
              </div>
              <button
                type="button"
                className="v3-work__desktop-note-btn"
                onClick={copyDesktopLink}
              >
                {copiedDesktopUrl ? '已复制链接 ✓' : '复制电脑端体验链接'}
              </button>
            </div>
          )}

          {isPrototype ? (
            study.slug === 'veriframe' ? (
              <div className="v3-work__proto-stack">
                <VeriframeShowcaseEmbed />
                {gallerySectionIdx >= 0 && (
                  <button
                    type="button"
                    className="v3-work__proto-bridge v3-work__derivation-bridge"
                    onClick={() => handleTabChange(gallerySectionIdx)}
                  >
                    <div className="v3-work__proto-bridge-text">
                      <span>DESIGN DERIVATION · 13 SLIDES + BRAND GRAMMAR</span>
                      <strong>阅读背后 13 页完整产品与图形系统推导</strong>
                      <p>从 200+ 商用出图交付痛点、双区像素锁合成管线、内容指纹状态机到「澄矩」视觉语法推演</p>
                    </div>
                    <span className="v3-work__proto-bridge-btn">
                      <span>进入设计推导</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <PetTravelPrototype />
            )
          ) : isVideo ? (
            <div className="v3-work__videos">
              {currentSection.videos.map((v, i) => (
                <div key={i} className="v3-work__video-block">
                  <div className="v3-work__video-head v3-work__video-head--row">
                    <div>
                      <span>VIDEO {String(i + 1).padStart(2, '0')}</span>
                      <h3>{v.title}</h3>
                    </div>
                    {v.externalUrl && (
                      <a
                        href={v.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v3-work__video-ext"
                      >
                        哔哩哔哩原片 ↗
                      </a>
                    )}
                  </div>
                  {v.src ? (
                    <V3WorkVideoPlayer src={v.src} poster={v.poster} title={v.title} />
                  ) : v.embedUrl ? (
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
              {protoSectionIdx >= 0 && (
                <button
                  type="button"
                  className="v3-work__proto-bridge"
                  onClick={() => handleTabChange(protoSectionIdx)}
                >
                  <div className="v3-work__proto-bridge-text">
                    <span>
                      <i className="ptp-live-dot" aria-hidden="true" />
                      INTERACTIVE PROTOTYPE · LIVE
                    </span>
                    <strong>亲自上手体验完整交互原型</strong>
                    <p>从业务分流、航班舱位决策、多维规则校验到全程航迹追踪与接机海报，完整跑通 10 屏端到端真实交互流程</p>
                  </div>
                  <span className="v3-work__proto-bridge-btn">
                    <span>进入交互原型</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </button>
              )}
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

        {/* Native responsive brand/logo derivation plate — scoped strictly to the Design Derivation tab */}
        {study.hasBrandPlate && !isPrototype && !isVideo && (
          <div className={`v3-container v3-work__brand-outro is-${viewMode}`}>
            <VeriframeBrandPlate />
          </div>
        )}

        {/* Seamless Prev / Next Case Navigation inside /v3 */}
        <div className="v3-container v3-work__pager">
          {data.prev ? (
            <Link to={`/v3/work/${data.prev.slug}`} className="v3-work__pager-link">
              <span>← PREVIOUS</span>
              <strong>{data.prev.title}</strong>
            </Link>
          ) : (
            <Link to="/" className="v3-work__pager-link">
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
            <Link to="/" className="v3-work__pager-link is-right">
              <span>EXHIBITION →</span>
              <strong>回到全部展厅</strong>
            </Link>
          )}
        </div>
      </main>

      {/* Interactive V3 Lightbox (Swipe + 2x Zoom & Pan) */}
      {lightboxIdx !== null && images[lightboxIdx] && (
        <V3Lightbox
          images={images}
          index={lightboxIdx}
          title={study.title}
          onClose={() => setLightboxIdx(null)}
          onIndexChange={setLightboxIdx}
        />
      )}

      <V3PrismAssistant theme={theme} onThemeChange={setTheme} />
    </div>
  );
}
