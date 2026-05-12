import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from '../sections/Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function SkillBar({ name, sub, level }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(fillRef.current, {
        scrollTrigger: { trigger: fillRef.current, start: 'top 90%' },
        width: level,
        duration: 1.5,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, [level]);

  return (
    <div className={s.item}>
      <div className={s.info}>
        <span className={s.name}>{name}</span>
        <span className={s.sub}>{sub}</span>
      </div>
      <div className={s.track}>
        <div ref={fillRef} className={s.fill} />
      </div>
    </div>
  );
}
