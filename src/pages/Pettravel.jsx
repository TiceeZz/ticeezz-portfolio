import { Link } from 'react-router-dom';
import { allProjects } from '../data/gallery';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ImgLoader from '../components/ui/ImgLoader';
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
  desc: '面向<strong>千亿宠物经济</strong>的航旅服务体验重构。将复杂的航司规则与信息盲区，转化为清晰、可感知的<strong>模"芯"化体验</strong>——从竞品分析到全链路交互设计，打造一条确定且安心的宠物出行专线，以信任基建驱动商业增长。',
  keywords: ['体验设计 (UX)', '情感化设计', '商业增长', '宠物经济', '服务设计'],
};

export default function Pettravel() {
  useDocumentTitle(
    `${project.title} | TiceeZz Portfolio`,
    project.desc.replace(/<[^>]+>/g, '')
  );

  const idx = allProjects.findIndex((p) => p.href === '/pettravel');
  const prevProj = idx > 0 ? allProjects[idx - 1] : null;
  const nextProj = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

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
        <ImgLoader src={COVER} alt={project.title} loading="eager" objectFit="cover" aspectRatio="16/9" className={s.coverImg} />
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
            <div key={p.src} className={s.pageItem}>
              <ImgLoader src={p.src} alt={p.alt} loading="lazy" objectFit="contain" aspectRatio={isLast ? '4000/8413' : '16/9'} />
            </div>
          );
        })}
      </div>

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
