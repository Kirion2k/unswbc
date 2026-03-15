import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Simplified shuttlecock silhouette SVG path
const SHUTTLECOCK_PATH = 'M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z';

function Particle({ size, x, y, duration, delay, opacity }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        y: [0, -80, -160],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <path d={SHUTTLECOCK_PATH} fill="rgba(255,255,255,0.12)" />
    </motion.svg>
  );
}

export default function FloatingParticles({ count = 12 }) {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 12 + Math.random() * 18,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      opacity: 0.12 + Math.random() * 0.15,
    })),
    [count]
  );

  if (prefersReducedMotion) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
}
