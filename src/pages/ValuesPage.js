import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function ValuesPage() {
  const values = [
    {
      title: 'Sportsmanship',
      body: 'Respect first — for opponents, teammates, and the game. We play hard and fair.',
      icon: <EmojiEventsIcon />,
    },
    {
      title: 'Community',
      body: 'A club should feel welcoming. New faces, new friends, and good vibes on and off court.',
      icon: <GroupsIcon />,
    },
    {
      title: 'Growth',
      body: 'From beginner basics to advanced tactics — we focus on steady improvement every session.',
      icon: <TrendingUpIcon />,
    },
    {
      title: 'Inclusivity',
      body: 'All skill levels are welcome. We create space for everyone to enjoy badminton.',
      icon: <VolunteerActivismIcon />,
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-15.JPG"
        imageAlt="Badminton values"
        title="Our"
        highlight="Values"
        subtitle="The culture we build is as important as the results we chase."
        imagePosition="center 35%"
      />

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="UNSWBC" title="What we stand for" sx={{ mb: 5 }} />

        <Grid container spacing={3}>
          {values.map((v) => (
            <Grid item xs={12} sm={6} md={3} key={v.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      bgcolor: 'rgba(28,60,111,0.12)',
                      color: '#1c3c6f',
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <Card sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
          <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Ready to jump in?
            </Typography>
            <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.88)', maxWidth: 760, lineHeight: 1.7 }}>
              Whether you’re coming for social games, training, or competition, you’ll find a place in the club.
              Check the Sessions page for times and pricing.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ValuesPage; // Correct default export
