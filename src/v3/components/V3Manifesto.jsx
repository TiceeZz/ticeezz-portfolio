import { useEffect, useRef } from 'react';
import useAsyncGSAP from '../../hooks/useAsyncGSAP';
import useV3Reveal from '../useV3Reveal';

const PHRASES = [
  { text: '设计不只是解决问题，', accent: false },
  { text: '更是替具体的人，', accent: false },
  { text: '留住一份体面与温度。', accent: true },
];

/**
 * Attitude manifesto interlude.
 * Desktop: scroll-scrubbed phrase illumination via GSAP.
 * Mobile / touch: crisp one-shot reveal so scrolling stays silky and text never stalls dim.
 */
export default function V3Manifesto() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const revealRef = useV3Reveal(0.15);
  const gst = useAsyncGSAP();

  useEffect(() => {
    if (!gst || !sectionRef.current) return;
    const isLightMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 960;

    if (isLightMotion) {
      wordsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      return;
    }

    const { gsap } = gst;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current.filter(Boolean),
        { opacity: 0.16, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'center 46%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [gst]);

  return (
    <div ref={sectionRef} className="v3-manifesto">
      <div ref={revealRef} className="v3-container v3-manifesto__inner v3-reveal">
        <div className="v3-manifesto__eyebrow">
          <span className="v3-kicker">DESIGN STANCE · 设计态度</span>
          <span className="v3-manifesto__rule" aria-hidden="true" />
        </div>

        <blockquote className="v3-manifesto__quote">
          {PHRASES.map((p, idx) => (
            <span
              key={idx}
              ref={(el) => {
                wordsRef.current[idx] = el;
              }}
              className={`v3-manifesto__phrase${p.accent ? ' is-accent' : ''}`}
            >
              {p.text}
            </span>
          ))}
        </blockquote>

        <div className="v3-manifesto__foot">
          <span>看见人的处境</span>
          <i>/</i>
          <span>理性推演，感性落点</span>
          <i>/</i>
          <span>用体验化解不安</span>
        </div>
      </div>
    </div>
  );
}
