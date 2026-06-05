import { useEffect, useRef } from 'react';
import useAsyncGSAP from '../../hooks/useAsyncGSAP';
import s from '../sections/Skills.module.css';

export default function SkillBar({ name, sub, level }) {
  const fillRef = useRef(null);
  const gst = useAsyncGSAP();

  useEffect(() => {
    if (!gst) return;
    const { gsap } = gst;
    const ctx = gsap.context(() => {
      gsap.to(fillRef.current, {
        scrollTrigger: { trigger: fillRef.current, start: 'top 90%' },
        width: level,
        duration: 1.5,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, [level, gst]);

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
