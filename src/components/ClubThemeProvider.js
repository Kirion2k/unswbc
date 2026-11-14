import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createClubTheme } from '../theme';

const ClubThemeContext = createContext(null);
export const useClubTheme = () => useContext(ClubThemeContext);

function initialMode() {
  try {
    const saved = localStorage.getItem('unswbc-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Storage may be disabled by the visitor. */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ClubThemeProvider({ children }) {
  const [mode, setMode] = useState(initialMode);
  const theme = useMemo(() => createClubTheme(mode), [mode]);
  const value = useMemo(() => ({
    mode,
    toggleTheme: () => {
      const next = mode === 'light' ? 'dark' : 'light';
      setMode(next);
      try { localStorage.setItem('unswbc-theme', next); } catch { /* Keep the toggle usable without storage. */ }
    },
  }), [mode]);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  return (
    <ClubThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ClubThemeContext.Provider>
  );
}
