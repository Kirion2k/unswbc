import React from 'react';
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import LinktreeIcon from './LinktreeIcon';
import lightLogo from './logo full/logo-full-blue.png';
import darkLogo from './logo full/logo-full-white.png';
import DiscordIcon from './DiscordIcon';
import { useClubTheme } from './ClubThemeProvider';
import { DISCORD_INVITE } from '../utils/clubLinks';

const clubLinks = [
  { label: 'Sessions', to: '/sessions' },
  { label: 'Training', to: '/trainings' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact us', to: '/contact' },
];

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/UNSWBC', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/unswbadminton', Icon: Instagram },
  { label: 'Discord', href: DISCORD_INVITE, Icon: DiscordIcon },
  { label: 'Linktree', href: 'https://linktr.ee/unswbc', Icon: LinktreeIcon },
];

export default function Footer() {
  const { mode } = useClubTheme();
  const logo = mode === 'dark' ? darkLogo : lightLogo;
  return (
    <Box component="footer" sx={{ bgcolor: 'var(--club-canvas)', color: 'var(--club-text)' }}>
      <Container sx={{ pt: { xs: 5, md: 6 }, pb: 3, borderTop: '1px solid var(--club-line)' }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={5}>
            <Link component={RouterLink} to="/" aria-label="UNSW Badminton Club home" sx={{ display: 'inline-block' }}>
              <img data-footer-logo src={logo} alt="UNSWBC" style={{ height: 32, width: 'auto' }} />
            </Link>
            <Typography sx={{ mt: 2, maxWidth: '34ch', color: 'var(--club-muted)', lineHeight: 1.7 }}>
              Social play, training, and competition. A badminton community for every level at UNSW.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5 }}>
              {socials.map(({ label, href, Icon }) => (
                <IconButton
                  key={label} href={href} aria-label={`UNSW Badminton Club ${label}`}
                  target="_blank" rel="noopener noreferrer"
                  sx={{ width: 44, height: 44, color: 'var(--club-muted)', transition: 'color 180ms ease, background-color 180ms ease', '&:hover': { color: 'var(--club-accent)', bgcolor: 'var(--club-tint)' } }}
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
                <Link key={to} component={RouterLink} to={to} underline="hover" sx={{ color: 'var(--club-muted)', fontSize: '0.9rem', textUnderlineOffset: '0.2em', '&:hover': { color: 'var(--club-accent)' } }}>
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={7} md={4}>
            <Typography component="h2" sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1.5 }}>Find us</Typography>
            <Typography sx={{ color: 'var(--club-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              UNSW Fitness and Aquatic Centre<br />
              B5, Gate 2, High Street<br />
              Kensington NSW 2033
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 2.5, borderColor: 'var(--club-line)' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--club-muted)' }}>
            &copy; 2027 UNSW Badminton Club
          </Typography>
          <Typography sx={{ fontSize: '0.625rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.01em', color: 'var(--club-muted)' }}>
            Website made by{' '}
            <Link href="https://www.linkedin.com/in/leoxu0406/" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ color: 'inherit', textUnderlineOffset: '0.2em', '&:hover': { color: 'var(--club-accent)' } }}>
              Leo Xu
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
