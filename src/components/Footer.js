import React from 'react';
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import LinktreeIcon from './LinktreeIcon';
import logo from './logo full/logo-full-white.png';

const clubLinks = [
  { label: 'Sessions', to: '/sessions' },
  { label: 'Training', to: '/trainings' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact us', to: '/contact' },
];

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/UNSWBC', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/unswbadminton', Icon: Instagram },
  { label: 'Linktree', href: 'https://linktr.ee/unswbc', Icon: LinktreeIcon },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#10213b', color: 'white', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Container sx={{ pt: { xs: 5, md: 6 }, pb: 3 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={5}>
            <Link component={RouterLink} to="/" aria-label="UNSW Badminton Club home" sx={{ display: 'inline-block' }}>
              <img src={logo} alt="UNSWBC" style={{ height: 32, width: 'auto' }} />
            </Link>
            <Typography sx={{ mt: 2, maxWidth: '34ch', color: 'rgba(255,255,255,0.74)', lineHeight: 1.7 }}>
              Social play, training, and competition. A badminton community for every level at UNSW.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5 }}>
              {socials.map(({ label, href, Icon }) => (
                <IconButton
                  key={label} href={href} aria-label={`UNSW Badminton Club ${label}`}
                  target="_blank" rel="noopener noreferrer"
                  sx={{ width: 44, height: 44, color: 'rgba(255,255,255,0.8)', transition: 'color 180ms ease, background-color 180ms ease', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={5} md={3}>
            <Typography component="h2" sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1.5 }}>Club links</Typography>
            <Box component="nav" aria-label="Footer navigation" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
              {clubLinks.map(({ label, to }) => (
                <Link key={to} component={RouterLink} to={to} underline="hover" sx={{ color: 'rgba(255,255,255,0.74)', fontSize: '0.9rem', textUnderlineOffset: '0.2em', '&:hover': { color: 'white' } }}>
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={7} md={4}>
            <Typography component="h2" sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1.5 }}>Find us</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.74)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              UNSW Fitness and Aquatic Centre<br />
              B5, Gate 2, High Street<br />
              Kensington NSW 2033
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 2.5, borderColor: 'rgba(255,255,255,0.12)' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.66)' }}>
            &copy; 2027 UNSW Badminton Club
          </Typography>
          <Typography sx={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.66)' }}>
            Website made by{' '}
            <Link href="https://www.linkedin.com/in/leoxu0406/" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: 'inherit', textUnderlineOffset: '0.2em', '&:hover': { color: 'white' } }}>
              Leo Xu
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
