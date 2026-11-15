import PageContentSurface from '../components/PageContentSurface';
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function TeamPage() {
  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc="/optimized/unsw-22.jpg"
        imageAlt="Team"
        title="The"
        highlight="Team"
        subtitle="This page isn’t currently used — please visit Our Team for committee information."
        imagePosition="center 40%"
      />

      <PageContentSurface>
      <Container sx={{ py: 'var(--club-section-space)' }}>
        <SectionHeading overline="Navigation" title="Looking for the committee?" sx={{ mb: 'var(--club-heading-gap)' }} />
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.8 }}>
          Go to <Typography component="span" sx={{ fontWeight: 900, color: 'var(--club-accent)' }}>Our Team</Typography> from the top navigation.
        </Typography>
      </Container>
      </PageContentSurface>
    </Box>
  );
}

export default TeamPage; // Correct default export
