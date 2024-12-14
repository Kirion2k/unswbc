import React from 'react';
import { Typography, Box, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';

function PhotoGalleryPage() {
  const galleryImages = [
    '/unsw-1.jpg',
    '/unsw-2.jpg',
    '/unsw-3.jpg',
    '/unsw-4.jpg',
    '/unsw-5.jpg',
    '/unsw-13.jpg',
    '/unsw-7.jpg',
    '/unsw-8.jpg',
    '/unsw-11.jpg'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }}
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/unsw-4.jpg"
          alt="Photo Gallery"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.5 }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" sx={{ fontSize: '4em', fontWeight: 'bold' }}>
              <span>Photo</span> <span style={{ color: '#1c3c6f' }}>Gallery</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Gallery Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            color: '#1c3c6f',
            textTransform: 'uppercase',
          }}
        >
          Our Memories
        </Typography>
        <Grid container spacing={4}>
          {galleryImages.map((src, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <motion.img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    whileHover={{ transform: 'scale(1.1)' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {`Photo ${index + 1}`}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PhotoGalleryPage;
