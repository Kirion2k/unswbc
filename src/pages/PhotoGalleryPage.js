import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Container, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

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

  // Masonry height pattern — alternate between tall and short
  const getHeight = (index) => {
    const pattern = [320, 240, 280, 360, 260, 300];
    return pattern[index % pattern.length];
  };

  return (
    <Box>
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
            <ScrollReveal
              key={index}
              delay={Math.min(index * 0.02, 0.4)}
              style={{ breakInside: 'avoid', marginBottom: '16px' }}
            >
              <Card
                sx={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 20px 60px rgba(2,6,23,0.15)',
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    '&:hover img': { transform: 'scale(1.06)' },
                    '&:hover .unswbc-overlay': { opacity: 1 },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={img.thumb}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                      sx={{
                        height: { xs: 220, sm: getHeight(index) },
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    <Box
                      className="unswbc-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(2,6,23,0.70), rgba(2,6,23,0.05))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        position: 'absolute',
                        left: 16,
                        bottom: 12,
                        color: 'white',
                        fontWeight: 800,
                        opacity: 0,
                        transform: 'translateY(6px)',
                        transition: 'all 0.3s ease',
                        '.unswbc-overlay:hover ~ &, .MuiCardActionArea-root:hover &': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      Photo {index + 1}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default PhotoGalleryPage;
