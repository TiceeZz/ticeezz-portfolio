import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setSoundEnabled } from './sound';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function MenuBar({ theme, onToggleTheme }) {
  const now = useClock();
  const [sound, setSound] = useState(true);

  function toggleSound() {
    const v = !sound;
    setSound(v);
    setSoundEnabled(v);
  }

  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', weekday: 'short' });

  return (
    <div className="os-menubar">
      <div className="os-menubar__brand">
        <span className="os-menubar__logo">▣</span>
        <b>TICEEZZ OS</b>
        <span className="os-menubar__ver">v2.0</span>
      </div>
      <div className="os-menubar__right">
        <Link to="/" className="os-menubar__item" title="返回当前主打 V3 主站">V3 主站 ↗</Link>
        <Link to="/v1" className="os-menubar__item" title="查看经典初版 v1">v1 ↗</Link>
        <button className="os-menubar__item" onClick={toggleSound} title="音效开关">
          {sound ? 'SND:ON' : 'SND:OFF'}
        </button>
        <button className="os-menubar__item" onClick={onToggleTheme} title="切换主题">
          {theme === 'dark' ? '◐ DARK' : '◑ LIGHT'}
        </button>
        <span className="os-menubar__clock">{date} {time}</span>
      </div>
    </div>
  );
}
