import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import './championship-confetti.css';

const pieces = Array.from({ length: 20 }, (_, index) => ({
  '--confetti-x': `${Math.sin(index * 2.4) * (130 + index * 12)}px`,
  '--confetti-y': `${180 + (index % 5) * 48}px`,
  '--confetti-turn': `${(index % 2 ? 1 : -1) * (150 + index * 29)}deg`,
  '--confetti-delay': `${(index % 6) * 45}ms`,
  '--confetti-colour': ['#a9caff', '#c8a55c', '#7da3d8'][index % 3],
}));

export default function ChampionshipConfetti() {
  const ref = useRef(null);
  const played = useRef(false);
  const visible = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!visible || reduced || played.current) return;
    played.current = true;
    setActive(true);
  }, [visible, reduced]);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setActive(false), 2600);
    return () => clearTimeout(timer);
  }, [active]);
  return <div ref={ref} className="championship-confetti" aria-hidden="true">{active && pieces.map((style, index) => <i key={index} style={style} />)}</div>;
}
