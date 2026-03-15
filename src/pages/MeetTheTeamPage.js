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
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-20.JPG"
        imageAlt="Meet the Team"
        title="Meet the"
        highlight="Team"
        subtitle="A volunteer committee keeping sessions running smoothly and the club thriving."
        imagePosition="center 30%"
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Leadership" title="Executives" sx={{ mb: 5 }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {executives.map((exec, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ScrollReveal delay={index * 0.05}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <motion.div whileHover={{ scale: 1.08 }}>
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

      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <ScrollReveal>
          <SectionHeading overline="Team" title="Committee" sx={{ mb: 5 }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {committee.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <ScrollReveal delay={index * 0.04}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                      {role}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      The behind the scenes work that makes sessions, events, and competitions run smoothly.
                    </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <ScrollReveal>
            <SectionHeading overline="Contact" title="Reach out to us" sx={{ mb: 4 }} />
            <TiltCard sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      Got questions for the team?
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.88)', lineHeight: 1.85 }}>
                      Contact us here and we'll get back to you soon.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MagneticButton
                      component={RouterLink}
                      to="/contact"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        bgcolor: 'white',
                        color: '#1c3c6f',
                        fontWeight: 900,
                        py: 2,
                        fontSize: '1.1rem',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
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
    </Box>
  )
}

export default MeetTheTeamPage
