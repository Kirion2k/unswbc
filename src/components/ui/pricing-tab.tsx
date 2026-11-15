'use client';
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface TabProps { text: string; selected: boolean; setSelected: (text: string) => void }
export function Tab({ text, selected, setSelected }: TabProps) {
  const reduce = useReducedMotion();
  return <button type="button" aria-pressed={selected} onClick={() => setSelected(text)} className={cn('club-pricing-tab', selected && 'is-selected')}>
    {selected && <motion.span aria-hidden="true" layoutId="pricing-selection" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 32 }} className="club-pricing-tab-active" />}
    <span>{text}</span>
  </button>;
}
