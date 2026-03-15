import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const scroll = keyframes`
  0% { transform: translateX(-18%); }
  100% { transform: translateX(-68%); }
`;

export default function LogoMarquee({ logos, speed = 30 }) {
  // Duplicate logos for seamless loop
  const items = [...logos, ...logos];

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        py: 2,
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
          width: 'max-content',
          animation: `${scroll} ${speed}s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {items.map((logo, i) => (
          <Box
            key={i}
            component="img"
            src={logo.src}
            alt={logo.alt}
            sx={{
              height: { xs: 36, md: 48 },
              width: 'auto',
              maxWidth: 140,
              filter: 'grayscale(100%) opacity(0.5)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'grayscale(0%) opacity(1)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
