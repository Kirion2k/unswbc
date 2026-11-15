import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { PricingSection } from './pricing-section';
import type { PricingTier } from './pricing-card';

jest.mock('@number-flow/react', () => ({ __esModule: true, default: ({ value }: { value: number }) => <span>${value}</span> }));
const tiers: PricingTier[] = [
  { name: 'Tuesdays', time: '6 to 10pm', price: { Members: 10, Visitors: 15 }, description: 'After class games', features: ['Pay on arrival'], cta: 'How to join', href: '#session-registration' },
  { name: 'Saturdays', time: '1 to 4pm or 4 to 7pm', price: { Members: 8, Visitors: 13 }, description: 'Split sessions', features: ['Pay on arrival'], cta: 'How to join', href: '#session-registration', popular: true },
  { name: 'Saturdays', time: '1 to 7pm', price: { Members: 15, Visitors: 25 }, description: 'Long session block', features: ['Pay on arrival'], cta: 'How to join', href: '#session-registration' },
];
function setup() { return render(<PricingSection title="Session times and prices" subtitle="Pay on arrival" tiers={tiers} frequencies={['Members', 'Visitors']} />); }
it('switches all three session prices and their labels together', () => {
  setup();
  const section = screen.getByRole('region', { name: 'Session times and prices' });
  expect(screen.getByRole('button', { name: 'Members' }).getAttribute('aria-pressed')).toBe('true');
  expect(within(section).getByText('$10')).toBeTruthy();
  expect(within(section).getByText('$8')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Visitors' }));
  expect(screen.getByRole('button', { name: 'Visitors' }).getAttribute('aria-pressed')).toBe('true');
  for (const price of ['$15', '$13', '$25']) expect(within(section).getByText(price)).toBeTruthy();
  expect(within(section).queryByText('$10')).toBeNull();
  expect(within(section).getAllByText('AUD / visitor / session')).toHaveLength(3);
  fireEvent.click(screen.getByRole('button', { name: 'Members' }));
  expect(within(section).getByText('$8')).toBeTruthy();
});
it('keeps accurate session times and links every CTA to registration', () => {
  setup();
  for (const tier of tiers) expect(screen.getByText(tier.time)).toBeTruthy();
  expect(screen.getAllByRole('link', { name: 'How to join' })).toHaveLength(3);
  for (const link of screen.getAllByRole('link', { name: 'How to join' })) expect(link.getAttribute('href')).toBe('#session-registration');
  expect(screen.getAllByText('Most popular')).toHaveLength(1);
});
