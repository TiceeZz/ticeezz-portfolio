import { useState, useEffect, useCallback } from 'react';
import { WindowManagerProvider, useWM } from './WindowManager';
import Window from './Window';
import Desktop from './Desktop';
import MenuBar from './MenuBar';
import Dock from './Dock';
import BootScreen from './BootScreen';
import ContextMenu from './ContextMenu';
import AboutApp from './apps/AboutApp';
import WorksApp from './apps/WorksApp';
import ProjectViewer from './apps/ProjectViewer';
import ResumeApp from './apps/ResumeApp';
import SkillsApp from './apps/SkillsApp';
import GalleryApp from './apps/GalleryApp';
import ChatApp from './apps/ChatApp';
import TerminalApp from './apps/TerminalApp';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './os.css';

const APPS = [
  { id: 'about', label: 'About.txt', title: 'About.txt — 记事本', icon: '📄', accent: '#ff5c00', x: 140, y: 70, w: 620, h: 560, dock: true, component: AboutApp },
  { id: 'works', label: 'Works', title: 'Works — 文件管理器', icon: '🗂', accent: '#0057ff', x: 200, y: 60, w: 760, h: 600, dock: true, component: WorksApp },
  { id: 'resume', label: 'Resume.pdf', title: 'Resume.pdf — 文档查看器', icon: '📑', accent: '#ff5c00', x: 180, y: 50, w: 720, h: 640, dock: true, component: ResumeApp },
  { id: 'skills', label: 'Skills.exe', title: 'Skills.exe — 系统监视器', icon: '📊', accent: '#00c853', x: 260, y: 90, w: 640, h: 560, dock: true, component: SkillsApp },
  { id: 'gallery', label: 'Gallery', title: 'Gallery — 照片查看器', icon: '🖼', accent: '#e91e8c', x: 240, y: 100, w: 680, h: 560, dock: true, component: GalleryApp },
  { id: 'chat', label: 'AI Chat', title: 'AI CHAT — TICEEZZ_BOT', icon: '💬', accent: '#0057ff', x: 320, y: 80, w: 480, h: 600, dock: true, component: ChatApp },
  { id: 'terminal', label: 'Terminal', title: 'Terminal — C:\\TICEEZZ', icon: '⌨', accent: '#111111', x: 300, y: 130, w: 640, h: 440, dock: true, component: TerminalApp },
  { id: 'project', label: 'Project', icon: '📦', accent: '#ff5c00', x: 220, y: 70, w: 680, h: 560, desktop: false, dock: false, multi: true, component: ProjectViewer },
];

function OSShell() {
  const { windows, openApp, closeAll } = useWM();
  const [theme, setTheme] = useState(() => localStorage.getItem('ticeezz-os-theme') || 'light');
  const [menu, setMenu] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [booting, setBooting] = useState(true);
  const fastBoot = sessionStorage.getItem('ticeezz-os-booted') === '1';

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      localStorage.setItem('ticeezz-os-theme', next);
      return next;
    });
  }, []);

  const reboot = useCallback(() => {
    closeAll();
    sessionStorage.removeItem('ticeezz-os-booted');
    setBooting(true);
  }, [closeAll]);

  useEffect(() => {
    window.addEventListener('os-theme-toggle', toggleTheme);
    window.addEventListener('os-reboot', reboot);
    return () => {
      window.removeEventListener('os-theme-toggle', toggleTheme);
      window.removeEventListener('os-reboot', reboot);
    };
  }, [toggleTheme, reboot]);

  const onBootDone = useCallback(() => {
    sessionStorage.setItem('ticeezz-os-booted', '1');
    setBooting(false);
    // welcome window
    setTimeout(() => openApp('about'), 350);
  }, [openApp]);

  function onContextMenu(e) {
    if (e.target.closest('.os-window') || e.target.closest('input, textarea, a')) return;
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }

  const ctxItems = [
    { label: '打开 Terminal', hint: '>_', action: () => openApp('terminal') },
    { label: '召唤 AI 助手', hint: 'bot', action: () => openApp('chat') },
    '---',
    { label: '切换主题', hint: theme === 'light' ? '→ dark' : '→ light', action: toggleTheme },
    { label: '整理图标', action: () => setResetSignal((n) => n + 1) },
    '---',
    { label: '关于本机', action: () => openApp('about') },
    { label: '重启系统', hint: 'reboot', action: reboot },
  ];

  return (
    <div className="v2os" data-theme={theme} onContextMenu={onContextMenu}>
      {booting && <BootScreen onDone={onBootDone} fast={fastBoot} />}

      <div className="os-wallpaper" aria-hidden>
        <span className="os-wallpaper__type">TICEEZZ</span>
        <span className="os-wallpaper__sub">UX · PRODUCT · AI-DRIVEN DESIGN — EST.1999 SHANGHAI</span>
        <span className="os-wallpaper__grid" />
      </div>

      <MenuBar theme={theme} onToggleTheme={toggleTheme} />
      <Desktop resetSignal={resetSignal} />

      {windows.map((w) => {
        const app = APPS.find((a) => a.id === w.appId);
        if (!app) return null;
        const Comp = app.component;
        return (
          <Window key={w.id} win={w}>
            <Comp {...w.props} />
          </Window>
        );
      })}

      <Dock />
      <ContextMenu menu={menu} onClose={() => setMenu(null)} items={ctxItems} />
      <div className="os-scanlines" aria-hidden />
    </div>
  );
}

export default function OSPage() {
  useDocumentTitle(
    'TiceeZz OS | UX · Product · AI Design',
    'TiceeZz OS — 一台关于童宗震的虚拟电脑。Brutalist OS 风格交互作品集。'
  );
  return (
    <WindowManagerProvider apps={APPS}>
      <OSShell />
    </WindowManagerProvider>
  );
}
