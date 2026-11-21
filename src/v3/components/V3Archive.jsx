import { useState } from 'react';
import { COMPACT_TIMELINE, honors } from '../data/v3Data';

export default function V3Archive() {
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div id="v3-archive" className="v3-archive">
      <div className="v3-container">
        <div className="v3-section-head">
          <div>
            <span className="v3-kicker">04 / EXPERIENCE</span>
            <h2 className="v3-section-title">实践履历</h2>
          </div>
          <div className="v3-edu-strip">
            <span><strong>东华大学</strong> MA</span>
            <i>·</i>
            <span><strong>四川农业大学</strong> BA (1/121)</span>
          </div>
        </div>

        <div className="v3-spec-list">
          {COMPACT_TIMELINE.map((item, idx) => {
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

        {/* Clean Single-Row Awards Bar */}
        <div className="v3-awards-bar">
          <span className="v3-awards-bar__label">HONORS</span>
          <div className="v3-awards-bar__list">
            {honors.map((h) => (
              <span key={h} className="v3-award-pill">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
