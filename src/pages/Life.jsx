import { Link } from 'react-router-dom';

function ImgCard({ src, alt }) {
  return (
    <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', display: 'block' }} />
    </div>
  );
}

export default function Life() {
  return (
    <div style={{ minHeight: '100vh', background: '#06080c', color: '#fff', overflowX: 'hidden' }}>
      <div style={{ padding: '30px 4% 0' }}>
        <Link to="/" style={{ color: 'var(--text-sub)', fontSize: '12px', letterSpacing: '3px', textDecoration: 'none', textTransform: 'uppercase' }}>← Back to Home</Link>
      </div>

      <header style={{ padding: '60px 6% 50px', maxWidth: '720px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '4px', color: 'var(--ray-cyan)', border: '1px solid var(--ray-cyan)', padding: '3px 12px', borderRadius: '3px', display: 'inline-block' }}>LIFE FRAGMENTS</span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, marginTop: '20px', letterSpacing: '-2px', lineHeight: 1 }}>Daily Inspiration</h1>
        <p style={{ color: 'var(--text-sub)', marginTop: '16px', fontSize: '1rem', lineHeight: 2, maxWidth: '560px' }}>
          设计之外的生活碎片——从音乐现场到二次元，从狗狗陪伴到手办收集，<strong style={{ color: '#fff' }}>保持好奇</strong>是设计师最重要的品质。
        </p>
      </header>

      <div style={{ maxWidth: '1100px', width: '100%', boxSizing: 'border-box', margin: '0 auto', padding: '0 4% 120px' }}>

        <section style={{ marginBottom: '72px', width: '100%' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, margin: '0 0 20px' }}>🐕 狗狗伙伴</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '10px', marginBottom: '14px', maxWidth: '100%' }}>
            <ImgCard src="/images/life/border-collie.jpg" alt="边牧" />
            <ImgCard src="/images/life/samoyed.jpg" alt="萨摩耶" />
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 2, maxWidth: '600px' }}>
            这是我的<strong style={{ color: '#fff' }}>边牧</strong>和遇到的<strong style={{ color: '#fff' }}>萨摩耶</strong>——经常与狗狗打交道，它们教会我耐心与观察。
          </p>
        </section>

        <section style={{ marginBottom: '72px', width: '100%' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, margin: '0 0 20px' }}>🎵 演出现场</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '10px', marginBottom: '14px', maxWidth: '100%' }}>
            <ImgCard src="/images/life/katy-perry.jpg" alt="Katy Perry" />
            <ImgCard src="/images/life/wolf-alice.jpg" alt="Wolf Alice" />
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 2, maxWidth: '600px' }}>
            热爱欧美音乐，享受<strong style={{ color: '#fff' }}>线下 LIVE 的沉浸能量</strong>——声光张力持续滋养着我对节奏与氛围的感知。
          </p>
        </section>

        <section style={{ marginBottom: '72px', width: '100%' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, margin: '0 0 20px' }}>🎭 COS 文化</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '10px', marginBottom: '14px', maxWidth: '100%' }}>
            <ImgCard src="/images/life/wuyang.jpg" alt="无漾" />
            <ImgCard src="/images/life/cos-wuyang.jpg" alt="COS 无漾" />
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 2, maxWidth: '600px' }}>
            偶尔进行<strong style={{ color: '#fff' }}>角色扮演（COS）</strong>——享受二次元文化中角色塑造与视觉表达的创造力。
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, margin: '0 0 20px' }}>🧸 手办收集</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginBottom: '14px' }}>
            <ImgCard src="/images/life/bangboo.jpg" alt="绝区零邦布" />
            <ImgCard src="/images/life/chimera.jpg" alt="崩铁奇美拉" />
            <ImgCard src="/images/life/luoke.jpg" alt="洛克王国" />
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 2, maxWidth: '600px' }}>
            喜欢收集<strong style={{ color: '#fff' }}>可爱手办</strong>——绝区零邦布、崩铁奇美拉、洛克王国宠物，桌面上触手可及的灵感玩伴。
          </p>
        </section>

      </div>
    </div>
  );
}
