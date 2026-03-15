import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: Math.min(i * 0.018, 0.35),
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

function PhotoGalleryPage() {
  const galleryImages = [
    '/unsw-1.jpg', '/unsw-2.jpg', '/unsw-3.jpg', '/unsw-4.jpg', '/unsw-5.jpg',
    '/unsw-6.jpg', '/unsw-7.jpg', '/unsw-8.jpg', '/unsw-9.jpg', '/unsw-10.jpg',
    '/unsw-11.jpg', '/unsw-12.jpg', '/unsw-13.jpg', '/unsw-14.JPG', '/unsw-17.jpg',
    '/unsw-18.JPG', '/unsw-19.jpg',
    ...Array.from({ length: 62 }, (_, i) => `/unsw-${20 + i}.JPG`),
  ].map((full) => {
    const base = full.replace(/^\//, '').replace(/\.[^.]+$/, '');
    return { full, thumb: `/thumbs/${base}.jpg` };
  });

  const [selected, setSelected] = useState(null);

  const getHeight = (index) => {
    const pattern = [320, 240, 280, 360, 260, 300];
    return pattern[index % pattern.length];
  };

  const prev = useCallback(() =>
    setSelected((i) => (i - 1 + galleryImages.length) % galleryImages.length),
    [galleryImages.length]
  );

  const next = useCallback(() =>
    setSelected((i) => (i + 1) % galleryImages.length),
    [galleryImages.length]
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (selected === null) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-81.JPG"
        imageAlt="Photo Gallery"
        title="Photo"
        highlight="Gallery"
        subtitle="Moments from sessions, events, and competitions. The community on and off court."
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="Gallery" title="Our memories" sx={{ mb: 5 }} />

        <Box
          sx={{
            columns: { xs: 1, sm: 2, md: 3 },
            columnGap: { xs: 2, md: 3 },
          }}
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              style={{ breakInside: 'avoid', marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => setSelected(index)}
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 4px 18px rgba(2,6,23,0.09)',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={img.thumb}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: { xs: 220, sm: getHeight(index) },
                    objectFit: 'cover',
                    transition: 'transform 0.45s ease',
                    '.MuiBox-root:hover &': { transform: 'scale(1.07)' },
                  }}
                />

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.08) 60%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.35)',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          border: '2px solid white',
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      View photo
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9500,
              background: 'rgba(2, 6, 23, 0.96)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setSelected(null)}
          >
            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selected}
                src={galleryImages[selected].full}
                alt={`Photo ${selected + 1}`}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  maxWidth: '88vw',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  borderRadius: 10,
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Counter */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 999,
                px: 2.5,
                py: 0.75,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography sx={{ color: 'white', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                {selected + 1} / {galleryImages.length}
              </Typography>
            </Box>

            {/* Close */}
            <IconButton
              onClick={() => setSelected(null)}
              aria-label="Close"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'rgba(255,255,255,0.7)',
                bgcolor: 'rgba(255,255,255,0.08)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', color: 'white' },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Prev */}
            <IconButton
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              sx={{
                position: 'absolute',
                left: { xs: 8, md: 20 },
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.08)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 32 }} />
            </IconButton>

            {/* Next */}
            <IconButton
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              sx={{
                position: 'absolute',
                right: { xs: 8, md: 20 },
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.08)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default PhotoGalleryPage;
