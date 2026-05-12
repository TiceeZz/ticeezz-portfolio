import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineRow from '../ui/TimelineRow';
import SectionHeader from '../ui/SectionHeader';
import timeline, { honors, leadership } from '../../data/timeline';
import s from './Resume.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: 'top 90%' },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="resume" style={{ paddingTop: '10vh', paddingBottom: '5vh' }}>
      <div className={s.header}>
        <SectionHeader title="PRACTICE & PROJECTS" subtitle="设计实践 / 项目经验" />
      </div>

      <div className={s.container}>
        {timeline.map((entry, i) => (
          <div key={i} ref={(el) => (rowsRef.current[i] = el)}>
            <TimelineRow entry={entry} />
          </div>
        ))}
      </div>

      <div className={s.grid}>
        <div className={s.gridBox}>
          <h3>HONORS & AWARDS</h3>
          <ul className={s.gridList}>
            {honors.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className={s.gridBox}>
          <h3>LEADERSHIP</h3>
          <ul className={s.gridList}>
            {leadership.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
