import KineticMarquee from './KineticMarquee';
import { CAPABILITY_TRACKS } from '../data/v3Data';

export default function V3Capabilities() {
  return (
    <div id="v3-capabilities" className="v3-capabilities">
      <div className="v3-container">
        <div className="v3-section-head v3-section-head--compact">
          <div>
            <span className="v3-kicker">03 / CAPABILITIES</span>
            <h2 className="v3-section-title">核心能力</h2>
          </div>
          <div className="v3-cap-legend" aria-hidden="true">
            <span><i className="is-cobalt" />体验架构</span>
            <span><i className="is-sky" />AI 工作流</span>
            <span><i className="is-amber" />视觉与空间</span>
          </div>
        </div>
      </div>

      <div className="v3-cap-tracks">
        {CAPABILITY_TRACKS.map((track, idx) => (
          <KineticMarquee
            key={idx}
            speed={track.speed}
            direction={track.direction}
            velocityFactor={0.25}
            slowOnHover
            repeat={3}
            className={`v3-cap-marquee v3-cap-marquee--${track.tone}`}
          >
            {track.items.map((name) => (
              <div key={name} className="v3-cap-pill">
                <span className="v3-cap-pill__dot" />
                <span className="v3-cap-pill__name">{name}</span>
              </div>
            ))}
          </KineticMarquee>
        ))}
      </div>
    </div>
  );
}
