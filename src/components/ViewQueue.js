import React from 'react';
import { Box, Card, CardContent, Container, Link, Typography } from '@mui/material';
import PageHero from './PageHero';
import SectionHeading from './SectionHeading';

function ViewQueue() {
  const imageSrc = "/unsw-12.jpg";
  const url = "https://docs.google.com/spreadsheets/d/1a9TLKEM79mzx6ejC3jWNTvI48dwp9oxFfQGGByDrNag/edit?gid=0#gid=0";

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        imagePosition="center 1%"
        title="View"
        highlight="Queue"
        subtitle="See the live queue during sessions. You can also open it in a new tab."
      />

      {/* Iframe section */}
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <SectionHeading overline="Sessions" title="Queueing system" sx={{ mb: 5 }} />
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}>
              Open in a new tab:{' '}
              <Link href={url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontWeight: 800, color: '#1c3c6f' }}>
                View the queue
              </Link>
            </Typography>
            <Box
              sx={{
                height: { xs: '70vh', md: '75vh' },
                border: '1px solid rgba(15, 23, 42, 0.12)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <iframe
                src={url}
                title="View Queue"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              >
                Your browser does not support iframes.
              </iframe>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ViewQueue;
