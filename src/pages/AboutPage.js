import React from 'react';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';
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
                At UNSW Badminton Club, we bring together students and enthusiasts who share a passion for badminton.
                Our goal is to create a thriving community where players of all skill levels can improve, connect,
                and compete in a supportive and fun environment.
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
                'We aim to be the leading university badminton club in Australia, promoting excellence and inclusivity both on and off the court.',
            },
            {
              title: 'Our Activities',
              description:
                'From weekly sessions to socials and tournaments, we offer something for everyone — sharpen your skills and make lifelong friends.',
            },
            {
              title: 'Our Achievements',
              description:
                'We celebrate competitive success while building pathways for new players to grow and thrive.',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={item.title}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }}>
                <Card sx={{ height: '100%' }}>
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
