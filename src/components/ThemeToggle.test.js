import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ClubThemeProvider from './ClubThemeProvider';
import ThemeToggle from './ThemeToggle';
it('exposes the dark-mode state and persists keyboard toggles', () => {
  sessionStorage.setItem('unswbc-theme', 'light');
  render(<ClubThemeProvider><ThemeToggle /></ClubThemeProvider>);
  const toggle = screen.getByRole('switch', { name: 'Dark mode' });
  expect(toggle.getAttribute('aria-checked')).toBe('false');
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-checked')).toBe('true');
  expect(sessionStorage.getItem('unswbc-theme')).toBe('dark');
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-checked')).toBe('false');
  sessionStorage.removeItem('unswbc-theme');
});
