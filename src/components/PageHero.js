import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import LetterAnimation from './LetterAnimation';

export default function PageHero({
  imageSrc,
  imageAlt,
  imagePosition = 'center',
  title,
  highlight,
  subtitle,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '100vh', sm: '100vh', md: '100vh' },
        bgcolor: 'black',
        overflow: 'hidden',
      }}
    >
      <Box
        component={motion.img}
        src={imageSrc}
        alt={imageAlt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        initial={prefersReducedMotion ? { opacity: 0.56 } : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.56, scale: 1 }}
        transition={{ duration: 1.6 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          objectFit: 'cover',
          objectPosition: imagePosition,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 600px at 50% 30%, rgba(28,60,111,0.14), rgba(0,0,0,0.34)), linear-gradient(to bottom, rgba(0,0,0,0.34), rgba(0,0,0,0.56))',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: { xs: '100vh', sm: '100vh', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 9, sm: 10, md: 12 },
          pb: { xs: 6, sm: 7, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: 820, textAlign: { xs: 'left', md: 'left' } }}>
          {children || (
            <>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2.15rem', sm: '2.7rem', md: '4rem' },
                  lineHeight: 1.05,
                  fontWeight: 900,
                }}
              >
                <LetterAnimation text={title || ''} delay={0.2} staggerDelay={0.03} />{' '}
                {highlight ? (
                  <Box component="span" sx={{ color: '#1c3c6f' }}>
                    <LetterAnimation text={highlight} delay={0.4} staggerDelay={0.03} />
                  </Box>
                ) : null}
              </Typography>
              {subtitle ? (
                <Typography
                  component={motion.p}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  sx={{
                    mt: 2,
                    color: 'rgba(255,255,255,0.86)',
                    fontSize: { xs: '0.98rem', sm: '1.05rem', md: '1.2rem' },
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
