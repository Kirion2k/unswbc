import PageContentSurface from '../components/PageContentSurface';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';

const infoTiles = [
  { label: 'Every Friday', value: '2:00 – 4:00 PM' },
  { label: 'Location', value: 'UNSW FAC, Level 1' },
  { label: 'Price', value: '$25 per person' },
  { label: 'Level', value: 'Beginner & Intermediate' },
];

const expectCards = [
  {
    title: 'Coached sessions',
    body: 'Be coached by UNSW\'s most experienced players. Get personalised feedback and drills tailored to your level.',
  },
  {
    title: 'All skill levels',
    body: 'Whether you\'re working on cleaner drops, stronger smashes, or just want more court time — Friday trainings are for you.',
  },
  {
    title: 'Level up your game',
    body: 'Focused training every week builds consistency and confidence. This is your chance to improve faster than social sessions alone.',
  },
];

function TrainingsPage() {
  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc="/optimized/unsw-66.jpg"
        imageAlt="UNSW Badminton Club Friday Trainings"
        title="Friday"
        highlight="Trainings"
        subtitle="Sore today, stronger tomorrow. Coached sessions with UNSW's most experienced players."
      />

      <PageContentSurface>

      {/* ─── Key Info Tiles ─── */}
      <Box data-page-content sx={{ bgcolor: 'var(--club-section-tint)', py: 'var(--club-section-space)' }}>
        <Container>
          <ScrollReveal>
            <Typography
              sx={{
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--club-muted)',
                mb: 4,
              }}
            >
              Session Details
            </Typography>
          </ScrollReveal>
          <StaggerContainer staggerDelay={0.1}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {infoTiles.map((tile) => (
                <Grid item xs={6} md={3} key={tile.label}>
                  <StaggerItem>
                    <TiltCard
                      sx={{
                        bgcolor: 'var(--club-surface)',
                        border: '1px solid var(--club-line)',
                        borderRadius: 3,
                        height: '100%',
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 }, textAlign: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            color: 'var(--club-muted)',
                            mb: 1,
                          }}
                        >
                          {tile.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            color: 'var(--club-text)',
                            lineHeight: 1.25,
                          }}
                        >
                          {tile.value}
                        </Typography>
                      </CardContent>
                    </TiltCard>
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>

      {/* ─── What to Expect ─── */}
      <Container sx={{ py: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Training" align="center" title="What to expect" sx={{ mb: 'var(--club-heading-gap)' }} />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.12}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {expectCards.map((card, i) => (
              <Grid item xs={12} md={4} key={card.title}>
                <StaggerItem style={{ height: '100%' }}>
                  <TiltCard sx={{ height: '100%' }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                      <Box
                        sx={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '0.875rem',
                          bgcolor: 'var(--club-tint)',
                          color: 'var(--club-accent)',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 900,
                          fontSize: '1rem',
                          mb: 2,
                        }}
                      >
                        {i + 1}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: 'var(--club-text)' }}>
                        {card.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                        {card.body}
                      </Typography>
                    </CardContent>
                  </TiltCard>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        {/* ─── CTA Card ─── */}
        <ScrollReveal>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.25 }}
            sx={{
              bgcolor: 'var(--club-feature)',
              color: 'var(--club-text)',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <CardContent
              sx={{
                position: 'relative',
                zIndex: 1,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to train?
              </Typography>
              <Typography
                sx={{
                  color: 'var(--club-muted)',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  maxWidth: 520,
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                Spots are limited — register via Eventbrite to secure your place.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <MagneticButton
                  variant="contained"
                  component="a"
                  href="https://www.eventbrite.com/e/unsw-badminton-club-trainings-2026-tickets-1983248371266?aff=ebdsoporgprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{
                    bgcolor: 'var(--club-accent)',
                    color: 'var(--club-action-ink)',
                    fontWeight: 900,
                    px: 5,
                    py: 1.75,
                    fontSize: '1.05rem',
                    '&:hover': { bgcolor: 'var(--club-accent-hover)' },
                  }}
                >
                  Register on Eventbrite &rarr;
                </MagneticButton>
                <MagneticButton
                  variant="outlined"
                  component={RouterLink}
                  to="/sessions"
                  size="large"
                  sx={{
                    borderColor: 'var(--club-line)',
                    borderWidth: 2,
                    color: 'var(--club-text)',
                    fontWeight: 700,
                    px: 4,
                    py: 1.75,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: 'var(--club-accent)',
                      bgcolor: 'var(--club-tint)',
                    },
                  }}
                >
                  View Sessions &rarr;
                </MagneticButton>
              </Stack>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
      </PageContentSurface>
    </Box>
  );
}

export default TrainingsPage;
