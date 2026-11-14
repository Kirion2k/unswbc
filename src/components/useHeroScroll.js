import { useEffect } from 'react';

// Hand off the first downward gesture to the first section, then release scrolling.
export default function useHeroScroll(heroRef) {
  useEffect(() => {
    let finished = false;
    let scrolling = false;
    let touchY = null;
    let releaseTimer;
    const editable = (target) => target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]');
    const release = () => {
      finished = true;
      scrolling = false;
      clearTimeout(releaseTimer);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('touchstart', touchstart);
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('scrollend', release);
    };
    const start = (event) => {
      if (finished || editable(event.target) || document.body.style.overflow === 'hidden') return;
      if (scrolling) { if (event.cancelable) event.preventDefault(); return; }
      const hero = heroRef.current;
      if (!hero || hero.getBoundingClientRect().bottom < window.innerHeight / 2) { release(); return; }
      const section = hero.parentElement.querySelector('[data-page-content]') || hero.nextElementSibling;
      if (!section) return;
      if (event.cancelable) event.preventDefault();
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const padding = parseFloat(getComputedStyle(section).paddingTop) || 0;
      const top = section.getBoundingClientRect().top + window.scrollY + padding - headerHeight - 24;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scrolling = true;
      window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'instant' : 'smooth' });
      if (reduced) release();
      else {
        window.addEventListener('scrollend', release, { once: true });
        releaseTimer = window.setTimeout(release, 1100);
      }
    };
    const cancel = () => {
      if (scrolling) window.scrollTo({ top: window.scrollY, behavior: 'instant' });
      release();
    };
    function wheel(event) {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (event.deltaY > 0) start(event);
      else if (scrolling) cancel();
    }
    function keydown(event) {
      if (editable(event.target) || (event.target instanceof Element && event.target.closest('button, a')) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (['ArrowDown', 'PageDown', ' '].includes(event.key) && !event.shiftKey) start(event);
      else if (scrolling && ['ArrowUp', 'PageUp', 'Home', 'Escape'].includes(event.key)) cancel();
    }
    function touchstart(event) { touchY = event.touches.length === 1 ? event.touches[0].clientY : null; }
    function touchmove(event) {
      if (touchY === null || event.touches.length !== 1) return;
      const delta = touchY - event.touches[0].clientY;
      if (delta > 12) start(event);
      else if (delta < -12 && scrolling) cancel();
    }
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', keydown);
    window.addEventListener('touchstart', touchstart, { passive: true });
    window.addEventListener('touchmove', touchmove, { passive: false });
    return release;
  }, [heroRef]);
}
