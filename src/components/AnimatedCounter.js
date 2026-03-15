import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
