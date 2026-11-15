import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TrainingToast from './TrainingToast';

beforeEach(() => { jest.useFakeTimers(); sessionStorage.clear(); });
afterEach(() => { cleanup(); jest.useRealTimers(); });

function viewport(mobile) {
  window.matchMedia = jest.fn().mockReturnValue({ matches: mobile, addEventListener: jest.fn(), removeEventListener: jest.fn(), addListener: jest.fn(), removeListener: jest.fn() });
}

test('does not show the large training popup on mobile', () => {
  viewport(true);
  render(<MemoryRouter><TrainingToast /></MemoryRouter>);
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.queryByText('Now on')).toBeNull();
});

test('keeps the training announcement on desktop', () => {
  viewport(false);
  render(<MemoryRouter><TrainingToast /></MemoryRouter>);
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.getByText('Now on')).toBeTruthy();
});
