import PageContentSurface from '../components/PageContentSurface';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import ChampionshipHonours from '../components/ChampionshipHonours';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
// import MiniInstagramGrid from '../components/MiniInstagramGrid';

function AboutPage() {
  const imageSrc = "/optimized/unsw-22.jpg";

  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        title="About"
        highlight="Us"
        subtitle="UNSWBC is a friendly badminton community that supports social play, training, and competitive opportunities."
        imagePosition="center 25%"
      />

      <PageContentSurface>

      <Container data-page-content sx={{ py: 'var(--club-section-space)' }}>
        <SectionHeading overline="UNSWBC" align="center" title="Welcome to the club" sx={{ mb: 'var(--club-heading-gap)' }} />

        <ScrollReveal>
          <Card>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5 }}>
                A badminton club built on community
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                UNSW Badminton Club is a welcoming space for anyone who loves badminton, whether you are picking up a racket
                for the first time, coming along with friends for social games, or training with competitive goals.
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                We focus on the things that keep a club strong: fair play, good sportsmanship, and an inclusive culture where
                new players feel comfortable asking questions. Our sessions run smoothly with a queueing system, quality shuttles,
                and a committee that cares about everyone getting on court.
            </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Beyond weekly sessions, we bring the community together through socials, events, and competition, creating a place
                where you can improve your game and build friendships that last beyond uni.
          </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                If you are new, we will help you settle in quickly. If you are experienced, you will find strong games, good training
                partners, and chances to represent the club in competitions.
          </Typography>
            </CardContent>
          </Card>
        </ScrollReveal>

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        <SectionHeading overline="What we do" align="center" title="Vision and activities" sx={{ mb: 'var(--club-heading-gap)' }} />

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {[
            {
              title: 'Our Vision',
              description:
                'To be Australia’s leading university badminton club, where every player feels welcome, improves with confidence, and represents the club with pride.',
              image: '/optimized/unsw-55.jpg',
              points: [
                'A friendly place for beginners and regulars',
                'A clear pathway for players who want to improve',
                'A club culture built on respect and good sportsmanship',
              ],
            },
            {
              title: 'Our Activities',
              description:
                'Weekly sessions, training support, socials, and tournaments, built around smooth operations so everyone gets fair court time and a great experience.',
              image: '/optimized/unsw-44.jpg',
              points: [
                'Weekly social sessions with fair rotations',
                'Training focused on fundamentals and match play',
                'Events that help members meet people and stay involved',
              ],
            },
          ].map((item, index) => (
            <Grid item xs={12} key={item.title}>
              <ScrollReveal delay={index * 0.05}>
                <TiltCard sx={{ overflow: 'hidden' }}>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <CardMedia
                        component="img"
                        loading="lazy"
                        decoding="async"
                        image={item.image}
                        alt={item.title}
                        sx={{ height: { xs: 220, sm: 280, md: '100%' }, minHeight: { md: '20rem' }, objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.25, color: 'var(--club-accent)' }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                          {item.description}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                          {item.points.map((p) => (
                            <Box key={p} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', mt: 1 }}>
                              <Box
                                sx={{
                                  mt: '9px',
                                  height: 8,
                                  width: 8,
                                  borderRadius: 999,
                                  bgcolor: '#1c3c6f',
                                  opacity: 0.85,
                                  flex: '0 0 auto',
                                }}
                              />
                              <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                                {p}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        <Box sx={{ mb: 'var(--club-section-space)' }}><ChampionshipHonours /></Box>

        <SectionHeading overline="Experience" align="center" title="What to expect" sx={{ mb: 'var(--club-heading-gap)' }} />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {[
            {
              title: 'If you are new',
              body:
                'Bring a racket if you have one. If not, ask a committee member and we will help. You can start with social games and learn the basics over time.',
            },
            {
              title: 'If you are returning or competitive',
              body:
                'You will find faster games, strong training partners, and chances to join team events. Our goal is to support improvement without losing the community feel.',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={item.title}>
              <ScrollReveal delay={index * 0.05}>
                <TiltCard sx={{ height: '100%' }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: 'var(--club-accent)' }}>
                    {item.title}
                  </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                      {item.body}
                  </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── Instagram Mini Grid ─── */}
      {/* Temporarily hidden until the Instagram feed is available.

      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="News" title="Latest from Instagram" sx={{ mb: 3 }} />
        </ScrollReveal>
        <MiniInstagramGrid maxItems={6} columns={3} />
      </Container>
      */}

      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <Card sx={{ bgcolor: 'var(--club-feature)', color: 'var(--club-text)' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Join us on court
              </Typography>
              <Typography sx={{ color: 'var(--club-muted)', lineHeight: 1.8, maxWidth: 820 }}>
                Whether you are here to improve your skills, meet new people, or just enjoy a great game,
                UNSW Badminton Club is the place for you.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 2 }}>
                We cannot wait to see you at a session.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <MagneticButton
                  component={RouterLink}
                  to="/sessions"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 2.2,
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    bgcolor: 'var(--club-accent)',
                    color: 'var(--club-action-ink)',
                    '&:hover': { bgcolor: 'var(--club-accent-hover)' },
                  }}
                >
                  Join us today &rarr;
                </MagneticButton>
              </Box>
            </CardContent>
          </Card>
        </ScrollReveal>
        </Container>
      </PageContentSurface>
    </Box>
  );
}

export default AboutPage;
