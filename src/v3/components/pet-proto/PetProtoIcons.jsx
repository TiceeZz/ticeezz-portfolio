/**
 * Clean Figma-faithful SVG icon set for Pet Travel Prototype
 * Zero system emojis — crisp monochrome & duotone vector icons
 */

export const IconBack = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M12.5 4.5L7 10L12.5 15.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronRight = ({ size = 14, color = '#9aa8a0' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 3.5L10.5 8L6 12.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconShare = ({ size = 16, color = '#1c2c24' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 3.5V12.5M10 3.5L6.5 7M10 3.5L13.5 7" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 11.5V15.5C4.5 16.05 4.95 16.5 5.5 16.5H14.5C15.05 16.5 15.5 16.05 15.5 15.5V11.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconClock = ({ size = 12, color = '#8d9c94' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.2" stroke={color} strokeWidth="1.4" />
    <path d="M8 4.8V8.2L10.2 9.6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const IconSwap = ({ size = 16, color = '#24a562' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5H15L12.5 5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 12.5H5L7.5 15" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPlaneInline = ({ size = 18, color = '#2fb66d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
      fill={color}
      transform="rotate(90 12 12)"
    />
  </svg>
);

export const IconCalendar = ({ size = 16, color = '#28a964' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2.2" y="3.5" width="13.6" height="12" rx="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M2.5 7.2H15.5" stroke={color} strokeWidth="1.4" />
    <path d="M6 2V4.5M12 2V4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="5.4" y="9.6" width="2.4" height="2.4" rx="0.6" fill={color} />
  </svg>
);

export const IconPaw = ({ size = 15, color = '#28a964' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="5.2" cy="6.6" r="1.45" fill={color} />
    <circle cx="8.9" cy="4.8" r="1.55" fill={color} />
    <circle cx="12.7" cy="6.6" r="1.45" fill={color} />
    <path d="M5.4 12.2C5.4 10.3 7.1 9 9 9C10.9 9 12.6 10.3 12.6 12.2C12.6 13.5 11.4 14.2 9 14.2C6.6 14.2 5.4 13.5 5.4 12.2Z" fill={color} />
  </svg>
);

export const IconGift = ({ size = 14, color = '#e04f48' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2" y="6" width="12" height="8" rx="1.5" stroke={color} strokeWidth="1.4" />
    <path d="M8 6V14M2 9.2H14" stroke={color} strokeWidth="1.3" />
    <path d="M8 6C6.4 6 5 5.2 5 4C5 3.1 5.7 2.5 6.5 2.5C7.4 2.5 8 3.6 8 6ZM8 6C9.6 6 11 5.2 11 4C11 3.1 10.3 2.5 9.5 2.5C8.6 2.5 8 3.6 8 6Z" stroke={color} strokeWidth="1.3" />
  </svg>
);

export const IconSearch = ({ size = 15, color = '#6e7e76' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8.2" cy="8.2" r="5.2" stroke={color} strokeWidth="1.6" />
    <path d="M12.2 12.2L15.5 15.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const IconHistory = ({ size = 15, color = '#394b42' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <rect x="3" y="2.5" width="12" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M6 6.5H12M6 9.5H12M6 12.5H9.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const IconInventory = ({ size = 15, color = '#394b42' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2.5" y="3" width="13" height="12" rx="2" stroke={color} strokeWidth="1.5" />
    <circle cx="9" cy="8.5" r="2.2" stroke={color} strokeWidth="1.4" />
    <path d="M11 10.5L13 12.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* Airline Marks matching Figma cards */
export const IconAirline = ({ code }) => {
  if (code === 'mu') {
    return (
      <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2 11.5C5.2 6.5 10.2 4.5 16 5.2C12.8 7.4 10.4 9.5 8.5 12.5L2 11.5Z" fill="#d92b32" />
        <path d="M4 13C7.5 11 11.5 10.2 15.5 10.8C12.2 12.4 9.6 13.6 7.4 14.6L4 13Z" fill="#18499e" />
      </svg>
    );
  }
  if (code === 'ca') {
    return (
      <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
        <path d="M3 12.5C4.5 7 9.5 4 15 4.8C12 7 10.5 9.2 11.5 12.8C8.8 11.6 5.8 11.6 3 12.5Z" fill="#d8282f" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.5 12C5 7.5 9.5 5 15.5 5.5C13 8.5 10.5 11.2 8.2 13.8L2.5 12Z" fill="#1c7ed6" />
      <circle cx="11.2" cy="8.2" r="2.2" fill="#e03131" />
    </svg>
  );
};

/* Plan Detail 4-Node Duotone Icons */
export const IconDocCert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="3" fill="#d9f5e6" stroke="#24a15d" strokeWidth="1.7" />
    <path d="M8 9H16M8 13H14M8 17H11.5" stroke="#24a15d" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconPetVan = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 7.5C3 6.4 3.9 5.5 5 5.5H14.5V16H3V7.5Z" fill="#d9f5e6" stroke="#24a15d" strokeWidth="1.7" />
    <path d="M14.5 9H18.4L21 12V16H14.5V9Z" stroke="#24a15d" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="7.2" cy="17.2" r="2" fill="#ffffff" stroke="#24a15d" strokeWidth="1.7" />
    <circle cx="17.2" cy="17.2" r="2" fill="#ffffff" stroke="#24a15d" strokeWidth="1.7" />
  </svg>
);

export const IconShieldCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L19 6V11.8C19 16.2 16 19.8 12 21C8 19.8 5 16.2 5 11.8V6L12 3Z" fill="#d9f5e6" stroke="#24a15d" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M8.8 12L11 14.2L15.4 9.8" stroke="#24a15d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCrateBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="7" width="17" height="12.5" rx="3" fill="#d9f5e6" stroke="#24a15d" strokeWidth="1.7" />
    <path d="M8.5 7V5.2C8.5 4.5 9 4 9.7 4H14.3C15 4 15.5 4.5 15.5 5.2V7" stroke="#24a15d" strokeWidth="1.7" />
    <path d="M8 10.5V16M11 10.5V16M14 10.5V16M16.8 11.5V15" stroke="#24a15d" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconAlertDot = ({ color = '#e24c47', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.5" fill={color} />
    <path d="M8 4.8V8.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="8" cy="11.2" r="0.9" fill="#fff" />
  </svg>
);

export const IconCheckDot = ({ color = '#29ae64', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.5" fill={color} />
    <path d="M5.2 8.2L7.1 10.1L11 6.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHeadset = ({ size = 14, color = '#22332a' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3.5 10.5V9C3.5 5.96 5.96 3.5 9 3.5C12.04 3.5 14.5 5.96 14.5 9V10.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <rect x="2.2" y="9.8" width="3" height="4.6" rx="1.4" stroke={color} strokeWidth="1.4" />
    <rect x="12.8" y="9.8" width="3" height="4.6" rx="1.4" stroke={color} strokeWidth="1.4" />
  </svg>
);

export const IconCamera = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2.2" y="4.8" width="13.6" height="10" rx="2.2" stroke={color} strokeWidth="1.5" />
    <path d="M6.2 4.8L7.2 3.2H10.8L11.8 4.8" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="9" cy="9.8" r="2.5" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const IconPlus = ({ size = 16, color = '#8d9c94' }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M9 3.5V14.5M3.5 9H14.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconMapLayer = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="6.2" fill="#e2f7ec" stroke="#28a862" strokeWidth="1.4" />
    <path d="M4.5 9H13.5M9 3C7.2 5.2 7.2 12.8 9 15M9 3C10.8 5.2 10.8 12.8 9 15" stroke="#28a862" strokeWidth="1.1" />
  </svg>
);

export const IconWeather = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
    <path d="M5.5 13H12.8C14.3 13 15.4 11.9 15.4 10.5C15.4 9.2 14.4 8.2 13.1 8.1C12.7 6.1 11 4.7 9 4.7C6.8 4.7 5 6.4 4.8 8.6C3.6 8.9 2.8 9.9 2.8 11.1C2.8 12.2 4 13 5.5 13Z" stroke="#475850" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export const IconAIBot = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="5.5" width="12" height="9" rx="4.5" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="8" cy="10" r="1.2" fill="#7ce3ff" />
    <circle cx="12" cy="10" r="1.2" fill="#7ce3ff" />
    <path d="M10 2.8V5.2" stroke="#7ce3ff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconBulb = ({ size = 14, color = '#4d5d55' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M8 2.2C5.6 2.2 3.8 4 3.8 6.3C3.8 7.8 4.6 9.1 5.8 9.8V11.3C5.8 11.8 6.2 12.2 6.7 12.2H9.3C9.8 12.2 10.2 11.8 10.2 11.3V9.8C11.4 9.1 12.2 7.8 12.2 6.3C12.2 4 10.4 2.2 8 2.2Z" stroke={color} strokeWidth="1.35" />
    <path d="M6.4 13.8H9.6" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
  </svg>
);

/* Social Share Channel Icons */
export const IconWeChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9.5 5C5.9 5 3 7.5 3 10.6C3 12.3 3.9 13.8 5.3 14.9L4.7 17L6.9 15.8C7.7 16 8.6 16.2 9.5 16.2C13.1 16.2 16 13.7 16 10.6C16 7.5 13.1 5 9.5 5Z" fill="#fff" />
    <circle cx="7.4" cy="9.8" r="1" fill="#2dc100" />
    <circle cx="11.5" cy="9.8" r="1" fill="#2dc100" />
    <path d="M15.4 10.8C12.5 10.8 10.2 12.8 10.2 15.3C10.2 17.8 12.5 19.8 15.4 19.8C16.1 19.8 16.8 19.7 17.4 19.5L19.2 20.5L18.7 18.8C19.8 17.9 20.6 16.7 20.6 15.3C20.6 12.8 18.3 10.8 15.4 10.8Z" fill="#e8ffe0" />
    <circle cx="13.8" cy="14.9" r="0.85" fill="#2dc100" />
    <circle cx="17" cy="14.9" r="0.85" fill="#2dc100" />
  </svg>
);

export const IconMoments = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="#ffffff" strokeWidth="1.6" />
    <path d="M12 3.5L14.5 9.5M20.2 10L14.2 12.5M18 19L12.5 15M8.5 19.8L10 14M3.8 13.5L9.8 11.5M6.5 5.8L11.5 9.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconQQ = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3.5C8.5 3.5 6.8 6.4 6.8 10C5.3 11.8 4.8 13.9 5.5 14.7C6.1 15.3 7.2 14.3 7.6 13.7C8 15.6 9.1 17 10.4 17.6C9.6 18 8.6 18.5 8.6 19.2C8.6 19.8 10 20 12 20C14 20 15.4 19.8 15.4 19.2C15.4 18.5 14.4 18 13.6 17.6C14.9 17 16 15.6 16.4 13.7C16.8 14.3 17.9 15.3 18.5 14.7C19.2 13.9 18.7 11.8 17.2 10C17.2 6.4 15.5 3.5 12 3.5Z" fill="#ffffff" />
    <ellipse cx="10.2" cy="8.5" rx="0.9" ry="1.2" fill="#1e293b" />
    <ellipse cx="13.8" cy="8.5" rx="0.9" ry="1.2" fill="#1e293b" />
    <path d="M9.6 10.6C10.8 11.5 13.2 11.5 14.4 10.6C13.6 12.1 10.4 12.1 9.6 10.6Z" fill="#f59e0b" />
  </svg>
);

export const IconDownload = () => (
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
    <path d="M10 3.5V13M10 13L6.2 9.2M10 13L13.8 9.2" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 15.8H15.5" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);
