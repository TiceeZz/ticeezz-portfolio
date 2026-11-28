import { useState } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import { RESUME_PDF_HREF, RESUME_DOWNLOAD_NAME } from '../data/v3Data';

export default function V3Footer() {
  const [copied, setCopied] = useState('');
  const revealRef = useV3Reveal(0.1);

  const copy = (key, val) => {
    navigator.clipboard?.writeText(val).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <footer className="v3-footer">
      <div ref={revealRef} className="v3-container v3-reveal">
        <div className="v3-footer__top">
          <div>
            <span className="v3-kicker">CONTACT · 联系方式</span>
            <h2 className="v3-footer__headline">
              欢迎交流与合作。
              <span className="v3-footer__sig">Let&apos;s connect</span>
            </h2>
          </div>

          <div className="v3-footer__contacts">
            <button
              className="v3-contact-line"
              onClick={() => copy('email', '1027208320@qq.com')}
            >
              <span>邮箱</span>
              <strong>1027208320@qq.com</strong>
              <em>{copied === 'email' ? '已复制 ✓' : '复制'}</em>
            </button>

            <button
              className="v3-contact-line"
              onClick={() => copy('wechat', 'TiceeZz')}
            >
              <span>微信</span>
              <strong>TiceeZz</strong>
              <em>{copied === 'wechat' ? '已复制 ✓' : '复制'}</em>
            </button>

            <a
              href={RESUME_PDF_HREF}
              download={RESUME_DOWNLOAD_NAME}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-contact-line"
            >
              <span>PDF 简历</span>
              <strong>童宗震 · UX 与 AI 产品设计简历</strong>
              <em>下载 ↓</em>
            </a>
          </div>
        </div>

        <div className="v3-footer__bottom">
          <span>© 2026 TICEEZZ · 童宗震 · 上海</span>
          <div className="v3-footer__editions">
            <span className="v3-footer__ed-label">历史版本</span>
            <Link to="/v1">初版 v1</Link>
            <span>/</span>
            <Link to="/v2">TiceeZz OS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
