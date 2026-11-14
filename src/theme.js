import { createTheme } from '@mui/material/styles';

const NAVY = '#1c3c6f';
const NAVY_DARK = '#123456';
const OFF_WHITE = '#f8f9fa';

export const createClubTheme = (mode = 'light') => createTheme({
  // Keep spacing and typography in step as the desktop content grows.
  spacing: (factor) => `${factor * 0.5}rem`,
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#a9caff' : NAVY,
      contrastText: mode === 'dark' ? '#0c182b' : '#ffffff',
      dark: mode === 'dark' ? '#c6dcff' : NAVY_DARK,
    },
    background: {
      default: mode === 'dark' ? '#0c1422' : OFF_WHITE,
      paper: mode === 'dark' ? '#162235' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#edf3fc' : '#0f172a',
      secondary: mode === 'dark' ? '#b9c7dc' : '#475569',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h3: { fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h4: { fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 },
    h5: { fontWeight: 900, fontSize: '1.875rem', letterSpacing: '-0.03em', lineHeight: 1.15 },
    h6: { fontWeight: 900, fontSize: '1.375rem', letterSpacing: '-0.02em', lineHeight: 1.2 },
    button: { textTransform: 'none', fontWeight: 800 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          '@media (min-width: 1200px)': { fontSize: '106.25%' },
        },
        body: {
          backgroundColor: mode === 'dark' ? '#0c1422' : OFF_WHITE,
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
      styleOverrides: {
        maxWidthLg: {
          '@media (min-width: 1200px)': { maxWidth: 1320 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--club-nav)',
          color: 'var(--club-text)',
          backgroundImage: 'var(--club-glass-sheen)',
          backdropFilter: 'blur(10px) saturate(135%)',
          WebkitBackdropFilter: 'blur(10px) saturate(135%)',
          boxShadow: 'var(--club-glass-shadow)',
          borderBottom: '1px solid var(--club-line)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: '0.875rem',
          paddingInline: '1rem',
          paddingBlock: '0.625rem',
          border: '1px solid var(--club-glass-stroke)',
          backgroundImage: 'var(--club-button-sheen)',
          boxShadow: 'var(--club-button-shadow)',
          transition: 'background-color 180ms ease, border-color 180ms ease',
          '&:hover': { backgroundImage: 'var(--club-button-sheen)', boxShadow: 'var(--club-button-shadow)' },
          '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 3 },
          '&.Mui-disabled': { backgroundImage: 'none', boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: mode === 'dark' ? 'rgba(169,202,255,0.88)' : 'rgba(28,60,111,0.9)',
          '&:hover': { backgroundColor: mode === 'dark' ? '#c6dcff' : NAVY_DARK },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: '1px solid var(--club-glass-stroke)',
          backgroundColor: 'color-mix(in srgb, currentColor 7%, transparent)',
          backgroundImage: 'var(--club-button-sheen)',
          boxShadow: 'var(--club-button-shadow)',
          transition: 'background-color 180ms ease, border-color 180ms ease',
          '&:hover': { backgroundColor: 'color-mix(in srgb, currentColor 12%, transparent)', backgroundImage: 'var(--club-button-sheen)' },
          '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 3 },
          '&.Mui-disabled': { backgroundImage: 'none', boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--club-radius)',
          overflow: 'hidden',
          backgroundColor: 'var(--club-glass)',
          backgroundImage: 'var(--club-glass-sheen)',
          border: '1px solid var(--club-glass-stroke)',
          boxShadow: 'var(--club-glass-shadow)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1rem',
          '&:last-child': { paddingBottom: '1.5rem' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: '0.875rem', backgroundColor: 'var(--club-canvas)' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--club-radius)',
          backgroundColor: 'var(--club-glass)',
          backgroundImage: 'var(--club-glass-sheen)',
          border: '1px solid var(--club-glass-stroke)',
          boxShadow: 'var(--club-glass-shadow)',
          '&:before': { display: 'none' },
        },
      },
    },
  },
});


