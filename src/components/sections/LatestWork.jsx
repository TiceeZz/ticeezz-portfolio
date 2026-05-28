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
  const floatRef = useRef(null);
  const frameRef = useRevealOnScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven parallax — instant follow (no lag)
      ScrollTrigger.create({
        trigger: '#latest-work',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(phoneRef.current, { y: '-5%' }),
      });

      // Entrance reveal
      gsap.fromTo(
        phoneRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#latest-work',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Continuous float on the wrapper — separate layer from scroll parallax
      gsap.to(floatRef.current, {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
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
              千亿宠物经济下的"信任基建"——针对传统活体托运中的资源盲盒与分离焦虑，
              通过"前置运力感知"、"结构化表单降噪"与"全链路飞行可视化"，
              将极具不确定性的物流黑盒，重构为一条确定且安心的数字化生命运输线。
            </p>

            <Link className={`reveal-item ${s.cta}`} style={{ transitionDelay: '0.48s' }} to="/pettravel">
              查看完整方案
              <span className={s.ctaArrow}>→</span>
            </Link>
          </div>

          <div className={s.mockupWrap}>
            <div ref={floatRef} className={s.mockupFloat}>
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
