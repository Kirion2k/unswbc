import React from 'react';
import ReactDOM from 'react-dom/client';
import ClubThemeProvider from './components/ClubThemeProvider';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClubThemeProvider>
      <App />
    </ClubThemeProvider>
  </React.StrictMode>
);

// Fade out the static loader once React has mounted.
const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  const minMsAttr = initialLoader.getAttribute('data-min-ms');
  const minMs = minMsAttr ? Number(minMsAttr) : 0;
  const start = typeof window.__INITIAL_LOADER_START__ === 'number'
    ? window.__INITIAL_LOADER_START__
    : (window.performance && performance.now ? performance.now() : Date.now());
  const now = window.performance && performance.now ? performance.now() : Date.now();
  const elapsed = Math.max(0, now - start);
  const remaining = Math.max(0, minMs - elapsed);

  window.setTimeout(() => {
    initialLoader.classList.add('initial-loader--hide');
    window.setTimeout(() => {
      try {
        initialLoader.remove();
      } catch {
        // no-op
      }
    }, 350);
  }, remaining);
}

