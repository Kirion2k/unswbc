import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@mui/material';

export default function MagneticButton({
  children,
  strength = 0.3,
  sx = {},
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
        sx={{
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
