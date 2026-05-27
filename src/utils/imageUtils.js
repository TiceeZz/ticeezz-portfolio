export function getWebpSrc(src) {
  if (!src || typeof src !== 'string') return null;
  if (src.toLowerCase().endsWith('.webp')) return null;
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

export function isWebp(src) {
  return src ? src.toLowerCase().endsWith('.webp') : false;
}
