import PageContentSurface from '../components/PageContentSurface';
import React from 'react';
import { Box, CardContent, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import { Link as RouterLink } from 'react-router-dom';

function ValuesPage() {
  const values = [
    { title: 'Sportsmanship', body: 'Respect first — for opponents, teammates, and the game. We play hard and fair.', icon: <EmojiEventsIcon /> },
    { title: 'Community', body: 'A club should feel welcoming. New faces, new friends, and good vibes on and off court.', icon: <GroupsIcon /> },
    { title: 'Growth', body: 'From beginner basics to advanced tactics — we focus on steady improvement every session.', icon: <TrendingUpIcon /> },
    { title: 'Inclusivity', body: 'All skill levels are welcome. We create space for everyone to enjoy badminton.', icon: <VolunteerActivismIcon /> },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc="/optimized/unsw-15.jpg"
        imageAlt="Badminton values"
        title="Our"
        highlight="Values"
        subtitle="The culture we build is as important as the results we chase."
        imagePosition="center 35%"
      />

      <PageContentSurface>

      <Container data-page-content sx={{ py: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="UNSWBC" title="What we stand for" sx={{ mb: 'var(--club-heading-gap)' }} />
        </ScrollReveal>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {values.map((v, index) => (
            <Grid item xs={12} sm={6} md={3} key={v.title}>
              <ScrollReveal delay={index * 0.08}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      sx={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: 999,
                        bgcolor: 'var(--club-tint)',
                        color: 'var(--club-accent)',
                        display: 'grid',
                        placeItems: 'center',
                        mb: 2,
                      }}
                    >
                      {v.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                      {v.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      {v.body}
                    </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <TiltCard sx={{ bgcolor: 'var(--club-feature)', color: 'var(--club-text)' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Ready to jump in?
              </Typography>
              <Typography sx={{ mt: 1.5, color: 'var(--club-muted)', maxWidth: 760, lineHeight: 1.7 }}>
                Whether you're coming for social games, training, or competition, you'll find a place in the club.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <MagneticButton
                  component={RouterLink}
                  to="/sessions"
                  variant="contained"
                  sx={{ bgcolor: 'var(--club-accent)', color: 'var(--club-action-ink)', fontWeight: 900, '&:hover': { bgcolor: 'var(--club-accent-hover)' } }}
                >
                  Check Sessions &rarr;
                </MagneticButton>
              </Box>
            </CardContent>
          </TiltCard>
        </ScrollReveal>
      </Container>
      </PageContentSurface>
    </Box>
  );
}

export default ValuesPage;
