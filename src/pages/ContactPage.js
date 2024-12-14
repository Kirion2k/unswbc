import React from 'react';
import { Typography, Box, Container, Grid, TextField, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';

function ContactPage() {
  const imageSrc = "/unsw-19.jpg"; // Replace with your desired background image

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#f8f9fa' }}>
      {/* Background image section */}
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 0%',
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
              <span>Contact</span>{' '}
              <span style={{ color: '#1c3c6f' }}>Us</span>
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Contact form section */}
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
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#1c3c6f' }}
          >
            Get in Touch
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#1c3c6f',
                color: 'white',
                '&:hover': { bgcolor: '#123456' },
                px: 4,
                py: 1,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Social Media Links */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#1c3c6f' }}
        >
          Connect with Us
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#1c3c6f',
                textDecoration: 'none',
                '&:hover': { color: '#123456' },
              }}
            >
              <InstagramIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Instagram</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#1c3c6f',
                textDecoration: 'none',
                '&:hover': { color: '#123456' },
              }}
            >
              <FacebookIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Facebook</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
            <Link
              href="mailto:unswbadminton@example.com"
              sx={{
                color: '#1c3c6f',
                textDecoration: 'none',
                '&:hover': { color: '#123456' },
              }}
            >
              <EmailIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Email</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
            <Link
              href="https://linktr.ee/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#1c3c6f',
                textDecoration: 'none',
                '&:hover': { color: '#123456' },
              }}
            >
              <LinkIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography>Linktree</Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactPage;
