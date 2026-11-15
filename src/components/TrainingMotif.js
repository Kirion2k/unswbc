import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import BrandShuttleShape from './BrandShuttleShape';
import './training-motif.css';

function Racket({ x, rotation }) {
  return <g className="training-racket" transform={`translate(${x} 34) rotate(${rotation})`}>
    <ellipse rx="10" ry="15" />
    <ellipse rx="8.4" ry="13.4" className="training-racket-inner" />
    <path className="training-racket-strings" d="M-4-11.5v23M0-13v26M4-11.5v23M-5-10H5M-7.4-6H7.4M-8.4 0H8.4M-7.4 6H7.4M-5 10H5" />
    <path d="M-1 15-.7 30M1 15 .7 30" />
    <rect className="training-racket-grip" x="-2.2" y="29" width="4.4" height="12" rx="1.2" />
    <path className="training-racket-grip-wrap" d="m-2 32 4 1.4m-4 2 4 1.4m-4 2 4 1.4" />
  </g>;
}

export default function TrainingMotif({ kind }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: .5 });
  const reduced = useReducedMotion();
  return <div ref={ref} className={`training-motif training-motif-${kind}`} data-play={visible && !reduced ? 'true' : undefined} aria-hidden="true">
    <svg viewBox="0 0 160 88" fill="none" focusable="false">
      <path className="training-court-line" d="M12 76H148M24 72V80M136 72V80" />
      {kind === 'rally' && <>
        <Racket x={27} rotation={-28} />
        <Racket x={133} rotation={28} />
        <path className="training-shot-path" d="M43 40Q80 2 118 40" />
        <g className="training-rally-shuttle"><g transform="scale(.48)"><BrandShuttleShape /></g></g>
      </>}
      {kind === 'pathway' && <>
        <path className="training-shot-path" d="M28 59C50 59 47 37 78 37S110 18 133 18" />
        {[{ x: 28, y: 59 }, { x: 78, y: 37 }, { x: 133, y: 18 }].map((point, index) => <g key={point.x} className={`training-skill-node node-${index}`}>
          <circle className="training-node-rim" cx={point.x} cy={point.y} r="9" /><circle className="training-node-core" cx={point.x} cy={point.y} r="3" />
        </g>)}
        <path className="training-step-line" d="M28 72v-3M78 72V50M133 72V31" />
      </>}
      {kind === 'lift' && <>
        <circle className="training-target" cx="132" cy="22" r="15" /><circle className="training-target" cx="132" cy="22" r="8" />
        <path className="training-shot-path" d="M25 65C63 65 70 24 121 23" />
        <g className="training-lift-shuttle"><g transform="scale(.55)"><BrandShuttleShape /></g></g>
      </>}
    </svg>
  </div>;
}
