import React from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

function MeetTheTeamPage() {
  const executives = [
    { name: 'John Doe', position: 'President', img: '/team/president.jpg' },
    { name: 'Jane Smith', position: 'Vice President', img: '/team/vice-president.jpg' },
    { name: 'Alice Brown', position: 'Secretary', img: '/team/secretary.jpg' },
    { name: 'Bob Green', position: 'Treasurer', img: '/team/treasurer.jpg' },
    { name: 'Charlie White', position: 'ARC Delegate', img: '/team/arc-delegate.jpg' },
    { name: 'Emily Black', position: 'Grievance Officer', img: '/team/grievance-officer.jpg' },
  ];

  const committee = [
    '/team/committee-1.jpg',
    '/team/committee-2.jpg',
    '/team/committee-3.jpg',
    '/team/committee-4.jpg',
    '/team/committee-5.jpg',
    '/team/committee-6.jpg',
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
          alt="Meet the Team"
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
              Meet the <span style={{ color: '#1c3c6f' }}>Team</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Executives Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textTransform: 'uppercase',
            color: '#1c3c6f',
          }}
        >
          Executives
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {executives.map((exec, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={exec.img}
                    alt={exec.name}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                  <Box sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {exec.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {exec.position}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Committee Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textTransform: 'uppercase',
            color: '#1c3c6f',
          }}
        >
          Committee Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {committee.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img}
                    alt={`Committee ${index + 1}`}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default MeetTheTeamPage;
