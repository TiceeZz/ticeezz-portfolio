import { useState, useEffect, useCallback } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './LoadingScreen.module.css';

const MIN_DISPLAY = 2200;

export default function LoadingScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  const finish = useCallback(() => {
    setExiting(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(finish, 300);
      return () => clearTimeout(t);
    }

    let ready = false;
    const onReady = () => { ready = true; };

    if (document.readyState === 'complete') {
      ready = true;
    } else {
      window.addEventListener('load', onReady);
    }

    const start = performance.now();
    let raf;
    const check = () => {
      if (ready && performance.now() - start >= MIN_DISPLAY) {
        finish();
      } else {
        raf = requestAnimationFrame(check);
      }
    };
    raf = requestAnimationFrame(check);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onReady);
    };
  }, [reduced, finish]);

  return (
    <div className={`${styles.overlay}${exiting ? ` ${styles.exiting}` : ''}`}>
      <div className={styles.rays} />
      <div className={styles.glow} />
      <span className={styles.brand}>TiceeZz</span>
      <div className={styles.line} />
    </div>
  );
}
