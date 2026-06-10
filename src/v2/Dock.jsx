import { useWM } from './WindowManager';

export default function Dock() {
  const { apps, windows, openApp, restoreWindow, focusWindow } = useWM();
  const dockApps = apps.filter((a) => a.dock);

  function handleClick(app) {
    const win = windows.find((w) => w.appId === app.id);
    if (!win) return openApp(app.id);
    if (win.minimized) return restoreWindow(win.id);
    focusWindow(win.id);
  }

  return (
    <div className="os-dock">
      {dockApps.map((a) => {
        const win = windows.find((w) => w.appId === a.id);
        return (
          <button
            key={a.id}
            className={`os-dock__item ${win ? 'is-open' : ''} ${win?.minimized ? 'is-min' : ''}`}
            onClick={() => handleClick(a)}
            title={a.label}
            style={{ '--icon-accent': a.accent }}
          >
            <span aria-hidden>{a.icon}</span>
            <i className="os-dock__dot" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
