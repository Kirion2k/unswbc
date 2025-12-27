import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined'
import HowToRegOutlined from '@mui/icons-material/HowToRegOutlined'
import SportsTennisOutlined from '@mui/icons-material/SportsTennisOutlined'
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

function SessionsPage() {
  const imageSrc = "/unsw-58.jpg";

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }

  const quickSteps = [
    {
      title: 'Arrive and check in',
      body: 'Head to our desk inside UNSW Fitness and Aquatic Centre. If it is your first time, tell us and we will guide you.',
    },
    {
      title: 'Register and pay',
      body: 'No sign ups needed. Register on the day, then pay with cash or bank transfer. Please use your full name as the reference.',
    },
    {
      title: 'Get on court',
      body: 'We run a fair rotation system so everyone gets court time. Bring water and have a great hit.',
    },
  ]

  const infoCards = [
    {
      title: 'Location',
      icon: <PlaceOutlined />,
      accent: 'white',
      lines: ['UNSW Fitness and Aquatic Centre, Level 1 (upstairs)'],
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
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc={imageSrc}
        imageAlt="UNSW Badminton Club"
        imagePosition="center 30%"
        title="Club"
        highlight="Sessions"
        subtitle="Everything you need to join, where to go, and what sessions cost."
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="Start here" title="Your first session in 3 steps" sx={{ mb: 4 }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          component={motion.div}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {quickSteps.map((step, index) => (
            <Grid item xs={12} md={4} key={step.title}>
              <Box component={motion.div} variants={fadeUp} sx={{ height: '100%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box
                      sx={{
                        height: 38,
                        width: 38,
                        borderRadius: 999,
                        bgcolor: 'rgba(28,60,111,0.12)',
                        color: '#1c3c6f',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 900,
                        mb: 2,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                      {step.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: { xs: 5, md: 6 } }} />

        <SectionHeading overline="Info" title="Important information" sx={{ mb: 4 }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          component={motion.div}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ alignItems: 'stretch' }}
        >
          {infoCards.map((section, index) => {
            const isNavy = section.accent === 'navy'
            const isPayment = section.title === 'Payment'

            return (
              <Grid item xs={12} md={6} key={section.title} sx={{ display: 'flex' }}>
                <Box component={motion.div} variants={fadeUp} sx={{ flexGrow: 1, display: 'flex' }}>
                  <Card
                    sx={{
                      flexGrow: 1,
                      bgcolor: isNavy ? '#1c3c6f' : 'white',
                      color: isNavy ? 'white' : 'inherit',
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        minHeight: { md: 240 },
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                        <Box
                          sx={{
                            height: 40,
                            width: 40,
                            borderRadius: 999,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: isNavy ? 'rgba(255,255,255,0.14)' : 'rgba(28,60,111,0.12)',
                            color: isNavy ? 'white' : '#1c3c6f',
                            flex: '0 0 auto',
                          }}
                        >
                          {section.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>
                          {section.title}
                        </Typography>
                      </Stack>

                      <Box sx={{ flexGrow: 1 }}>
                        {isPayment ? (
                          <>
                            <Typography
                              variant="body2"
                              sx={{
                                lineHeight: 1.75,
                                color: isNavy ? 'rgba(255,255,255,0.88)' : 'text.secondary',
                              }}
                            >
                              We accept cash or bank transfer on arrival.
                            </Typography>

                            <Box
                              sx={{
                                mt: 1.75,
                                p: 2,
                                borderRadius: 3,
                                bgcolor: isNavy ? 'rgba(255,255,255,0.10)' : 'rgba(28,60,111,0.06)',
                                border: isNavy ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(28,60,111,0.08)',
                              }}
                            >
                              <Stack spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                                  <Typography variant="body2" sx={{ fontWeight: 900, color: isNavy ? 'white' : '#1c3c6f' }}>
                                    Name
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: isNavy ? 'rgba(255,255,255,0.88)' : 'text.secondary', lineHeight: 1.7 }}
                                  >
                                    UNSW Badminton Club
                                  </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                                  <Typography variant="body2" sx={{ fontWeight: 900, color: isNavy ? 'white' : '#1c3c6f' }}>
                                    BSB
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: isNavy ? 'rgba(255,255,255,0.88)' : 'text.secondary', lineHeight: 1.7 }}
                                  >
                                    062 303
                                  </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="space-between">
                                  <Typography variant="body2" sx={{ fontWeight: 900, color: isNavy ? 'white' : '#1c3c6f' }}>
                                    Account
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: isNavy ? 'rgba(255,255,255,0.88)' : 'text.secondary', lineHeight: 1.7 }}
                                  >
                                    10885979
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1.5,
                                lineHeight: 1.75,
                                color: isNavy ? 'rgba(255,255,255,0.88)' : 'text.secondary',
                              }}
                            >
                              Use your full name as the reference.
                            </Typography>
                          </>
                        ) : (
                          <Stack spacing={1} sx={{ color: isNavy ? 'rgba(255,255,255,0.88)' : 'text.secondary' }}>
                            {section.lines.map((line) => (
                              <Typography key={line} variant="body2" sx={{ lineHeight: 1.75 }}>
                                {line}
                              </Typography>
                            ))}
                          </Stack>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            )
          })}
        </Grid>

        <Divider sx={{ my: { xs: 5, md: 6 } }} />

        <SectionHeading overline="Times" title="Sessions" sx={{ mb: 4 }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          component={motion.div}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ alignItems: 'stretch' }}
        >
          {sessionCards.map((s) => (
            <Grid item xs={12} md={4} key={`${s.title} ${s.time}`} sx={{ display: 'flex' }}>
              <Box component={motion.div} variants={fadeUp} sx={{ flexGrow: 1, display: 'flex' }}>
                <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between" sx={{ mb: 1.25 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>
                        {s.title}
                      </Typography>
                      {s.highlight ? (
                        <Chip
                          label={s.highlight}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(28,60,111,0.12)',
                            color: '#1c3c6f',
                            fontWeight: 800,
                            letterSpacing: '0.02em',
                          }}
                        />
                      ) : null}
                    </Stack>

                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 800,
                        letterSpacing: '0.01em',
                        lineHeight: 1.3,
                        mb: 2,
                      }}
                    >
                      {s.time}
                    </Typography>

                    <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          flex: 1,
                          p: 2,
                          borderRadius: 999,
                          bgcolor: '#1c3c6f',
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 900, opacity: 0.95 }}>
                          Members
                        </Typography>
                        <Typography sx={{ mt: 0.5, fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.1 }}>
                          {s.memberPrice}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          p: 2,
                          borderRadius: 999,
                          bgcolor: 'rgba(28,60,111,0.06)',
                          border: '1px solid rgba(28,60,111,0.14)',
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 900, color: '#1c3c6f' }}>
                          Visitors
                        </Typography>
                        <Typography sx={{ mt: 0.5, fontWeight: 900, fontSize: '1.5rem', color: '#0b1220', lineHeight: 1.1 }}>
                          {s.visitorPrice}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.75, flexGrow: 1 }}>
                      {s.note}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: { xs: 5, md: 6 } }} />

        <SectionHeading overline="Pricing" title="Memberships" sx={{ mb: 2 }} />
        <Typography sx={{ textAlign: 'center', fontWeight: 700, mb: 4, color: 'text.secondary' }}>
          Note: memberships reset each year on 1 Feb.
        </Typography>

        <Card sx={{ overflow: 'hidden' }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Grid container spacing={{ xs: 2, md: 2 }}>
              <Grid item xs={12}>
                <Grid container spacing={1} sx={{ px: { xs: 0, md: 1 } }}>
                  <Grid item xs={12} md={3}>
                    <Typography sx={{ fontWeight: 900, color: '#1c3c6f' }}>
                      Term
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography sx={{ fontWeight: 900, color: '#1c3c6f' }}>
                      Students
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography sx={{ fontWeight: 900, color: '#1c3c6f' }}>
                      Staff and alumni
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography sx={{ fontWeight: 900, color: '#1c3c6f' }}>
                      General public
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {membershipTerms.map((t, index) => (
                <Grid item xs={12} key={t.term}>
                  {index !== 0 ? <Divider sx={{ my: 2 }} /> : null}
                  <Grid container spacing={1} alignItems="center" sx={{ px: { xs: 0, md: 1 } }}>
                    <Grid item xs={12} md={3}>
                      <Typography sx={{ fontWeight: 900 }}>
                        {t.term}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mt: 0.25 }}>
                        {t.from}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(28,60,111,0.06)' }}>
                        <Typography sx={{ fontWeight: 900, color: '#0b1220' }}>
                          {t.student}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(28,60,111,0.06)' }}>
                        <Typography sx={{ fontWeight: 900, color: '#0b1220' }}>
                          {t.staff}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(28,60,111,0.06)' }}>
                        <Typography sx={{ fontWeight: 900, color: '#0b1220' }}>
                          {t.public}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mt: { xs: 5, md: 6 } }}>
          <Card sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    Ready to join a session
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.88)', lineHeight: 1.85 }}>
                    Tap below to see the full session details and plan your first visit.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    component={RouterLink}
                    to="/sessions"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.4,
                      fontWeight: 900,
                      bgcolor: 'white',
                      color: '#1c3c6f',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
                    }}
                  >
                    View sessions
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>

    </Box>
  );
}

export default SessionsPage;
