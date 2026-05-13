import { useState, useRef, useEffect } from 'react';
import generateResponse, { initialSuggestions } from '../../data/chat-responses';
import s from './AIChat.module.css';

export default function AIChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '你好！我是 TiceeZz 的数字简历助手。你可以问我关于他的教育、技能矩阵、或 Beyond Design 中的作品。',
      suggestions: initialSuggestions,
    },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend(text) {
    const msg = text || input.trim();
    if (!msg) return;
    if (!text) setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: msg }]);
    setTimeout(() => {
      const reply = generateResponse(msg);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply.text, suggestions: reply.suggestions }]);
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
            <div key={i} className={`${s.msg} ${m.sender === 'ai' ? s.msgAi : s.msgUser}`}>
              <div dangerouslySetInnerHTML={{ __html: m.text }} />
              {m.suggestions && (
                <div className={s.suggestions}>
                  {m.suggestions.map((sug, j) => (
                    <button key={j} className={s.chip} onClick={() => handleSend(sug)} style={{ animationDelay: `${j * 80}ms` }}>
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={s.footer}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="输入问题或点击上方选项..." />
          <button onClick={() => handleSend()}>
            <svg viewBox="0 0 24 24"><path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" /></svg>
          </button>
        </div>
      </div>
    </>
  );
}
