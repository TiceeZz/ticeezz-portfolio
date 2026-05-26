import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import s from './LatestWork.module.css';

gsap.registerPlugin(ScrollTrigger);

const tags = ['体验设计 (UX)', '情感化设计', '商业增长'];

export default function LatestWork() {
  const phoneRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#latest-work',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to(phoneRef.current, { y: '-4%' }),
    });
    return () => st.kill();
  }, []);

  return (
    <section id="latest-work" className={s.section}>
      <div className={s.frame}>
        {/* Frosted glass background */}
        <div className={s.glassBg}>
          <div className={s.glassOrb1} />
          <div className={s.glassOrb2} />
        </div>
        <div className={s.glow} />

        <div className={s.layout}>
          {/* Left — text content */}
          <div className={s.content}>
            <div className={s.badge}>NEW</div>

            <div className={s.tags}>
              {tags.map((t) => (
                <span key={t} className={s.tag}>{t}</span>
              ))}
            </div>

            <h2 className={s.title}>
              航旅纵横<span className={s.accent}>·</span>宠物出行
            </h2>

            <p className={s.sub}>完整 UX 设计提案</p>

            <p className={s.desc}>
              千亿宠物经济下的"信任基建"——将复杂的航司规则与信息盲区，
              转化为清晰、可感知的模"芯"化体验，打造一条确定且安心的宠物出行专线。
            </p>

            <Link className={s.cta} to="/pettravel">
              查看完整方案
              <span className={s.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Right — iPhone mockup */}
          <div className={s.mockupWrap}>
            <div ref={phoneRef} className={s.mockup}>
              <img
                src="/images/projects/pet-travel/iphone-mockup.png"
                alt="航旅纵横宠物出行 — 手机界面"
                className={s.phoneImg}
              />
            </div>
          </div>
        </div>

        <span className={s.sectionLabel}>Latest Work</span>
      </div>
    </section>
  );
}
