import React from 'react';
import { Box } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useClubTheme } from './ClubThemeProvider';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useClubTheme();
  const dark = mode === 'dark';
  return (
    <Box component="button" type="button" role="switch" aria-checked={dark} aria-label="Dark mode" title={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}
      sx={{
        position: 'relative', isolation: 'isolate', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around',
        justifySelf: 'end', width: 86, height: 44, p: '4px', flexShrink: 0, border: 0, borderRadius: '999px', cursor: 'pointer',
        color: 'var(--club-muted)', background: 'var(--club-glass)', backdropFilter: 'blur(6px) saturate(120%)', WebkitBackdropFilter: 'blur(6px) saturate(120%)',
        boxShadow: 'inset 0 1px 1px var(--club-glass-edge), inset 0 0 0 1px var(--club-glass-edge), 0 6px 18px -10px rgba(0,40,90,.35)',
        '&:focus-visible': { outline: '2px solid var(--club-accent)', outlineOffset: 4 },
        '&::before': {
          content: '""', position: 'absolute', top: 4, left: 4, width: 37, height: 36, borderRadius: '999px', zIndex: -1,
          transform: dark ? 'translateX(41px)' : 'translateX(0)',
          background: 'linear-gradient(145deg, rgba(255,255,255,.36), rgba(169,202,255,.12)), var(--club-surface)',
          boxShadow: 'inset 0 1px 1px var(--club-glass-edge), 0 2px 7px rgba(0,40,90,.12)',
          transition: 'transform 350ms cubic-bezier(.22,1,.36,1)',
        },
        '& svg': { width: 19, height: 19, transition: 'color 200ms ease' },
        '@media (prefers-reduced-motion: reduce)': { '&::before, & svg': { transition: 'none' } },
      }}>
      <LightModeOutlinedIcon sx={{ color: dark ? 'var(--club-muted)' : 'var(--club-accent)' }} />
      <DarkModeOutlinedIcon sx={{ color: dark ? 'var(--club-accent)' : 'var(--club-muted)' }} />
    </Box>
  );
}
