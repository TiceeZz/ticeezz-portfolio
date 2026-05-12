import s from '../sections/Resume.module.css';

export default function TimelineRow({ entry }) {
  return (
    <div className={s.row}>
      <div className={s.left}>
        <div className={s.year}>{entry.year}</div>
        <div className={s.tag}>{entry.tag}</div>
      </div>
      <div className={s.right}>
        <h3 className={s.title}>{entry.title}</h3>
        <p className={s.desc} dangerouslySetInnerHTML={{ __html: entry.desc }} />
        <div className={s.keywords}>
          {entry.keywords.map((kw) => (
            <span key={kw}>{kw}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
