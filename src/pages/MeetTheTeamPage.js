import PageContentSurface from '../components/PageContentSurface';
import React from 'react'
import { Avatar, Box, CardContent, Container, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'

function MeetTheTeamPage() {
  const executives = [
    { name: 'Aaron Zhang', position: 'President' },
    { name: 'Daniel Hu', position: 'Vice President' },
    { name: 'Harry Shi', position: 'Secretary' },
    { name: 'Amanda Zhang', position: 'Treasurer' },
    { name: 'Charles Ni', position: 'Arc Delegate' },
    { name: 'Ray Zhang', position: 'Grievance Officer' },
  ]

  const committee = [
    'Events & socials',
    'Competition & tournaments',
    'Marketing & content',
    'Training support',
    'Session operations',
    'Sponsorships & partnerships',
  ]

  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc="/optimized/unsw-20.jpg"
        imageAlt="Meet the Team"
        title="Meet the"
        highlight="Team"
        subtitle="A volunteer committee keeping sessions running smoothly and the club thriving."
        imagePosition="center 30%"
      />

      <PageContentSurface>

      <Container data-page-content sx={{ py: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Leadership" title="Executives" sx={{ mb: 'var(--club-heading-gap)' }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {executives.map((exec, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ScrollReveal delay={index * 0.05}>
                <TiltCard>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <motion.div whileHover={{ scale: 1.08 }}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: '4rem',
                          height: '4rem',
                          bgcolor: 'var(--club-tint)',
                          color: 'var(--club-accent)',
                          fontWeight: 900,
                          mb: 2,
                        }}
                      >
                        {exec.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                      </Avatar>
                    </motion.div>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>
                      {exec.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {exec.position}
                    </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Team" title="Committee" sx={{ mb: 'var(--club-heading-gap)' }} />
        </ScrollReveal>
        <Box component="ul" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: '1px', bgcolor: 'var(--club-line)', listStyle: 'none', m: 0, p: 0, border: '1px solid var(--club-line)', borderRadius: 'var(--club-radius)', overflow: 'hidden' }}>
          {committee.map((role) => (
            <Box component="li" key={role} sx={{ bgcolor: 'var(--club-feature)', p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ color: 'var(--club-text)', mb: 1 }}>{role}</Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                The behind the scenes work that makes sessions, events, and competitions run smoothly.
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 'var(--club-section-space)' }}>
          <ScrollReveal>
            <SectionHeading overline="Contact" title="Reach out to us" sx={{ mb: 'var(--club-heading-gap)' }} />
            <TiltCard sx={{ bgcolor: 'var(--club-feature)', color: 'var(--club-text)' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      Got questions for the team?
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'var(--club-muted)', lineHeight: 1.85 }}>
                      Contact us here and we'll get back to you soon.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    <MagneticButton
                      component={RouterLink}
                      to="/contact"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: 'var(--club-accent)',
                        color: 'var(--club-action-ink)',
                        fontWeight: 900,
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        '&:hover': { bgcolor: 'var(--club-accent-hover)' },
                      }}
                    >
                      Go to contact &rarr;
                    </MagneticButton>
                  </Grid>
                </Grid>
              </CardContent>
            </TiltCard>
          </ScrollReveal>
        </Box>
      </Container>
      </PageContentSurface>
    </Box>
  )
}

export default MeetTheTeamPage
