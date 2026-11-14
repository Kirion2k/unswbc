import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Card, useMediaQuery } from '@mui/material';

export default function TiltCard({
  children,
  sx = {},
  tiltDeg = 2,
  glowColor = 'rgba(28, 60, 111, 0.08)',
  ...props
}) {
  const interactive = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 220, damping: 28 });
  const rotateY = useSpring(y, { stiffness: 220, damping: 28 });

  const reset = () => { x.set(0); y.set(0); };
  const handleMouseMove = (event) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((0.5 - (event.clientY - rect.top) / rect.height) * tiltDeg);
    y.set(((event.clientX - rect.left) / rect.width - 0.5) * tiltDeg);
  };

  return (
    <motion.div
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={reset}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformPerspective: 800,
        height: '100%', width: '100%',
      }}
    >
      <Card
        sx={{
          height: '100%', position: 'relative', overflow: 'hidden',
          ...(interactive && { '&:hover > .tilt-glow': { opacity: 1 } }),
          ...sx,
        }}
        {...props}
      >
        <div
          className="tilt-glow"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle, ${glowColor}, transparent 60%)`,
            pointerEvents: 'none', zIndex: 1, opacity: 0,
            transition: 'opacity 180ms ease',
          }}
        />
        {children}
      </Card>
    </motion.div>
  );
}
