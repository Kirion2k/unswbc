import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Clock3, MapPin, UsersRound, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import './training-session-details.css';

export default function TrainingSessionDetails({ bookingUrl }) {
  const reduced = useReducedMotion();
  return <motion.section className="training-session-pass" aria-labelledby="training-session-title" data-training-session-details
    initial={false} whileInView={reduced ? undefined : { opacity: [.82, 1], y: [12, 0] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
    <div className="training-pass-schedule">
      <div className="training-pass-label"><CalendarDays size={18} strokeWidth={1.6} aria-hidden="true" /><span>Weekly coached training</span></div>
      <h3 id="training-session-title">Every <span>Friday.</span></h3>
      <p className="training-pass-time"><Clock3 size={21} strokeWidth={1.6} aria-hidden="true" /><span>2:00 – 4:00 PM</span></p>
    </div>
    <div className="training-pass-practical">
      <dl>
        <div className="training-pass-detail"><MapPin size={22} strokeWidth={1.6} aria-hidden="true" /><div><dt>Venue</dt><dd>UNSW FAC, Level 1</dd></div></div>
        <div className="training-pass-detail"><UsersRound size={22} strokeWidth={1.6} aria-hidden="true" /><div><dt>Playing level</dt><dd>Beginner &amp; Intermediate</dd></div></div>
      </dl>
    </div>
    <div className="training-pass-footer">
      <p className="training-pass-price"><span>$25</span><span>per person</span></p>
      <Button asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Book Friday training<ArrowUpRight size={18} aria-hidden="true" /></a></Button>
    </div>
  </motion.section>;
}
