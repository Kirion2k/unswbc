import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SectionHeading({ title, align = 'left', sx }) {
  return (
    <Box sx={{ textAlign: align, mb: 'var(--club-heading-gap)', ...sx }}>
      <Typography
        component="h2"
        sx={{
          fontWeight: 900, color: 'var(--club-text)', letterSpacing: '-0.035em',
          fontSize: { xs: 'clamp(1.75rem, 7vw, 2.25rem)', md: 'clamp(2.25rem, 3.5vw, 3rem)' },
          lineHeight: 1.08, maxWidth: '24ch',
          ...(align === 'center' && { mx: 'auto' }),
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
