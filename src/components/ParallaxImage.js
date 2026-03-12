import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  if (prefersReducedMotion) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
        {...props}
      />
    );
  }

  return (
    <div ref={ref} style={{ overflow: 'hidden', position: 'relative', ...style }}>
      <motion.img
        src={src}
        alt={alt}
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
