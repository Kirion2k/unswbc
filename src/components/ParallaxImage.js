import React, { useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

function MovingImage({
  src,
  alt,
  speed = 0.15,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} style={{ overflow: 'hidden', position: 'relative', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          y,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          position: 'absolute',
          top: '-10%',
        }}
        {...props}
      />
    </div>
  );
}

export default function ParallaxImage(props) {
  const moving = useMediaQuery('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
  if (moving) return <MovingImage {...props} />;
  const { speed, style, alt, ...image } = props;
  return <img {...image} alt={alt} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }} />;
}
