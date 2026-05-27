import { Link } from 'react-router-dom';
import { allProjects } from '../data/gallery';
import useDocumentTitle from '../hooks/useDocumentTitle';
import s from './Pettravel.module.css';

const PDF_DIR = '/pdf/projects/compressify';
const pages = Array.from({ length: 22 }, (_, i) => ({
  src: `${PDF_DIR}/${i + 1}-(Compressify.io).pdf`,
  alt: `Page ${i + 1}`,
  key: `page-${i + 1}`,
}));

const project = {
  title: 'Compressify',
  tag: 'UX Design',
  desc: '面向<strong>文件压缩服务</strong>的全链路体验设计——从用户研究到交互原型，构建简洁高效的压缩工具界面，以<strong>直观的操作流程</strong>降低用户认知负担，打造流畅的在线文件处理体验。',
  keywords: ['体验设计 (UX)', '交互设计', '工具类产品', 'SaaS', '服务设计'],
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

      {/* PDF page stream */}
      <div className={s.stream}>
        <div className={s.sectionLabel}>完整方案 · {pages.length} Pages</div>
        {pages.map((p) => (
          <div key={p.key} className={s.pageItem}>
            <iframe
              src={p.src}
              title={p.alt}
              className={s.pdfEmbed}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ))}
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
