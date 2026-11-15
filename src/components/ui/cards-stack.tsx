'use client';
// Adapted from Systaliko UI by Youcef Benmessabih (MIT).
// https://github.com/YoucefBnm/Systaliko-UI/tree/main/registry/cards/cards-stack
// License: docs/licenses/systaliko-cards-stack-MIT.txt
import * as React from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const ContainerScroll = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('club-cards-stack', className)} {...props} />);
ContainerScroll.displayName = 'ContainerScroll';
export const CardSticky = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & { index: number }>(({ index, className, style, ...props }, ref) => {
  const reduced = useReducedMotion();
  return <motion.div ref={ref} className={cn('club-sticky-card', className)} data-reduced-motion={reduced || undefined}
    style={{ '--stack-index': index, zIndex: index + 1, ...style } as React.CSSProperties} {...props} />;
});
CardSticky.displayName = 'CardSticky';
