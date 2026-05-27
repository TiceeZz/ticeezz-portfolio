import { Link } from 'react-router-dom';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import s from './LatestWork.module.css';

const tags = ['体验设计 (UX)', '交互设计', '工具类产品'];

export default function LatestWork() {
  const frameRef = useRevealOnScroll();

  return (
    <section id="latest-work" className={s.section}>
      <div ref={frameRef} className={s.frame}>
        <div className={s.glassBg}>
          <div className={s.glassOrb1} />
          <div className={s.glassOrb2} />
        </div>
        <div className={s.glow} />

        <div className={s.layout}>
          <div className={s.content}>
            <div className={`reveal-item ${s.badge}`} style={{ transitionDelay: '0.05s' }}>NEW</div>

            <div className={`reveal-item ${s.tags}`} style={{ transitionDelay: '0.15s' }}>
              {tags.map((t) => (
                <span key={t} className={s.tag}>{t}</span>
              ))}
            </div>

            <h2 className={`reveal-item ${s.title}`} style={{ transitionDelay: '0.25s' }}>
              Compressify<span className={s.accent}>.</span>io
            </h2>

            <p className={`reveal-item ${s.sub}`} style={{ transitionDelay: '0.32s' }}>完整 UX 设计提案</p>

            <p className={`reveal-item ${s.desc}`} style={{ transitionDelay: '0.38s' }}>
              文件压缩 SaaS 工具的全链路体验设计——将复杂的压缩参数与操作流程，
              转化为简洁直观的交互界面，打造流畅高效的在线文件处理工具。
            </p>

            <Link className={`reveal-item ${s.cta}`} style={{ transitionDelay: '0.48s' }} to="/pettravel">
              查看完整方案
              <span className={s.ctaArrow}>→</span>
            </Link>
          </div>

        </div>

        <span className={`reveal-item ${s.sectionLabel}`} style={{ transitionDelay: '0.1s' }}>Latest Work</span>
      </div>
    </section>
  );
}
