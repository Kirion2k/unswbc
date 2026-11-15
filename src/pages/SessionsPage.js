import SessionRegistration from '../components/SessionRegistration';
import HowItWorks from '../components/ui/how-it-works';
import { PricingSection } from '../components/ui/pricing-section';
import PageContentSurface from '../components/PageContentSurface';
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined'
import HowToRegOutlined from '@mui/icons-material/HowToRegOutlined'
import SportsTennisOutlined from '@mui/icons-material/SportsTennisOutlined'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'

function SessionsPage() {
  const imageSrc = "/optimized/unsw-58.jpg"

  const venueAddress = 'Fitness and Aquatic Centre (B5), Gate 2, High St, UNSW Sydney, Kensington NSW 2033, Australia'
  const mapQuery = encodeURIComponent(`UNSW ${venueAddress}`)
  const mapsEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`
  const mapsOpenLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  const [showFirstTimeMore, setShowFirstTimeMore] = useState(false)

  const quickSteps = [
    {
      title: 'Arrive and check in',
      body: 'Go to level 2 inside UNSW Fitness and Aquatic Centre and find the badminton desk. If it is your first time, tell us and we will guide you on how the club works.',
    },
    {
      title: 'Register and pay',
      body: 'No sign ups needed. Register on the day, then pay with cash or bank transfer. Please use your full name as the reference.',
    },
    {
      title: 'Get on court',
      body: 'We run a fair rotation system (queueing system) so everyone gets court time. Please beaware that during peak periods, you may have to wait for a while to get on court.',
    },
  ]

  const infoCards = [
    {
      title: 'Location',
      icon: <PlaceOutlined />,
      accent: 'white',
      lines: ['UNSW Fitness and Aquatic Centre, level 2, badminton desk', venueAddress],
    },
    {
      title: 'Registration',
      icon: <HowToRegOutlined />,
      accent: 'navy',
      lines: [
        'No sign ups or registrations needed before the session.',
        'Come to our desk on the day to register and pay.',
      ],
    },
    {
      title: 'Payment',
      icon: <PaymentsOutlined />,
      accent: 'white',
      lines: [
        'We accept cash or bank transfer on arrival.',
        'Name: UNSW Badminton Club',
        'BSB: 062 303',
        'Account: 10885979',
        'Use your full name as the reference.',
      ],
    },
    {
      title: 'Courts',
      icon: <SportsTennisOutlined />,
      accent: 'navy',
      lines: [
        'We usually have 6 courts running.',
        'In wet weather some courts may close due to leaks, which can increase wait time.',
      ],
    },
  ]

  const sessionCards = [
    {
      title: 'Tuesdays',
      time: '6 to 10pm',
      memberPrice: '$10',
      visitorPrice: '$15',
      note: 'Good for after class games',
    },
    {
      title: 'Saturdays',
      time: '1 to 4pm or 4 to 7pm',
      memberPrice: '$8',
      visitorPrice: '$13',
      note: 'Split sessions with steady rotations',
      highlight: 'Most popular',
    },
    {
      title: 'Saturdays',
      time: '1 to 7pm',
      memberPrice: '$15',
      visitorPrice: '$25',
      note: 'Long session block',
    },
  ]

  const membershipTerms = [
    {
      term: 'Term 1',
      from: 'From 1 Feb',
      student: '$75',
      staff: '$90',
      public: '$110',
    },
    {
      term: 'Term 2',
      from: 'From 1 Jun',
      student: '$60',
      staff: '$75',
      public: '$90',
    },
    {
      term: 'Term 3',
      from: 'From 1 Sep',
      student: '$45',
      staff: '$60',
      public: '$75',
    },
  ]

  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        imagePosition="center 30%"
        title="Club"
        highlight="Sessions"
        subtitle="Everything you need to join, where to go, and what sessions cost."
      />

      <PageContentSurface>

      <Container data-page-content sx={{ py: 'var(--club-section-space)' }}>
        <PricingSection
          title="Session times and prices"
          subtitle="Choose your session. Pay at the badminton desk on arrival."
          frequencies={['Members', 'Visitors']}
          tiers={sessionCards.map((session) => ({
            name: session.title,
            time: session.time,
            price: { Members: Number(session.memberPrice.slice(1)), Visitors: Number(session.visitorPrice.slice(1)) },
            description: session.note,
            features: ['UNSW Fitness & Aquatic Centre, level 2', 'Register at the desk on the day', 'Pay with cash or bank transfer'],
            cta: 'How to join',
            href: '#session-registration',
            popular: Boolean(session.highlight),
          }))}
        />

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        <SectionHeading overline="New here" align="center" title="Where to find us" sx={{ mb: 'var(--club-heading-gap)' }} />
        <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Card sx={{ height: '100%' }}>
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack spacing={2} sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.75 }}>
                      Go straight to the badminton desk on level 2
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                      If you are new, this is the easiest way to find us. The stadium customer service counter is a different desk.
                    </Typography>

                    <Stack spacing={1.25} sx={{ mt: 2 }}>
                      <Stack direction="row" spacing={1.25} alignItems="flex-start">
                        <Chip label="1" size="small" sx={{ fontWeight: 900, bgcolor: 'var(--club-tint)', color: 'var(--club-accent)' }} />
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                          Enter UNSW Fitness and Aquatic Centre
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.25} alignItems="flex-start">
                        <Chip label="2" size="small" sx={{ fontWeight: 900, bgcolor: 'var(--club-tint)', color: 'var(--club-accent)' }} />
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                          Take the stairs to level 2
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.25} alignItems="flex-start">
                        <Chip label="3" size="small" sx={{ fontWeight: 900, bgcolor: 'var(--club-tint)', color: 'var(--club-accent)' }} />
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                          Look for the badminton desk and check in! :)
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 0.5 }}>
                      <Button
                        variant="contained"
                        href={mapsOpenLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ fontWeight: 900 }}
                      >
                        Open in Google Maps
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setShowFirstTimeMore((v) => !v)}
                        sx={{ fontWeight: 900 }}
                      >
                        {showFirstTimeMore ? 'Hide details' : 'Click to learn more'}
                      </Button>
                    </Stack>

                    <Collapse in={showFirstTimeMore} timeout={250}>
                      <Box
                        sx={{
                          mt: 1.5,
                          p: 2,
                          borderRadius: 3,
                          bgcolor: 'var(--club-tint)',
                          border: '1px solid var(--club-line)',
                        }}
                      >
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                          If you arrive at the gym customer service desk, you are close but not checked in yet. Walk into the Fitness and Aquatic Centre and go up to level 2.
                          If you are unsure, ask the staff at the counter for the badminton desk on level 2.
                        </Typography>
                      </Box>
                    </Collapse>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%' }}>
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.75 }}>
                  Map and address
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                  {venueAddress}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid var(--club-line)',
                    bgcolor: 'var(--club-tint)',
                    flexGrow: 1,
                    minHeight: { xs: 260, md: 360 },
                  }}
                >
                  <Box
                    component="iframe"
                    title="UNSW Badminton Club location map"
                    src={mapsEmbedSrc}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        <Box id="session-registration" />
        <SectionHeading overline="Info" align="center" title="Registration and payment" sx={{ mb: 'var(--club-heading-gap)' }} />
        <SessionRegistration sections={infoCards} />

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        <SectionHeading overline="Pricing" align="center" title="Memberships" sx={{ mb: 2 }} />
        <Typography sx={{ textAlign: 'center', fontWeight: 700, mb: 4, color: 'text.secondary' }}>
          Note: memberships reset each year on 1 Feb.
        </Typography>

        <Card sx={{ overflow: 'hidden' }}>
          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
            {/* Desktop header */}
            <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, mb: 2 }}>
              <Grid item md={3}>
                <Typography sx={{ fontWeight: 900, color: 'var(--club-accent)', pl: 1 }}>Term</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography sx={{ fontWeight: 900, color: 'var(--club-accent)', textAlign: 'center' }}>Students</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography sx={{ fontWeight: 900, color: 'var(--club-accent)', textAlign: 'center' }}>Staff &amp; alumni</Typography>
              </Grid>
              <Grid item md={3}>
                <Typography sx={{ fontWeight: 900, color: 'var(--club-accent)', textAlign: 'center' }}>General public</Typography>
              </Grid>
            </Grid>

            <Stack spacing={2}>
              {membershipTerms.map((t) => (
                <Box key={t.term}>
                  {/* Mobile layout */}
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Typography sx={{ fontWeight: 900, mb: 0.5 }}>{t.term}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{t.from}</Typography>
                    <Grid container spacing={1.5}>
                      {[
                        { label: 'Students', price: t.student },
                        { label: 'Staff & alumni', price: t.staff },
                        { label: 'General public', price: t.public },
                      ].map((item) => (
                        <Grid item xs={4} key={item.label}>
                          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'var(--club-tint)', textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--club-accent)', display: 'block', mb: 0.5 }}>
                              {item.label}
                            </Typography>
                            <Typography sx={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--club-text)' }}>
                              {item.price}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Desktop layout */}
                  <Grid container spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Grid item md={3}>
                      <Box sx={{ pl: 1 }}>
                        <Typography sx={{ fontWeight: 900 }}>{t.term}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>{t.from}</Typography>
                      </Box>
                    </Grid>
                    {[t.student, t.staff, t.public].map((price, i) => (
                      <Grid item md={3} key={i}>
                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'var(--club-tint)', textAlign: 'center' }}>
                          <Typography sx={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--club-text)' }}>
                            {price}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        <SectionHeading overline="Start here" align="center" title="Your first session in 3 steps" sx={{ mb: 'var(--club-heading-gap)' }} />
        <HowItWorks features={quickSteps.map(step => ({ title: step.title, description: step.body }))} />

        <Box sx={{ mt: { xs: 5, md: 6 } }}>
          <Card sx={{ bgcolor: 'var(--club-feature)', color: 'var(--club-text)' }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    Ready to join a session?
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'var(--club-muted)', lineHeight: 1.85 }}>
                    Tap here to see the queue system and where you are in the queue.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <MagneticButton
                    component={RouterLink}
                    to="/view-queue"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 900,
                      bgcolor: 'var(--club-accent)',
                      color: 'var(--club-action-ink)',
                      '&:hover': { bgcolor: 'var(--club-accent-hover)' },
                    }}
                  >
                    View queue &rarr;
                  </MagneticButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ my: 'var(--club-section-gap)' }} />

        {/* ─── Trainings Reference ─── */}
        <ScrollReveal>
          <TiltCard
            sx={{
              borderLeft: '4px solid #1c3c6f',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'var(--club-accent)',
                      letterSpacing: '0.14em',
                      fontWeight: 900,
                    }}
                  >
                    Also available
                  </Typography>
                  <Typography component="h2" variant="h5" sx={{ fontWeight: 900, mt: 0.5, color: 'var(--club-text)' }}>
                    Friday Trainings
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.85 }}>
                    Want more court time and structured coaching? Our Friday sessions run every week with experienced coaches.
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--club-accent)',
                    }}
                  >
                    Every Friday · 2:00–4:00 PM · UNSW FAC Level 1 · $25pp
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <MagneticButton
                    variant="contained"
                    component={RouterLink}
                    to="/trainings"
                    sx={{ fontWeight: 900 }}
                  >
                    View Trainings &rarr;
                  </MagneticButton>
                </Grid>
              </Grid>
            </CardContent>
          </TiltCard>
        </ScrollReveal>
      </Container>

      </PageContentSurface>
    </Box>
  );
}

export default SessionsPage;
