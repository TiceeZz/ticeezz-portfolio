import { VfIcon } from './VfIcon';

const ICONS = [
  { name: 'copy', label: '文案' },
  { name: 'product', label: '产品' },
  { name: 'scene', label: '场景' },
  { name: 'layers', label: '分层' },
  { name: 'lockArea', label: '锁定区域' },
  { name: 'margin', label: '边距' },
  { name: 'annotate', label: '批注' },
  { name: 'check', label: '用语检查' },
  { name: 'candidates', label: '方案' },
  { name: 'diff', label: '对比' },
  { name: 'approve', label: '审核通过' },
  { name: 'export', label: '多尺寸' },
];

export default function VeriframeBrandPlate() {
  return (
    <div className="vf-brand" role="region" aria-label="澄矩 品牌标志与图形语法推演">
      <span className="vf-brand__cm is-tl" aria-hidden="true" />
      <span className="vf-brand__cm is-tr" aria-hidden="true" />
      <span className="vf-brand__cm is-bl" aria-hidden="true" />
      <span className="vf-brand__cm is-br" aria-hidden="true" />

      <div className="vf-brand__grid">
        <div className="vf-brand__col">
          <p className="vf-brand__kicker">
            <b>00</b>
            <span>标志</span>
          </p>
          <h2 className="vf-brand__heading">
            澄矩，
            <br />
            名字就是标志。
          </h2>

          <div className="vf-brand__chars">
            <div className="vf-brand__char">
              <span className="vf-brand__glyph">澄</span>
              <div>
                <strong>水静而清</strong>
                <p>把不确定、有风险的东西沉下去，让画面干净、可信。对应 Verify。</p>
              </div>
            </div>
            <div className="vf-brand__char">
              <span className="vf-brand__glyph">矩</span>
              <div>
                <strong>曲尺与方框</strong>
                <p>木匠校准直角的工具，引申为规矩、画框。对应 Frame。</p>
              </div>
            </div>
          </div>
        </div>

        <div className="vf-brand__col vf-brand__center">
          <div className="vf-brand__board" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="vf-brand__board-grid">
              <g stroke="currentColor" strokeWidth="0.14">
                <path d="M8 0v64M16 0v64M24 0v64M32 0v64M40 0v64M48 0v64M56 0v64M0 8h64M0 16h64M0 24h64M0 32h64M0 40h64M0 48h64M0 56h64" />
              </g>
              <path
                d="M0 0L64 64"
                className="vf-brand__board-diag"
                strokeWidth="0.16"
                strokeDasharray="0.7 0.7"
              />
            </svg>
            <svg viewBox="0 0 64 64" className="vf-brand__board-mark" fill="none" strokeLinecap="square">
              <path d="M9 29V9h20" stroke="currentColor" strokeWidth="5.5" />
              <path d="M55 35v20H35" stroke="currentColor" strokeWidth="5.5" />
              <path d="M20 32h24" style={{ stroke: 'var(--vf-accent)' }} strokeWidth="5.5" />
            </svg>
          </div>
          <p className="vf-brand__caption">
            两把曲尺对角围出一个方框，中间一条静止的水平线。8 × 8 网格，直角，方头线端。
          </p>
        </div>

        <div className="vf-brand__col">
          <p className="vf-brand__kicker">
            <b>→</b>
            <span>推演</span>
          </p>

          <div className="vf-brand__derives">
            <div className="vf-brand__derive">
              <span className="vf-brand__vis" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" />
                  <rect x="7.5" y="7.5" width="9" height="9" style={{ fill: 'var(--vf-accent-soft)' }} stroke="none" />
                </svg>
              </span>
              <div>
                <strong>
                  曲尺 <em>→</em> 角标
                </strong>
                <p>校样的裁切标记、图片框、章节编号的括角。</p>
              </div>
            </div>

            <div className="vf-brand__derive">
              <span className="vf-brand__vis" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" strokeLinecap="square">
                  <path d="M4 9h16M4 13h10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 17.5h10" style={{ stroke: 'var(--vf-risk)' }} strokeWidth="2.1" />
                </svg>
              </span>
              <div>
                <strong>
                  水平线 <em>→</em> 标记
                </strong>
                <p>违规用语的下划线、分隔线和四步进度。</p>
              </div>
            </div>

            <div className="vf-brand__derive">
              <span className="vf-brand__vis" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" strokeLinecap="square">
                  <path d="M5 10V5h5" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
                  <path d="M7.5 12.5l3 3 6-6.5" style={{ stroke: 'var(--vf-accent)' }} strokeWidth="2.1" />
                </svg>
              </span>
              <div>
                <strong>
                  曲尺转 45° <em>→</em> 通过
                </strong>
                <p>对勾就是转过来的同一把尺子。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vf-brand__icons">
        {ICONS.map(({ name, label }) => (
          <div key={name} className="vf-brand__icon-cell">
            <VfIcon name={name} size={26} strokeWidth={1.6} accent="var(--vf-accent)" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
