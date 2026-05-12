import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursor } from './CursorContext';
import styles from './Cursor.module.css';

export default function CursorDot() {
  const { x, y } = useCursor();
  const dotRef = useRef(null);

  useEffect(() => {
    gsap.to(dotRef.current, { x, y, duration: 0 });
  }, [x, y]);

  return <div ref={dotRef} className={styles.dot} />;
}
