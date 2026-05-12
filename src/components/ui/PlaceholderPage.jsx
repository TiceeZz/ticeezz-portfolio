import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)',
      color: '#fff', gap: '20px', padding: '0 8%',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px' }}>{title}</h1>
      <p style={{ color: 'var(--text-sub)', fontSize: '1rem' }}>页面内容即将更新，敬请期待。</p>
      <Link to="/" style={{
        marginTop: '20px', padding: '12px 32px', border: '1px solid var(--ray-cyan)',
        color: 'var(--ray-cyan)', borderRadius: '4px', textDecoration: 'none',
        fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase',
      }}>
        Back to Home
      </Link>
    </div>
  );
}
