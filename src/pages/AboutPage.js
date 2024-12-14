import React from 'react';
import { Typography, Box, Container, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Carousel from 'react-material-ui-carousel';

function AboutPage() {
  const imageSrc = "/unsw-4.jpg";
  const galleryImages = ["/unsw-1.jpg", "/unsw-5.jpg", "/unsw-3.jpg", "/unsw-2.jpg"];

  return (
    <Box>
      {/* Hero Section with Background Image */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }}
      >
        <motion.img
          src={imageSrc}
          alt="UNSW Badminton Club"
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
            <Typography variant="h2" component="div" sx={{ fontSize: '4em', fontWeight: 'bold' }}>
              <span>About</span> <span style={{ color: '#1c3c6f' }}>Us</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Welcome to UNSW Badminton Club
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem' }}>
            At UNSW Badminton Club, we bring together students and enthusiasts who share a passion
            for badminton. Our mission is to create a thriving community where players of all skill
            levels can improve, connect, and compete in a supportive and fun environment.
          </Typography>
        </motion.div>
        <Divider sx={{ my: 4 }} />

        {/* Grid for Key Focus Sections */}
        <Grid container spacing={4}>
          {[
            {
              title: 'Our Vision',
              description:
                'We aim to be the leading university badminton club in Australia, promoting excellence and inclusivity both on and off the court.',
              bgcolor: '#1c3c6f',
              color: 'white',
            },
            {
              title: 'Our Activities',
              description:
                'From weekly training sessions to social events and competitive tournaments, we offer something for everyone. Join us to sharpen your skills and make lifelong friends.',
              bgcolor: '#f8f9fa',
              color: 'black',
            },
            {
              title: 'Our Achievements',
              description:
                'With numerous championships and accolades under our belt, we take pride in fostering a winning spirit while nurturing new talent.',
              bgcolor: '#1c3c6f',
              color: 'white',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              >
                <Box
                  sx={{
                    bgcolor: item.bgcolor,
                    color: item.color,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    height: '300px', // Consistent height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      mb: 2,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '1rem', lineHeight: 1.5, mt: 1, opacity: 0.9 }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Closing Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container
          sx={{
            py: 8,
            textAlign: 'center',
            bgcolor: '#1c3c6f',
            color: 'white',
            borderRadius: 2,
            mt: 8,
            mb: 8
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Join Us Today!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.2rem' }}>
            Whether you're looking to improve your skills, meet new people, or just enjoy a game of
            badminton, UNSW Badminton Club is the place for you.
          </Typography>
          <Typography variant="h6">We can't wait to see you on the court!</Typography>
        </Container>
      </motion.div>
    </Box>
  );
}

export default AboutPage;
