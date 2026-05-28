import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import useRevealOnScroll from '../../hooks/useRevealOnScroll';
import s from './LatestWork.module.css';

gsap.registerPlugin(ScrollTrigger);

const tags = ['体验设计 (UX)', '情感化设计', '商业增长'];

export default function LatestWork() {
  const phoneRef = useRef(null);
  const frameRef = useRevealOnScroll();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      // Parallax scrub — desktop only, too janky on touch scroll
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: '#latest-work',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(phoneRef.current, { y: '-5%' }),
        });
      }

      gsap.fromTo(
        phoneRef.current,
        { y: 40 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#latest-work',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="latest-work" className={s.section}>
      <div ref={frameRef} className={s.frame}>
        <div className={s.glassBg}>
          <div className={s.glassOrb1} />
          <div className={s.glassOrb2} />
        </div>
        <div className={s.glow} />

        <div className={s.layout}>
          <div className={s.content}>
            <div className={`reveal-item ${s.badge}`} style={{ transitionDelay: '0.05s' }}>NEW</div>

            <div className={`reveal-item ${s.tags}`} style={{ transitionDelay: '0.15s' }}>
              {tags.map((t) => (
                <span key={t} className={s.tag}>{t}</span>
              ))}
            </div>

            <h2 className={`reveal-item ${s.title}`} style={{ transitionDelay: '0.25s' }}>
              航旅纵横<span className={s.accent}>·</span>宠物出行
            </h2>

            <p className={`reveal-item ${s.sub}`} style={{ transitionDelay: '0.32s' }}>完整 UX 设计提案</p>

            <p className={`reveal-item ${s.desc}`} style={{ transitionDelay: '0.38s' }}>
              千亿宠物经济下的"信任基建"——将复杂的航司规则与信息盲区，
              转化为清晰、可感知的模"芯"化体验，打造一条确定且安心的宠物出行专线。
            </p>

            <Link className={`reveal-item ${s.cta}`} style={{ transitionDelay: '0.48s' }} to="/pettravel">
              查看完整方案
              <span className={s.ctaArrow}>→</span>
            </Link>
          </div>

          <div className={s.mockupWrap}>
            <div className={s.mockupFloat}>
              <div ref={phoneRef} className={s.mockup}>
                <picture>
                  <source srcSet="/images/projects/pet-travel/iphone-mockup.webp" type="image/webp" />
                  <img
                    src="/images/projects/pet-travel/iphone-mockup.png"
                    alt="航旅纵横宠物出行 — 手机界面"
                    className={s.phoneImg}
                    loading="eager"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <span className={`reveal-item ${s.sectionLabel}`} style={{ transitionDelay: '0.1s' }}>Latest Work</span>
      </div>
    </section>
  );
}
