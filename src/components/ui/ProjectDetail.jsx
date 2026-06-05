import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../../data/gallery';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Picture from './Picture';
import Lightbox from './Lightbox';
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
        <div className={s.galleryGrid}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className={s.galleryItem}
              aria-label={`View ${current.label} image ${i + 1}`}
            >
              <div className={s.galleryMedia}>
                <Picture
                  src={src}
                  alt={`${current.label} ${i + 1}`}
                  loading="lazy"
                  aspectRatio="16/10"
                  objectFit="cover"
                />
              </div>
              <div className={s.pageLabelWrap}>
                <span className={s.pageLabel}>{current.label}</span>
                <span className={s.pageIndex}>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (!current.videos || current.videos.length === 0) {
      return (
        <div className={s.videoPlaceholder}>
          <p className={s.videoPlaceholderTitle}>视频展示区</p>
          <p className={s.videoPlaceholderSub}>即将更新，敬请期待</p>
        </div>
      );
    }

    return (
      <div className={s.videoList}>
        {current.videos.map((v, i) => (
          <div key={i} className={s.videoCard}>
            <div className={s.videoMeta}>
              <span className={s.videoKicker}>Motion Showcase</span>
              <h3 className={s.videoTitle}>{v.title}</h3>
            </div>
            {v.poster ? (
              <div className={s.videoPosterWrap}>
                <Picture
                  src={v.poster}
                  alt={v.title}
                  loading="lazy"
                  aspectRatio="16/9"
                  imgStyle={{ filter: 'brightness(0.4)' }}
                />
                <div className={s.videoPosterOverlay}>
                  <span className={s.videoPosterLabel}>Video Available</span>
                  <span className={s.videoPosterHint}>因版权原因暂不公开展示 · Copyright Restricted</span>
                </div>
              </div>
            ) : (
              <div className={s.videoFrameWrap}>
                <div className={s.videoLoading}>加载中...</div>
                <iframe
                  src={v.embedUrl}
                  className={s.videoFrame}
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
    <div className={s.page}>
      <div className={s.topBar}>
        <Link to="/" className={s.backLink}>
          ← Back to Home
        </Link>

        {(prevProj || nextProj) && (
          <div className={s.topNav}>
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

      <div className={s.heroShell}>
        <div className={s.heroMedia}>
          <Picture
            src={cover}
            alt={project.title}
            loading="eager"
            aspectRatio="16/9"
            objectFit="cover"
            className={s.coverPicture}
          />
          <div className={s.heroOverlay} />
        </div>

        <div className={s.heroContent}>
          <div className={s.heroBadge}>{project.tag}</div>
          <h1 className={s.heroTitle}>{project.title}</h1>
          {project.desc && (
            <p className={s.heroDesc} dangerouslySetInnerHTML={{ __html: project.desc }} />
          )}
          {project.keywords && (
            <div className={s.heroKeywords}>
              {project.keywords.map((k) => (
                <span key={k} className={s.heroKeyword}>{k}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {sections.length > 1 && (
        <div className={s.tabsWrap}>
          <div className={s.tabs}>
            {sections.map((sec, i) => (
              <button
                key={sec.label}
                className={`${s.tab} ${tab === i ? s.tabActive : ''}`}
                onClick={() => setTab(i)}
              >
                <span>{sec.label}</span>
                {sec.type !== 'video' && <span className={s.tabCount}>{sec.images.length}</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={s.contentShell}>
        <div className={s.contentHead}>
          <div>
            <div className={s.contentKicker}>Selected Works</div>
            <h2 className={s.contentTitle}>{current?.label || 'Project Gallery'}</h2>
          </div>
          {!isVideo && images.length > 0 && (
            <p className={s.contentMeta}>{images.length} pieces · Click any visual to zoom in.</p>
          )}
        </div>

        {renderContent()}
      </div>

      {(prevProj || nextProj) && (
        <div className={s.bottomNav}>
          <div>
            {prevProj && (
              <Link to={prevProj.href} className={s.projNavLarge}>
                ‹ Previous
                <span className={s.projNavTitle}>{prevProj.title}</span>
              </Link>
            )}
          </div>
          <div className={s.bottomNavRight}>
            {nextProj && (
              <Link to={nextProj.href} className={s.projNavLarge}>
                Next ›
                <span className={s.projNavTitle}>{nextProj.title}</span>
              </Link>
            )}
          </div>
        </div>
      )}

      <Lightbox images={images} index={lightbox} onClose={closeLightbox} onPrev={lightboxPrev} onNext={lightboxNext} />
    </div>
  );
}
