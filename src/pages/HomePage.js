import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { styled, keyframes } from '@mui/system';
import unsw15 from '../assets/images/unsw-16.jpg';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import FouitaInstagramFeed from '../components/FouitaInstagramFeed';
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
  const heroImage = "/unsw-8.jpg";

  const featureSections = [
    {
      title: 'Who we are',
      body: 'A welcoming community of players across every level — from first-timers to competitive athletes.',
      image: '/unsw-1.jpg',
      tone: 'navy',
    },
    {
      title: 'Training & improvement',
      body: 'Build fundamentals, learn tactics, and sharpen your game with structured sessions and great partners.',
      image: '/unsw-2.jpg',
      tone: 'light',
    },
    {
      title: 'Community & events',
      body: 'Tournaments, socials, and club culture that makes you want to come back every week.',
      image: '/unsw-3.jpg',
      tone: 'navy',
    },
  ];

  const cards = [
    { img: '/unsw-13.jpg', title: 'Session info', description: 'Times, location, pricing, and how sessions run.', link: '/sessions' },
    { img: '/unsw-9.jpg', title: 'FAQs', description: 'Quick answers before your first session.', link: '/faqs' },
    { img: unsw15, title: 'Get in touch', description: 'Questions? Message us or follow our socials.', link: '/contact' },
  ];

  const partners = [
    { name: 'UNSW', logo: unswLogo },
    { name: 'ARC Sport', logo: arcLogo },
    { name: 'Badminton Australia', logo: badmintonAuLogo },
    { name: 'Badminton NSW', logo: badmintonNswLogo },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero imageSrc={heroImage} imageAlt="UNSW Badminton Club" imagePosition="center 10%">
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
              to="/meet-the-team"
                sx={{
                borderColor: 'rgba(255,255,255,0.6)',
                  color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Meet the team
            </Button>
          </Stack>
              </Box>
      </PageHero>

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="Welcome" title="A club built for every level" sx={{ mb: 5 }} />
        <Grid container spacing={3} alignItems="stretch">
          {featureSections.map((s, index) => (
            <Grid item xs={12} md={4} key={s.title}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }}>
                <Card sx={{ height: '100%', overflow: 'hidden' }}>
                  <CardMedia component="img" image={s.image} alt={s.title} sx={{ height: 220, objectFit: 'cover' }} />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                      {s.title}
                </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      {s.body}
                </Typography>
                  </CardContent>
                </Card>
            </motion.div>
          </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <SectionHeading overline="Explore" title="Explore the club" sx={{ mb: 5 }} />
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }}>
                <Card sx={{ height: '100%', overflow: 'hidden' }}>
                  <CardActionArea component={RouterLink} to={card.link} sx={{ height: '100%' }}>
                    <CardMedia component="img" image={card.img} alt={card.title} sx={{ height: 220, objectFit: 'cover' }} />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
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

      {/* News */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <SectionHeading overline="Updates" title="News" sx={{ mb: 5 }} />
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 820, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
          Live updates from our Instagram — tap posts to view details, captions, and more.
        </Typography>
        <FouitaInstagramFeed
          username="unswbadminton"
          ukey="0f72bdcd-65b2-4fc2-ac12-23f8b7548067"
          layout="masonry"
          header={true}
          cols={4}
          cardHeight={300}
          gap={1}
          height={1000}
        />
      </Container>

      {/* Our Partners */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <SectionHeading overline="Our partners" title="Affiliated with" sx={{ mb: 5 }} />
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
          UNSW Badminton Club is proud to be affiliated with ARC Sport and UNSW, and connected with the wider badminton community
          through Badminton Australia and Badminton NSW.
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
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
