import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineRow from '../ui/TimelineRow';
import SectionHeader from '../ui/SectionHeader';
import timeline, { honors, otherHonors, leadership } from '../../data/timeline';
import s from './Resume.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
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
          <h3>DESIGN AWARDS</h3>
          <ul className={s.gridList}>
            {honors.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className={s.gridBox}>
          <h3>OTHER HONORS</h3>
          <ul className={s.gridList}>
            {otherHonors.map((h) => <li key={h}>{h}</li>)}
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
