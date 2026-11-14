import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button, Box, useMediaQuery } from '@mui/material';
import { keyframes } from '@mui/system';
import ShuttleIcon from './ShuttleIcon';

const rippleAnimation = keyframes`
  0% { transform: scale(0); opacity: 0.35; }
  100% { transform: scale(2); opacity: 0; }
`;

const shuttleFlyby = keyframes`
  0% { transform: translateX(-72%); opacity: 0; }
  12% { opacity: 0.5; }
  78% { opacity: 0.5; }
  100% { transform: translateX(76%); opacity: 0; }
`;

const shuttleArc = keyframes`
  0% { transform: translateY(6%) rotate(-5deg); }
  50% { transform: translateY(-6%) rotate(0deg); }
  100% { transform: translateY(4%) rotate(6deg); }
`;

const swooshReveal = keyframes`
  0%, 8% { opacity: 0; transform: scaleX(0.15); }
  30% { opacity: 0.2; transform: scaleX(0.8); }
  65% { opacity: 0.12; transform: scaleX(1); }
  100% { opacity: 0; transform: scaleX(1.1); }
`;

export default function MagneticButton({
  children,
  rippleColor = 'rgba(255,255,255,0.5)',
  sx = {},
  ...props
}) {
  const [ripples, setRipples] = useState([]);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const handleClick = useCallback((e) => {
    if (prefersReducedMotion) return;
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, key: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (ripples.length > 0) {
      const lastRipple = ripples[ripples.length - 1];
      const timeout = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== lastRipple.key));
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [ripples]);

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <Button
        component={motion.button}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
        onClick={handleClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 240ms ease, border-color 240ms ease, box-shadow 240ms ease',
          '& .button-shuttle': {
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0,
          },
          '& .button-flight': { position: 'absolute', inset: 0 },
          '& .button-swoosh': {
            position: 'absolute', left: 'calc(50% - 4.1rem)', top: 'calc(50% - 0.7rem)',
            width: '3.4rem', height: '1.4rem', opacity: 0, transformOrigin: 'right center',
          },
          '@media (hover: hover) and (prefers-reduced-motion: no-preference)': {
            '&:hover .button-shuttle': { animation: `${shuttleFlyby} 700ms linear` },
            '&:hover .button-flight': { animation: `${shuttleArc} 700ms ease-in-out` },
            '&:hover .button-swoosh': { animation: `${swooshReveal} 700ms ease-in-out` },
          },
          '&:focus-visible .button-shuttle': prefersReducedMotion ? {} : {
            animation: `${shuttleFlyby} 700ms linear`,
          },
          '&:focus-visible .button-flight': prefersReducedMotion ? {} : {
            animation: `${shuttleArc} 700ms ease-in-out`,
          },
          '&:focus-visible .button-swoosh': prefersReducedMotion ? {} : {
            animation: `${swooshReveal} 700ms ease-in-out`,
          },
          ...sx,
        }}
        {...props}
      >
        <Box component="span" className="button-shuttle" aria-hidden="true">
          <Box component="span" className="button-flight">
            <Box component="svg" className="button-swoosh" viewBox="0 0 100 28" fill="none" aria-hidden="true">
              <path d="M2 25 Q42 3 98 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M18 27 Q56 10 94 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            </Box>
            <ShuttleIcon style={{ position: 'absolute', left: '50%', top: '50%', width: '1.5rem', height: '1.2rem', transform: 'translate(-50%, -50%) rotate(-12deg)' }} />
          </Box>
        </Box>
        <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
        <Box
          component="span"
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          {ripples.map((ripple) => (
            <Box
              key={ripple.key}
              component="span"
              sx={{
                position: 'absolute',
                borderRadius: '50%',
                bgcolor: rippleColor,
                width: ripple.size,
                height: ripple.size,
                top: ripple.y,
                left: ripple.x,
                transform: 'scale(0)',
                animation: `${rippleAnimation} 600ms ease-out forwards`,
              }}
            />
          ))}
        </Box>
      </Button>
    </Box>
  );
}
