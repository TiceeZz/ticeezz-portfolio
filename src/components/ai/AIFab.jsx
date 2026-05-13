import s from './AIChat.module.css';

export default function AIFab({ onClick }) {
  return (
    <button className={s.fab} onClick={onClick} aria-label="Open AI Assistant">
      <div className={s.orb}>
        <div className={s.orbInner} />
        <div className={s.ring1} />
        <div className={s.ring2} />
      </div>
    </button>
  );
}
