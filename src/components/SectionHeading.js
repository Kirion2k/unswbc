import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SectionHeading({ overline, title, align = 'center', sx }) {
  return (
    <Box sx={{ textAlign: align, ...sx }}>
      {overline ? (
        <Typography
          variant="overline"
          sx={{
            color: '#1c3c6f',
            letterSpacing: '0.14em',
            fontWeight: 800,
          }}
        >
          {overline}
        </Typography>
      ) : null}
      <Typography variant="h4" sx={{ fontWeight: 900, mt: overline ? 0.5 : 0 }}>
        {title}
      </Typography>
      <Box
        sx={{
          mt: 1.5,
          height: 4,
          width: 64,
          borderRadius: 999,
          bgcolor: '#1c3c6f',
          mx: align === 'center' ? 'auto' : 0,
          opacity: 0.9,
        }}
      />
    </Box>
  );
}


