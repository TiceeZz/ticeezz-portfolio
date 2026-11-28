import { useState } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import {
  DISCIPLINES,
  WORK_EXPERIENCE,
  COMPACT_TIMELINE,
  RESUME_PDF_HREF,
  RESUME_DOWNLOAD_NAME,
  honors,
} from '../data/v3Data';

export default function V3Index() {
  const [openIdx, setOpenIdx] = useState(0);
  const revealRef = useV3Reveal(0.08);

  return (
    <div id="v3-index" className="v3-index">
      <div ref={revealRef} className="v3-container v3-index__grid v3-reveal">
        <aside className="v3-index__aside">
          <span className="v3-kicker">03 / EXPERIENCE, CAPABILITIES &amp; RESUME</span>
          <h2 className="v3-index__heading">商业履历与方法</h2>

          <div className="v3-resume-cta-box">
            <a
              href={RESUME_PDF_HREF}
              download={RESUME_DOWNLOAD_NAME}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-action-primary v3-resume-download-btn"
            >
              <span>下载 PDF 简历（2026 版）</span>
              <span className="v3-action-arrow" aria-hidden="true">↓</span>
            </a>
            <a
              href={RESUME_PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-resume-preview-link"
            >
              在线预览 A4 简历 ↗
            </a>
          </div>

          <div className="v3-disciplines">
            {DISCIPLINES.map((d) => (
              <div key={d.num} className="v3-discipline">
                <div className="v3-discipline__head">
                  <span className="v3-discipline__num">{d.num}</span>
                  <h3>{d.title}</h3>
                </div>
                <p>{d.items}</p>
              </div>
            ))}
          </div>

          <div className="v3-credentials">
            <div className="v3-cred-row">
              <span>教育背景</span>
              <p>东华大学 艺术设计硕士（2022–2025） · 四川农业大学 产品设计学士（专业第 1 / 121）</p>
            </div>
            <div className="v3-cred-row">
              <span>主要奖项与出版</span>
              <p>{honors.join(' · ')} · 参编专著《AI 技术赋能居家养老服务实践》（独立撰写第 4、9 章）</p>
            </div>
          </div>
        </aside>

        <div className="v3-index__timeline">
          {/* Upfront Real Commercial Experience Block */}
          <div className="v3-work-exp-block">
            <div className="v3-timeline-head">
              <span>时间</span>
              <span>商业工作与独立实践 · WORK EXPERIENCE</span>
            </div>

            <div className="v3-work-exp-list">
              {WORK_EXPERIENCE.map((job) => (
                <article key={job.company} className="v3-work-exp-card">
                  <div className="v3-work-exp-card__top">
                    <div className="v3-work-exp-card__title">
                      <strong>{job.company}</strong>
                      <span className="v3-work-exp-card__role">{job.role}</span>
                      <em className="v3-work-exp-card__badge">{job.badge}</em>
                    </div>
                    <span className="v3-work-exp-card__period">{job.period}</span>
                  </div>

                  <ul className="v3-work-exp-card__bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  {job.relatedCase && (
                    <div className="v3-work-exp-card__foot">
                      <Link to={job.relatedCase.href} className="v3-tl-row__case-link">
                        {job.relatedCase.label}
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Selected Project & Academic Milestones */}
          <div className="v3-timeline-head v3-timeline-head--sub">
            <span>年份</span>
            <span>重点项目与学术里程碑 · SELECTED MILESTONES</span>
          </div>

          {COMPACT_TIMELINE.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={`${item.year}-${item.title}`}
                className={`v3-tl-row${isOpen ? ' is-open' : ''}`}
              >
                <button
                  className="v3-tl-row__btn"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="v3-tl-row__year">{item.year}</span>
                  <span className="v3-tl-row__title">{item.title}</span>
                  <span className="v3-tl-row__plus" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div className="v3-tl-row__expand">
                  <div className="v3-tl-row__inner">
                    <p className="v3-tl-row__desc">{item.desc}</p>
                    <div className="v3-tl-row__foot">
                      <div className="v3-tl-row__kws">
                        {item.keywords.map((kw) => (
                          <span key={kw}>{kw}</span>
                        ))}
                      </div>
                      {item.caseHref && (
                        <Link to={item.caseHref} className="v3-tl-row__case-link">
                          查看案例 ↗
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
