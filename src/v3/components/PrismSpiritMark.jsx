import { useId } from 'react';

/**
 * PrismSpiritMark — 极简光学棱镜 × 抽象微表情融合 Logo
 * 与 V3 的「冰白克莱因蓝 / 深海暗夜蓝」光学棱镜语言原生一致
 *
 * mood: 'idle' | 'hover' | 'thinking' | 'happy'
 */
export default function PrismSpiritMark({
  size = 28,
  mood = 'idle',
  className = '',
  eyeOffset = { x: 0, y: 0 },
}) {
  const uid = useId().replace(/:/g, '');
  const gradBody = `prism-body-${uid}`;
  const gradLeft = `prism-left-${uid}`;
  const gradRight = `prism-right-${uid}`;
  const gradRim = `prism-rim-${uid}`;
  const gradGlow = `prism-glow-${uid}`;

  const ex = Math.max(-1.6, Math.min(1.6, eyeOffset.x || 0));
  const ey = Math.max(-1.2, Math.min(1.2, eyeOffset.y || 0));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`v3-prism-mark is-${mood}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <defs>
        {/* Main crystal gradient */}
        <linearGradient id={gradBody} x1="8" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7CEBFF" />
          <stop offset="48%" stopColor="#1B55FF" />
          <stop offset="100%" stopColor="#8C6EFF" />
        </linearGradient>

        {/* Left icy refraction facet */}
        <linearGradient id={gradLeft} x1="6" y1="9" x2="22" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.62" />
          <stop offset="55%" stopColor="#94F0FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1B55FF" stopOpacity="0.06" />
        </linearGradient>

        {/* Right iris-violet refraction facet */}
        <linearGradient id={gradRight} x1="20" y1="5" x2="35" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#7366FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#B89BFF" stopOpacity="0.46" />
        </linearGradient>

        {/* Razor specular rim */}
        <linearGradient id={gradRim} x1="12" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="45%" stopColor="#8AEBFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B8A6FF" stopOpacity="0.72" />
        </linearGradient>

        {/* Soft bottom refraction glow */}
        <radialGradient id={gradGlow} cx="50%" cy="62%" r="48%">
          <stop offset="0%" stopColor="#7CEBFF" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#0038FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle ambient crystal refraction aura */}
      <circle cx="20" cy="23" r="15" fill={`url(#${gradGlow})`} className="v3-prism-mark__aura" />

      {/* Outer sculpted rounded-triangular optical prism */}
      <path
        d="M17.8 5.2C18.8 3.55 21.2 3.55 22.2 5.2L34.7 26.2C35.85 28.15 34.72 30.65 32.5 31.12L21.9 33.36C20.65 33.62 19.35 33.62 18.1 33.36L7.5 31.12C5.28 30.65 4.15 28.15 5.3 26.2L17.8 5.2Z"
        fill={`url(#${gradBody})`}
      />

      {/* Left internal optical facet */}
      <path
        d="M20 4.2L17.8 5.2L5.3 26.2C4.15 28.15 5.28 30.65 7.5 31.12L19.4 33.48L20 13.8V4.2Z"
        fill={`url(#${gradLeft})`}
      />

      {/* Right internal optical facet */}
      <path
        d="M20 4.2L22.2 5.2L34.7 26.2C35.85 28.15 34.72 30.65 32.5 31.12L20.6 33.48L20 13.8V4.2Z"
        fill={`url(#${gradRight})`}
      />

      {/* Delicate internal ridge line from apex */}
      <path
        d="M20 5.4L20 13.4"
        stroke="rgba(255,255,255,0.68)"
        strokeWidth="1.05"
        strokeLinecap="round"
      />

      {/* Subtle specular diagonal shimmer inside crystal */}
      <path
        d="M13.5 14.5L17.2 8.2"
        stroke="rgba(255,255,255,0.52)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* Outer crystal specular rim */}
      <path
        d="M17.8 5.2C18.8 3.55 21.2 3.55 22.2 5.2L34.7 26.2C35.85 28.15 34.72 30.65 32.5 31.12L21.9 33.36C20.65 33.62 19.35 33.62 18.1 33.36L7.5 31.12C5.28 30.65 4.15 28.15 5.3 26.2L17.8 5.2Z"
        stroke={`url(#${gradRim})`}
        strokeWidth="1.15"
      />

      {/* Abstract minimalist cute expression nested inside crystal face */}
      <g
        className="v3-prism-mark__face"
        style={{ transform: `translate(${ex.toFixed(2)}px, ${ey.toFixed(2)}px)` }}
      >
        {mood === 'happy' ? (
          <>
            {/* Happy minimalist curved arcs */}
            <path
              d="M13.5 23.6C14.15 22.2 15.85 22.2 16.5 23.6"
              stroke="#FFFFFF"
              strokeWidth="1.85"
              strokeLinecap="round"
            />
            <path
              d="M23.5 23.6C24.15 22.2 25.85 22.2 26.5 23.6"
              stroke="#FFFFFF"
              strokeWidth="1.85"
              strokeLinecap="round"
            />
            <path
              d="M18.3 26.6C19.2 27.6 20.8 27.6 21.7 26.6"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth="1.45"
              strokeLinecap="round"
            />
          </>
        ) : mood === 'thinking' ? (
          <>
            {/* Curious slightly-raised asymmetric eyes + tiny prism dot */}
            <rect
              x="14.0"
              y="20.6"
              width="2.4"
              height="3.8"
              rx="1.2"
              fill="#FFFFFF"
              className="v3-prism-mark__eye"
            />
            <rect
              x="23.6"
              y="20.1"
              width="2.4"
              height="4.3"
              rx="1.2"
              fill="#FFFFFF"
              className="v3-prism-mark__eye"
            />
            <circle cx="20" cy="26.8" r="1.15" fill="rgba(255,255,255,0.88)" />
          </>
        ) : (
          <>
            {/* Calm minimalist capsule eyes with gentle periodic blink */}
            <rect
              x="13.9"
              y="21.0"
              width="2.5"
              height="4.3"
              rx="1.25"
              fill="#FFFFFF"
              className="v3-prism-mark__eye"
            />
            <rect
              x="23.6"
              y="21.0"
              width="2.5"
              height="4.3"
              rx="1.25"
              fill="#FFFFFF"
              className="v3-prism-mark__eye"
            />
            {/* Minimal micro-smile arc */}
            <path
              d="M18.5 26.9C19.3 27.65 20.7 27.65 21.5 26.9"
              stroke="rgba(255,255,255,0.86)"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
          </>
        )}
      </g>
    </svg>
  );
}
