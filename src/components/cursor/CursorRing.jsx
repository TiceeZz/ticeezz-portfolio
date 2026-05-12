import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursor } from './CursorContext';
import styles from './Cursor.module.css';

export default function CursorRing() {
  const { x: mx, y: my } = useCursor();
  const ringRef = useRef(null);
  const rx = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const ry = useRef(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const rafId = useRef(null);

  useEffect(() => {
    function render() {
      rx.current += (mx - rx.current) * 0.15;
      ry.current += (my - ry.current) * 0.15;
      gsap.set(ringRef.current, { x: rx.current - 20, y: ry.current - 20 });
      rafId.current = requestAnimationFrame(render);
    }
    rafId.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId.current);
  }, [mx, my]);

  return <div ref={ringRef} className={styles.ring} />;
}
