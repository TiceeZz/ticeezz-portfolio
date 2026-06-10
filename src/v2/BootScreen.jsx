import { useEffect, useState, useRef } from 'react';
import { sfx } from './sound';

const BOOT_LINES = [
  'TICEEZZ BIOS v2.0.26 — (c) 1999-2026 TiceeZz Studio',
  'CPU: Creative Cortex @ 4.2THz ............ OK',
  'RAM: 128GB Imagination DDR9 .............. OK',
  'GPU: Aesthetic Engine RTX ................ OK',
  '',
  'Detecting design skills .................. [95%]',
  'Loading AI workflow modules .............. [88%]',
  'Mounting C:/Works (16 projects) .......... OK',
  'Mounting C:/Life (dogs, live, figures) ... OK',
  'Calibrating user empathy sensors ......... OK',
  '',
  'Starting TICEEZZ OS ...',
];

export default function BootScreen({ onDone, fast }) {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('post'); // post -> logo -> out
  const timers = useRef([]);

  useEffect(() => {
    const speed = fast ? 30 : 110;
    BOOT_LINES.forEach((l, i) => {
      timers.current.push(setTimeout(() => setLines((p) => [...p, l]), i * speed));
    });
    const total = BOOT_LINES.length * speed;
    timers.current.push(setTimeout(() => { setPhase('logo'); sfx.boot(); }, total + 200));
    timers.current.push(setTimeout(() => setPhase('out'), total + (fast ? 700 : 1300)));
    timers.current.push(setTimeout(onDone, total + (fast ? 1000 : 1700)));
    return () => timers.current.forEach(clearTimeout);
  }, [onDone, fast]);

  function skip() {
    timers.current.forEach(clearTimeout);
    onDone();
  }

  return (
    <div className={`os-boot ${phase === 'out' ? 'is-out' : ''}`} onClick={skip}>
      {phase === 'post' ? (
        <pre className="os-boot__post">
          {lines.join('\n')}
          <span className="os-boot__cursor">█</span>
        </pre>
      ) : (
        <div className="os-boot__logo">
          <span>TICEEZZ</span>
          <small>OPERATING SYSTEM</small>
        </div>
      )}
      <span className="os-boot__skip">点击任意处跳过</span>
    </div>
  );
}
