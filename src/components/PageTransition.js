import React from 'react';
import './page-transition.css';

// Routes mount immediately: animation completion must never gate navigation.
export default function PageTransition({ children }) {
  return <div className="club-page-transition">{children}</div>;
}
