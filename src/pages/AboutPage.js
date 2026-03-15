import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';

function AboutPage() {
  const imageSrc = "/unsw-14.JPG";

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        title="About"
        highlight="Us"
        subtitle="UNSWBC is a friendly badminton community that supports social play, training, and competitive opportunities."
        imagePosition="center 25%"
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="UNSWBC" title="Welcome to the club" sx={{ mb: 5 }} />

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

        <Divider sx={{ my: 5 }} />

        <SectionHeading overline="What we do" title="Vision and activities" sx={{ mb: 4 }} />

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {[
            {
              title: 'Our Vision',
              description:
                'To be Australia’s leading university badminton club, where every player feels welcome, improves with confidence, and represents the club with pride.',
              image: '/unsw-55.JPG',
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
              image: '/unsw-44.JPG',
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
                        image={item.image}
                        alt={item.title}
                        sx={{ height: { xs: 220, sm: 280, md: '100%' }, minHeight: { md: 320 }, objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.25, color: '#1c3c6f' }}>
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

        <Divider sx={{ my: 5 }} />

        <Box sx={{ py: { xs: 4, md: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#1c3c6f',
                letterSpacing: '0.14em',
                fontWeight: 900,
              }}
            >
              Highlights
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mt: 0.5,
                fontSize: { xs: '2rem', sm: '2.3rem', md: '2.6rem' },
                lineHeight: 1.15,
              }}
            >
              Our achievements
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                height: 4,
                width: 72,
                borderRadius: 999,
                bgcolor: '#1c3c6f',
                mx: 'auto',
                opacity: 0.9,
              }}
            />
          </Box>

          <ScrollReveal>
            <Card sx={{ overflow: 'hidden', borderRadius: 4 }}>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: { xs: 520, md: 460 },
                  display: 'flex',
                  alignItems: 'stretch',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/unsw-29.JPG)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(28,60,111,0.96), rgba(28,60,111,0.86) 46%, rgba(2,6,23,0.15) 100%)',
                  }}
                />

                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    px: { xs: 3, md: 6 },
                    py: { xs: 4, md: 6 },
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '100%', maxWidth: 720 }}>
                  <Typography
                      variant="overline"
                    sx={{
                        letterSpacing: '0.14em',
                        fontWeight: 900,
                        color: 'rgba(255,255,255,0.82)',
                      }}
                    >
                      UniSport Nationals
                  </Typography>
                  <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        lineHeight: 1.12,
                        mt: 0.5,
                        fontSize: { xs: '1.9rem', sm: '2.2rem', md: '2.4rem' },
                      }}
                    >
                      Champions in 2024 and 2025
                    </Typography>
                    <Typography sx={{ mt: 1.25, color: 'rgba(255,255,255,0.9)', lineHeight: 1.85 }}>
                      UNSW won the UniSport Nationals badminton title in 2024 and 2025. We are one of the top badminton universities
                      in Australia, with national level players and a strong team culture that lifts everyone around them.
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.10)',
                            border: '1px solid rgba(255,255,255,0.10)',
                          }}
                        >
                          <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.35rem', md: '1.65rem' }, lineHeight: 1.1 }}>
                            2024 / 2025
                          </Typography>
                          <Typography sx={{ mt: 0.5, color: 'rgba(255,255,255,0.85)' }}>
                            UniSport Nationals titles
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.10)',
                            border: '1px solid rgba(255,255,255,0.10)',
                          }}
                        >
                          <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.35rem', md: '1.65rem' }, lineHeight: 1.1 }}>
                            150+
                          </Typography>
                          <Typography sx={{ mt: 0.5, color: 'rgba(255,255,255,0.85)' }}>
                            active members
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      {[
                        'National level players who raise the standard of training and matches',
                        'A wide member base from beginners to competitive athletes',
                        'A culture built around improvement, respect, and team pride',
                      ].map((p) => (
                        <Box key={p} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', mt: 1 }}>
                          <Box
                            sx={{
                              mt: '9px',
                              height: 8,
                              width: 8,
                              borderRadius: 999,
                              bgcolor: 'rgba(255,255,255,0.9)',
                              opacity: 0.9,
                              flex: '0 0 auto',
                            }}
                          />
                          <Typography sx={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.75 }}>
                            {p}
                  </Typography>
                </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </ScrollReveal>
        </Box>

        <SectionHeading overline="Experience" title="What to expect" sx={{ mb: 4 }} />
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
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
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

      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <ScrollReveal>
          <Card sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Join us on court
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.8, maxWidth: 820 }}>
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
                    bgcolor: 'white',
                    color: '#1c3c6f',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
                  }}
                >
                  Join us today &rarr;
                </MagneticButton>
              </Box>
            </CardContent>
          </Card>
        </ScrollReveal>
        </Container>
    </Box>
  );
}

export default AboutPage;
