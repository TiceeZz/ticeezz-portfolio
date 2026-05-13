import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './Cube3D.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Cube3D() {
  const cubeRef = useRef(null);
  const containerRef = useRef(null);
  const entranceDone = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      entranceDone.current = true;
      return;
    }

    const handleMouse = (e) => {
      if (!entranceDone.current) return;
      if (window.scrollY < window.innerHeight) {
        const rotY = (e.clientX / window.innerWidth - 0.5) * 60;
        const rotX = (e.clientY / window.innerHeight - 0.5) * -60;
        gsap.to(cubeRef.current, {
          rotateY: rotY + 45,
          rotateX: rotX - 20,
          duration: 1.5,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', handleMouse);

    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to(containerRef.current, { opacity: 0, y: 200, rotateZ: 45, duration: 1 }),
    });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      st.kill();
    };
  }, [reduced]);

  if (reduced) return null;

  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        ref={cubeRef}
        className={styles.cube}
        onAnimationEnd={() => { entranceDone.current = true; }}
      >
        {faces.map((face) => (
          <div key={face} className={`${styles.face} ${styles[face]}`} />
        ))}
      </div>
    </div>
  );
}
