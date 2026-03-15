import React from 'react';
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './logo full/logo-full-white.png';
import { StaggerContainer, StaggerItem } from './ScrollReveal';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1c3c6f',
        color: 'white',
        mt: 10,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #123456, #1c3c6f, #123456)',
        },
      }}
    >
      <Container sx={{ py: 6 }}>
        <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <StaggerItem>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <img src={logo} alt="UNSWBC Logo" style={{ height: 44 }} />
                </Box>
                <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.85)', maxWidth: 420 }}>
                  A welcoming badminton community at UNSW, social play, training, and competition.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton
                    component={motion.a}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/UNSWBC"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.10)' }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    component={motion.a}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/unswbadminton"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.10)' }}
                  >
                    <Instagram />
                  </IconButton>
                </Box>
              </StaggerItem>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StaggerItem>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Quick links</Typography>
                <Box sx={{ display: 'grid', gap: 0.75 }}>
                  {[
                    { label: 'Home', to: '/' },
                    { label: 'Sessions', to: '/sessions' },
                    { label: 'FAQs', to: '/faqs' },
                    { label: 'Contact', to: '/contact' },
                  ].map((l) => (
                    <Link
                      key={l.to}
                      component={RouterLink}
                      to={l.to}
                      underline="none"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        transition: 'all 0.2s ease',
                        '&:hover': { color: 'white', pl: 0.5 },
                        width: 'fit-content',
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </Box>
              </StaggerItem>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StaggerItem>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Location</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  Fitness and Aquatic Centre (B5), Gate 2, High St, UNSW Sydney, Kensington NSW 2033, Australia
                </Typography>
              </StaggerItem>
            </Grid>
          </Grid>
        </StaggerContainer>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          &copy; 2026 UNSW Badminton Club. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
