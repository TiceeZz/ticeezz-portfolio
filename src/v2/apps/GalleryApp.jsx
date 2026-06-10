import marqueeCards from '../../data/marquee';

export default function GalleryApp() {
  return (
    <div className="os-gallery">
      <p className="os-gallery__intro">设计之外 — 手绘 / 生活 / 人像摄影</p>
      <div className="os-gallery__list">
        {marqueeCards.map((c) => (
          <a className="os-gallery__card" key={c.label} href={c.href} target="_blank" rel="noreferrer">
            <span className="os-gallery__imgwrap">
              <img src={c.img} alt={c.title} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </span>
            <span className="os-gallery__text">
              <small>{c.label}</small>
              <b>{c.title}</b>
              <p>{c.desc}</p>
              <em>双击查看完整系列 ↗</em>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
