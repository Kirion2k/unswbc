import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createClubTheme } from '../theme';

const ClubThemeContext = createContext(null);
export const useClubTheme = () => useContext(ClubThemeContext);

function savedVisitMode() {
  try {
    const saved = sessionStorage.getItem('unswbc-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Storage may be disabled by the visitor. */ }
  return null;
}

function localTimeMode() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? 'light' : 'dark';
}

export default function ClubThemeProvider({ children }) {
  const [manualMode, setManualMode] = useState(savedVisitMode);
  const [automaticMode, setAutomaticMode] = useState(localTimeMode);
  const mode = manualMode || automaticMode;

  useEffect(() => {
    if (manualMode) return;
    const update = () => setAutomaticMode(localTimeMode());
    const timer = window.setInterval(update, 60000);
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [manualMode]);
  const theme = useMemo(() => createClubTheme(mode), [mode]);
  const value = useMemo(() => ({
    mode,
    toggleTheme: () => {
      const next = mode === 'light' ? 'dark' : 'light';
      setManualMode(next);
      try { sessionStorage.setItem('unswbc-theme', next); } catch { /* Keep the toggle usable without storage. */ }
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
