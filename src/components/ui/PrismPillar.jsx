import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImgLoader from './ImgLoader';
import s from '../sections/Gallery.module.css';

export default function PrismPillar({ project }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '300px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setGlowPoint = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${Math.max(0, Math.min(100, x))}%`);
      el.style.setProperty('--glow-y', `${Math.max(0, Math.min(100, y))}%`);
    };

    const handlePointerMove = (e) => setGlowPoint(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) setGlowPoint(touch.clientX, touch.clientY);
    };
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) setGlowPoint(touch.clientX, touch.clientY);
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <button
      ref={ref}
      className={`${s.pillar}${lit ? ` ${s.lit}` : ''}`}
      onClick={() => navigate(project.href)}
      aria-label={`View project: ${project.title}`}
    >
      {lit && project.img && (
        <div className={s.bgImg}>
          <ImgLoader
            src={project.img}
            alt={project.title || ''}
            loading="lazy"
            imgStyle={{ objectPosition: '30% center' }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      <div className={s.num}>{project.num}</div>
      <div className={s.glow} />
      <div className={s.info}>
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
      </div>
    </button>
  );
}
