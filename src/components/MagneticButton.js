import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, Box } from '@mui/material';
import { keyframes } from '@mui/system';

const rippleAnimation = keyframes`
  0% { transform: scale(0); opacity: 0.35; }
  100% { transform: scale(2); opacity: 0; }
`;

export default function MagneticButton({
  children,
  strength = 0.3,
  rippleColor = 'rgba(255,255,255,0.5)',
  sx = {},
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        component={motion.button}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          ...sx,
        }}
        {...props}
      >
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
    </motion.div>
  );
}
