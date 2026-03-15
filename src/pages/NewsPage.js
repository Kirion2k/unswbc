import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import InstagramNewsFeed from '../components/InstagramNewsFeed';

const FEED_URL =
  process.env.REACT_APP_INSTAGRAM_FEED_URL ||
  '/.netlify/functions/instagram-feed';

const PROFILE_URL = 'https://www.instagram.com/unswbadminton/';

function NewsPage() {
  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-29.JPG"
        imageAlt="UNSW Badminton Club Instagram"
        title="Club"
        highlight="Updates"
        subtitle="The latest from @unswbadminton — results, announcements, events, and more."
        imagePosition="center 40%"
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header row */}
        <ScrollReveal>
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mb: 5,
            }}
          >
            <Box>
              <SectionHeading
                overline="Instagram"
                title="@unswbadminton"
                sx={{ mb: 0 }}
              />
              <Typography sx={{ color: 'text.secondary', mt: 0.75, fontSize: '0.95rem' }}>
                Follow us for session updates, results, and club news.
              </Typography>
            </Box>
            <MagneticButton
              component="a"
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<InstagramIcon />}
              sx={{
                bgcolor: '#1c3c6f',
                color: 'white',
                fontWeight: 900,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#123456' },
              }}
            >
              Follow us
            </MagneticButton>
          </Box>
        </ScrollReveal>

        {/* Live feed */}
        <ScrollReveal delay={0.08}>
          <InstagramNewsFeed
            feedUrl={FEED_URL}
            profileUrl={PROFILE_URL}
            title=""
          />
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default NewsPage;
