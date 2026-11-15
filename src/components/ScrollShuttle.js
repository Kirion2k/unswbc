import React, { useCallback, useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BrandShuttleShape from './BrandShuttleShape';

export function smoothDock(value) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * t * (t * (t * 6 - 15) + 10);
}
export function flightPoint(progress, width, height) {
  const bounded = Math.max(0, Math.min(1, progress));
  return { x: Math.max(0, (width - 1320) / 4) + 12 + 18 * Math.sin(bounded * Math.PI * 6), y: 100 + (height - 200) * (.03 + .94 * bounded) };
}
export function handoffPoint(source, target, scrollY) {
  const t = Math.max(0, Math.min(1, scrollY / 320));
  const blend = smoothDock(t);
  return { x: source.x + (target.x - source.x) * blend + 12 * Math.sin(Math.PI * t) * (1 - t) * blend, y: source.y + (target.y - source.y) * blend, blend };
}
export function journeyPoint(progress, layout, viewportScrollY) {
  const { width, height, maxScroll, source, footer } = layout;
  const scrollY = Math.max(0, Math.min(1, progress)) * maxScroll;
  const launch = handoffPoint(source, flightPoint(progress, width, height), scrollY);
  const landing = footer ? smoothDock(1 - (maxScroll - scrollY) / 620) : 0;
  const size = source.size + (36 - source.size) * launch.blend;
  return {
    x: launch.x + ((footer?.x || 0) - launch.x) * landing - 24 * Math.sin(Math.PI * landing) * (1 - landing),
    y: launch.y + ((footer?.y || 0) - (viewportScrollY ?? scrollY) - launch.y) * landing,
    size: size + ((footer?.size || 36) - size) * landing,
    launch: launch.blend, landing, scrollY,
  };
}

// Clip recorded positions by arc length so the trail never crosses the shuttle.
export function buildTrail(history, gap = 24, length = 180) {
  const points = [];
  let travelled = 0;
  for (let i = history.length - 1; i > 0 && travelled < gap + length; i--) {
    const a = history[i], b = history[i - 1];
    const segment = Math.hypot(b.x - a.x, b.y - a.y);
    if (segment < .001) continue;
    const start = Math.max(0, (gap - travelled) / segment);
    const end = Math.min(1, (gap + length - travelled) / segment);
    if (start <= 1 && end >= start) {
      if (!points.length) points.push({ x: a.x + (b.x - a.x) * start, y: a.y + (b.y - a.y) * start });
      points.push({ x: a.x + (b.x - a.x) * end, y: a.y + (b.y - a.y) * end });
    }
    travelled += segment;
  }
  return points.reverse();
}

export function shuttleColour(worldY, layout) {
  const blend = smoothDock((worldY - (layout.heroBottom - layout.heroFade)) / Math.max(1, layout.heroFade));
  return layout.dark ? '#ffffff' : `color-mix(in srgb, #ffffff ${(1 - blend) * 100}%, #1c3c6f)`;
}

export default function ScrollShuttle() {
  const enabled = useMediaQuery('(min-width: 1400px) and (prefers-reduced-motion: no-preference)');
  return enabled ? <ShuttleFlight /> : null;
}

function ShuttleFlight() {
  const overlay = useRef(null);
  const tails = useRef([]);
  const shuttle = useRef(null);
  const headerLogo = useRef(null);
  const footerLogo = useRef(null);
  const layout = useRef({ width: window.innerWidth, height: window.innerHeight, maxScroll: 1, source: { x: 38, y: 48, size: 38 }, footer: null, heroBottom: window.innerHeight, heroFade: 200, dark: false });
  const previous = useRef(0);
  const heading = useRef(null);
  const targetHeading = useRef(0);
  const direction = useRef(1);
  const history = useRef([]);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const flight = useSpring(scrollYProgress, { stiffness: 160, damping: 26, restDelta: .00001, restSpeed: .00001 });
  const visibility = useSpring(0, { stiffness: 300, damping: 34, restDelta: .001 });

  const placeShuttle = useCallback(distance => {
    if (!shuttle.current) return;
    const movement = distance - previous.current;
    const moving = Math.abs(movement) > .000001;
    if (moving && Math.sign(movement) !== direction.current) { history.current = []; direction.current = Math.sign(movement); }
    previous.current = distance;
    const point = journeyPoint(distance, layout.current, window.scrollY);
    if (moving || heading.current === null) {
      const before = flightPoint(distance - direction.current * .0005, layout.current.width, layout.current.height);
      const after = flightPoint(distance + direction.current * .0005, layout.current.width, layout.current.height);
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI - 45;
      targetHeading.current = angle;
      if (heading.current === null) heading.current = angle;
      // Keep the heading bounded before blending to the upright logo angle.
      heading.current += (angle - heading.current) * .07;
    }
    const freeFlight = point.launch * (1 - point.landing);
    shuttle.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${heading.current * smoothDock(freeFlight)}) scale(${point.size / 36})`);
    overlay.current.style.color = shuttleColour(point.scrollY + point.y, layout.current);
    const opacity = visibility.get();
    // The same mask/opacity handoff works in either direction at both logos.
    headerLogo.current?.style.setProperty('--logo-shuttle-opacity', String(1 - opacity * (1 - point.landing)));
    footerLogo.current?.style.setProperty('--logo-shuttle-opacity', String(1 - opacity * point.landing));
    const speed = Math.min(1, Math.abs(flight.getVelocity()) * 30);
    const remaining = layout.current.maxScroll - point.scrollY;
    const inFlight = point.launch > .999 && remaining > 620;
    if (!inFlight) history.current = [];
    else if (moving) {
      const last = history.current[history.current.length - 1];
      if (!last || Math.hypot(point.x - last.x, point.y - last.y) > .65) {
        history.current.push({ x: point.x, y: point.y });
        if (history.current.length > 400) history.current.shift();
      }
    }
    const fadeBeforeLanding = smoothDock((remaining - 620) / 160);
    const fadeAfterLaunch = smoothDock((point.scrollY - 320) / 160);
    const facingFlight = smoothDock(1 - Math.abs(targetHeading.current - heading.current) / 45);
    tails.current.forEach((tail, index) => {
      if (!tail) return;
      const points = buildTrail(history.current, point.size * .5 + 6, 190 - index * 20);
      const length = points.reduce((total, p, i) => i ? total + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y) : 0, 0);
      tail.setAttribute('d', points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' '));
      tail.setAttribute('opacity', (.2 + speed * .25) * (index + 1) / 3 * smoothDock(length / 40) * fadeBeforeLanding * fadeAfterLaunch * facingFlight);
    });
  }, [flight, visibility]);
  useMotionValueEvent(flight, 'change', placeShuttle);
  useMotionValueEvent(visibility, 'change', () => placeShuttle(flight.get()));

  useEffect(() => {
    headerLogo.current = document.querySelector('[data-header-logo]');
    footerLogo.current = document.querySelector('[data-footer-logo]');
    const images = [headerLogo.current, footerLogo.current].filter(Boolean);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const width = window.innerWidth, height = window.innerHeight;
      const headerImage = headerLogo.current, footerImage = footerLogo.current;
      let source = layout.current.source, footer = null;
      if (headerImage) {
        const rect = headerImage.getBoundingClientRect();
        const header = headerImage.closest('header');
        const restTop = header ? parseFloat(getComputedStyle(header).top) || 0 : 12;
        const shift = header ? header.getBoundingClientRect().top - restTop : 0;
        source = { x: rect.left + rect.width * .117, y: rect.top - shift + rect.height * .47, size: rect.height };
      }
      if (footerImage) {
        const rect = footerImage.getBoundingClientRect();
        footer = { x: rect.left + rect.width * .117, y: rect.top + window.scrollY + rect.height * .47, size: rect.height };
      }
      const hero = document.querySelector('[data-page-hero]');
      layout.current = { width, height, source, footer, maxScroll: Math.max(1, document.documentElement.scrollHeight - height), dark: document.documentElement.dataset.theme === 'dark', heroBottom: hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0, heroFade: hero ? parseFloat(getComputedStyle(hero).paddingBottom) || 180 : 180 };
      const overlayWidth = Math.max(100, Math.max(0, (width - 1320) / 4) + 54, (footer?.x || 0) + 48);
      overlay.current?.setAttribute('viewBox', `0 0 ${overlayWidth} ${height}`);
      if (overlay.current) overlay.current.style.width = `${overlayWidth}px`;
      placeShuttle(flight.get());
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    const mutation = new MutationObserver(schedule);
    for (const image of images) { resize.observe(image); image.addEventListener('load', schedule); }
    for (const element of [document.querySelector('main'), document.querySelector('footer')].filter(Boolean)) resize.observe(element);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', schedule, { passive: true });
    measure();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); mutation.disconnect(); window.removeEventListener('resize', schedule);
      for (const image of images) { image.removeEventListener('load', schedule); image.style.removeProperty('--logo-shuttle-opacity'); }
    };
  }, [pathname, flight, placeShuttle]);

  useEffect(() => {
    let timer;
    const hide = () => visibility.set(0);
    const show = () => { if (visibility.get() < .02) history.current = []; visibility.set(1); clearTimeout(timer); timer = setTimeout(hide, 320); };
    hide();
    const progress = Math.max(0, Math.min(1, window.scrollY / layout.current.maxScroll));
    previous.current = progress; heading.current = null; history.current = [];
    flight.jump(progress); placeShuttle(progress);
    window.addEventListener('scroll', show, { passive: true });
    return () => {
      window.removeEventListener('scroll', show); clearTimeout(timer); visibility.jump(0);
      headerLogo.current?.style.removeProperty('--logo-shuttle-opacity'); footerLogo.current?.style.removeProperty('--logo-shuttle-opacity');
    };
  }, [pathname, flight, scrollYProgress, placeShuttle, visibility]);

  return <Box component={motion.svg} ref={overlay} data-scroll-shuttle aria-hidden="true" focusable="false" preserveAspectRatio="none" style={{ opacity: visibility }}
    sx={{ position: 'fixed', inset: 0, width: 100, height: '100dvh', zIndex: 1200, pointerEvents: 'none', overflow: 'hidden', transition: 'color 220ms linear' }}>
    {[0, 1, 2].map(index => <path key={index} ref={element => { tails.current[index] = element; }} data-shuttle-tail fill="none" stroke="currentColor" strokeWidth={.9 + index * .45} strokeLinecap="round" opacity="0" />)}
    <g ref={shuttle} data-brand-scroll-shuttle><BrandShuttleShape /></g>
  </Box>;
}
