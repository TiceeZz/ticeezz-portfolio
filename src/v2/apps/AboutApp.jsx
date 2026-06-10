export default function AboutApp() {
  return (
    <div className="os-about">
      <pre className="os-about__ascii" aria-hidden>{String.raw`
 _____ _            ______    
|_   _(_) ___ ___  |__  /____ 
  | | | |/ __/ _ \   / /|_  / 
  | | | | (_|  __/  / /_ / /  
  |_| |_|\___\___| /____/___| `}</pre>
      <h1 className="os-about__name">TiceeZz <span>童宗震 / TONG ZONGZHEN</span></h1>
      <p className="os-about__role">用户体验 / 产品 / 服务 / AI 驱动设计</p>

      <dl className="os-about__meta">
        <div><dt>BIRTH / LOCATION</dt><dd>1999.02.20 · 上海长宁</dd></div>
        <div><dt>EDUCATION</dt><dd>东华大学 (MA) · 四川农业大学 (BA) RANK 1/121</dd></div>
        <div><dt>CONTACT</dt><dd>+86 199 7467 7449 / 180 8063 1096</dd></div>
        <div><dt>EMAIL</dt><dd><a href="mailto:1027208320@qq.com">1027208320@qq.com</a></dd></div>
        <div><dt>LANGUAGE</dt><dd>英语: 日常 / 工作 / 文献</dd></div>
      </dl>

      <p className="os-about__note">
        ► 提示：双击桌面上的 <b>Works</b> 查看全部作品，打开 <b>Terminal</b> 输入 <code>help</code> 解锁更多玩法。
      </p>
    </div>
  );
}
