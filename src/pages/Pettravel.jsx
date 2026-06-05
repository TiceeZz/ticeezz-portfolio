import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/gallery';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Lightbox from '../components/ui/Lightbox';
import s from './Pettravel.module.css';

const IMG_DIR = '/images/projects/pet-travel';
const COVER = `${IMG_DIR}/cover.webp`;
const pages = Array.from({ length: 22 }, (_, i) => ({
  src: `${IMG_DIR}/page_${String(i + 1).padStart(3, '0')}.jpg`,
  alt: `Page ${i + 1}`,
}));

const project = {
  title: '航旅纵横 · 宠物出行',
  tag: 'UX Design',
  desc: '面向<strong>千亿宠物经济</strong>的航旅服务体验重构——针对传统活体托运中的资源盲盒与分离焦虑，通过"前置运力感知"、"结构化表单降噪"与"全链路飞行可视化"，将极具不确定性的物流黑盒，重构为一条确定且安心的数字化生命运输线。',
  keywords: ['体验设计 (UX)', '情感化设计', '商业增长', '宠物经济', '服务设计'],
};

export default function Pettravel() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useDocumentTitle(
    `${project.title} | TiceeZz Portfolio`,
    project.desc.replace(/<[^>]+>/g, '')
  );

  const idx = allProjects.findIndex((p) => p.href === '/pettravel');
  const prevProj = idx > 0 ? allProjects[idx - 1] : null;
  const nextProj = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  const openLightbox = (i) => {
    setLightboxIndex(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };
  const prevImage = () => setLightboxIndex((i) => (i > 0 ? i - 1 : pages.length - 1));
  const nextImage = () => setLightboxIndex((i) => (i < pages.length - 1 ? i + 1 : 0));

  const pageSrcs = pages.map((p) => p.src);

  return (
    <div className={s.page}>
      {/* Top bar */}
      <div className={s.topBar}>
        <Link to="/" className={s.backLink}>← Back to Home</Link>
        {(prevProj || nextProj) && (
          <div style={{ display: 'flex', gap: '20px' }}>
            {prevProj && (
              <Link to={prevProj.href} className={s.backLink}>‹ {prevProj.title}</Link>
            )}
            {nextProj && (
              <Link to={nextProj.href} className={s.backLink}>{nextProj.title} ›</Link>
            )}
          </div>
        )}
      </div>

      {/* Cover */}
      <div className={s.coverWrap}>
        <img src={COVER} alt={project.title} loading="eager" className={s.coverImg} />
      </div>

      {/* Meta */}
      <div className={s.meta}>
        <div className={s.tag}>{project.tag}</div>
        <h1 className={s.title}>{project.title}</h1>
        <p className={s.desc} dangerouslySetInnerHTML={{ __html: project.desc }} />
        <div className={s.keywords}>
          {project.keywords.map((k) => (
            <span key={k} className={s.keyword}>{k}</span>
          ))}
        </div>
      </div>

      {/* Continuous page stream */}
      <div className={s.stream}>
        <div className={s.sectionLabel}>完整方案 · {pages.length} Pages</div>
        {pages.map((p, i) => {
          const isLast = i === pages.length - 1;
          return (
            <button key={p.src} className={s.pageItem} onClick={() => openLightbox(i)}
              aria-label={`View page ${i + 1}`}>
              <img src={p.src} alt={p.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={pageSrcs}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />

      {/* Footer nav */}
      {(prevProj || nextProj) && (
        <div className={s.footerNav}>
          <div>
            {prevProj && (
              <Link to={prevProj.href} className={s.footerLink}>
                ‹ Previous
                <span className={s.footerLinkTitle}>{prevProj.title}</span>
              </Link>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            {nextProj && (
              <Link to={nextProj.href} className={s.footerLink}>
                Next ›
                <span className={s.footerLinkTitle}>{nextProj.title}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
