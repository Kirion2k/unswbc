import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { styled, keyframes } from '@mui/system';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import unswLogo from '../unsw-logo.png';
import arcLogo from '../arc-logo.jpg';
import badmintonAuLogo from '../badminton-au.png';
import badmintonNswLogo from '../nsw-badminton.png';



const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;

const AnimatedTypography = styled(Typography)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out forwards`,
  textAlign: 'center'
}));

function HomePage() {
  const heroImage = "/unsw-64.jpg";

  const featureSections = [
    {
      title: 'Who we are',
      body: 'A welcoming community of players across every level, from first timers to competitive athletes.',
      body2: 'Whether you are brand new or already competing, you will find friendly games, good people, and a club culture that makes it easy to get involved.',
      image: '/unsw-1.jpg',
      tone: 'navy',
    },
    {
      title: 'Training & improvement',
      body: 'Build fundamentals, learn tactics, and sharpen your game with structured sessions and great partners.',
      body2: 'We focus on consistency and confidence on court, so you can level up your skills and enjoy better games week after week.',
      image: '/unsw-2.jpg',
      tone: 'light',
    },
    {
      title: 'Community & events',
      body: 'Tournaments, socials, and club culture that makes you want to come back every week.',
      body2: 'From club events to team competitions, there is always something to look forward to, and plenty of chances to meet new people.',
      image: '/unsw-41.jpg',
      tone: 'navy',
    },
  ];

  const cards = [
    { img: '/unsw-13.jpg', title: 'Session info', description: 'Times, location, pricing, and how sessions run.', link: '/sessions' },
    { img: '/unsw-9.jpg', title: 'FAQs', description: 'Quick answers before your first session.', link: '/faqs' },
    { img: '/unsw-49.jpg', title: 'Get in touch', description: 'Questions? Message us or follow our socials.', link: '/contact' },
  ];

  const partners = [
    { name: 'UNSW', logo: unswLogo },
    { name: 'ARC Sport', logo: arcLogo },
    { name: 'Badminton Australia', logo: badmintonAuLogo },
    { name: 'Badminton NSW', logo: badmintonNswLogo },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero imageSrc={heroImage} imageAlt="UNSW Badminton Club" imagePosition="center 0%">
        <Box sx={{ maxWidth: 980 }}>
          <AnimatedTypography
            variant="h2"
            component={motion.h1}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          sx={{
              textAlign: 'left',
              color: 'white',
              fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.3rem' },
              lineHeight: 1.02,
            }}
          >
            UNSW <Box component="span" sx={{ color: '#1c3c6f' }}>Badminton</Box> Club
          </AnimatedTypography>

          <Typography
            component={motion.div}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            sx={{ mt: 2, color: 'rgba(255,255,255,0.88)', fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.25rem' } }}
          >
            <Typewriter
              options={{
                strings: ['Precision in motion.', 'Social play + training.', 'A club that feels like home.'],
                autoStart: true,
                loop: true,
                delay: 55,
                deleteSpeed: 30,
                cursor: '|',
              }}
            />
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: 4 }}
            component={motion.div}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Button variant="contained" color="primary" component={RouterLink} to="/sessions">
              View sessions
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/about"
                sx={{
                borderColor: 'rgba(255,255,255,0.6)',
                  color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              About us
            </Button>
          </Stack>
              </Box>
      </PageHero>

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="Welcome" title="A club built for every level" sx={{ mb: 5 }} />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {featureSections.map((s, index) => {
            const imageFirst = index % 2 === 0
            const overline = index === 0 ? 'Community' : index === 1 ? 'Training' : 'Events'

            return (
              <Grid item xs={12} key={s.title}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                >
                  <Card sx={{ overflow: 'hidden' }}>
                    <Grid container alignItems="stretch">
                      <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                          order: { xs: 0, md: imageFirst ? 0 : 1 },
                          display: 'flex',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={s.image}
                          alt={s.title}
                          sx={{
                            width: '100%',
                            flexGrow: 1,
                            height: { xs: 240, sm: 300, md: '100%' },
                            minHeight: { md: 360 },
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                          order: { xs: 1, md: imageFirst ? 1 : 0 },
                          bgcolor: s.tone === 'navy' ? 'rgba(28,60,111,0.04)' : 'transparent',
                          display: 'flex',
                        }}
                      >
                        <CardContent
                          sx={{
                            p: { xs: 3, md: 4 },
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
                            <Typography
                              variant="overline"
                              sx={{
                                color: '#1c3c6f',
                                letterSpacing: '0.14em',
                                fontWeight: 900,
                              }}
                            >
                              {overline}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 900,
                                mt: 0.5,
                                color: '#0b1220',
                                lineHeight: 1.2,
                              }}
                            >
                              {s.title}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 1.25,
                                color: 'text.secondary',
                                lineHeight: 1.9,
                                fontSize: { xs: '1rem', md: '1.05rem' },
                              }}
                            >
                              {s.body}
                            </Typography>
                            {s.body2 ? (
                              <Typography
                                sx={{
                                  mt: 1,
                                  color: 'text.secondary',
                                  lineHeight: 1.9,
                                  fontSize: { xs: '1rem', md: '1.05rem' },
                                }}
                              >
                                {s.body2}
                              </Typography>
                            ) : null}
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <SectionHeading overline="Explore" title="Explore the club" sx={{ mb: 5 }} />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }}>
                <Card sx={{ height: '100%', overflow: 'hidden' }}>
                  <CardActionArea component={RouterLink} to={card.link} sx={{ height: '100%' }}>
                    <CardMedia component="img" image={card.img} alt={card.title} sx={{ height: { xs: 180, md: 220 }, objectFit: 'cover' }} />
                    <CardContent
                      sx={{
                        p: 3,
                        minHeight: { xs: 132, md: 140 },
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, flexGrow: 1 }}>
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Partners */}
      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <SectionHeading overline="Our partners" title="Affiliated with" sx={{ mb: 5 }} />
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
          UNSW Badminton Club is proud to be affiliated with ARC Sport and UNSW, and connected with the wider badminton community
          through Badminton Australia and Badminton NSW.
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="stretch">
          {partners.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.name}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                <CardContent sx={{ p: 3, display: 'grid', placeItems: 'center', gap: 1.5 }}>
                  <Box
                    component="img"
                    src={p.logo}
                    alt={p.name}
                    sx={{
                      height: 56,
                      width: 'auto',
                      maxWidth: '100%',
                      filter: 'drop-shadow(0 10px 24px rgba(2,6,23,0.14))',
                    }}
                  />
                  <Typography sx={{ fontWeight: 900, color: '#1c3c6f' }}>{p.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
