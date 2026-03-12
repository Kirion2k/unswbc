import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@mui/material';

export default function TiltCard({
  children,
  sx = {},
  tiltDeg = 6,
  glowColor = 'rgba(28, 60, 111, 0.08)',
  ...props
}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * tiltDeg,
      rotateY: (x - 0.5) * tiltDeg,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={transform}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
        height: '100%',
      }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 20px 60px rgba(2, 6, 23, 0.12)',
          },
          ...sx,
        }}
        {...props}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'opacity 0.3s ease',
            opacity: transform.rotateX === 0 && transform.rotateY === 0 ? 0 : 1,
          }}
        />
        {children}
      </Card>
    </motion.div>
  );
}
