/* Veriframe icon family, derived from the 澄矩 mark:
 * carpenter's-square corners, a still level line, right angles, square caps,
 * one heavier accent stroke per icon. */
const ICONS = {"mark": [{"p": "M3 10V3h7"}, {"p": "M21 14v7h-7"}, {"p": "M8 12h8", "a": 1}], "copy": [{"p": "M5 5h14"}, {"p": "M12 5v14"}, {"p": "M8.5 19.5h7", "a": 1, "w": 2.4}], "product": [{"r": [9.5, 3, 5, 3.5], "f": 1, "a": 1}, {"p": "M7.5 9h9v12h-9z"}, {"p": "M7.5 13.5h9"}], "scene": [{"p": "M2.5 19h19"}, {"p": "M5.5 19v-6h9v6"}, {"r": [15.5, 4, 5, 5], "f": 1, "a": 1}], "layers": [{"r": [3, 3, 10, 10]}, {"r": [7, 7, 10, 10]}, {"r": [11, 11, 10, 10], "f": 1, "a": 1}], "lockArea": [{"p": "M3 8V3h5"}, {"p": "M16 3h5v5"}, {"p": "M21 16v5h-5"}, {"p": "M8 21H3v-5"}, {"r": [9, 9, 6, 6], "f": 1, "a": 1}], "margin": [{"p": "M3 8V3h5"}, {"p": "M16 3h5v5"}, {"p": "M21 16v5h-5"}, {"p": "M8 21H3v-5"}, {"r": [7.5, 7.5, 9, 9], "d": 1, "a": 1}], "annotate": [{"p": "M4 4h16v11h-9l-4 4v-4H4z"}, {"p": "M8.5 9.5h7", "a": 1, "w": 2.4}], "check": [{"p": "M3 6h18"}, {"p": "M3 11h8"}, {"p": "M3 16h8", "a": 1, "w": 2.4}, {"r": [14, 10, 5, 5]}, {"p": "M19 15l2.5 2.5"}], "candidates": [{"r": [3, 3, 7.5, 7.5]}, {"r": [13.5, 3, 7.5, 7.5]}, {"r": [3, 13.5, 7.5, 7.5]}, {"r": [13.5, 13.5, 7.5, 7.5], "f": 1, "a": 1}], "diff": [{"r": [3, 5, 18, 14]}, {"p": "M12 2.5v19", "a": 1, "w": 2.4}], "approve": [{"p": "M4.5 12.5l5 5 10-11", "a": 1, "w": 2.4}], "version": [{"p": "M3 11V3h8"}, {"p": "M7 15V7h8"}, {"p": "M11 21V11h10", "a": 1, "w": 2.4}], "export": [{"r": [3, 4, 8, 8]}, {"r": [14, 3, 7, 9.5]}, {"r": [3, 15.5, 18, 5.5], "f": 1, "a": 1}], "risk": [{"p": "M12 3.5v10"}, {"r": [11, 15.5, 2, 2], "f": 1}, {"p": "M4 21h16", "a": 1, "w": 2.4}], "signoff": [{"p": "M7.5 15.5l9-9 2 2-9 9h-2z"}, {"p": "M4 21h16", "a": 1, "w": 2.4}], "upload": [{"p": "M3 15v6h18v-6"}, {"p": "M12 16V4"}, {"p": "M7.5 8.5L12 4l4.5 4.5", "a": 1, "w": 2.2}], "operator": [{"p": "M5 8h14l-1 13H6z"}, {"p": "M9 8V4h6v4", "a": 1, "w": 2.2}], "designer": [{"p": "M4 3v17h17"}, {"p": "M4 7h3M4 11h3M4 15h3", "a": 1, "w": 2}, {"p": "M11 16l6-6"}], "legal": [{"p": "M12 4v15"}, {"p": "M5 7h14"}, {"p": "M3 13l2-6 2 6zM17 13l2-6 2 6z"}, {"p": "M8 20.5h8", "a": 1, "w": 2.4}]};

export function VfIcon({ name, size = 16, strokeWidth = 1.6, accent, className, style }) {
  const els = ICONS[name] || [];
  const acc = accent || 'currentColor';
  const k = strokeWidth / 1.6;
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {els.map((e, i) => {
        const sw = e.w ? e.w * k : undefined;
        if (e.p) return <path key={i} d={e.p} stroke={e.a ? acc : undefined} strokeWidth={sw} />;
        const [x, y, w, h] = e.r || [0, 0, 0, 0];
        if (e.f) return <rect key={i} x={x} y={y} width={w} height={h} fill={e.a ? acc : 'currentColor'} stroke="none" />;
        return (
          <rect key={i} x={x} y={y} width={w} height={h} stroke={e.a ? acc : undefined} strokeWidth={sw} strokeDasharray={e.d ? '2 2' : undefined} />
        );
      })}
    </svg>
  );
}

const MARK_LG = {"sw": 5.5, "tl": "M9 29V9h20", "br": "M55 35v20H35", "lv": "M20 32h24"};
const MARK_SM = {"sw": 7.5, "tl": "M9 30V9h21", "br": "M55 34v21H34", "lv": "M23 32h18"};

/** The 澄矩 mark: two carpenter's squares framing a still level line. Optically adjusted below 28px. */
export function VfMark({ size = 22, ink = 'currentColor', accent = '#1e4d45' }) {
  const g = size <= 28 ? MARK_SM : MARK_LG;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" strokeLinecap="square" aria-hidden="true">
      <path d={g.tl} stroke={ink} strokeWidth={g.sw} />
      <path d={g.br} stroke={ink} strokeWidth={g.sw} />
      <path d={g.lv} stroke={accent} strokeWidth={g.sw} />
    </svg>
  );
}
