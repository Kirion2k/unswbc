import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function SessionsPage() {
  const imageSrc = "/unsw-11.jpg";

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        imagePosition="center 20%"
        title="Club"
        highlight="Sessions"
        subtitle="Everything you need: how to join, where to go, and what sessions cost."
      />

      {/* Content Sections */}
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="Info" title="Important information" sx={{ mb: 5 }} />

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {[{
            title: 'Registration',
            content: [
              'No prior sign-ups/registrations are needed before the session.',
              'Come to our desk on the day to register and pay for the session.',
              'There is no need to inform us in advance before joining.',
            ],
          }, {
            title: 'Location',
            content: ['UNSW Fitness and Aquatic Center, Level 1 (Upstairs)'],
          }, {
            title: 'Payment Details',
            content: [
              'Name: UNSW Badminton Club',
              'BSB: 062-303',
              'Account: 10885979',
              '*Please reference your full nane in the payment*',
              'We accept Cash or Bank Transfer on arrival at our sessions.',
            ],
          }, {
            title: 'Courts',
            content: [
              'The club offers 6 courts for play during sessions.',
              'However, during wet weather, the gym experiences leaks which cause some courts to be closed (increasing wait times).',
            ],
          }].map((section, index) => (
            <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                sx={{ flexGrow: 1, display: 'flex' }}
              >
                <Card sx={{ flexGrow: 1, bgcolor: index % 2 === 0 ? '#1c3c6f' : 'white', color: index % 2 === 0 ? 'white' : 'inherit' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5, textAlign: 'center' }}>
                      {section.title}
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8, color: index % 2 === 0 ? 'rgba(255,255,255,0.88)' : 'text.secondary' }}>
                      {section.content.map((line, i) => (
                        <span key={i} style={{ display: 'block', marginBottom: '8px' }}>{line}</span>
                      ))}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Sessions Section */}
        <SectionHeading overline="Times" title="Sessions" sx={{ mt: 9, mb: 5 }} />

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {[{
            title: 'Tuesdays 6-10pm',
            content: [
              'Members: $10',
              'Visitors: $15',
            ],
          }, {
            title: 'Saturdays 1-4pm or 4-7pm',
            content: [
              'Members: $8',
              'Visitors: $13',
            ],
          }, {
            title: 'Saturdays 1-7pm',
            content: [
              'Members: $15',
              'Visitors: $25',
            ],
          }].map((section, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                sx={{ flexGrow: 1, display: 'flex' }}
              >
                <Card sx={{ flexGrow: 1, bgcolor: '#1c3c6f', color: 'white' }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5 }}>
                      {section.title}
                    </Typography>
                    <Typography sx={{ lineHeight: 1.9, color: 'rgba(255,255,255,0.9)' }}>
                      {section.content.map((line, i) => (
                        <span key={i} style={{ display: 'block', marginBottom: '6px' }}>{line}</span>
                      ))}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Memberships Section */}
        <SectionHeading overline="Pricing" title="Memberships" sx={{ mt: 9, mb: 3 }} />
        <Typography sx={{ textAlign: 'center', fontWeight: 700, mb: 5, color: 'text.secondary' }}>
          Note: memberships reset each year on 1 Feb.
        </Typography>


        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {[{
            title: 'Term 1',
            content: [
              'From 1st Feb',
              'UNSW Students: $75',
              'UNSW Staff/Alumni: $90',
              'General Public: $110'
            ],
          }, {
            title: 'Term 2',
            content: [
              'From 1st Jun',
              'UNSW Students: $60',
              'UNSW Staff/Alumni: $75',
              'General Public: $90'
            ],
          }, {
            title: 'Term 3',
            content: [
              'From 1st Sep',
              'UNSW Students: $45',
              'UNSW Staff/Alumni: $60',
              'General Public: $75'
            ],
          }].map((section, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                sx={{ flexGrow: 1, display: 'flex' }}
              >
                <Card sx={{ flexGrow: 1 }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5, color: '#1c3c6f' }}>
                      {section.title}
                    </Typography>
                    <Typography sx={{ lineHeight: 1.9, color: 'text.secondary' }}>
                      {section.content.map((line, i) => (
                        <span key={i} style={{ display: 'block', marginBottom: '6px' }}>{line}</span>
                      ))}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
}

export default SessionsPage;
