import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

export default function MorphingText({ texts, active = true, sx = {} }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!active || reducedMotion || texts.length < 2) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % texts.length), 2400);
    return () => clearInterval(timer);
  }, [active, reducedMotion, texts.length]);

  return (
    <Box component="span" sx={{ display: 'inline-grid', position: 'relative', ...sx }}>
      <span aria-hidden="true" style={{ gridArea: '1 / 1', visibility: 'hidden' }}>
        {texts.reduce((longest, text) => text.length > longest.length ? text : longest, '')}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={reducedMotion ? 'static' : index}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ gridArea: '1 / 1', whiteSpace: 'nowrap' }}
        >
          {texts[reducedMotion ? 0 : index]}
        </motion.span>
      </AnimatePresence>
    </Box>
  );
}
