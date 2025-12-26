import React from 'react';
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logo from './logo full/logo-full-white.png';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1c3c6f', color: 'white', mt: 10 }}>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <img src={logo} alt="UNSWBC Logo" style={{ height: 44 }} />
            </Box>
            <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.85)', maxWidth: 420 }}>
              A welcoming badminton community at UNSW — social play, training, and competition.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton
                href="https://www.facebook.com/UNSWBC"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.10)', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/unswbadminton"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.10)', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' } }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Quick links
            </Typography>
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
                    '&:hover': { color: 'white', textDecoration: 'underline' },
                    width: 'fit-content',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Location
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
              UNSW Fitness & Aquatic Centre (Sports Hall)
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', mt: 1 }}>
              Sydney, NSW
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          © 2026 UNSW Badminton Club. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
