'use client';
import * as React from 'react';
import { motion, useMotionValue, animate, useInView, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import './framer-carousel.css';

export interface CarouselItem { id: string; url: string; title: string; alt: string; position?: string }
interface FramerCarouselProps { items: CarouselItem[]; label?: string; interval?: number }

export function FramerCarousel({ items, label = 'Image slideshow', interval = 3500 }: FramerCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [width, setWidth] = React.useState(1);
  const [paused, setPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [documentVisible, setDocumentVisible] = React.useState(document.visibilityState === 'visible');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const visible = useInView(containerRef, { amount: .35 });
  const reduced = useReducedMotion();
  const playing = visible && !reduced && !paused && !hovered && !focused && documentVisible && items.length > 1;
  const current = Math.min(index, Math.max(0, items.length - 1));
  const next = (delta: number) => setIndex(value => (value + delta + items.length) % items.length);

  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.offsetWidth || 1);
    measure();
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure); }
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    const controls = animate(x, -current * width, reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 });
    return () => controls.stop();
  }, [current, width, x, reduced]);
  React.useEffect(() => {
    const update = () => setDocumentVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  React.useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setIndex(value => (value + 1) % items.length), interval);
    return () => clearTimeout(timer);
  }, [playing, current, items.length, interval]);
  if (!items.length) return null;

  return <div ref={containerRef} role="region" aria-roledescription="carousel" aria-label={label} data-championship-carousel className="club-framer-carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
    <motion.div className="club-framer-track" style={{ x }} onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 45) next(info.offset.x < 0 ? 1 : -1); }}>
      {items.map((item, i) => <div key={item.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}: ${item.id}`} aria-hidden={current !== i} className="club-framer-slide">
        <img src={item.url} alt={item.alt} loading="lazy" decoding="async" draggable={false} style={{ objectPosition: item.position || 'center' }} />
      </div>)}
    </motion.div>
    <div className="club-framer-shade" aria-hidden="true" />
    <p className="club-framer-caption" aria-live={playing ? 'off' : 'polite'}>{items[current].title}</p>
    {items.length > 1 && <>
      <button type="button" className="club-framer-arrow is-previous" aria-label="Previous winners" onClick={() => next(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
      <button type="button" className="club-framer-arrow is-next" aria-label="Next winners" onClick={() => next(1)}><ChevronRight size={20} aria-hidden="true" /></button>
      <div className="club-framer-dots">{items.map((item, i) => <button type="button" key={item.id} aria-label={`Show ${item.id} winners`} aria-current={current === i ? 'true' : undefined} onClick={() => setIndex(i)}><span /></button>)}</div>
      {!reduced && <button type="button" className="club-framer-pause" aria-label={paused ? 'Play winners slideshow' : 'Pause winners slideshow'} onClick={() => setPaused(value => !value)}>{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}</button>}
    </>}
  </div>;
}
