import PageContentSurface from '../components/PageContentSurface';
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { keyframes } from '@mui/system';
// import InstagramIcon from '@mui/icons-material/Instagram';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import ChampionshipHonours from '../components/ChampionshipHonours';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import LetterAnimation from '../components/LetterAnimation';
import MorphingText from '../components/MorphingText';
import useHeroScroll from '../components/useHeroScroll';
import useHeroVideo from '../components/useHeroVideo';
import FloatingParticles from '../components/FloatingParticles';
import LogoMarquee from '../components/LogoMarquee';
import ParallaxImage from '../components/ParallaxImage';
// import MiniInstagramGrid from '../components/MiniInstagramGrid';
import unswLogo from '../unsw-logo.png';
import arcLogo from '../arc-logo.jpg';
import badmintonAuLogo from '../badminton-au.png';
import badmintonNswLogo from '../nsw-badminton.png';

const gradientShift = keyframes`
  0%, 100% { transform: translate3d(-2%, 0, 0); }
  50% { transform: translate3d(2%, 0, 0); }
`;

function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  useHeroScroll(heroRef);
  const videoRef = useRef(null);
  const heroVisible = useInView(heroRef);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const heroActive = heroVisible && documentVisible && !prefersReducedMotion;

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const mobile = useMediaQuery('(max-width: 767px)', { noSsr: true });
  const videoSource = mobile ? '/video-mobile.mp4' : '/video-web.mp4';
  const { needsPlayButton, play: playVideo } = useHeroVideo(videoRef, {
    visible: heroVisible && documentVisible,
    reducedMotion: prefersReducedMotion,
    source: videoSource,
  });
  const heroImage = '/optimized/unsw-64.jpg';

  const featureSections = [
    {
      title: 'Who we are',
      body: 'A welcoming community of players across every level, from first timers to competitive athletes.',
      body2: 'Whether you are brand new or already competing, you will find friendly games, good people, and a club culture that makes it easy to get involved.',
      image: '/optimized/unsw-1.jpg',
      tone: 'navy',
    },
    {
      title: 'Training & improvement',
      body: 'Build fundamentals, learn tactics, and sharpen your game with structured sessions and great partners.',
      body2: 'We focus on consistency and confidence on court, so you can level up your skills and enjoy better games week after week.',
      image: '/optimized/unsw-2.jpg',
      tone: 'light',
    },
    {
      title: 'Community & events',
      body: 'Tournaments, socials, and club culture that makes you want to come back every week.',
      body2: 'From club events to team competitions, there is always something to look forward to, and plenty of chances to meet new people.',
      image: '/optimized/unsw-41.jpg',
      tone: 'navy',
    },
  ];

  const cards = [
    { img: '/optimized/unsw-13.jpg', title: 'Session info', description: 'Times, location, pricing, and how sessions run.', link: '/sessions' },
    { img: '/optimized/unsw-9.jpg', title: 'FAQs', description: 'Quick answers before your first session.', link: '/faqs' },
    { img: '/optimized/unsw-49.jpg', title: 'Get in touch', description: 'Questions? Message us or follow our socials.', link: '/contact' },
  ];

  const partners = [
    { src: unswLogo, alt: 'UNSW' },
    { src: arcLogo, alt: 'ARC Sport' },
    { src: badmintonAuLogo, alt: 'Badminton Australia' },
    { src: badmintonNswLogo, alt: 'Badminton NSW' },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--club-canvas)' }}>
      {/* ─── Hero ─── */}
      <Box
        component="section"
        ref={heroRef}
        data-page-hero
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
          bgcolor: '#0a1628',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component={motion.video}
          ref={videoRef}
          src={videoSource}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
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

        {needsPlayButton && (
          <MagneticButton
            onClick={playVideo}
            variant="outlined"
            sx={{ position: 'absolute', right: 16, bottom: 16, zIndex: 2, color: 'white', bgcolor: 'rgba(12,20,34,0.7)', borderColor: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', px: 1.5, py: 0.75 }}
          >
            Play background video
          </MagneticButton>
        )}

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: '-4%',
            background: 'linear-gradient(135deg, rgba(10,22,40,0.82) 0%, rgba(28,60,111,0.3) 50%, rgba(10,22,40,0.78) 100%)',
            backgroundSize: '200% 200%',
            animation: prefersReducedMotion ? 'none' : `${gradientShift} 15s ease infinite`,
            animationPlayState: heroActive ? 'running' : 'paused',
          }}
        />

        <FloatingParticles count={10} active={heroActive} />

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
            pointerEvents: 'none',
          }}
        />

        <Container
          sx={{
            position: 'relative', zIndex: 1,
            minHeight: '100svh',
            display: 'grid', alignItems: 'center',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
            pt: { xs: 12, md: 14 }, pb: { xs: 4, md: 6 },
          }}
        >
          <Box data-hero-content sx={{ width: '100%', maxWidth: 560, mx: 'auto' }}>
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
                active={heroActive}
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
                maxWidth: '44ch',
                lineHeight: 1.7,
              }}
            >
              3&times; UniSport National Champions. 150+ members. Sydney&apos;s most competitive university badminton community.
            </Typography>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              sx={{ mt: { xs: 3, md: 3.5 }, display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}
            >
              <MagneticButton
                variant="contained"
                component={RouterLink}
                to="/sessions"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.84)',
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
                  borderColor: 'rgba(255,255,255,0.5)',
                  bgcolor: 'rgba(12,20,34,0.38)',
                  borderWidth: 1,
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


          </Box>
        </Container>

      </Box>

      {/* ─── Feature Sections ─── */}
      <PageContentSurface>
      <Container data-page-content sx={{ py: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Welcome" title="A club built for every level" sx={{ mb: 'var(--club-heading-gap)' }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {featureSections.map((s, index) => {
            const imageFirst = index % 2 === 0;

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
                          loading="lazy"
                          decoding="async"
                          image={s.image}
                          alt={s.title}
                          sx={{
                            width: '100%',
                            flexGrow: 1,
                            height: { xs: 240, sm: 300, md: '100%' },
                            minHeight: { md: '22.5rem' },
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
                          bgcolor: s.tone === 'navy' ? 'var(--club-tint)' : 'transparent',
                          display: 'flex',
                        }}
                      >
                        <CardContent
                          sx={{
                            p: { xs: 3, md: 5 },
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
                            <Typography
                              variant="h5"
                              sx={{ fontWeight: 900, mt: 0.5, color: 'var(--club-text)', lineHeight: 1.2 }}
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
      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <ScrollReveal direction="left">
              <Typography
                variant="overline"
                sx={{ color: 'var(--club-accent)', letterSpacing: '0.14em', fontWeight: 900 }}
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
              <Box sx={{ borderRadius: 4, overflow: 'hidden', height: { xs: 280, md: '23.75rem' } }}>
                <ParallaxImage
                  src="/optimized/unsw-14.jpg"
                  alt="UNSW Badminton Club community"
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>

      {/* ─── News / Instagram Mini Grid ─── */}
      {/* Temporarily hidden until the Instagram feed is available.

      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <SectionHeading overline="News" title="Latest from Instagram" sx={{ mb: 2 }} />
            <MagneticButton
              component="a"
              href="https://www.instagram.com/unswbadminton/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<InstagramIcon />}
              sx={{ fontWeight: 800, borderColor: '#1c3c6f', color: 'var(--club-accent)', '&:hover': { borderColor: '#123456', bgcolor: 'var(--club-tint)' } }}
            >
              @unswbadminton
            </MagneticButton>
          </Box>
        </ScrollReveal>
        <MiniInstagramGrid maxItems={9} />
      </Container>
      */}

      {/* ─── Sessions Preview ─── */}
      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Sessions" title="Join us on court" sx={{ mb: 'var(--club-heading-gap)' }} />
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
                        sx={{ fontWeight: 800, color: 'var(--club-accent)', fontSize: '1.1rem', mt: 0.5 }}
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

      {/* ─── Achievements ─── */}
      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ChampionshipHonours />
      </Container>

      {/* ─── Explore Cards ─── */}
      <Container sx={{ pb: 'var(--club-section-space)' }}>
        <ScrollReveal>
          <SectionHeading overline="Explore" title="Explore the club" sx={{ mb: 'var(--club-heading-gap)' }} />
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
                          loading="lazy"
                          decoding="async"
                        image={card.img}
                        alt={card.title}
                        sx={{
                          height: { xs: 180, md: '13.75rem' },
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '&:hover': { transform: 'scale(1.04)' },
                        }}
                      />
                      <CardContent
                        sx={{
                          p: 3,
                          minHeight: { xs: 132, md: '8.75rem' },
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

      {/* ─── Partners Marquee ─── */}
      <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: 'transparent' }}>
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
          bgcolor: 'var(--club-section-tint)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: 'var(--club-text)',
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Ready to Play?
            </Typography>
            <Typography
              sx={{
                color: 'var(--club-muted)',
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
                bgcolor: 'var(--club-accent)',
                color: 'var(--club-action-ink)',
                fontWeight: 900,
                px: 5,
                py: 1.5,
                fontSize: '1.05rem',
                '&:hover': { bgcolor: 'var(--club-accent-hover)' },
              }}
            >
              View Sessions &rarr;
            </MagneticButton>
          </ScrollReveal>
        </Container>
      </Box>
      </PageContentSurface>
    </Box>
  );
}

export default HomePage;
