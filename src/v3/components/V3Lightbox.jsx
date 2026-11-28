import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Interactive Lightbox for V3 Case Studies & Beyond Galleries.
 * Supports:
 * - Keyboard navigation (Escape, ArrowLeft, ArrowRight)
 * - Touch swipe left/right to switch slides
 * - Double-click / double-tap or button toggle for 2x zoom + drag-to-pan
 */
export default function V3Lightbox({ images, index, title, onClose, onIndexChange }) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const zoomed = scale > 1.02;
  const dragStartRef = useRef({ px: 0, py: 0, ox: 0, oy: 0 });
  const touchStartRef = useRef({ x: 0, y: 0, time: 0, multiTouch: false });
  const pinchRef = useRef({ active: false, startDist: 0, startScale: 1 });
  const lastTapRef = useRef(0);

  const total = images?.length || 0;

  const clampPan = useCallback((nx, ny, s) => {
    if (s <= 1.02) return { x: 0, y: 0 };
    const factor = (s - 1) * 0.52;
    const limitX = Math.max(120, window.innerWidth * factor);
    const limitY = Math.max(100, window.innerHeight * factor);
    return {
      x: Math.max(-limitX, Math.min(limitX, nx)),
      y: Math.max(-limitY, Math.min(limitY, ny)),
    };
  }, []);

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
    setScale(1);
    setPan({ x: 0, y: 0 });
    setDragging(false);
    pinchRef.current.active = false;
  }, [index]);

  // Lock body scroll & bind keyboard
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (zoomed) {
          setScale(1);
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
    setScale((prev) => {
      if (prev > 1.02) {
        setPan({ x: 0, y: 0 });
        return 1;
      }
      return 2;
    });
  }, []);

  // Pointer drag when zoomed in (single pointer only; yields cleanly to 2-finger pinch)
  const onPointerDown = (e) => {
    if (!zoomed || pinchRef.current.active) return;
    if (e.pointerType === 'mouse') e.preventDefault();
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
    if (!dragging || !zoomed || pinchRef.current.active) return;
    const dx = e.clientX - dragStartRef.current.px;
    const dy = e.clientY - dragStartRef.current.py;
    setPan(clampPan(dragStartRef.current.ox + dx, dragStartRef.current.oy + dy, scale));
  };

  const onPointerUp = () => {
    setDragging(false);
  };

  // Touch: 2-finger pinch-to-zoom (1x..3x) + 1-finger swipe when unzoomed + double-tap toggle
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      pinchRef.current = { active: true, startDist: Math.max(20, dist), startScale: scale };
      touchStartRef.current.multiTouch = true;
      setDragging(false);
      return;
    }
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now(), multiTouch: false };
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && pinchRef.current.active) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      const nextScale = Math.max(
        1,
        Math.min(3, pinchRef.current.startScale * (dist / pinchRef.current.startDist))
      );
      setScale(nextScale);
      if (nextScale <= 1.02) {
        setPan({ x: 0, y: 0 });
      } else {
        setPan((prev) => clampPan(prev.x, prev.y, nextScale));
      }
    }
  };

  const onTouchEnd = (e) => {
    if (e.touches.length < 2 && pinchRef.current.active) {
      pinchRef.current.active = false;
      setScale((prev) => (prev < 1.08 ? 1 : prev));
      if (scale < 1.08) setPan({ x: 0, y: 0 });
      return;
    }
    if (touchStartRef.current.multiTouch || e.changedTouches.length !== 1) return;
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
        className={`v3-lightbox__stage${zoomed ? ' is-zoomed' : ''}${dragging || pinchRef.current.active ? ' is-dragging' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
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
                ? `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale.toFixed(3)})`
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
            ? '单指拖拽查看细节 · 双指或双击还原'
            : '左右滑动切页 · 双指捏合或双击放大'
          : zoomed
            ? '拖拽查看细节 · 双击或按 Esc 还原'
            : '双击放大 2× · 支持左右滑动或方向键切页'}
      </div>
    </div>
  );
}
