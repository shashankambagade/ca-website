// components/SmartImage.jsx
'use client';

import Image from 'next/image';
import useInViewOnce from '@/hooks/useInViewOnce';
import '@/styles/image-effects.css';

export default function SmartImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  sizes,
  priority = false,
  quality = 80,
  effect = 'zoom',         // 'fade' | 'zoom' | 'reveal'
  hoverScale = true,
  rounded = 'rounded-sm',  // Tailwind corner radius
  fit = 'object-cover',    // object-contain/cover
  placeholder = 'empty',   // or 'blur'
  blurDataURL,             // pass if you have it from WP/ACF
}) {
  const ref = useInViewOnce();

  const effectClass =
    effect === 'reveal' ? 'img-reveal' :
    effect === 'fade'   ? 'img-fade'   : 'img-zoom';

  const hoverClass = hoverScale ? 'img-hoverScale' : '';

  return (
    <div ref={ref} className={`smart-img ${rounded} ${effectClass} ${hoverClass} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`w-full h-full ${fit}`}
        loading={priority ? 'eager' : 'lazy'}
        draggable={false}
      />
    </div>
  );
}
