import { useState } from 'react';
import s from './ImgLoader.module.css';

export default function ImgLoader({
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

  return (
    <div className={`${s.wrapper} ${className}`} style={wrapperStyle}>
      <div className={`${s.shimmer} ${loaded ? s.shimmerHidden : ''}`} aria-hidden="true" />
      {errored ? (
        <div className={s.error}>Failed to load</div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setErrored(true); }}
          className={`${s.img} ${loaded ? s.visible : ''}`}
          style={{ objectFit, ...imgStyle }}
          {...rest}
        />
      )}
    </div>
  );
}
