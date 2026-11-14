import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import ClubThemeProvider, { useClubTheme } from './ClubThemeProvider';

function Control() {
  const { mode, toggleTheme } = useClubTheme();
  return <button onClick={toggleTheme}>{mode}</button>;
}

beforeEach(() => {
  localStorage.clear();
  window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() });
});
afterEach(cleanup);

test('switches themes and remembers the selection after remounting', () => {
  const { unmount } = render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'light' }));
  expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
  expect(localStorage.getItem('unswbc-theme')).toBe('dark');
  unmount();
  render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
});

test('uses system dark preference when there is no saved selection', () => {
  window.matchMedia.mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  render(<ClubThemeProvider><Control /></ClubThemeProvider>);
  expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
});

test('still switches theme when the browser blocks saving preferences', () => {
  const save = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked'); });
  try {
    render(<ClubThemeProvider><Control /></ClubThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'light' }));
    expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy();
  } finally {
    save.mockRestore();
  }
});
