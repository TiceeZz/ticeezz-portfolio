import KineticMarquee from './KineticMarquee';
import { CAPABILITY_TRACKS } from '../data/v3Data';

export default function V3Capabilities() {
  return (
    <div id="v3-capabilities" className="v3-capabilities">
      <div className="v3-container">
        <div className="v3-section-head">
          <div className="v3-section-head__left">
            <span className="v3-kicker">03 // CAPABILITY MATRIX</span>
            <h2 className="v3-section-title">
              跨界能力矩阵 <span className="v3-section-title-sub">NO ARBITRARY PERCENTAGES</span>
            </h2>
          </div>
          <div className="v3-section-head__right">
            <p className="v3-section-note">
              告别无意义的“95% 技能条”——以真实项目交付沉淀的三大能力轨道呈现工作流全貌，悬停可放慢阅读。
            </p>
          </div>
        </div>
      </div>

      <div className="v3-cap-tracks">
        {CAPABILITY_TRACKS.map((track, idx) => (
          <div key={track.label} className="v3-cap-row">
            <div className="v3-container v3-cap-row__label-wrap">
              <span className="v3-cap-row__label">{track.label}</span>
              <span className="v3-cap-row__dir">
                {track.direction < 0 ? '← FLOW LEFT' : 'FLOW RIGHT →'}
              </span>
            </div>

            <KineticMarquee
              speed={track.speed}
              direction={track.direction}
              velocityFactor={0.25}
              slowOnHover
              repeat={3}
              className={`v3-cap-marquee v3-cap-marquee--${idx}`}
            >
              {track.items.map((item) => (
                <div key={item.name} className="v3-cap-pill">
                  <span className="v3-cap-pill__dot" />
                  <span className="v3-cap-pill__name">{item.name}</span>
                  <span className="v3-cap-pill__note">{item.note}</span>
                </div>
              ))}
            </KineticMarquee>
          </div>
        ))}
      </div>
    </div>
  );
}
