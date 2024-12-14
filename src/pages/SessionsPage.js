import React from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

function SessionsPage() {
  const imageSrc = "/unsw-11.jpg";

  const sessions = [
    {
      title: 'Monday Night Training',
      time: '6:00 PM - 9:00 PM',
      location: 'UNSW Gymnasium',
      description: 'Focused drills and skill development sessions led by experienced coaches.',
    },
    {
      title: 'Wednesday Social Play',
      time: '7:00 PM - 10:00 PM',
      location: 'UNSW Indoor Courts',
      description: 'Join us for casual games and meet other badminton enthusiasts.',
    },
    {
      title: 'Friday Advanced Training',
      time: '5:30 PM - 8:30 PM',
      location: 'UNSW Sports Hall',
      description: 'Exclusive sessions for advanced players looking to compete at higher levels.',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }}
      >
        <motion.img
          src={imageSrc}
          alt="UNSW Badminton Club"
          style={{
            width: '100%',
            height: '100%',
            objectPosition: 'center 20%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2 }}
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
            <Typography variant="h2" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
              <span>Club</span>{' '}
              <span style={{ color: '#1c3c6f' }}>Sessions</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Sessions Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#1c3c6f' }}
        >
          Our Weekly Sessions
        </Typography>
        <Grid container spacing={4}>
          {sessions.map((session, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', color: '#1c3c6f', mb: 2 }}
                  >
                    {session.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Time:</strong> {session.time}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                    <strong>Location:</strong> {session.location}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    {session.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default SessionsPage;
