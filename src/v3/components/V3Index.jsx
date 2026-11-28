import { useState } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import {
  DISCIPLINES,
  CREDENTIAL_CARDS,
  WORK_EXPERIENCE,
  COMPACT_TIMELINE,
  RESUME_PDF_HREF,
} from '../data/v3Data';

export default function V3Index() {
  const [openIdx, setOpenIdx] = useState(0);
  const revealRef = useV3Reveal(0.08);

  return (
    <div id="v3-index" className="v3-index">
      <div ref={revealRef} className="v3-container v3-index__grid v3-reveal">
        <aside className="v3-index__aside">
          <span className="v3-kicker">03 / EXPERIENCE &amp; CREDENTIALS</span>
          <div className="v3-index__head-row">
            <h2 className="v3-index__heading">商业履历与背景</h2>
            <a
              href={RESUME_PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-resume-inline-link"
            >
              查看完整 PDF 简历 ↗
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
            {CREDENTIAL_CARDS.map((card) => (
              <div key={card.label} className="v3-cred-row">
                <span>{card.label}</span>
                <ul className="v3-cred-list">
                  {card.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="v3-index__timeline">
          <div className="v3-work-exp-block">
            <div className="v3-subsec-head">
              <span>工作与商业经历 · EXPERIENCE</span>
              <em>COMMERCIAL</em>
            </div>

            <div className="v3-work-exp-list">
              {WORK_EXPERIENCE.map((job) => (
                <article key={job.company} className="v3-work-exp-card">
                  <div className="v3-work-exp-card__top">
                    <div className="v3-work-exp-card__head-line">
                      <strong>{job.company}</strong>
                      <span className="v3-work-exp-card__period">{job.period}</span>
                    </div>
                    <div className="v3-work-exp-card__sub-line">
                      <span className="v3-work-exp-card__role">{job.role}</span>
                      <em className="v3-work-exp-card__badge">{job.badge}</em>
                    </div>
                  </div>

                  <ul className="v3-work-exp-card__bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>
                        <strong className="v3-work-exp-card__lead">{b.lead}</strong>
                        {b.text}
                      </li>
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

          <div className="v3-timeline-head v3-timeline-head--sub">
            <span>年份</span>
            <span>
              重点项目与学术里程碑
              <i className="v3-tl-head-en"> · SELECTED PROJECTS</i>
            </span>
            <span aria-hidden="true" />
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
