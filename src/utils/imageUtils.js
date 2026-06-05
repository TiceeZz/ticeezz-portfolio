export function getWebpSrc(src) {
  if (!src || typeof src !== 'string') return null;
  if (src.toLowerCase().endsWith('.webp')) return null;
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

export function isWebp(src) {
  return src ? src.toLowerCase().endsWith('.webp') : false;
}

export const DEFAULT_SIZES = '(max-width: 480px) 100vw, (max-width: 960px) 50vw, 33vw';

export function getResponsiveSrcset(src) {
  if (!src || typeof src !== 'string') return null;
  const base = src.replace(/\.(jpe?g|png)$/i, '');
  const ext = src.toLowerCase().endsWith('.webp') ? '.webp' : null;
  // Use webp variants in production; the caller passes the webp src
  const extSrc = ext ? src : src.replace(/\.(jpe?g|png)$/i, '.webp');
  const baseWebp = extSrc.replace(/\.webp$/, '');
  return [
    `${baseWebp}-480w.webp 480w`,
    `${baseWebp}-960w.webp 960w`,
    `${extSrc} 1440w`,
  ].join(', ');
}
