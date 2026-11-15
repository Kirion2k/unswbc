import React from 'react';
import ChampionshipCarousel from './ChampionshipCarousel';
import ChampionshipConfetti from './ChampionshipConfetti';
import { Box, Typography } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

const titles = [
  { year: '2024', label: 'National champions' },
  { year: '2025', label: 'National champions' },
  { year: '2026', label: 'Women’s champions' },
];

export default function ChampionshipHonours() {
  return (
    <Box
      component="section"
      aria-labelledby="championship-title"
      data-achievements
      sx={{
        position: 'relative', overflow: 'hidden', borderRadius: 'var(--club-radius)',
        bgcolor: 'var(--club-feature)', color: 'var(--club-text)',
        backgroundImage: 'var(--club-glass-sheen)', border: '1px solid var(--club-glass-stroke)', boxShadow: 'var(--club-glass-shadow)',
      }}
    >
      <ChampionshipConfetti />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' } }}>
        <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography
            id="championship-title" component="h2"
            sx={{
              fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.04em',
              fontSize: { xs: 'clamp(2rem, 10vw, 3.25rem)', md: 'clamp(3.25rem, 4.8vw, 4.5rem)' },
              m: 0,
            }}
          >
            Three years.
            <Box component="span" sx={{ display: 'block', color: 'var(--club-accent)' }}>Three titles.</Box>
          </Typography>
          <Typography sx={{ mt: 3, maxWidth: '36ch', fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.85, color: 'var(--club-muted)' }}>
            UniSport Nationals champions in 2024, 2025 and 2026. Our women’s team brought home the latest title.
          </Typography>
          <Typography sx={{ mt: { xs: 3, md: 4 }, fontWeight: 700, fontSize: '0.9rem', color: 'var(--club-text)' }}>
            A three-year run. A club that shows up to win.
          </Typography>
        </Box>

        <ChampionshipCarousel />
      </Box>

      <Box
        component="ol"
        aria-label="Three consecutive UniSport Nationals titles"
        sx={{
          display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
          listStyle: 'none', m: 0, p: 0, gap: '1px',
          borderTop: '1px solid var(--club-line)', bgcolor: 'var(--club-line)',
        }}
      >
        {titles.map(({ year, label }, index) => (
          <Box
            component="li" key={year}
            sx={{
              p: { xs: 2.5, md: 3 }, display: 'flex', alignItems: 'center', gap: 2,
              bgcolor: index === 2 ? 'var(--club-feature-accent)' : 'var(--club-feature)',
              backgroundImage: 'var(--club-glass-sheen)',
            }}
          >
            <EmojiEventsOutlinedIcon aria-hidden="true" sx={{ fontSize: { xs: 32, md: 38 }, color: 'var(--club-accent)', flexShrink: 0 }} />
            <Box>
              <Typography component="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.8rem', md: '2.25rem' }, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                {year}
              </Typography>
              <Typography sx={{ mt: 0.75, fontSize: '0.8rem', color: 'var(--club-muted)' }}>{label}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
