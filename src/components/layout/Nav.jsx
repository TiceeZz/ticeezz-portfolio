import { useCallback } from 'react';
import { Link } from 'react-router-dom';

function jump(y) {
  const el = document.documentElement;
  const prev = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  el.style.scrollBehavior = prev;
}

const anchors = [
  { label: 'Works', target: 'gallery' },
  { label: 'Resume', target: 'resume' },
  { label: 'Skills', target: 'skills' },
  { label: 'Beyond', target: 'beyond-design' },
];

export default function Nav() {
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      jump(y);
    }
  }, []);

  return (
    <nav>
      <div className="nav-brand">
        <button
          className="nav-logo-btn"
          onClick={() => jump(0)}
          aria-label="Scroll to top"
        >
          <div className="quantum-logo">
            <div className="quantum-core" />
          </div>
          <span className="nav-item" style={{ opacity: 1 }}>TICEEZZ STUDIO</span>
        </button>
      </div>
      <div className="nav-links">
        {anchors.map((a) => (
          <button key={a.target} className="nav-link" onClick={() => scrollTo(a.target)}>
            {a.label}
          </button>
        ))}
        <Link
          to="/"
          className="nav-link"
          style={{
            color: '#00f0ff',
            textDecoration: 'none',
            borderLeft: '1px solid rgba(255,255,255,0.16)',
            paddingLeft: '16px',
          }}
        >
          返回 V3 ↗
        </Link>
      </div>
    </nav>
  );
}
