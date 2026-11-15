'use client';
// Adapted from Chamaac's How It Works: https://chamaac.com/components/sections/how-it-works
import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Pin } from 'lucide-react';
import './how-it-works.css';

export interface Step { title: string; description: string }
interface HowItWorksProps { features: Step[] }

export default function HowItWorks({ features }: HowItWorksProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: .1 });
  const reduced = useReducedMotion();
  return <div ref={ref} className="club-how-it-works-wrap" data-how-it-works>
    <svg className="club-step-connector" viewBox="0 0 1000 660" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M 245 140 C 560 140, 500 310, 755 310 S 630 500, 245 500" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 7" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        initial={false} animate={{ strokeDashoffset: visible && !reduced ? -150 : 0 }} transition={visible && !reduced ? { duration: 5, repeat: Infinity, ease: 'linear' } : { duration: 0 }} />
    </svg>
    <ol className="club-how-it-works" aria-label="Your first session in 3 steps">{features.map((step, index) => <motion.li key={step.title} className="club-step-note"
      initial={false} whileInView={reduced ? undefined : { opacity: [0.75, 1], y: [12, 0] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .06, ease: [.22, 1, .36, 1] }}>
      <div className="club-step-paper">
        <Pin className="club-step-pin" size={24} strokeWidth={1.6} aria-hidden="true" />
        <span className="club-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3>{step.title}</h3><p>{step.description}</p>
      </div>
    </motion.li>)}</ol>
  </div>;
}
