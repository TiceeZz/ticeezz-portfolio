import { useState } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import { DISCIPLINES, COMPACT_TIMELINE, honors } from '../data/v3Data';

export default function V3Index() {
  const [openIdx, setOpenIdx] = useState(0);
  const revealRef = useV3Reveal(0.08);

  return (
    <div id="v3-index" className="v3-index">
      <div ref={revealRef} className="v3-container v3-index__grid v3-reveal">
        <aside className="v3-index__aside">
          <span className="v3-kicker">03 / CAPABILITIES &amp; EXPERIENCE</span>
          <h2 className="v3-index__heading">方法与履历</h2>

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
              <p>东华大学 艺术设计硕士 · 四川农业大学 产品设计学士（专业第 1 / 121）</p>
            </div>
            <div className="v3-cred-row">
              <span>主要奖项</span>
              <p>{honors.join(' · ')}</p>
            </div>
          </div>
        </aside>

        <div className="v3-index__timeline">
          <div className="v3-timeline-head">
            <span>年份</span>
            <span>项目与实践</span>
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
