import * as React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { LiquidNavbar, getLiquidIndicatorBounds } from './liquid-glass-navbar';

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  window.requestAnimationFrame = jest.fn().mockReturnValue(1);
  window.cancelAnimationFrame = jest.fn();
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } readonly root = null; readonly rootMargin = ''; readonly thresholds = []; };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});
afterEach(() => { cleanup(); jest.restoreAllMocks(); });

test('works without WebGL and changes the active item', () => {
  const onChange = jest.fn();
  render(<LiquidNavbar onChange={onChange} />);
  expect(screen.getByRole('navigation').getAttribute('data-gl')).toBe('off');
  fireEvent.click(screen.getByRole('button', { name: 'Weather' }));
  expect(screen.getByRole('button', { name: 'Weather' }).getAttribute('aria-current')).toBe('page');
  expect(onChange).toHaveBeenCalledWith(3, expect.objectContaining({ label: 'Weather' }));
});

test('keeps real links and delegates ordinary clicks to the app router', () => {
  const onNavigate = jest.fn();
  render(<LiquidNavbar active={1} onNavigate={onNavigate} items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />);
  const link = screen.getByRole('link', { name: 'About' });
  expect(link.getAttribute('href')).toBe('/about');
  expect(link.getAttribute('aria-current')).toBe('page');
  fireEvent.click(link);
  expect(onNavigate).toHaveBeenCalledWith('/about');
});

test('arrow keys move link focus without navigating, and End reaches the final link', () => {
  const onNavigate = jest.fn();
  render(<LiquidNavbar onNavigate={onNavigate} items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]} />);
  const home = screen.getByRole('link', { name: 'Home' });
  home.focus();
  fireEvent.keyDown(home, { key: 'ArrowRight' });
  expect(screen.getByRole('link', { name: 'About' })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole('link', { name: 'About' }), { key: 'End' });
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveFocus();
  expect(onNavigate).not.toHaveBeenCalled();
});


test('the first and last highlights reach the rim without moving the links', () => {
  expect(getLiquidIndicatorBounds(16, 80, 900, 0, 9)).toEqual({ left: 1, width: 95 });
  expect(getLiquidIndicatorBounds(800, 84, 900, 8, 9)).toEqual({ left: 800, width: 99 });
  expect(getLiquidIndicatorBounds(300, 100, 900, 3, 9)).toEqual({ left: 300, width: 100 });
});
