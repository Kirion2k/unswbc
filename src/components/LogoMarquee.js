import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

export default function LogoMarquee({ logos, speed = 30 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { margin: '100px' });
  return (
    <Box
      ref={ref}
      data-partner-marquee
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
          '&:hover > *': { animationPlayState: 'paused' },
        }}
      >
        {[0, 1].map((copy) => (
          <Box
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexShrink: 0,
              minWidth: '100%',
              gap: { xs: 3, md: 4 },
              pr: { xs: 3, md: 4 },
              boxSizing: 'border-box',
              animation: `${scroll} ${speed}s linear infinite`,
              animationPlayState: visible ? 'running' : 'paused',
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <Box
                key={i}
                sx={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  height: { xs: 60, md: 76 }, px: { xs: 1, md: 1.5 },
                  bgcolor: '#ffffff', borderRadius: '0.875rem', flexShrink: 0,
                }}
              >
                <Box
                  component="img" src={logo.src} alt={i < logos.length ? logo.alt : ''}
                  sx={{ height: { xs: 36, md: 48 }, width: 'auto', maxWidth: 140 }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
