import s from './SectionHeader.module.css';

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className={s.header} style={{ marginBottom: subtitle ? undefined : '40px' }}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
