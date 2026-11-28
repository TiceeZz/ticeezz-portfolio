import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Interactive Lightbox for V3 Case Studies & Beyond Galleries.
 * Supports:
 * - Keyboard navigation (Escape, ArrowLeft, ArrowRight)
 * - Touch swipe left/right to switch slides
 * - Double-click / double-tap or button toggle for 2x zoom + drag-to-pan
 */
export default function V3Lightbox({ images, index, title, onClose, onIndexChange }) {
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStartRef = useRef({ px: 0, py: 0, ox: 0, oy: 0 });
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const lastTapRef = useRef(0);

  const total = images?.length || 0;

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    onIndexChange(index > 0 ? index - 1 : total - 1);
  }, [index, total, onIndexChange]);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    onIndexChange(index < total - 1 ? index + 1 : 0);
  }, [index, total, onIndexChange]);

  // Reset zoom whenever slide changes
  useEffect(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setDragging(false);
  }, [index]);

  // Lock body scroll & bind keyboard
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (zoomed) {
          setZoomed(false);
          setPan({ x: 0, y: 0 });
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [zoomed, onClose, goPrev, goNext]);

  const toggleZoom = useCallback(() => {
    setZoomed((z) => {
      if (z) setPan({ x: 0, y: 0 });
      return !z;
    });
  }, []);

  // Pointer drag when zoomed in
  const onPointerDown = (e) => {
    if (!zoomed) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    dragStartRef.current = {
      px: e.clientX,
      py: e.clientY,
      ox: pan.x,
      oy: pan.y,
    };
  };

  const onPointerMove = (e) => {
    if (!dragging || !zoomed) return;
    const dx = e.clientX - dragStartRef.current.px;
    const dy = e.clientY - dragStartRef.current.py;
    const limitX = Math.max(160, window.innerWidth * 0.48);
    const limitY = Math.max(160, window.innerHeight * 0.48);
    setPan({
      x: Math.max(-limitX, Math.min(limitX, dragStartRef.current.ox + dx)),
      y: Math.max(-limitY, Math.min(limitY, dragStartRef.current.oy + dy)),
    });
  };

  const onPointerUp = () => {
    setDragging(false);
  };

  // Touch swipe when not zoomed + double-tap to zoom
  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (e.changedTouches.length !== 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;

    // Horizontal swipe to switch slide (when not zoomed)
    if (!zoomed && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25 && dt < 500) {
      if (dx < 0) goNext();
      else goPrev();
      return;
    }

    // Double-tap to zoom on touch devices
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12 && dt < 260) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        toggleZoom();
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    }
  };

  if (!images || index === null || index < 0 || index >= total) return null;

  return (
    <div className="v3-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="v3-lightbox__top" onClick={(e) => e.stopPropagation()}>
        <span className="v3-lightbox__title">
          {title} · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        <div className="v3-lightbox__tools">
          <button
            type="button"
            className={`v3-lightbox__zoom-btn${zoomed ? ' is-active' : ''}`}
            onClick={toggleZoom}
            aria-label={zoomed ? '还原比例' : '放大查看细节'}
          >
            {zoomed ? '还原 1×' : '放大 2×'}
          </button>
          <button
            type="button"
            className="v3-lightbox__close"
            onClick={onClose}
            aria-label="关闭灯箱"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        className={`v3-lightbox__stage${zoomed ? ' is-zoomed' : ''}${dragging ? ' is-dragging' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {total > 1 && (
          <button
            type="button"
            className="v3-lightbox__nav is-prev"
            onClick={goPrev}
            aria-label="上一张"
          >
            ←
          </button>
        )}

        <div
          className="v3-lightbox__img-wrap"
          onDoubleClick={toggleZoom}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={images[index]}
            alt={`${title} — ${index + 1}`}
            draggable={false}
            style={{
              transform: zoomed
                ? `translate3d(${pan.x}px, ${pan.y}px, 0) scale(2)`
                : 'translate3d(0, 0, 0) scale(1)',
            }}
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            className="v3-lightbox__nav is-next"
            onClick={goNext}
            aria-label="下一张"
          >
            →
          </button>
        )}
      </div>

      <div className="v3-lightbox__hint" onClick={(e) => e.stopPropagation()}>
        {typeof window !== 'undefined' &&
        (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)
          ? zoomed
            ? '单指拖拽查看细节 · 双击画面还原'
            : '左右滑动切页 · 双击画面放大 2×'
          : zoomed
            ? '拖拽查看细节 · 双击或按 Esc 还原'
            : '双击放大 2× · 支持左右滑动或方向键切页'}
      </div>
    </div>
  );
}
