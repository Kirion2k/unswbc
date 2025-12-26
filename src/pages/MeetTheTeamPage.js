import React from 'react';
import { Avatar, Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function MeetTheTeamPage() {
  const executives = [
    { name: 'Aaron Zhang', position: 'President' },
    { name: 'Daniel Hu', position: 'Vice President' },
    { name: 'Harry Shi', position: 'Secretary' },
    { name: 'Amanda Zhang', position: 'Treasurer' },
    { name: 'Charles Ni', position: 'Arc Delegate' },
    { name: 'Ray Zhang', position: 'Grievance Officer' },
  ];

  const committee = [
    'Events & socials',
    'Competition & tournaments',
    'Marketing & content',
    'Training support',
    'Session operations',
    'Sponsorships & partnerships',
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-6.jpg"
        imageAlt="Meet the Team"
        title="Meet the"
        highlight="Team"
        subtitle="A volunteer committee keeping sessions running smoothly and the club thriving."
        imagePosition="center 30%"
      />

      {/* Executives Section */}
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="Leadership" title="Executives" sx={{ mb: 5 }} />
        <Grid container spacing={4} justifyContent="center">
          {executives.map((exec, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: 'rgba(28,60,111,0.12)',
                        color: '#1c3c6f',
                        fontWeight: 900,
                        mb: 2,
                      }}
                    >
                      {exec.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>
                      {exec.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {exec.position}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Committee Section */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <SectionHeading overline="Team" title="Committee" sx={{ mb: 5 }} />
        <Grid container spacing={3}>
          {committee.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.04 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                      {role}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      The behind-the-scenes work that makes sessions, events, and competitions run smoothly.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default MeetTheTeamPage;
