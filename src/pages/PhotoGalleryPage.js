import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function PhotoGalleryPage() {
  // Use smoothed thumbnails for the grid (reduces visible grain), while still keeping
  // the original image paths for accessibility and future lightbox use.
  const galleryImages = [
    '/unsw-1.jpg',
    '/unsw-2.jpg',
    '/unsw-3.jpg',
    '/unsw-4.jpg',
    '/unsw-5.jpg',
    '/unsw-6.jpg',
    '/unsw-7.jpg',
    '/unsw-8.jpg',
    '/unsw-9.jpg',
    '/unsw-10.jpg',
    '/unsw-11.jpg',
    '/unsw-12.jpg',
    '/unsw-13.jpg',
    '/unsw-14.JPG',
    '/unsw-17.jpg',
    '/unsw-18.JPG',
    '/unsw-19.jpg',
    ...Array.from({ length: 62 }, (_, i) => `/unsw-${20 + i}.JPG`),
  ].map((full) => {
    const base = full.replace(/^\//, '').replace(/\.[^.]+$/, '');
    return {
      full,
      thumb: `/thumbs/${base}.jpg`,
    };
  });

  return (
    <Box>
      <PageHero
        imageSrc="/unsw-81.JPG"
        imageAlt="Photo Gallery"
        title="Photo"
        highlight="Gallery"
        subtitle="Moments from sessions, events, and competitions — the community on and off court."
      />

      {/* Gallery Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="Gallery" title="Our memories" sx={{ mb: 5 }} />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {galleryImages.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
              >
                <Card sx={{ overflow: 'hidden' }}>
                  <CardActionArea
                    sx={{
                      position: 'relative',
                      '&:hover img': { transform: 'scale(1.06)' },
                      '&:hover .unswbc-overlay': { opacity: 1 },
                      '&:hover .unswbc-caption': { opacity: 1, transform: 'translateY(0)' },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={img.thumb}
                        alt={`Gallery ${index + 1}`}
                        loading="lazy"
                        sx={{
                          height: { xs: 220, sm: 260, md: 320 },
                          objectFit: 'cover',
                          transition: 'transform 240ms ease',
                        }}
                      />
                      <Box
                        className="unswbc-overlay"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(to top, rgba(2,6,23,0.70), rgba(2,6,23,0.05))',
                          opacity: 0,
                          transition: 'opacity 240ms ease',
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        className="unswbc-caption"
                        sx={{
                          position: 'absolute',
                          left: 16,
                          bottom: 12,
                          color: 'white',
                          fontWeight: 800,
                          letterSpacing: '0.01em',
                          opacity: 0,
                          transform: 'translateY(6px)',
                          transition: 'all 240ms ease',
                        }}
                      >
                        Photo {index + 1}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PhotoGalleryPage;
