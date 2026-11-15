import React, { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Trophy, Camera, Dumbbell, ListChecks, Handshake } from 'lucide-react';
import './committee-showcase.css';

const roles = [
  { title: 'Events & socials', description: 'Bringing members together, on court and beyond.', image: '/optimized/new-6.jpg', alt: 'Club members sharing a meal at a social event', icon: CalendarDays },
  { title: 'Competition & tournaments', description: 'Supporting the club’s competitive side and tournament experiences.', image: '/optimized/new-3.jpg', alt: 'A UNSW player competing on a badminton court', icon: Trophy },
  { title: 'Marketing & content', description: 'Sharing club moments and keeping our community in the loop.', image: '/optimized/new-9.jpg', alt: 'A club member photographing badminton with a camera', icon: Camera },
  { title: 'Training support', description: 'Helping players build confidence and improve their game.', image: '/optimized/new-8.jpg', alt: 'A UNSW committee member leading a badminton training group', icon: Dumbbell },
  { title: 'Session operations', description: 'The behind-the-scenes work that keeps sessions moving.', image: '/optimized/new-10.jpg', alt: 'Committee members helping players at the session desk', icon: ListChecks },
  { title: 'Sponsorships & partnerships', description: 'Building connections that support the club and its members.', image: '/optimized/new-4.jpg', alt: 'Club members posing together with a partnership banner', icon: Handshake },
];

export default function CommitteeShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const id = useId();
  const selected = roles[active];
  return <div className="committee-showcase" data-committee-showcase>
    <div className="committee-directory" role="group" aria-label="Explore committee responsibilities">
      {roles.map((role, index) => {
        const Icon = role.icon;
        return <button key={role.title} type="button" className="committee-role" aria-pressed={active === index} aria-controls={`${id}-photo`} onClick={() => setActive(index)} onFocus={() => setActive(index)} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index); }}>
          {active === index && <motion.span className="committee-role-selection" layoutId={`${id}-selection`} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 34 }} aria-hidden="true" />}
          <span className="committee-role-icon"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>
          <span className="committee-role-copy"><span className="committee-role-title">{role.title}</span><span className="committee-role-description">{role.description}</span></span>
          <ArrowUpRight className="committee-role-arrow" size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>;
      })}
    </div>
    <figure className="committee-feature" id={`${id}-photo`} aria-label="Committee in action">
      <AnimatePresence initial={false}>
        <motion.img key={selected.image} src={selected.image} alt={selected.alt} loading="lazy" decoding="async"
          initial={{ opacity: 0, scale: reduced ? 1 : 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : .45, ease: [.22, 1, .36, 1] }} />
      </AnimatePresence>
      <div className="committee-feature-shade" aria-hidden="true" />
      <figcaption><AnimatePresence mode="wait" initial={false}><motion.span key={selected.title} className="committee-feature-title" initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}>{selected.title}</motion.span></AnimatePresence></figcaption>
      <div className="committee-photo-progress" aria-hidden="true">{roles.map((role, index) => <span key={role.title} data-active={index === active} />)}</div>
    </figure>
  </div>;
}
