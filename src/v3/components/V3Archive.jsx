import { useState } from 'react';
import { timeline, honors, otherHonors, leadership } from '../data/v3Data';

export default function V3Archive() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div id="v3-archive" className="v3-archive">
      <div className="v3-container">
        <div className="v3-section-head">
          <div className="v3-section-head__left">
            <span className="v3-kicker">04 // PRACTICE & CREDENTIALS</span>
            <h2 className="v3-section-title">实践履历与荣誉</h2>
          </div>
          <div className="v3-section-head__right">
            <div className="v3-edu-strip">
              <span><strong>东华大学</strong> 艺术设计 MA</span>
              <i>/</i>
              <span><strong>四川农业大学</strong> 产品设计 BA · RANK 1/121</span>
            </div>
          </div>
        </div>

        {/* Interactive Spec-Sheet Accordion */}
        <div className="v3-spec-list">
          {timeline.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={`${item.year}-${item.title}`}
                className={`v3-spec-row${isOpen ? ' is-open' : ''}`}
              >
                <button
                  className="v3-spec-row__trigger"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="v3-spec-row__year">{item.year}</span>
                  <span className="v3-spec-row__tag">{item.tag}</span>
                  <span className="v3-spec-row__title">{item.title}</span>
                  <span className="v3-spec-row__toggle" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div className="v3-spec-row__body">
                  <div className="v3-spec-row__content">
                    <p
                      className="v3-spec-row__desc"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                    <div className="v3-spec-row__tags">
                      {item.keywords.map((kw) => (
                        <span key={kw} className="v3-kw">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3-Column Honors & Leadership Deck */}
        <div className="v3-honors-grid">
          <div className="v3-honor-card v3-honor-card--accent">
            <div className="v3-honor-card__head">
              <span>01 // DESIGN AWARDS</span>
              <strong>设计竞赛奖项</strong>
            </div>
            <ul>
              {honors.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>

          <div className="v3-honor-card">
            <div className="v3-honor-card__head">
              <span>02 // ACADEMIC HONORS</span>
              <strong>奖学金与综合荣誉</strong>
            </div>
            <ul>
              {otherHonors.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>

          <div className="v3-honor-card">
            <div className="v3-honor-card__head">
              <span>03 // LEADERSHIP</span>
              <strong>组织统筹与影响</strong>
            </div>
            <ul>
              {leadership.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
