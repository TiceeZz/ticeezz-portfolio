import { useState, useRef, useEffect } from 'react';
import generateResponse from '../../data/chat-responses';
import s from './AIChat.module.css';

export default function AIChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '你好！我是 TiceeZz 的数字简历助手。你可以问我关于他的教育、技能矩阵、或 Beyond Design 中的作品。' },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    setTimeout(() => {
      const reply = generateResponse(text);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <>
      <div className={`${s.panel} ${open ? s.active : ''}`}>
        <div className={s.header}>
          <span>TICEEZZ AI ASSISTANT</span>
          <button onClick={onClose}>&#10005;</button>
        </div>
        <div className={s.body} ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`${s.msg} ${m.sender === 'ai' ? s.msgAi : s.msgUser}`} dangerouslySetInnerHTML={{ __html: m.text }} />
          ))}
        </div>
        <div className={s.footer}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="输入问题..." />
          <button onClick={handleSend}>
            <svg viewBox="0 0 24 24"><path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" /></svg>
          </button>
        </div>
      </div>
    </>
  );
}
