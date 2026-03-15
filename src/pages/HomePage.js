import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { keyframes } from '@mui/system';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import LetterAnimation from '../components/LetterAnimation';
import MorphingText from '../components/MorphingText';
import FloatingParticles from '../components/FloatingParticles';
import LogoMarquee from '../components/LogoMarquee';
import ParallaxImage from '../components/ParallaxImage';
import { newsItems, categoryMeta } from '../data/news';
import unswLogo from '../unsw-logo.png';
import arcLogo from '../arc-logo.jpg';
import badmintonAuLogo from '../badminton-au.png';
import badmintonNswLogo from '../nsw-badminton.png';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scaleX(1); }
  50% { opacity: 0.8; transform: scaleX(1.1); }
`;


function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const heroImage = '/unsw-64.JPG';

  const featureSections = [
    {
      title: 'Who we are',
      body: 'A welcoming community of players across every level, from first timers to competitive athletes.',
      body2: 'Whether you are brand new or already competing, you will find friendly games, good people, and a club culture that makes it easy to get involved.',
      image: '/unsw-1.jpg',
      tone: 'navy',
    },
    {
      title: 'Training & improvement',
      body: 'Build fundamentals, learn tactics, and sharpen your game with structured sessions and great partners.',
      body2: 'We focus on consistency and confidence on court, so you can level up your skills and enjoy better games week after week.',
      image: '/unsw-2.jpg',
      tone: 'light',
    },
    {
      title: 'Community & events',
      body: 'Tournaments, socials, and club culture that makes you want to come back every week.',
      body2: 'From club events to team competitions, there is always something to look forward to, and plenty of chances to meet new people.',
      image: '/unsw-41.JPG',
      tone: 'navy',
    },
  ];

  const cards = [
    { img: '/unsw-13.jpg', title: 'Session info', description: 'Times, location, pricing, and how sessions run.', link: '/sessions' },
    { img: '/unsw-9.jpg', title: 'FAQs', description: 'Quick answers before your first session.', link: '/faqs' },
    { img: '/unsw-49.JPG', title: 'Get in touch', description: 'Questions? Message us or follow our socials.', link: '/contact' },
  ];

  const stats = [
    { value: 150, suffix: '+', label: 'Active Members' },
    { value: 2, suffix: '×', label: 'National Champions' },
    { value: 4, suffix: '', label: 'Weekly Sessions' },
    { label: 'Est. 2009', static: true },
  ];

  const partners = [
    { src: unswLogo, alt: 'UNSW' },
    { src: arcLogo, alt: 'ARC Sport' },
    { src: badmintonAuLogo, alt: 'Badminton Australia' },
    { src: badmintonNswLogo, alt: 'Badminton NSW' },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      {/* ─── Hero ─── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          bgcolor: '#0a1628',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component={motion.video}
          src="/video-web.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          initial={prefersReducedMotion ? { opacity: 0.45 } : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 2.5 }}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10,22,40,0.82) 0%, rgba(28,60,111,0.3) 50%, rgba(10,22,40,0.78) 100%)',
            backgroundSize: '200% 200%',
            animation: prefersReducedMotion ? 'none' : `${gradientShift} 15s ease infinite`,
          }}
        />

        <FloatingParticles count={18} />

        {/* Radial glow behind hero text */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          sx={{
            position: 'absolute',
            top: '40%',
            left: { xs: '50%', md: '20%' },
            transform: { xs: 'translateX(-50%)', md: 'none' },
            width: { xs: '90vw', md: 600 },
            height: { xs: '60vw', md: 600 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(28,60,111,0.35) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <Container sx={{ position: 'relative', zIndex: 1, py: { xs: 14, md: 0 } }}>
          <Box sx={{ maxWidth: 800 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.45)',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                UNSW Badminton Club
              </Typography>
            </motion.div>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 'clamp(2.5rem, 8vw, 4.5rem)', md: 'clamp(3.5rem, 5vw, 5rem)' },
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: 'white',
              }}
            >
              <LetterAnimation text="YOUR GAME" delay={0.3} staggerDelay={0.04} />
              <br />
              <LetterAnimation text="ELEVATES" delay={0.5} staggerDelay={0.03} />
              <br />
              <MorphingText
                texts={['HERE', 'NOW', 'TODAY', 'TOGETHER']}
                sx={{ color: '#5ba3f5' }}
              />
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              sx={{
                mt: 3,
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              2&times; UniSport National Champions. 150+ members. Sydney&apos;s most competitive university badminton community.
            </Typography>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}
            >
              <MagneticButton
                variant="contained"
                component={RouterLink}
                to="/sessions"
                sx={{
                  bgcolor: 'white',
                  color: '#0a1628',
                  fontWeight: 800,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Join the Club &rarr;
              </MagneticButton>
              <MagneticButton
                variant="outlined"
                component={RouterLink}
                to="/about"
                sx={{
                  borderColor: 'white',
                  borderWidth: 2,
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.12)' },
                }}
              >
                About Us &rarr;
              </MagneticButton>
            </Box>

            {/* Glowing accent line */}
            <Box
              sx={{
                mt: 5,
                height: 3,
                width: 120,
                borderRadius: 2,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                animation: prefersReducedMotion ? 'none' : `${glowPulse} 3s ease-in-out infinite`,
              }}
            />
          </Box>
        </Container>

      </Box>

      {/* ─── Stats Counter Bar ─── */}
      <Box sx={{ bgcolor: '#1c3c6f', py: { xs: 5, md: 6 } }}>
        <Container>
          <StaggerContainer staggerDelay={0.12}>
            <Grid container spacing={3} justifyContent="center" textAlign="center">
              {stats.map((stat, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <StaggerItem>
                    <Typography
                      sx={{
                        fontSize: { xs: '2.2rem', md: '2.8rem' },
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.static ? (
                        stat.label
                      ) : (
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} />
                      )}
                    </Typography>
                    {!stat.static && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          color: 'rgba(255,255,255,0.6)',
                          fontWeight: 700,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    )}
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>

      {/* ─── Feature Sections ─── */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Welcome" title="A club built for every level" sx={{ mb: 5 }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {featureSections.map((s, index) => {
            const imageFirst = index % 2 === 0;
            const overline = index === 0 ? 'Community' : index === 1 ? 'Training' : 'Events';

            return (
              <Grid item xs={12} key={s.title}>
                <ScrollReveal delay={index * 0.1}>
                  <TiltCard>
                    <Grid container alignItems="stretch">
                      <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                          order: { xs: 0, md: imageFirst ? 0 : 1 },
                          display: 'flex',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={s.image}
                          alt={s.title}
                          sx={{
                            width: '100%',
                            flexGrow: 1,
                            height: { xs: 240, sm: 300, md: '100%' },
                            minHeight: { md: 360 },
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                          order: { xs: 1, md: imageFirst ? 1 : 0 },
                          bgcolor: s.tone === 'navy' ? 'rgba(28,60,111,0.04)' : 'transparent',
                          display: 'flex',
                        }}
                      >
                        <CardContent
                          sx={{
                            p: { xs: 3, md: 4 },
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
                            <Typography
                              variant="overline"
                              sx={{
                                color: '#1c3c6f',
                                letterSpacing: '0.14em',
                                fontWeight: 900,
                              }}
                            >
                              {overline}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ fontWeight: 900, mt: 0.5, color: '#0b1220', lineHeight: 1.2 }}
                            >
                              {s.title}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 1.25,
                                color: 'text.secondary',
                                lineHeight: 1.9,
                                fontSize: { xs: '1rem', md: '1.05rem' },
                              }}
                            >
                              {s.body}
                            </Typography>
                            {s.body2 && (
                              <Typography
                                sx={{
                                  mt: 1,
                                  color: 'text.secondary',
                                  lineHeight: 1.9,
                                  fontSize: { xs: '1rem', md: '1.05rem' },
                                }}
                              >
                                {s.body2}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </TiltCard>
                </ScrollReveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* ─── About Preview ─── */}
      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <ScrollReveal direction="left">
              <Typography
                variant="overline"
                sx={{ color: '#1c3c6f', letterSpacing: '0.14em', fontWeight: 900 }}
              >
                About Us
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mt: 1,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  lineHeight: 1.15,
                }}
              >
                More than a club — a community
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: '1.05rem' }}>
                From social games to national competitions, UNSW Badminton Club brings together players of
                every level in a welcoming, high-energy environment.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <MagneticButton
                  variant="outlined"
                  component={RouterLink}
                  to="/about"
                  sx={{ fontWeight: 800 }}
                >
                  Learn More &rarr;
                </MagneticButton>
              </Box>
            </ScrollReveal>
          </Grid>
          <Grid item xs={12} md={6}>
            <ScrollReveal direction="right">
              <Box sx={{ borderRadius: 4, overflow: 'hidden', height: { xs: 280, md: 380 } }}>
                <ParallaxImage
                  src="/unsw-14.JPG"
                  alt="UNSW Badminton Club community"
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>

      {/* ─── Sessions Preview ─── */}
      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Sessions" title="Join us on court" sx={{ mb: 5 }} />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {[
              { day: 'Tuesdays', time: '6 – 10pm', note: 'After class games' },
              { day: 'Saturdays', time: '1 – 4pm', note: 'Afternoon session' },
              { day: 'Saturdays', time: '4 – 7pm', note: 'Evening session' },
            ].map((session) => (
              <Grid item xs={12} md={4} key={`${session.day}-${session.time}`}>
                <StaggerItem>
                  <TiltCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        {session.day}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 800, color: '#1c3c6f', fontSize: '1.1rem', mt: 0.5 }}
                      >
                        {session.time}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mt: 1, lineHeight: 1.7 }}>
                        {session.note}
                      </Typography>
                      <Typography sx={{ mt: 1, fontSize: '0.85rem', color: 'text.secondary' }}>
                        UNSW Fitness &amp; Aquatic Centre, Level 2
                      </Typography>
                    </CardContent>
                  </TiltCard>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <MagneticButton
            variant="contained"
            component={RouterLink}
            to="/sessions"
            sx={{ fontWeight: 800 }}
          >
            Full Session Details &rarr;
          </MagneticButton>
        </Box>
      </Container>

      {/* ─── Achievement Showcase ─── */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container>
          <ScrollReveal>
            <SectionHeading overline="Achievements" title="National Champions" sx={{ mb: 5 }} />
          </ScrollReveal>
          <ScrollReveal>
            <Card
              sx={{
                overflow: 'hidden',
                borderRadius: 4,
                position: 'relative',
                minHeight: { xs: 400, md: 360 },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/unsw-29.JPG)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(28,60,111,0.96), rgba(28,60,111,0.86) 46%, rgba(2,6,23,0.15) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  px: { xs: 3, md: 6 },
                  py: { xs: 4, md: 6 },
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ maxWidth: 600 }}>
                  <Typography variant="overline" sx={{ letterSpacing: '0.14em', fontWeight: 900, color: 'rgba(255,255,255,0.82)' }}>
                    UniSport Nationals
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.12, mt: 0.5 }}>
                    Champions in 2024 &amp; 2025
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.85 }}>
                    UNSW won the UniSport Nationals badminton title back-to-back. National-level players,
                    a strong team culture, and a legacy of excellence.
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.1 }}>
                          <AnimatedCounter target={2} suffix="×" />
                        </Typography>
                        <Typography sx={{ mt: 0.5, color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                          National Titles
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.1 }}>
                          <AnimatedCounter target={150} suffix="+" />
                        </Typography>
                        <Typography sx={{ mt: 0.5, color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                          Active Members
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Card>
          </ScrollReveal>
        </Container>
      </Box>

      {/* ─── Explore Cards ─── */}
      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <ScrollReveal>
          <SectionHeading overline="Explore" title="Explore the club" sx={{ mb: 5 }} />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <StaggerItem>
                  <TiltCard>
                    <CardActionArea component={RouterLink} to={card.link} sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        image={card.img}
                        alt={card.title}
                        sx={{
                          height: { xs: 180, md: 220 },
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '&:hover': { transform: 'scale(1.04)' },
                        }}
                      />
                      <CardContent
                        sx={{
                          p: 3,
                          minHeight: { xs: 132, md: 140 },
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                          {card.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, flexGrow: 1 }}>
                          {card.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </TiltCard>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>

      {/* ─── Latest News ─── */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <ScrollReveal>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <SectionHeading overline="News" title="Latest updates" sx={{ mb: 0 }} />
            <MagneticButton
              component={RouterLink}
              to="/news"
              variant="outlined"
              sx={{ borderColor: 'rgba(28,60,111,0.35)', borderWidth: 2, color: '#1c3c6f', fontWeight: 800, '&:hover': { borderColor: '#1c3c6f', bgcolor: 'rgba(28,60,111,0.05)' } }}
            >
              View all news →
            </MagneticButton>
          </Box>
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.09}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {newsItems.slice(0, 3).map((post) => {
              const meta = categoryMeta[post.category];
              return (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <StaggerItem style={{ height: '100%' }}>
                    <TiltCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardActionArea
                        component={post.link ? 'a' : RouterLink}
                        to={post.link ? undefined : '/news'}
                        href={post.link ?? undefined}
                        target={post.link ? '_blank' : undefined}
                        rel={post.link ? 'noopener noreferrer' : undefined}
                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                      >
                        <Box sx={{ overflow: 'hidden' }}>
                          <CardMedia
                            component="img"
                            image={post.image}
                            alt={post.title}
                            sx={{ height: 190, objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }}
                          />
                        </Box>
                        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                            <Chip
                              label={meta?.label ?? post.category}
                              size="small"
                              sx={{ fontWeight: 800, fontSize: '0.68rem', bgcolor: meta?.bg, color: meta?.color }}
                            />
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.76rem', fontWeight: 600 }}>
                              {post.date}
                            </Typography>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.75, lineHeight: 1.25, color: '#0f172a', fontSize: { xs: '1rem', md: '1.05rem' } }}>
                            {post.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.875rem', flexGrow: 1 }}>
                            {post.excerpt}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </TiltCard>
                  </StaggerItem>
                </Grid>
              );
            })}
          </Grid>
        </StaggerContainer>
      </Container>

      {/* ─── Partners Marquee ─── */}
      <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: 'white' }}>
        <Container>
          <ScrollReveal>
            <SectionHeading overline="Our partners" title="Affiliated with" sx={{ mb: 3 }} />
          </ScrollReveal>
          <LogoMarquee logos={partners} speed={25} />
        </Container>
      </Box>

      {/* ─── CTA Banner ─── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: '#1c3c6f',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #123456 0%, #1c3c6f 50%, #123456 100%)',
            backgroundSize: '200% 200%',
            animation: prefersReducedMotion ? 'none' : `${gradientShift} 12s ease infinite`,
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: 'white',
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Ready to Play?
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                maxWidth: 500,
                mx: 'auto',
                mb: 4,
              }}
            >
              Join 150+ members at Sydney&apos;s top university badminton club.
            </Typography>
            <MagneticButton
              variant="contained"
              component={RouterLink}
              to="/sessions"
              sx={{
                bgcolor: 'white',
                color: '#1c3c6f',
                fontWeight: 900,
                px: 5,
                py: 1.5,
                fontSize: '1.05rem',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
              }}
            >
              View Sessions &rarr;
            </MagneticButton>
          </ScrollReveal>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
