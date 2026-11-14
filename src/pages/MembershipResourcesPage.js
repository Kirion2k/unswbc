import React from 'react';
import { Box, CardContent, Container, Grid, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';

function MembershipResourcesPage() {
  const resources = [
    {
      title: 'What to bring',
      items: [
        'Badminton racket (or hire one from UNSW FAC)',
        'Non-marking court shoes',
        'Water bottle + towel',
        'A good attitude — you\'ll meet heaps of people',
      ],
    },
    {
      title: 'Beginner tips',
      items: [
        'Warm up first (especially ankles/shoulders)',
        'Keep your grip relaxed until impact',
        'Focus on consistency before power',
        'Ask committee members for quick technique tips',
      ],
    },
    {
      title: 'Club resources',
      items: [
        'Queue system: see View Queue for live updates during sessions',
        'FAQs: common questions answered before your first session',
        'Socials: announcements for events, shirts, and trials',
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc="/optimized/unsw-21.jpg"
        imageAlt="Membership resources"
        title="Membership"
        highlight="Resources"
        subtitle="Everything you need to get started — gear, session tips, and helpful links."
        imagePosition="center 35%"
      />

      <Container data-page-content sx={{ py: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Guide" title="Make your first session easy" sx={{ mb: 'var(--club-heading-gap)' }} />
        </ScrollReveal>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {resources.map((r, index) => (
            <Grid item xs={12} md={4} key={r.title}>
              <ScrollReveal delay={index * 0.08}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5, color: 'var(--club-accent)' }}>
                      {r.title}
                    </Typography>
                    <List dense disablePadding>
                      {r.items.map((t) => (
                        <ListItem key={t} disableGutters sx={{ py: 1.5, borderBottom: '1px solid var(--club-line)', '&:last-child': { borderBottom: 0 } }}>
                          <ListItemText
                            primary={t}
                            primaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.7 } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <TiltCard>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Helpful links
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                - View Queue: <Link component={RouterLink} to="/view-queue" underline="hover">/view-queue</Link>
                <br />
                - FAQs: <Link component={RouterLink} to="/faqs" underline="hover">/faqs</Link>
                <br />
                - Contact: <Link component={RouterLink} to="/contact" underline="hover">/contact</Link>
              </Typography>
            </CardContent>
          </TiltCard>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default MembershipResourcesPage;
