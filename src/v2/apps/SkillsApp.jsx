import { useEffect, useState } from 'react';
import skills from '../../data/skills';

export default function SkillsApp() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="os-skills">
      <div className="os-skills__head">
        <span>SYSTEM MONITOR — 能力占用率</span>
        <span className="os-skills__live">● LIVE</span>
      </div>
      {skills.map((cat) => (
        <div className="os-skills__cat" key={cat.category}>
          <h3>[{cat.category}]</h3>
          {cat.items.map((it) => (
            <div className="os-skills__row" key={it.name}>
              <div className="os-skills__label">
                <b>{it.name}</b>
                <span>{it.sub}</span>
              </div>
              <div className="os-skills__track">
                <div
                  className="os-skills__bar"
                  style={{ width: loaded ? it.level : '0%' }}
                />
              </div>
              <span className="os-skills__pct">{it.level}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
