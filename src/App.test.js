import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Link } from 'react-router-dom';
import { AnimatedRoutes } from './App';

jest.mock('./pages/HomePage', () => () => <h1>Home page</h1>);
jest.mock('./pages/AboutPage', () => () => <h1>About page</h1>);
jest.mock('./pages/FAQsPage', () => () => <h1>FAQs page</h1>);
jest.mock('./pages/ValuesPage', () => () => <h1>Values page</h1>);
jest.mock('./pages/SessionsPage', () => () => <h1>Sessions page</h1>);
jest.mock('./pages/MembershipResourcesPage', () => () => <h1>Resources page</h1>);
jest.mock('./pages/PhotoGalleryPage', () => () => <h1>Gallery page</h1>);
jest.mock('./pages/MeetTheTeamPage', () => () => <h1>Team page</h1>);
jest.mock('./components/ViewQueue', () => () => <h1>Queue page</h1>);
jest.mock('./pages/ContactPage', () => () => <h1>Contact page</h1>);
jest.mock('./pages/TrainingsPage', () => () => <h1>Trainings page</h1>);

beforeEach(() => {
  jest.useFakeTimers();
  window.matchMedia = jest.fn().mockReturnValue({ matches: false, addListener: jest.fn(), removeListener: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn() });
  window.requestAnimationFrame = jest.fn().mockReturnValue(1);
  window.cancelAnimationFrame = jest.fn();
});
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });

it('mounts every requested route immediately even when animation frames never finish', () => {
  const routes = [['/about', 'About page'], ['/contact', 'Contact page'], ['/sessions', 'Sessions page'], ['/view-queue', 'Queue page'], ['/meet-the-team', 'Team page'], ['/photo-gallery', 'Gallery page'], ['/faqs', 'FAQs page'], ['/', 'Home page']];
  render(<MemoryRouter><nav>{routes.map(([path, title]) => <Link key={path} to={path}>{title}</Link>)}</nav><AnimatedRoutes /></MemoryRouter>);
  for (let round = 0; round < 3; round++) for (const [, title] of routes) {
    fireEvent.click(screen.getByRole('link', { name: title }));
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { name: title })).toBeTruthy();
  }
});
it('resolves the disabled news redirect without waiting for an exit animation', () => {
  render(<MemoryRouter initialEntries={['/news']}><AnimatedRoutes /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Home page' })).toBeTruthy();
});
