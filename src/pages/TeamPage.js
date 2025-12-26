import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function TeamPage() {
  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-22.JPG"
        imageAlt="Team"
        title="The"
        highlight="Team"
        subtitle="This page isn’t currently used — please visit Meet the Team for committee information."
        imagePosition="center 40%"
      />
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="Navigation" title="Looking for the committee?" sx={{ mb: 4 }} />
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.8 }}>
          Go to <Typography component="span" sx={{ fontWeight: 900, color: '#1c3c6f' }}>Meet the Team</Typography> from the top navigation.
        </Typography>
      </Container>
    </Box>
  );
}

export default TeamPage; // Correct default export
