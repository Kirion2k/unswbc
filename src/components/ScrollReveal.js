import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const directionOffsets = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  once = true,
  amount = 0.05,
  style,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div style={style} {...props}>{children}</div>;
  }

  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: '0px 0px 100px 0px' }}
      transition={{ duration, delay: Math.min(delay, 0.15), ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.04,
  once = true,
  amount = 0.05,
  style,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div style={style} {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px 100px 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: Math.min(staggerDelay, 0.05) } },
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  direction = 'up',
  duration = 0.4,
  style,
  ...props
}) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <div style={style} {...props}>{children}</div>;
  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
