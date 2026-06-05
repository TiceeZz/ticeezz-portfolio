import { useState } from 'react';
import { isWebp, getWebpSrc, getResponsiveSrcset, DEFAULT_SIZES } from '../../utils/imageUtils';
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
  sizes = DEFAULT_SIZES,
  fetchPriority,
  decoding = 'async',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const wrapperStyle = { ...style };
  if (aspectRatio) wrapperStyle.aspectRatio = aspectRatio;

  const webpSrc = getWebpSrc(src);
  const isWebpSource = isWebp(src);
  const responsive = !import.meta.env.DEV && !isWebpSource ? getResponsiveSrcset(src) : null;
  const shouldUsePicture = !import.meta.env.DEV && !isWebpSource && webpSrc && responsive;

  const handleLoad = () => setLoaded(true);
  const handleError = () => { setLoaded(true); setErrored(true); };

  return (
    <div className={`${s.wrapper} ${className}`} style={wrapperStyle}>
      <div className={`${s.shimmer} ${loaded ? s.shimmerHidden : ''}`} aria-hidden="true" />
      {errored ? (
        <div className={s.error}>Failed to load</div>
      ) : shouldUsePicture ? (
        <picture>
          <source srcSet={responsive} type="image/webp" sizes={sizes} />
          <img
            src={src}
            alt={alt}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding={decoding}
            onLoad={handleLoad}
            onError={handleError}
            className={`${s.img} ${loaded ? s.visible : ''}`}
            style={{ objectFit, ...imgStyle }}
            sizes={sizes}
            {...rest}
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding={decoding}
          srcSet={responsive || undefined}
          sizes={responsive ? sizes : undefined}
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
