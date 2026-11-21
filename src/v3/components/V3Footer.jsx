import { useState } from 'react';
import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';

export default function V3Footer() {
  const [copied, setCopied] = useState('');

  const copyValue = (label, value) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <footer className="v3-footer">
      <div className="v3-footer__banner" aria-hidden="true">
        <KineticMarquee speed={52} direction={-1} velocityFactor={0.3} repeat={4}>
          <span className="v3-footer__mega">LET&apos;S CREATE SOMETHING ICONIC</span>
          <span className="v3-footer__mega-dot">✦</span>
          <span className="v3-footer__mega v3-footer__mega--outline">TICEEZZ · SHANGHAI</span>
          <span className="v3-footer__mega-dot">✦</span>
        </KineticMarquee>
      </div>

      <div className="v3-container v3-footer__body">
        <div className="v3-contact-chips">
          <button
            className="v3-contact-chip"
            onClick={() => copyValue('email', '1027208320@qq.com')}
          >
            <span className="v3-contact-chip__lbl">EMAIL</span>
            <strong>1027208320@qq.com</strong>
            <span className="v3-contact-chip__status">
              {copied === 'email' ? '已复制 ✓' : '复制'}
            </span>
          </button>

          <button
            className="v3-contact-chip"
            onClick={() => copyValue('phone', '+86 199 7467 7449')}
          >
            <span className="v3-contact-chip__lbl">PHONE</span>
            <strong>+86 199 7467 7449</strong>
            <span className="v3-contact-chip__status">
              {copied === 'phone' ? '已复制 ✓' : '复制'}
            </span>
          </button>
        </div>

        <div className="v3-footer__right">
          <div className="v3-footer__links">
            <Link to="/">原版 v1</Link>
            <Link to="/v2">TiceeZz OS</Link>
          </div>
          <p className="v3-footer__copy">© 2026 TICEEZZ · SHANGHAI</p>
        </div>
      </div>
    </footer>
  );
}
