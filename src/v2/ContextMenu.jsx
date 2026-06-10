import { useEffect } from 'react';
import { sfx } from './sound';

export default function ContextMenu({ menu, onClose, items }) {
  useEffect(() => {
    if (!menu) return;
    const close = () => onClose();
    window.addEventListener('pointerdown', close);
    window.addEventListener('blur', close);
    return () => {
      window.removeEventListener('pointerdown', close);
      window.removeEventListener('blur', close);
    };
  }, [menu, onClose]);

  if (!menu) return null;

  const x = Math.min(menu.x, window.innerWidth - 230);
  const y = Math.min(menu.y, window.innerHeight - items.length * 40 - 20);

  return (
    <ul className="os-ctxmenu" style={{ left: x, top: y }} onPointerDown={(e) => e.stopPropagation()}>
      {items.map((it, i) =>
        it === '---' ? (
          <li key={i} className="os-ctxmenu__sep" aria-hidden />
        ) : (
          <li key={i}>
            <button onClick={() => { sfx.click(); it.action(); onClose(); }}>
              <span>{it.label}</span>
              {it.hint && <small>{it.hint}</small>}
            </button>
          </li>
        )
      )}
    </ul>
  );
}
