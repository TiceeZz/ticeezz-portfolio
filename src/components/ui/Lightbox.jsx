import s from './Lightbox.module.css';

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  if (index === null || !images || images.length === 0) return null;

  return (
    <div className={s.backdrop} onClick={onClose}>
      <button className={s.close} onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close lightbox">✕</button>

      <button className={s.prev} onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image">‹</button>

      <img src={images[index]} alt={`Page ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className={s.image} />

      <button className={s.next} onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image">›</button>

      <div className={s.counter}>{index + 1} / {images.length}</div>
    </div>
  );
}
