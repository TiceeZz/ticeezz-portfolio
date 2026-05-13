import { useState, useEffect, useCallback } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './LoadingScreen.module.css';

const MIN_DISPLAY = 2000;

export default function LoadingScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  const finish = useCallback(() => {
    setExiting(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    if (reduced) {
      // Skip animation for reduced-motion users
      const t = setTimeout(finish, 400);
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
      const elapsed = performance.now() - start;
      if (ready && elapsed >= MIN_DISPLAY) {
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

  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

  return (
    <div className={`${styles.overlay}${exiting ? ` ${styles.exiting}` : ''}`}>
      <div className={styles.scene}>
        <div className={styles.cube}>
          {faces.map((face) => (
            <div key={face} className={`${styles.face} ${styles[face]}`} />
          ))}
        </div>
        <div className={styles.orbit}>
          {[1, 2, 3, 4].map((n) => <div key={n} className={styles.dot} />)}
        </div>
        <div className={styles.orbit}>
          {[1, 2, 3, 4].map((n) => <div key={n} className={styles.dot} />)}
        </div>
      </div>
      <p className={styles.brand}>TiceeZz</p>
      <div className={styles.progress}>
        <div className={styles.progressBar} />
      </div>
    </div>
  );
}
