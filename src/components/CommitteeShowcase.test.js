import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CommitteeShowcase from './CommitteeShowcase';
jest.mock('framer-motion', () => ({ ...jest.requireActual('framer-motion'), useReducedMotion: () => true }));
it('keeps all six committee responsibilities visible and selects a new role on click', () => {
  render(<CommitteeShowcase />);
  const roles = screen.getAllByRole('button');
  expect(roles).toHaveLength(6);
  expect(roles[0].getAttribute('aria-pressed')).toBe('true');
  fireEvent.click(screen.getByRole('button', { name: /Sponsorships & partnerships/ }));
  expect(roles[5].getAttribute('aria-pressed')).toBe('true');
  expect(roles[0].getAttribute('aria-pressed')).toBe('false');
  expect(screen.getByAltText('Club members posing together with a partnership banner')).toBeTruthy();
});
it('gives keyboard focus the same preview as pointer selection', () => {
  render(<CommitteeShowcase />);
  const training = screen.getByRole('button', { name: /Training support/ });
  fireEvent.focus(training);
  expect(training.getAttribute('aria-pressed')).toBe('true');
  expect(screen.getByAltText('A UNSW committee member leading a badminton training group')).toBeTruthy();
  expect(screen.getByRole('button', { name: /Events & socials/ })).toBeTruthy();
});
