import React from 'react';
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react';
import ClubThemeProvider, { useClubTheme } from './ClubThemeProvider';

function Control() {
  const { mode, toggleTheme } = useClubTheme();
  return <button onClick={toggleTheme}>{mode}</button>;
}

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 10, 15, 12));
});
afterEach(() => { cleanup(); jest.useRealTimers(); });

test.each([[6, 59, 'dark'], [7, 0, 'light'], [18, 59, 'light'], [19, 0, 'dark'], [0, 0, 'dark']])(
  'uses local time %i:%i for %s mode', (hour, minute, mode) => {
    jest.setSystemTime(new Date(2026, 10, 15, hour, minute));
    render(<ClubThemeProvider><Control /></ClubThemeProvider>);
    expect(screen.getByRole('button', { name: mode })).toBeTruthy();
  }
);

test('updates the automatic theme while the page is open', () => {
  jest.setSystemTime(new Date(2026, 10, 15, 18, 59));
  render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  act(() => jest.advanceTimersByTime(60000));
  expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
});

test('keeps a manual choice for the current visit, including remounting', () => {
  const { unmount } = render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'light' }));
  expect(sessionStorage.getItem('unswbc-theme')).toBe('dark');
  act(() => jest.advanceTimersByTime(60000));
  expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
  unmount();
  render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
});

test('an old permanent preference does not prevent automatic time selection', () => {
  localStorage.setItem('unswbc-theme', 'dark');
  render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  expect(screen.getByRole('button', { name: 'light' })).toBeTruthy();
});

test('still switches theme when the browser blocks saving preferences', () => {
  const save = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked'); });
  try {
    render(<ClubThemeProvider><Control /></ClubThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'light' }));
    expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
  } finally { save.mockRestore(); }
});
