import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrismSpiritMark from './PrismSpiritMark';
import { getWelcomePayload, generateV3Response } from '../data/v3AssistantEngine';
import './v3Assistant.css';

function renderRichText(text) {
  // Lightweight safe renderer: **bold**, `code`, line breaks
  const lines = String(text || '').split('\n');
  return lines.map((line, li) => {
    const tokens = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    let last = 0;
    let match;
    let ti = 0;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last) {
        tokens.push(<span key={`t-${li}-${ti++}`}>{line.slice(last, match.index)}</span>);
      }
      const raw = match[0];
      if (raw.startsWith('**')) {
        tokens.push(<strong key={`b-${li}-${ti++}`}>{raw.slice(2, -2)}</strong>);
      } else if (raw.startsWith('`')) {
        tokens.push(<code key={`c-${li}-${ti++}`}>{raw.slice(1, -1)}</code>);
      } else if (raw.startsWith('*')) {
        tokens.push(<em key={`e-${li}-${ti++}`}>{raw.slice(1, -1)}</em>);
      }
      last = regex.lastIndex;
    }
    if (last < line.length) {
      tokens.push(<span key={`t-${li}-${ti++}`}>{line.slice(last)}</span>);
    }
    return (
      <span key={`l-${li}`} className="v3-ai-line">
        {tokens.length ? tokens : '\u00A0'}
      </span>
    );
  });
}

export default function V3PrismAssistant({ theme = 'light', onThemeChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [hoverFab, setHoverFab] = useState(false);
  const [mood, setMood] = useState('idle');
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const [messages, setMessages] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
    const w = getWelcomePayload(location.pathname, isMobile);
    return [
      {
        id: 'welcome',
        role: 'bot',
        text: w.text,
        suggestions: w.suggestions,
      },
    ];
  });

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const streamTimerRef = useRef(null);
  const happyTimerRef = useRef(null);
  const fabRef = useRef(null);

  // Subtle eye tracking on FAB hover
  const handleFabMouseMove = useCallback((e) => {
    if (!fabRef.current) return;
    const rect = fabRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 1.4;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * 1.0;
    setEyeOffset({ x: dx, y: dy });
  }, []);

  const handleFabMouseLeave = useCallback(() => {
    setHoverFab(false);
    setEyeOffset({ x: 0, y: 0 });
  }, []);

  // Update welcome prompt only if user hasn't started chatting yet and navigated to a different case
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
        const w = getWelcomePayload(location.pathname, isMobile);
        return [{ id: 'welcome', role: 'bot', text: w.text, suggestions: w.suggestions }];
      }
      return prev;
    });
  }, [location.pathname]);

  // Auto-scroll messages smoothly
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Focus input on desktop only (avoid popping up mobile virtual keyboard over welcome chips) & Esc key to close
  useEffect(() => {
    if (!open) return;
    const isDesktopPointer =
      typeof window !== 'undefined' &&
      window.innerWidth >= 768 &&
      !window.matchMedia('(pointer: coarse)').matches;
    const t = isDesktopPointer ? setTimeout(() => inputRef.current?.focus(), 140) : null;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearInterval(streamTimerRef.current);
      clearTimeout(happyTimerRef.current);
    };
  }, []);

  const runAction = useCallback(
    (action, event) => {
      if (!action) return;
      if (action.type === 'theme' && typeof onThemeChange === 'function') {
        onThemeChange(action.value, event);
      } else if (action.type === 'navigate') {
        navigate(action.value);
        if (window.innerWidth < 768) setOpen(false);
      } else if (action.type === 'scroll') {
        const scrollNow = () => {
          const el = document.getElementById(action.value);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 68;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        };
        if (location.pathname !== '/' && location.pathname !== '/v3') {
          navigate('/');
          setTimeout(scrollNow, 260);
        } else {
          scrollNow();
        }
        if (window.innerWidth < 768) setOpen(false);
      } else if (action.type === 'copy') {
        navigator.clipboard?.writeText(action.value).catch(() => {});
        const key = `${action.label}-${action.value.slice(0, 12)}`;
        setCopiedKey(key);
        setTimeout(() => setCopiedKey((cur) => (cur === key ? '' : cur)), 2000);
      }
    },
    [location.pathname, navigate, onThemeChange]
  );

  const sendQuery = useCallback(
    (rawText) => {
      const text = (rawText ?? input).trim();
      if (!text || isStreaming) return;

      clearInterval(streamTimerRef.current);
      clearTimeout(happyTimerRef.current);

      const userMsgId = `u-${Date.now()}`;
      const botMsgId = `b-${Date.now() + 1}`;
      const reply = generateV3Response(text, { theme });

      setInput('');
      setIsStreaming(true);
      setMood('thinking');

      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: 'user', text },
        { id: botMsgId, role: 'bot', text: '', streaming: true },
      ]);

      // Execute any automatic page action cleanly (e.g. "切到深色主题")
      if (reply.autoAction) {
        setTimeout(() => runAction(reply.autoAction), 220);
      }

      // Smooth optical streaming reveal (instant feel, zero jank)
      const fullText = reply.text;
      let cursor = 0;
      const startDelay = 160;

      const kickoff = setTimeout(() => {
        streamTimerRef.current = setInterval(() => {
          cursor = Math.min(fullText.length, cursor + (fullText.length > 260 ? 7 : 5));
          const slice = fullText.slice(0, cursor);
          const done = cursor >= fullText.length;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? {
                    ...m,
                    text: slice,
                    streaming: !done,
                    ...(done
                      ? {
                          sources: reply.sources || [],
                          actions: reply.actions || [],
                          suggestions: reply.suggestions || [],
                        }
                      : {}),
                  }
                : m
            )
          );

          if (done) {
            clearInterval(streamTimerRef.current);
            setIsStreaming(false);
            setMood('happy');
            happyTimerRef.current = setTimeout(() => setMood('idle'), 1900);
          }
        }, 16);
      }, startDelay);

      return () => clearTimeout(kickoff);
    },
    [input, isStreaming, runAction, theme]
  );

  const handleReset = useCallback(() => {
    clearInterval(streamTimerRef.current);
    clearTimeout(happyTimerRef.current);
    setIsStreaming(false);
    setMood('idle');
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
    const w = getWelcomePayload(location.pathname, isMobile);
    setMessages([{ id: 'welcome', role: 'bot', text: w.text, suggestions: w.suggestions }]);
  }, [location.pathname]);

  const activeMood = isStreaming ? 'thinking' : mood === 'happy' ? 'happy' : hoverFab ? 'hover' : 'idle';
  const isSubpage = location.pathname !== '/' && location.pathname !== '/v3';

  return (
    <div
      className="v3-ai-root"
      data-open={open ? 'true' : 'false'}
      data-subpage={isSubpage ? 'true' : 'false'}
    >
      {/* Floating Optical Prism Trigger */}
      <button
        ref={fabRef}
        type="button"
        className={`v3-ai-fab${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHoverFab(true)}
        onMouseMove={handleFabMouseMove}
        onMouseLeave={handleFabMouseLeave}
        aria-label={open ? '关闭 Prism AI 导览助手' : '打开 Prism AI 导览助手'}
        aria-expanded={open}
      >
        <span className="v3-ai-fab__prism" aria-hidden="true">
          <PrismSpiritMark size={28} mood={open ? 'happy' : activeMood} eyeOffset={eyeOffset} />
        </span>
        <span className="v3-ai-fab__copy">
          <strong>Prism</strong>
          <span>问问关于我</span>
        </span>
      </button>

      {/* Frosted Optical Ice Assistant Drawer/Panel */}
      {open && (
        <div className="v3-ai-panel" role="dialog" aria-label="Prism 作品集 AI 导览助手">
          <div className="v3-ai-panel__hairline" aria-hidden="true" />

          <div className="v3-ai-head">
            <div className="v3-ai-head__brand">
              <div className="v3-ai-head__avatar">
                <PrismSpiritMark size={28} mood={activeMood} />
              </div>
              <div className="v3-ai-head__meta">
                <div className="v3-ai-head__title">
                  <span>PRISM</span>
                  <em>AI CONCIERGE</em>
                </div>
                <p>TiceeZz 作品集导览 · 2026.11 同步</p>
              </div>
            </div>

            <div className="v3-ai-head__ops">
              <button
                type="button"
                className="v3-ai-icon-btn"
                onClick={handleReset}
                title="清空对话"
                aria-label="清空对话"
              >
                ↺
              </button>
              <button
                type="button"
                className="v3-ai-icon-btn"
                onClick={() => setOpen(false)}
                title="关闭 (Esc)"
                aria-label="关闭助手"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="v3-ai-body" ref={bodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`v3-ai-msg is-${msg.role}`}>
                {msg.role === 'bot' && (
                  <div className="v3-ai-msg__badge" aria-hidden="true">
                    <PrismSpiritMark size={18} mood={msg.streaming ? 'thinking' : 'idle'} />
                  </div>
                )}

                <div className="v3-ai-msg__stack">
                  <div className={`v3-ai-bubble is-${msg.role}`}>
                    {msg.text ? (
                      renderRichText(msg.text)
                    ) : (
                      <span className="v3-ai-thinking" aria-label="正在整理回答">
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                    {msg.streaming && msg.text && <span className="v3-ai-caret" aria-hidden="true" />}
                  </div>

                  {/* Clickable Case Study Source Cards */}
                  {msg.sources?.length > 0 && (
                    <div className="v3-ai-sources">
                      {msg.sources.map((src) => (
                        <button
                          key={src.href}
                          type="button"
                          className="v3-ai-source-card"
                          onClick={() => runAction({ type: 'navigate', value: src.href })}
                        >
                          <span className="v3-ai-source-card__num">{src.num}</span>
                          <span className="v3-ai-source-card__info">
                            <strong>{src.title}</strong>
                            <em>{src.meta}</em>
                          </span>
                          <span className="v3-ai-source-card__go" aria-hidden="true">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Direct Page Control / Copy Action Pills */}
                  {msg.actions?.length > 0 && (
                    <div className="v3-ai-actions">
                      {msg.actions.map((act) => {
                        const key = `${act.label}-${(act.value || '').slice(0, 12)}`;
                        const isCopied = act.type === 'copy' && copiedKey === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            className={`v3-ai-action-btn${isCopied ? ' is-copied' : ''}`}
                            onClick={(e) => runAction(act, e)}
                          >
                            {isCopied ? '已复制 ✓' : act.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Contextual Follow-up Suggestions */}
                  {msg.suggestions?.length > 0 && (
                    <div className="v3-ai-chips">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="v3-ai-chip"
                          onClick={() => sendQuery(s)}
                          disabled={isStreaming}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            className="v3-ai-foot"
            onSubmit={(e) => {
              e.preventDefault();
              sendQuery();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="v3-ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="问他的项目、AI 工作流，或输入“切深色”..."
              disabled={isStreaming}
            />
            <button
              type="submit"
              className="v3-ai-send"
              disabled={!input.trim() || isStreaming}
              aria-label="发送"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
