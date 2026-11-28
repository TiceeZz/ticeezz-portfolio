import { useEffect, useRef } from 'react';
import useAsyncGSAP from '../../hooks/useAsyncGSAP';
import useV3Reveal from '../useV3Reveal';
import { MANIFESTO_WORKFLOW } from '../data/v3Data';

const PHRASES = [
  { text: '从人的真实处境出发去推演，', accent: false },
  { text: '再亲手把交互与细节跑通，', accent: false },
  { text: '让设计从图纸真正走到人手里。', accent: true },
];

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
          <span className="v3-kicker">DESIGN → PROTOTYPE → SHIP</span>
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

        <div className="v3-manifesto__pillars">
          {MANIFESTO_WORKFLOW.map((w) => (
            <div key={w.num} className="v3-manifesto__pillar">
              <div className="v3-manifesto__pillar-head">
                <em>{w.num}</em>
                <strong>{w.head}</strong>
              </div>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
