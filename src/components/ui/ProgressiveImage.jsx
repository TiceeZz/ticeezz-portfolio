import { useState } from 'react';
import s from './ProgressiveImage.module.css';

export default function ProgressiveImage({
  src,
  placeholder,
  alt,
  objectFit = 'cover',
  className = '',
  style,
  imgStyle,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${s.container} ${className}`} style={style}>
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className={`${s.placeholder} ${loaded ? s.placeholderHidden : ''}`}
      />
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${s.real} ${loaded ? s.realVisible : ''}`}
        style={{ objectFit, ...imgStyle }}
        {...rest}
      />
    </div>
  );
}
