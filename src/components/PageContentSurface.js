import React, { useRef } from 'react';
import { Box } from '@mui/material';
import CourtBackground from './CourtBackground';

export default function PageContentSurface({ children }) {
  const surfaceRef = useRef(null);
  return (
    <Box ref={surfaceRef} data-content-surface sx={{ position: 'relative', isolation: 'isolate', bgcolor: 'var(--club-canvas)' }}>
      <CourtBackground surfaceRef={surfaceRef} />
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );
}
