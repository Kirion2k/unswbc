import React, { useState } from 'react';
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import { newsItems, categoryMeta } from '../data/news';

const FILTERS = ['all', 'announcement', 'result', 'event'];
const FILTER_LABELS = { all: 'All', announcement: 'Announcements', result: 'Results', event: 'Events' };

function CategoryChip({ category, sx }) {
  const meta = categoryMeta[category];
  return (
    <Chip
      label={meta?.label ?? category}
      size="small"
      sx={{
        fontWeight: 800,
        fontSize: '0.7rem',
        letterSpacing: '0.06em',
        bgcolor: meta?.bg,
        color: meta?.color,
        ...sx,
      }}
    />
  );
}

function NewsPage() {
  const [filter, setFilter] = useState('all');

  const featured = newsItems.find((n) => n.featured);
  const rest = newsItems.filter((n) => !n.featured);

  const visibleRest =
    filter === 'all' ? rest : rest.filter((n) => n.category === filter);
  const showFeatured = filter === 'all' || featured?.category === filter;

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-29.JPG"
        imageAlt="UNSW Badminton Club News"
        title="Club"
        highlight="News"
        subtitle="Results, announcements, events, and everything happening at UNSWBC."
        imagePosition="center 40%"
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {/* Heading + filter */}
        <ScrollReveal>
          <SectionHeading overline="Updates" title="Latest from the club" sx={{ mb: 4 }} />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 6 }}>
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  border: filter === f ? 'none' : '1.5px solid rgba(28,60,111,0.22)',
                  background: filter === f ? '#1c3c6f' : 'transparent',
                  color: filter === f ? 'white' : '#1c3c6f',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s, color 0.2s, border 0.2s',
                }}
              >
                {FILTER_LABELS[f]}
              </motion.button>
            ))}
          </Box>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* ─── Featured post ─── */}
            {showFeatured && featured && (
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <TiltCard sx={{ overflow: 'hidden' }}>
                  <CardActionArea
                    component={featured.link ? 'a' : 'div'}
                    href={featured.link ?? undefined}
                    target={featured.link ? '_blank' : undefined}
                    rel={featured.link ? 'noopener noreferrer' : undefined}
                    sx={{ cursor: featured.link ? 'pointer' : 'default' }}
                  >
                    <Grid container>
                      <Grid item xs={12} md={5}>
                        <CardMedia
                          component="img"
                          image={featured.image}
                          alt={featured.title}
                          sx={{
                            height: { xs: 240, md: '100%' },
                            minHeight: { md: 360 },
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <CategoryChip category={featured.category} />
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              {featured.date}
                            </Typography>
                            <Chip
                              label="Featured"
                              size="small"
                              sx={{ fontWeight: 800, fontSize: '0.65rem', bgcolor: 'rgba(28,60,111,0.08)', color: '#1c3c6f' }}
                            />
                          </Box>
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 900,
                              lineHeight: 1.15,
                              mb: 2,
                              fontSize: { xs: '1.5rem', md: '2rem' },
                              color: '#0f172a',
                            }}
                          >
                            {featured.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', lineHeight: 1.85, fontSize: { xs: '0.95rem', md: '1rem' }, mb: 3 }}>
                            {featured.excerpt}
                          </Typography>
                          {featured.link && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#1c3c6f', fontWeight: 800, fontSize: '0.9rem' }}>
                              Read more <OpenInNewIcon sx={{ fontSize: 16 }} />
                            </Box>
                          )}
                        </CardContent>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </TiltCard>
              </Box>
            )}

            {/* ─── News grid ─── */}
            {visibleRest.length > 0 ? (
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {visibleRest.map((post, index) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ height: '100%' }}
                    >
                      <TiltCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea
                          component={post.link ? 'a' : 'div'}
                          href={post.link ?? undefined}
                          target={post.link ? '_blank' : undefined}
                          rel={post.link ? 'noopener noreferrer' : undefined}
                          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', cursor: post.link ? 'pointer' : 'default' }}
                        >
                          {post.image && (
                            <Box sx={{ overflow: 'hidden' }}>
                              <CardMedia
                                component="img"
                                image={post.image}
                                alt={post.title}
                                sx={{
                                  height: 200,
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease',
                                  '&:hover': { transform: 'scale(1.05)' },
                                }}
                              />
                            </Box>
                          )}
                          <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                              <CategoryChip category={post.category} />
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', fontWeight: 600 }}>
                                {post.date}
                              </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, lineHeight: 1.25, color: '#0f172a' }}>
                              {post.title}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.9rem', flexGrow: 1 }}>
                              {post.excerpt}
                            </Typography>
                            {post.link && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2, color: '#1c3c6f', fontWeight: 800, fontSize: '0.82rem' }}>
                                Read more <OpenInNewIcon sx={{ fontSize: 14 }} />
                              </Box>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </TiltCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>No posts in this category yet.</Typography>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* ─── CTA ─── */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <ScrollReveal>
          <TiltCard sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Stay in the loop
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, maxWidth: 700, mb: 3 }}>
                Follow us on Instagram and Facebook for real-time updates on sessions, tournaments, and club events.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                <MagneticButton
                  component="a"
                  href="https://www.instagram.com/unswbadminton"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  sx={{ bgcolor: 'white', color: '#1c3c6f', fontWeight: 900, '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' } }}
                >
                  Instagram →
                </MagneticButton>
                <MagneticButton
                  component="a"
                  href="https://www.facebook.com/UNSWBC"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  sx={{ borderColor: 'rgba(255,255,255,0.5)', borderWidth: 2, color: 'white', fontWeight: 700, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Facebook →
                </MagneticButton>
              </Box>
            </CardContent>
          </TiltCard>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default NewsPage;
