import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ChampionshipCarousel from './ChampionshipCarousel';
jest.mock('framer-motion', () => ({ ...jest.requireActual('framer-motion'), useInView: () => true, useReducedMotion: () => false }));
beforeEach(() => jest.useFakeTimers());
afterEach(() => { jest.clearAllTimers(); jest.useRealTimers(); });
function selectedYear() { return screen.getAllByRole('button', { name: /Show .* winners/ }).find(button => button.getAttribute('aria-current') === 'true').getAttribute('aria-label').match(/\d{4}/)[0]; }
it('cycles through 2024, 2025 and 2026 automatically and wraps', () => {
  render(<ChampionshipCarousel />);
  expect(selectedYear()).toBe('2024');
  for (const year of ['2025', '2026', '2024']) { act(() => jest.advanceTimersByTime(3500)); expect(selectedYear()).toBe(year); }
});
it('supports year selection, previous/next and pausing', () => {
  render(<ChampionshipCarousel />);
  fireEvent.click(screen.getByRole('button', { name: 'Show 2026 winners' }));
  expect(selectedYear()).toBe('2026');
  fireEvent.click(screen.getByRole('button', { name: 'Next winners' }));
  expect(selectedYear()).toBe('2024');
  fireEvent.click(screen.getByRole('button', { name: 'Previous winners' }));
  expect(selectedYear()).toBe('2026');
  fireEvent.click(screen.getByRole('button', { name: 'Pause winners slideshow' }));
  act(() => jest.advanceTimersByTime(10000));
  expect(selectedYear()).toBe('2026');
  fireEvent.click(screen.getByRole('button', { name: 'Play winners slideshow' }));
  act(() => jest.advanceTimersByTime(3500));
  expect(selectedYear()).toBe('2024');
});
