import s from './AIChat.module.css';

export default function AIFab({ onClick }) {
  return (
    <button className={s.fab} onClick={onClick} aria-label="Open AI Assistant">
      <div className={s.core} />
      <div className={s.ring} style={{ '--angle': '0deg', '--speed': '3s', '--size': '40px' }} />
      <div className={s.ring} style={{ '--angle': '60deg', '--speed': '4s', '--size': '40px' }} />
      <div className={s.ring} style={{ '--angle': '-60deg', '--speed': '5s', '--size': '40px' }} />
      <div className={s.ring} style={{ '--angle': '30deg', '--speed': '3.5s', '--size': '28px' }} />
      <div className={s.ring} style={{ '--angle': '-30deg', '--speed': '4.5s', '--size': '28px' }} />
      <div className={s.beam} style={{ '--angle': '0deg', '--speed': '8s' }} />
      <div className={s.beam} style={{ '--angle': '120deg', '--speed': '8s' }} />
      <div className={s.beam} style={{ '--angle': '240deg', '--speed': '8s' }} />
    </button>
  );
}
