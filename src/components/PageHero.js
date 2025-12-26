import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function PageHero({
  imageSrc,
  imageAlt,
  imagePosition = 'center',
  title,
  highlight,
  subtitle,
  children,
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '72vh', md: '88vh' },
        bgcolor: 'black',
        overflow: 'hidden',
      }}
    >
      <Box
        component={motion.img}
        src={imageSrc}
        alt={imageAlt}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 0.48, scale: 1 }}
        transition={{ duration: 1.4 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          objectFit: 'cover',
          objectPosition: imagePosition,
        }}
      />

      {/* Overlay gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 600px at 50% 30%, rgba(28,60,111,0.20), rgba(0,0,0,0.42)), linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0.62))',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: { xs: '72vh', md: '88vh' },
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 10, md: 12 }, // account for fixed header
          pb: { xs: 8, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: 820, textAlign: { xs: 'left', md: 'left' } }}>
          {children || (
            <>
              <Typography
                component={motion.h1}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
                variant="h2"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2.6rem', sm: '3.2rem', md: '4rem' },
                  lineHeight: 1.05,
                }}
              >
                {title}{' '}
                {highlight ? <Box component="span" sx={{ color: '#1c3c6f' }}>{highlight}</Box> : null}
              </Typography>
              {subtitle ? (
                <Typography
                  component={motion.p}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  sx={{
                    mt: 2,
                    color: 'rgba(255,255,255,0.86)',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    lineHeight: 1.6,
                    maxWidth: 700,
                  }}
                >
                  {subtitle}
                </Typography>
              ) : null}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}


