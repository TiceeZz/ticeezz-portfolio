export default function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: subtitle ? '80px' : '40px' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '10px', color: '#fff' }}>{title}</h2>
      {subtitle && (
        <p style={{ fontSize: '11px', letterSpacing: '5px', color: 'var(--ray-cyan)', textTransform: 'uppercase' }}>{subtitle}</p>
      )}
    </div>
  );
}
