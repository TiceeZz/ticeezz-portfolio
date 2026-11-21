import { Link } from 'react-router-dom';
import KineticMarquee from './KineticMarquee';
import { FILMSTRIP_TOP, FILMSTRIP_BOTTOM } from '../data/v3Data';

function FilmCard({ item }) {
  return (
    <Link to={item.href} className="v3-film-card">
      <img src={item.img} alt={item.label} loading="lazy" />
      <div className="v3-film-card__overlay">
        <span className="v3-film-card__cat">{item.category}</span>
        <span className="v3-film-card__lbl">{item.label} ↗</span>
      </div>
    </Link>
  );
}

export default function V3Filmstrip() {
  return (
    <div id="v3-beyond" className="v3-beyond">
      <div className="v3-container">
        <div className="v3-section-head">
          <div className="v3-section-head__left">
            <span className="v3-kicker">05 // BEYOND DESIGN</span>
            <h2 className="v3-section-title">设计之外的影像胶片</h2>
          </div>
          <div className="v3-section-head__right">
            <div className="v3-beyond__links">
              <Link to="/photography" className="v3-chip-link">人像摄影 ↗</Link>
              <Link to="/sketching" className="v3-chip-link">手绘草图 ↗</Link>
              <Link to="/life" className="v3-chip-link">生活切片 ↗</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Opposing Velocity-Reactive Cinema Filmstrips */}
      <div className="v3-filmstrips">
        <KineticMarquee speed={38} direction={-1} velocityFactor={0.28} slowOnHover repeat={3}>
          {FILMSTRIP_TOP.map((item, i) => (
            <FilmCard key={`top-${i}`} item={item} />
          ))}
        </KineticMarquee>

        <KineticMarquee speed={34} direction={1} velocityFactor={0.28} slowOnHover repeat={3}>
          {FILMSTRIP_BOTTOM.map((item, i) => (
            <FilmCard key={`bot-${i}`} item={item} />
          ))}
        </KineticMarquee>
      </div>
    </div>
  );
}
