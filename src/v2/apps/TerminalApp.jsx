import { useState, useRef, useEffect } from 'react';
import { allProjects } from '../../data/gallery';
import { useWM } from '../WindowManager';
import { sfx } from '../sound';

const HELP = [
  '可用命令：',
  '  help        显示本帮助',
  '  whoami      关于 TiceeZz',
  '  works       列出全部作品',
  '  open <编号>  打开作品（如 open 000）',
  '  skills      启动系统监视器',
  '  resume      打开简历',
  '  chat        召唤 AI 助手',
  '  contact     联系方式',
  '  theme       切换亮/暗主题',
  '  clear       清屏',
  '  reboot      重启系统',
];

export default function TerminalApp() {
  const { openApp } = useWM();
  const [lines, setLines] = useState([
    'TiceeZz OS [Version 2.0.26]',
    '(c) 1999-2026 TiceeZz Studio. 输入 help 查看命令。',
    '',
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  function print(...out) {
    setLines((p) => [...p, ...out]);
  }

  function run(raw) {
    const cmd = raw.trim();
    print(`C:\\TICEEZZ> ${cmd}`);
    if (!cmd) return;
    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case 'help':
        print(...HELP, '');
        break;
      case 'whoami':
        print(
          'TiceeZz（童宗震）— UX / 产品 / 服务 / AI 驱动设计',
          '东华大学 艺术设计硕士 · 四川农业大学 产品设计学士 (RANK 1/121)',
          '坐标：上海长宁',
          ''
        );
        break;
      case 'works':
        print(...allProjects.map((p) => `  [${p.num}] ${p.title} — ${p.desc}`), '', '使用 open <编号> 打开作品。', '');
        break;
      case 'open': {
        const p = allProjects.find((x) => x.num === args[0]);
        if (p) {
          openApp('project', { title: `${p.title}.proj`, project: p });
          print(`正在打开 ${p.title} ...`, '');
        } else {
          sfx.error();
          print(`错误：找不到编号 "${args[0] ?? ''}" 的作品。试试 works 查看列表。`, '');
        }
        break;
      }
      case 'skills':
        openApp('skills');
        print('正在启动 Skills.exe ...', '');
        break;
      case 'resume':
        openApp('resume');
        print('正在打开 Resume.pdf ...', '');
        break;
      case 'chat':
        openApp('chat');
        print('正在连接 TICEEZZ_BOT ...', '');
        break;
      case 'contact':
        print('EMAIL: 1027208320@qq.com', 'TEL:   +86 199 7467 7449 / 180 8063 1096', 'LOC:   上海 长宁区', '');
        break;
      case 'theme':
        window.dispatchEvent(new CustomEvent('os-theme-toggle'));
        print('主题已切换。', '');
        break;
      case 'clear':
        setLines([]);
        break;
      case 'reboot':
        window.dispatchEvent(new CustomEvent('os-reboot'));
        break;
      case 'sudo':
        sfx.error();
        print('权限不足：这台机器的管理员是 TiceeZz 本人 :)', '');
        break;
      case 'exit':
        print('没有出口。你已经是这个系统的一部分了。', '');
        break;
      default:
        sfx.error();
        print(`'${name}' 不是内部或外部命令。输入 help 查看可用命令。`, '');
    }
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      run(input);
      if (input.trim()) setHistory((p) => [...p, input]);
      setHistIdx(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(idx); setInput(history[idx]); }
    } else {
      sfx.key();
    }
  }

  return (
    <div className="os-terminal" onClick={() => inputRef.current?.focus()}>
      <div className="os-terminal__body" ref={bodyRef}>
        {lines.map((l, i) => <div key={i} className="os-terminal__line">{l || '\u00A0'}</div>)}
        <div className="os-terminal__prompt">
          <span>C:\TICEEZZ&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
