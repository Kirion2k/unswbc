import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

export default function AnimatedCounter({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  style,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const animation = animate(0, target, {
      duration, ease: 'easeOut',
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
      },
    });
    return () => animation.stop();
  }, [isInView, target, duration, prefersReducedMotion, prefix, suffix]);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}{prefersReducedMotion ? target : 0}{suffix}
    </span>
  );
}
