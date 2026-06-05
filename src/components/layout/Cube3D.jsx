import { useEffect, useRef, useState } from 'react';
import useAsyncGSAP from '../../hooks/useAsyncGSAP';
import styles from './Cube3D.module.css';

export default function Cube3D() {
  const cubeRef = useRef(null);
  const containerRef = useRef(null);
  const [flat, setFlat] = useState(true);
  const animating = useRef(true);
  const gst = useAsyncGSAP();

  useEffect(() => {
    let raf1, raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setFlat(false));
    });
    const t = setTimeout(() => { animating.current = false; }, 800);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!gst) return;
    const { gsap, ScrollTrigger } = gst;

    const handleMouse = (e) => {
      if (animating.current) return;
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
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      animation: gsap.to(containerRef.current, { y: 300, rotateZ: 90, opacity: 0.1 }),
    });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      st.kill();
    };
  }, [gst]);

  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={cubeRef} className={`${styles.cube}${flat ? ` ${styles.flat}` : ''}`}>
        {faces.map((face) => (
          <div key={face} className={`${styles.face} ${styles[face]}`} />
        ))}
      </div>
    </div>
  );
}
