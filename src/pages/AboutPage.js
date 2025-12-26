import React from 'react';
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function AboutPage() {
  const imageSrc = "/unsw-14.jpg";

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

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="UNSWBC" title="Welcome to the club" sx={{ mb: 5 }} />

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5 }}>
                A community-first badminton club
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                UNSW Badminton Club is a welcoming space for anyone who loves badminton — whether you’re picking up a racket
                for the first time, coming along with friends for social games, or training with competitive goals.
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                We focus on the things that keep a club strong: fair play, good sportsmanship, and an inclusive culture where
                new players feel comfortable asking questions. Our sessions run smoothly with a queueing system, quality shuttles,
                and a committee that cares about everyone getting on court.
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Beyond weekly sessions, we bring the community together through socials, events, and competition — creating a place
                where you can improve your game and build friendships that last beyond uni.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <Divider sx={{ my: 5 }} />

        <Grid container spacing={3}>
          {[
            {
              title: 'Our Vision',
              description:
                'To be Australia’s leading university badminton club — where every player feels welcome, improves with confidence, and represents the club with pride.',
              image: '/unsw-21.JPG',
            },
            {
              title: 'Our Activities',
              description:
                'Weekly sessions, training support, socials, and tournaments — built around smooth operations so everyone gets fair court time and a great experience.',
              image: '/unsw-2.jpg',
            },
            {
              title: 'Our Achievements',
              description:
                'We celebrate competitive success, but we’re proudest when beginners become regulars and regulars become confident players.',
              image: '/unsw-20.JPG',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={item.title}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia component="img" image={item.image} alt={item.title} sx={{ height: 180, objectFit: 'cover' }} />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Join us on court
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.88)', lineHeight: 1.8, maxWidth: 820 }}>
                Whether you’re here to improve your skills, meet new people, or just enjoy a great game,
                UNSW Badminton Club is the place for you.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 2 }}>
                We can’t wait to see you at a session.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

export default AboutPage;
