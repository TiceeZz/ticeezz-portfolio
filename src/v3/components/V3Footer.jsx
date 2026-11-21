import { useState } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';

export default function V3Footer() {
  const [copied, setCopied] = useState('');

  const copyValue = (label, value) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(''), 2200);
  };

  return (
    <footer className="v3-footer">
      {/* Giant Kinetic Closing Banner */}
      <div className="v3-footer__banner" aria-hidden="true">
        <KineticMarquee speed={56} direction={-1} velocityFactor={0.32} repeat={4}>
          <span className="v3-footer__mega">LET&apos;S BUILD SOMETHING ICONIC</span>
          <span className="v3-footer__mega-dot">✦</span>
          <span className="v3-footer__mega v3-footer__mega--outline">TICEEZZ STUDIO · SHANGHAI</span>
          <span className="v3-footer__mega-dot">✦</span>
        </KineticMarquee>
      </div>

      <div className="v3-container v3-footer__body">
        <div className="v3-footer__cta-block">
          <span className="v3-kicker">CONTACT // OPEN FOR OPPORTUNITIES</span>
          <h2 className="v3-footer__headline">
            有意思的产品、体验或 AI 实验，<br />随时聊聊。
          </h2>

          <div className="v3-contact-chips">
            <button
              className="v3-contact-chip"
              onClick={() => copyValue('email', '1027208320@qq.com')}
            >
              <span className="v3-contact-chip__lbl">EMAIL</span>
              <strong>1027208320@qq.com</strong>
              <span className="v3-contact-chip__status">
                {copied === 'email' ? '已复制 ✓' : '点击复制'}
              </span>
            </button>

            <button
              className="v3-contact-chip"
              onClick={() => copyValue('phone', '+86 199 7467 7449')}
            >
              <span className="v3-contact-chip__lbl">PHONE</span>
              <strong>+86 199 7467 7449</strong>
              <span className="v3-contact-chip__status">
                {copied === 'phone' ? '已复制 ✓' : '点击复制'}
              </span>
            </button>
          </div>
        </div>

        <div className="v3-footer__meta">
          <div className="v3-footer__editions">
            <span className="v3-footer__meta-title">PORTFOLIO EDITIONS</span>
            <Link to="/">Classic Quantum (v1 原版) ↗</Link>
            <Link to="/v2">TiceeZz OS (v2 虚拟桌面) ↗</Link>
            <span className="v3-footer__current">● Digital Showcase (v3 当前预览)</span>
          </div>

          <div className="v3-footer__info">
            <span className="v3-footer__meta-title">IDENTITY</span>
            <p>童宗震 · Tong Zongzhen (TiceeZz)</p>
            <p>上海 长宁 · UX / Product / AI-Driven Design</p>
            <p className="v3-footer__copy">© 2026 TICEEZZ STUDIO. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
