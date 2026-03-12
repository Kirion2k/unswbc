import { createTheme } from '@mui/material/styles';

const NAVY = '#1c3c6f';
const NAVY_DARK = '#123456';
const OFF_WHITE = '#f8f9fa';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: NAVY,
      dark: NAVY_DARK,
    },
    background: {
      default: OFF_WHITE,
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  shape: {
    borderRadius: 14,
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
    h5: { fontWeight: 800, letterSpacing: '-0.01em' },
    h6: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 800 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: OFF_WHITE,
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(2, 6, 23, 0.78)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 16,
          paddingBlock: 10,
        },
        containedPrimary: {
          backgroundColor: NAVY,
          '&:hover': { backgroundColor: NAVY_DARK },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 10px 30px rgba(2, 6, 23, 0.06)',
          '&:before': { display: 'none' },
        },
      },
    },
  },
});


