import React from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';

function SessionsPage() {
  const imageSrc = "/unsw-11.jpg";

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

      {/* Content Sections */}
      <Container sx={{ py: 8, maxWidth: 'lg', mx: 'auto' }}>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#1c3c6f' }}
        >
          Important Information
        </Typography>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {[{
            title: 'Registration',
            content: [
              'No prior sign-ups/registrations are needed before the session.',
              'Come to our desk on the day to register and pay for the session.',
              'There is no need to inform us in advance before joining.',
            ],
          }, {
            title: 'Location',
            content: ['UNSW Fitness and Aquatic Center, Level 1 (Upstairs)'],
          }, {
            title: 'Payment Details',
            content: [
              'Name: UNSW Badminton Club',
              'BSB: 062-303',
              'Account: 10885979',
              '*Please reference your full nane in the payment*',
              'We accept Cash or Bank Transfer on arrival at our sessions.',
            ],
          }, {
            title: 'Courts',
            content: [
              'The club offers 6 courts for play during sessions.',
              'However, during wet weather, the gym experiences leaks which cause some courts to be closed (increasing wait times).',
            ],
          }].map((section, index) => (
            <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                sx={{
                  bgcolor: index % 2 === 0 ? '#1c3c6f' : '#f8f9fa',
                  color: index % 2 === 0 ? 'white' : '#555',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {section.content.map((line, i) => (
                    <span key={i} style={{ display: 'block', marginBottom: '8px' }}>{line}</span>
                  ))}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Sessions Section */}
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mt: 6, mb: 4, color: '#1c3c6f' }}
        >
          Sessions
        </Typography>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {[{
            title: 'Tuesdays 6-10pm',
            content: [
              'Members: $10',
              'Vistors: $15',
            ],
          }, {
            title: 'Saturdays 1-4pm or 4-7pm',
            content: [
              'Members: $8',
              'Vistors: $13',
            ],
          }, {
            title: 'Saturdays 1-7pm',
            content: [
              'Members: $15',
              'Vistors: $25',
            ],
          }].map((section, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                sx={{
                  bgcolor: '#1c3c6f',
                  color: 'white',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {section.content.map((line, i) => (
                    <span key={i} style={{ display: 'block', marginBottom: '8px' }}>{line}</span>
                  ))}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Memberships Section */}
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mt: 6, mb: 4, color: '#1c3c6f' }}
        >
          Memberships
        </Typography>
        <Typography
          sx={{ textAlign: 'center', fontWeight: 'bold', mt: 6, mb: 4, color: '#555' }}
        >
          Note: Memberships resets every following year on 1st Feb
        </Typography>


        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {[{
            title: 'Term 1',
            content: [
              'From 1st Feb',
              'UNSW Students: $75',
              'UNSW Staff/Alumni: $90',
              'General Public: $110'
            ],
          }, {
            title: 'Term 2',
            content: [
              'From 1st Jun',
              'UNSW Students: $60',
              'UNSW Staff/Alumni: $75',
              'General Public: $90'
            ],
          }, {
            title: 'Term 3',
            content: [
              'From 1st Sep',
              'UNSW Students: $45',
              'UNSW Staff/Alumni: $60',
              'General Public: $75'
            ],
          }].map((section, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                sx={{
                  bgcolor: 'white',
                  color: '#555',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {section.content.map((line, i) => (
                    <span key={i} style={{ display: 'block', marginBottom: '8px' }}>{line}</span>
                  ))}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
}

export default SessionsPage;
