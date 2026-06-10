import { useRef, useEffect, useState } from 'react';
import { useWM } from './WindowManager';
import { sfx } from './sound';

export default function Window({ win, children }) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow, topZ } = useWM();
  const ref = useRef(null);
  const drag = useRef(null);
  const [closing, setClosing] = useState(false);

  const isTop = win.z === topZ;

  function startDrag(e) {
    if (win.maximized) return;
    if (e.target.closest('button')) return;
    e.preventDefault();
    focusWindow(win.id);
    const el = ref.current;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
    el.setPointerCapture?.(e.pointerId);

    const onMove = (ev) => {
      if (!drag.current) return;
      const nx = drag.current.ox + (ev.clientX - drag.current.sx);
      const ny = Math.max(0, drag.current.oy + (ev.clientY - drag.current.sy));
      el.style.left = nx + 'px';
      el.style.top = ny + 'px';
      drag.current.nx = nx;
      drag.current.ny = ny;
    };
    const onUp = () => {
      if (drag.current && drag.current.nx !== undefined) {
        moveWindow(win.id, drag.current.nx, drag.current.ny);
      }
      drag.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  function startResize(e) {
    if (win.maximized) return;
    e.preventDefault();
    e.stopPropagation();
    focusWindow(win.id);
    const el = ref.current;
    const start = { sx: e.clientX, sy: e.clientY, ow: win.w, oh: win.h };
    let nw = win.w;
    let nh = win.h;
    const onMove = (ev) => {
      nw = Math.max(320, start.ow + (ev.clientX - start.sx));
      nh = Math.max(220, start.oh + (ev.clientY - start.sy));
      el.style.width = nw + 'px';
      el.style.height = nh + 'px';
    };
    const onUp = () => {
      resizeWindow(win.id, nw, nh);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  function handleClose() {
    setClosing(true);
    setTimeout(() => closeWindow(win.id), 160);
  }

  // double-click title bar = maximize
  function handleTitleDouble() {
    sfx.click();
    toggleMaximize(win.id);
  }

  useEffect(() => {
    // keep style in sync when state-driven position changes (e.g. un-maximize)
    const el = ref.current;
    if (!el || win.maximized) return;
    el.style.left = win.x + 'px';
    el.style.top = win.y + 'px';
    el.style.width = win.w + 'px';
    el.style.height = win.h + 'px';
  }, [win.x, win.y, win.w, win.h, win.maximized]);

  return (
    <div
      ref={ref}
      className={[
        'os-window',
        win.maximized ? 'is-max' : '',
        win.minimized ? 'is-min' : '',
        isTop ? 'is-top' : '',
        closing ? 'is-closing' : '',
      ].join(' ')}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z, '--win-accent': win.accent || 'var(--os-accent)' }}
      onPointerDown={() => focusWindow(win.id)}
      role="dialog"
      aria-label={win.title}
    >
      <div className="os-window__bar" onPointerDown={startDrag} onDoubleClick={handleTitleDouble}>
        <span className="os-window__icon" aria-hidden>{win.icon}</span>
        <span className="os-window__title">{win.title}</span>
        <span className="os-window__stripes" aria-hidden />
        <div className="os-window__controls">
          <button title="最小化" onClick={() => minimizeWindow(win.id)}>_</button>
          <button title="最大化" onClick={() => { sfx.click(); toggleMaximize(win.id); }}>□</button>
          <button title="关闭" className="os-window__close" onClick={handleClose}>✕</button>
        </div>
      </div>
      <div className="os-window__body">{children}</div>
      <div className="os-window__resize" onPointerDown={startResize} aria-hidden>◢</div>
    </div>
  );
}
