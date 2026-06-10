import { useState, useRef, useEffect } from 'react';
import generateResponse, { initialSuggestions } from '../../data/chat-responses';
import { sfx } from '../sound';

export default function ChatApp() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '你好！我是 TiceeZz 的数字简历助手 v2.0。你可以问我关于他的教育、技能矩阵、或作品集等问题。',
      suggestions: initialSuggestions,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  function send(text) {
    const msg = (text || input).trim();
    if (!msg) return;
    if (!text) setInput('');
    sfx.click();
    setMessages((p) => [...p, { sender: 'user', text: msg }]);
    setTyping(true);
    setTimeout(() => {
      const reply = generateResponse(msg);
      setTyping(false);
      setMessages((p) => [...p, { sender: 'ai', text: reply.text, suggestions: reply.suggestions }]);
    }, 700);
  }

  return (
    <div className="os-chat">
      <div className="os-chat__status">● TICEEZZ_BOT 在线 — 加密通道已建立</div>
      <div className="os-chat__body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`os-chat__msg ${m.sender === 'ai' ? 'is-ai' : 'is-user'}`}>
            <span className="os-chat__who">{m.sender === 'ai' ? 'BOT>' : 'YOU>'}</span>
            <div className="os-chat__bubble" dangerouslySetInnerHTML={{ __html: m.text }} />
            {m.suggestions && (
              <div className="os-chat__chips">
                {m.suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && <div className="os-chat__typing">BOT 正在输入<span>...</span></div>}
      </div>
      <div className="os-chat__input">
        <span>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="输入消息..."
        />
        <button onClick={() => send()}>SEND</button>
      </div>
    </div>
  );
}
