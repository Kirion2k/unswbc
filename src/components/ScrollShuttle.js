import React, { useCallback, useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ShuttleShape } from './ShuttleIcon';

// Three in-and-out curves, with vertical travel tied to reading progress.
function flightPoint(progress) {
  const bounded = Math.max(0, Math.min(1, progress));
  return { x: 32 + 18 * Math.sin(bounded * Math.PI * 6), y: 24 + 752 * bounded };
}

export default function ScrollShuttle() {
  const enabled = useMediaQuery('(min-width: 1400px) and (prefers-reduced-motion: no-preference)');
  return enabled ? <ShuttleFlight /> : null;
}

function ShuttleFlight() {
  const overlay = useRef(null);
  const tails = useRef([]);
  const shuttle = useRef(null);
  const previous = useRef(0);
  const direction = useRef(1);
  const heading = useRef(null);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const flight = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.0001 });
  const placeShuttle = useCallback((distance) => {
    if (!shuttle.current) return;
    const movement = distance - previous.current;
    if (Math.abs(movement) > 0.00001) direction.current = Math.sign(movement);
    previous.current = distance;
    const point = flightPoint(distance);
    const before = flightPoint(distance - direction.current * 0.001);
    const after = flightPoint(distance + direction.current * 0.001);
    const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    if (heading.current === null) heading.current = angle;
    const turn = ((angle - (heading.current % 360) + 540) % 360) - 180;
    heading.current = (heading.current + turn * 0.22) % 360;
    shuttle.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${heading.current})`);
    shuttle.current.setAttribute('opacity', Math.min(0.85, 0.55 + Math.abs(movement) * 200));

    tails.current.forEach((tail, index) => {
      if (!tail) return;
      const points = Array.from({ length: 5 }, (_, step) => {
        const behind = 0.075 - index * 0.025 - step * 0.00625;
        return flightPoint(distance - direction.current * behind);
      });
      tail.setAttribute('d', points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' '));
      tail.setAttribute('opacity', Math.min(0.35, Math.abs(movement) * 160) * (index + 1) / 3);
    });
  }, []);

  useMotionValueEvent(flight, 'change', placeShuttle);
  useEffect(() => {
    let timer;
    let scrolling = false;
    const hide = () => {
      scrolling = false;
      overlay.current?.removeAttribute('data-scrolling');
    };
    const show = () => {
      if (!scrolling) {
        scrolling = true;
        overlay.current?.setAttribute('data-scrolling', 'true');
      }
      clearTimeout(timer);
      timer = setTimeout(hide, 180);
    };
    hide();
    window.addEventListener('scroll', show, { passive: true });
    return () => {
      window.removeEventListener('scroll', show);
      clearTimeout(timer);
      hide();
    };
  }, [pathname]);
  useEffect(() => {
    previous.current = scrollYProgress.get();
    direction.current = 1;
    heading.current = null;
    flight.jump(scrollYProgress.get());
    placeShuttle(scrollYProgress.get());
  }, [pathname, placeShuttle, flight, scrollYProgress]);

  return (
    <Box
      component={motion.svg}
      ref={overlay}
      data-scroll-shuttle
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 800"
      preserveAspectRatio="none"
      sx={{
        display: 'none',
        '@media (min-width: 1400px)': { display: 'block' },
        position: 'fixed', top: 100,
        left: 'calc(max(0px, (100vw - 1320px) / 4) + 0.75rem)',
        width: 64, height: 'calc(100dvh - 200px)',
        transform: 'translateX(-50%)',
        opacity: 0,
        transition: 'opacity 360ms ease-out',
        '&[data-scrolling="true"]': { opacity: 1, transitionDuration: '140ms' },
        zIndex: 10, pointerEvents: 'none', color: 'var(--club-accent)',
        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
      }}
    >
      {[0, 1, 2].map((index) => (
        <path
          key={index}
          ref={(element) => { tails.current[index] = element; }}
          data-shuttle-tail
          fill="none" stroke="currentColor" strokeWidth={0.5 + index * 0.4}
          strokeLinecap="round" opacity="0"
        />
      ))}
      <g ref={shuttle}><ShuttleShape /></g>
    </Box>
  );
}
