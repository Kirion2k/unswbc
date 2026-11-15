import { useCallback, useEffect, useState } from 'react';

export default function useHeroVideo(videoRef, { visible, reducedMotion, source }) {
  const [requested, setRequested] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const active = visible && (!reducedMotion || requested);
  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.play()?.catch(error => { if (error.name !== 'AbortError') setBlocked(true); });
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const ready = () => { if (active) tryPlay(); else video.pause(); };
    const playing = () => setBlocked(false);
    video.addEventListener('loadeddata', ready);
    video.addEventListener('playing', playing);
    ready();
    return () => {
      video.removeEventListener('loadeddata', ready);
      video.removeEventListener('playing', playing);
    };
  }, [active, source, tryPlay, videoRef]);
  useEffect(() => {
    if (!blocked || !active) return;
    document.addEventListener('pointerdown', tryPlay, { passive: true });
    return () => document.removeEventListener('pointerdown', tryPlay);
  }, [blocked, active, tryPlay]);
  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, [videoRef]);

  return {
    needsPlayButton: blocked || (reducedMotion && !requested),
    play: () => { setRequested(true); tryPlay(); },
  };
}
