import React from 'react';
import { Typography, Box, Container, Link } from '@mui/material';
import { motion } from 'framer-motion';

function ViewQueue() {
  const imageSrc = "/unsw-12.jpg";
  const url = "https://docs.google.com/spreadsheets/d/1a9TLKEM79mzx6ejC3jWNTvI48dwp9oxFfQGGByDrNag/edit?gid=0#gid=0";

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#f8f9fa' }}>
      {/* Background image section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }} // Changed height to 100vh
      >
        <img
          src={imageSrc}
          alt="UNSW Badminton Club"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 1%',
            opacity: 0.35,
          }}
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
              <span>View</span>{' '}
              <span style={{ color: '#1c3c6f' }}>Queue</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Iframe section */}
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2, color: '#1c3c6f' }}
          >
            Queueing System
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: '#555',
            }}
          >
            Click the link below to open the queue in a new tab.
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 'bold',
              color: '#1c3c6f',
              transition: 'color 0.3s',
              '&:hover': {
                color: '#123456',
                textDecoration: 'underline',
              },
            }}
          >
            View the Queue here
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '75vh',
              border: '1px solid #ddd',
              borderRadius: 2,
              overflow: 'hidden',
              mt: 4,
            }}
          >
            <iframe
              src={url}
              title="View Queue"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            >
              Your browser does not support iframes.
            </iframe>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ViewQueue;
