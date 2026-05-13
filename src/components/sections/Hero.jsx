import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      scrub: 1,
      animation: gsap.to(titleRef.current, { y: -100, opacity: 0.1 }),
    });
    return () => st.kill();
  }, []);

  return (
    <section id="hero" className={s.hero}>
      <div ref={titleRef} className={s.title}>TiceeZz</div>
      <div className={s.subtitle}>
        <span>Tong Zongzhen</span> 童宗震
        <br /><br />
        用户体验 / 产品 / 服务 / AI 驱动设计
      </div>
      <div className={s.infoStrip}>
        <div className={s.infoItem}>
          <span className={s.infoLabel}>BIRTH / LOCATION</span>
          <span className={s.infoValue}>1999.02.20 · 上海长宁</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoLabel}>EDUCATION</span>
          <span className={s.infoValue}>东华大学 (MA) · 四川农业大学 (BA) RANK 1/121</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoLabel}>CONTACT</span>
          <span className={s.infoValue}>+86 199 7467 7449 / 180 8063 1096</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoLabel}>EMAIL</span>
          <span className={s.infoValue}>1027208320@qq.com</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoLabel}>LANGUAGE</span>
          <span className={s.infoValue}>英语: 日常 / 工作 / 文献</span>
        </div>
      </div>
    </section>
  );
}
