import { useState } from 'react';
import { allProjects } from '../../data/gallery';
import { useWM } from '../WindowManager';
import { sfx } from '../sound';

const groups = [
  { label: 'C:/Works/Latest', items: allProjects.slice(0, 1) },
  { label: 'C:/Works/Postgraduate (2022-2025)', items: allProjects.slice(1, 6) },
  { label: 'C:/Works/Undergraduate (2018-2022)', items: allProjects.slice(6) },
];

export default function WorksApp() {
  const { openApp } = useWM();
  const [selected, setSelected] = useState(null);

  function open(p) {
    openApp('project', { title: `${p.title}.proj`, project: p });
  }

  return (
    <div className="os-works">
      <div className="os-works__toolbar">
        <span>{allProjects.length} 个文件</span>
        <span className="os-works__hint">单击选中 / 双击打开</span>
      </div>
      {groups.map((g) => (
        <div key={g.label} className="os-works__group">
          <div className="os-works__path">{g.label}</div>
          <div className="os-works__grid">
            {g.items.map((p) => (
              <button
                key={p.num}
                className={`os-file ${selected === p.num ? 'is-selected' : ''}`}
                onClick={() => { sfx.click(); setSelected(p.num); }}
                onDoubleClick={() => open(p)}
              >
                <span className="os-file__icon">
                  <img src={p.img} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </span>
                <span className="os-file__name">{p.title}</span>
                <span className="os-file__meta">{p.num}.proj</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
