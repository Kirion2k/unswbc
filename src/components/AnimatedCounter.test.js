import React from 'react';
import { render, screen } from '@testing-library/react';
import { animate } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

jest.mock('framer-motion', () => ({
  animate: jest.fn(),
  useInView: () => true,
  useReducedMotion: () => false,
}));

test('updates the displayed count without React renders and stops when unmounted', () => {
  const stop = jest.fn();
  animate.mockReturnValue({ stop });
  const { unmount } = render(<AnimatedCounter target={150} prefix="Members: " suffix="+" />);
  expect(animate).toHaveBeenCalledWith(0, 150, expect.any(Object));
  const update = animate.mock.calls[0][2].onUpdate;
  update(149.6);
  expect(screen.getByText('Members: 150+')).toBeTruthy();
  unmount();
  expect(stop).toHaveBeenCalledTimes(1);
});
