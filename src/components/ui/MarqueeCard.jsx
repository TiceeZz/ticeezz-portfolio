import { useNavigate } from 'react-router-dom';
import Picture from './Picture';
import s from '../sections/BeyondDesign.module.css';

const labelColorMap = {
  cardSketch: 'var(--ray-red)',
  cardLife: 'var(--ray-yellow)',
  cardPhoto: 'var(--ray-cyan)',
};

export default function MarqueeCard({ card }) {
  const navigate = useNavigate();

  return (
    <button
      className={`${s.card} ${card.className ? s[card.className] || '' : ''}`}
      onClick={() => navigate(card.href)}
      aria-label={`View ${card.title}: ${card.desc}`}
    >
      <Picture src={card.img} alt={card.title} loading="lazy" objectFit="cover"
        style={{ position: 'absolute', inset: 0, zIndex: -2 }}
        className={s.cardImg} />
      <div className={s.overlay} />
      <div className={s.cardInfo}>
        <span className={s.label} style={{ color: labelColorMap[card.className] || 'var(--ray-cyan)' }}>
          {card.label}
        </span>
        <h3>{card.title}</h3>
        <p>{card.desc}</p>
      </div>
    </button>
  );
}
