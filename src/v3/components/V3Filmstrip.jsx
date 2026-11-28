import { useState } from 'react';
import { Link } from 'react-router-dom';
import useV3Reveal from '../useV3Reveal';
import KineticMarquee from './KineticMarquee';
import { CURATED_FILMSTRIP } from '../data/v3Data';

export default function V3Filmstrip() {
  const revealRef = useV3Reveal(0.1);
  const [isTouchMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
  );

  const cards = CURATED_FILMSTRIP.map((item, i) => (
    <Link key={i} to={item.href} className="v3-film-plate">
      <img src={item.img} alt={item.label} loading="lazy" decoding="async" />
      <div className="v3-film-plate__cap">
        <span>{item.cat}</span>
        <strong>{item.label} ↗</strong>
      </div>
    </Link>
  ));

  return (
    <div id="v3-beyond" className="v3-beyond">
      <div ref={revealRef} className="v3-container v3-beyond__head v3-reveal">
        <div>
          <span className="v3-kicker">04 / BEYOND DESIGN</span>
          <h2 className="v3-beyond__title">
            设计之外
            <span className="v3-hand-accent">Photography, Sketch &amp; Life</span>
          </h2>
        </div>

        <div className="v3-beyond__links">
          <Link to="/v3/beyond/photography">摄影 ↗</Link>
          <Link to="/v3/beyond/sketching">手绘 ↗</Link>
          <Link to="/v3/beyond/life">生活 ↗</Link>
        </div>
      </div>

      {isTouchMobile ? (
        <div className="v3-filmstrip-mobile" aria-label="横向滑动浏览摄影、手绘与生活切片">
          {cards}
        </div>
      ) : (
        <div className="v3-filmstrip-wrap">
          <KineticMarquee speed={30} direction={-1} velocityFactor={0.22} slowOnHover repeat={3}>
            {cards}
          </KineticMarquee>
        </div>
      )}
    </div>
  );
}
