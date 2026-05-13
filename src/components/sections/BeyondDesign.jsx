import { useRef, useEffect, useCallback } from 'react';
import SectionHeader from '../ui/SectionHeader';
import MarqueeCard from '../ui/MarqueeCard';
import marqueeCards from '../../data/marquee';
import s from './BeyondDesign.module.css';

export default function BeyondDesign() {
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const isMobile = useRef(false);

  const advance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${s.card}`);
    if (!card) return;
    const step = card.offsetWidth + 16; // card width + gap
    const maxScroll = track.scrollWidth - track.clientWidth;
    let next = track.scrollLeft + step;
    if (next >= maxScroll - 2) next = 0;
    track.scrollTo({ left: next, behavior: 'smooth' });
  }, []);

  const startAuto = useCallback(() => {
    if (!isMobile.current) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 4000);
  }, [advance]);

  const stopAuto = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile.current) return;

    const track = trackRef.current;
    if (!track) return;

    startAuto();

    track.addEventListener('touchstart', stopAuto, { passive: true });
    track.addEventListener('touchend', () => {
      setTimeout(startAuto, 3000);
    });

    return () => {
      clearInterval(timerRef.current);
      track.removeEventListener('touchstart', stopAuto);
    };
  }, [startAuto, stopAuto]);

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
