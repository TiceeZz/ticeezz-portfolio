import { useRef, useState, useEffect } from 'react';
import { useWM } from './WindowManager';
import { sfx } from './sound';

const POS_KEY = 'ticeezz-os-icons-v1';

function defaultPositions(apps) {
  const pos = {};
  apps.forEach((a, i) => {
    pos[a.id] = { x: 24, y: 24 + i * 104 };
  });
  return pos;
}

export default function Desktop({ resetSignal }) {
  const { apps, openApp } = useWM();
  const desktopApps = apps.filter((a) => a.desktop !== false);
  const [positions, setPositions] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(POS_KEY));
      if (saved) return { ...defaultPositions(desktopApps), ...saved };
    } catch { /* ignore */ }
    return defaultPositions(desktopApps);
  });
  const [selected, setSelected] = useState(null);
  const dragInfo = useRef(null);

  useEffect(() => {
    if (resetSignal > 0) {
      localStorage.removeItem(POS_KEY);
      setPositions(defaultPositions(desktopApps));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  function startDrag(e, id) {
    const start = positions[id];
    dragInfo.current = { id, sx: e.clientX, sy: e.clientY, ox: start.x, oy: start.y, moved: false };
    const onMove = (ev) => {
      const d = dragInfo.current;
      if (!d) return;
      const dx = ev.clientX - d.sx;
      const dy = ev.clientY - d.sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
      if (d.moved) {
        setPositions((p) => ({ ...p, [d.id]: { x: Math.max(0, d.ox + dx), y: Math.max(0, d.oy + dy) } }));
      }
    };
    const onUp = () => {
      const d = dragInfo.current;
      if (d?.moved) {
        setPositions((p) => {
          localStorage.setItem(POS_KEY, JSON.stringify(p));
          return p;
        });
      }
      dragInfo.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  return (
    <div className="os-desktop__icons" onPointerDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
      {desktopApps.map((a) => (
        <button
          key={a.id}
          className={`os-icon ${selected === a.id ? 'is-selected' : ''}`}
          style={{ left: positions[a.id]?.x ?? 24, top: positions[a.id]?.y ?? 24, '--icon-accent': a.accent }}
          onPointerDown={(e) => { setSelected(a.id); startDrag(e, a.id); }}
          onClick={() => sfx.click()}
          onDoubleClick={() => openApp(a.id)}
        >
          <span className="os-icon__glyph" aria-hidden>{a.icon}</span>
          <span className="os-icon__label">{a.label}</span>
        </button>
      ))}
    </div>
  );
}
