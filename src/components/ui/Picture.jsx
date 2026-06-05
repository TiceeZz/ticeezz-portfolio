import { useState } from 'react';
import { getWebpSrc, getResponsiveSrcset, DEFAULT_SIZES } from '../../utils/imageUtils';
import s from './Picture.module.css';

export default function Picture({
  src,
  alt,
  aspectRatio,
  loading = 'lazy',
  objectFit = 'cover',
  imgStyle,
  className = '',
  style,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const wrapperStyle = { ...style };
  if (aspectRatio) wrapperStyle.aspectRatio = aspectRatio;

  const webpSrc = getWebpSrc(src);

  const handleLoad = () => setLoaded(true);
  const handleError = () => { setLoaded(true); setErrored(true); };

  return (
    <div className={`${s.wrapper} ${className}`} style={wrapperStyle}>
      <div className={`${s.shimmer} ${loaded ? s.shimmerHidden : ''}`} aria-hidden="true" />
      {errored ? (
        <div className={s.error}>Failed to load</div>
      ) : (webpSrc && !import.meta.env.DEV) ? (
        <picture>
          <source
            srcSet={getResponsiveSrcset(src)}
            type="image/webp"
            sizes={DEFAULT_SIZES}
          />
          <img
            src={src}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`${s.img} ${loaded ? s.visible : ''}`}
            style={{ objectFit, ...imgStyle }}
            sizes={DEFAULT_SIZES}
            {...rest}
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`${s.img} ${loaded ? s.visible : ''}`}
          style={{ objectFit, ...imgStyle }}
          {...rest}
        />
      )}
    </div>
  );
}
