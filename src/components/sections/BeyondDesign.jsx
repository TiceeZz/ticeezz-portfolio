import { useRef, useEffect } from 'react';
import SectionHeader from '../ui/SectionHeader';
import MarqueeCard from '../ui/MarqueeCard';
import marqueeCards from '../../data/marquee';
import s from './BeyondDesign.module.css';

function useMobileMarquee(trackRef) {
  const offsetRef = useRef(0);
  const dragRef = useRef(null);
  const rafRef = useRef(null);
  const resumeTimer = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const track = trackRef.current;
    if (!track || !mql.matches) return;

    const DURATION = 50; // seconds for one full cycle (one group)
    let lastTime = performance.now();
    let groupWidth = track.scrollWidth / 2;

    const tick = (now) => {
      if (!dragRef.current) {
        const dt = now - lastTime;
        const speed = groupWidth / (DURATION * 1000); // px per ms
        offsetRef.current -= speed * dt;
        if (offsetRef.current <= -groupWidth) offsetRef.current += groupWidth;
        if (offsetRef.current > 0) offsetRef.current -= groupWidth;
      }
      track.style.transform = `translateX(${offsetRef.current}px)`;
      lastTime = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    // Recalc groupWidth on resize
    const onResize = () => { groupWidth = track.scrollWidth / 2; };
    window.addEventListener('resize', onResize);

    rafRef.current = requestAnimationFrame(tick);

    const onTouchStart = (e) => {
      clearTimeout(resumeTimer.current);
      dragRef.current = {
        startX: e.touches[0].clientX,
        startOffset: offsetRef.current,
      };
    };
    const onTouchMove = (e) => {
      if (!dragRef.current) return;
      const dx = e.touches[0].clientX - dragRef.current.startX;
      let newOffset = dragRef.current.startOffset + dx;
      // wrap
      if (newOffset <= -groupWidth) newOffset += groupWidth;
      if (newOffset > 0) newOffset -= groupWidth;
      offsetRef.current = newOffset;
    };
    const onTouchEnd = () => {
      dragRef.current = null;
      resumeTimer.current = setTimeout(() => {
        // auto-resume is natural — next tick will advance without drag
      }, 2000);
    };

    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: true });
    track.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resumeTimer.current);
      window.removeEventListener('resize', onResize);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, []);
}

export default function BeyondDesign() {
  const trackRef = useRef(null);
  useMobileMarquee(trackRef);

  return (
    <section id="beyond-design" className={s.beyond}>
      <SectionHeader title="BEYOND DESIGN" subtitle="设计外的我 // 手绘、生活与摄影" />

      <div className={s.wrapper}>
        <div className={s.track} ref={trackRef}>
          <div className={s.group}>
            {marqueeCards.map((card, i) => (
              <MarqueeCard key={`a-${i}`} card={card} />
            ))}
          </div>
          <div className={s.group} aria-hidden="true">
            {marqueeCards.map((card, i) => (
              <MarqueeCard key={`b-${i}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
