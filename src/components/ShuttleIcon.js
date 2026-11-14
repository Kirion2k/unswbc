import React from 'react';

// A small feather-and-cork silhouette, shared by the two flight effects.
export function ShuttleShape() {
  return (
    <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M-14-10 L5-5 L5 5 L-14 10 Z" fill="var(--club-surface)" />
      <path d="M-14-10 L5-3 M-14-3 L5-1 M-14 3 L5 1 M-14 10 L5 3 M-5-7 L-5 7" fill="none" />
      <path d="M5-5 H9 A5 5 0 0 1 9 5 H5 Z" fill="currentColor" />
    </g>
  );
}

export default function ShuttleIcon(props) {
  return <svg viewBox="-18 -14 36 28" aria-hidden="true" focusable="false" {...props}><ShuttleShape /></svg>;
}
