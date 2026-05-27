import { useState, useCallback } from 'react';
import Picture from './Picture';
import s from './PortfolioBook.module.css';

const IMG_DIR = '/images/projects/undergrad';
const TOTAL = 30;
const pages = Array.from({ length: TOTAL }, (_, i) =>
  `${IMG_DIR}/page_${String(i + 1).padStart(3, '0')}.jpg`
);

export default function PortfolioBook() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const openBook = useCallback(() => {
    setOpen(true);
    setPage(0);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBook = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goNext = () => setPage((p) => Math.min(p + 1, TOTAL - 2));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  const leftSrc = pages[page];
  const rightSrc = pages[page + 1];

  return (
    <>
      <button className={s.bookCover} onClick={openBook} aria-label="View undergraduate portfolio book">
        <div className={s.coverImg} style={{ backgroundImage: `url(${pages[0]})` }} />
        <div className={s.coverOverlay}>
          <span className={s.coverLabel}>PORTFOLIO</span>
          <h2 className={s.coverTitle}>保研作品集</h2>
          <span className={s.coverSub}>2018–2022 · 本科阶段优选</span>
          <span className={s.coverHint}>点击翻阅</span>
        </div>
        <div className={s.bookSpine} />
      </button>

      {open && (
        <div className={s.viewer}>
          <button className={s.closeBtn} onClick={closeBook} aria-label="Close book viewer">✕</button>

          <div className={s.book}>
            <div className={s.pageLeft}>
              <Picture src={leftSrc} alt={`Page ${page + 1}`} loading="eager" objectFit="contain" />
              <span className={s.pageNum}>{page + 1}</span>
            </div>

            <div className={s.pageRight}>
              <Picture src={rightSrc} alt={`Page ${page + 2}`} loading="eager" objectFit="contain" />
              <span className={s.pageNum}>{page + 2}</span>
            </div>
          </div>

          <div className={s.nav}>
            <button onClick={goPrev} disabled={page === 0} className={s.navBtn} aria-label="Previous page">
              ‹ 上一页
            </button>
            <span className={s.indicator}>
              {page + 1}–{page + 2} / {TOTAL}
            </span>
            <button onClick={goNext} disabled={page >= TOTAL - 2} className={s.navBtn} aria-label="Next page">
              下一页 ›
            </button>
          </div>

          <div className={s.thumbStrip}>
            {pages.map((src, i) => (
              <button
                key={i}
                className={`${s.thumb} ${i >= page && i <= page + 1 ? s.thumbActive : ''}`}
                onClick={() => setPage(Math.min(i, TOTAL - 2))}
                aria-label={`Go to page ${i + 1}`}
              >
                <Picture src={src} alt={`Thumbnail ${i + 1}`} objectFit="cover" />
                <span>{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
