import SectionHeader from '../ui/SectionHeader';
import MarqueeCard from '../ui/MarqueeCard';
import marqueeCards from '../../data/marquee';
import s from './BeyondDesign.module.css';

export default function BeyondDesign() {
  return (
    <section id="beyond-design" className={s.beyond}>
      <SectionHeader title="BEYOND DESIGN" subtitle="设计外的我 // 手绘、生活与摄影" />

      <div className={s.wrapper}>
        <div className={s.track}>
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
