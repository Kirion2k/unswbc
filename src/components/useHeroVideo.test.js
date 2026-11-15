import React, { useRef } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import useHeroVideo from './useHeroVideo';

function Hero({ visible = true, reducedMotion = false }) {
  const ref = useRef(null);
  const { needsPlayButton, play } = useHeroVideo(ref, { visible, reducedMotion, source: '/video-mobile.mp4' });
  return <><video ref={ref} data-testid="video" />{needsPlayButton && <button onClick={play}>Play background video</button>}</>;
}
let play;
let pause;
beforeEach(() => {
  play = jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(() => { cleanup(); jest.restoreAllMocks(); });

test('sets muted and inline properties before playback and pauses offscreen', () => {
  play.mockImplementation(function () {
    expect(this.muted && this.defaultMuted && this.playsInline).toBe(true);
    expect(this.hasAttribute('muted')).toBe(true);
    return Promise.resolve();
  });
  const { rerender } = render(<Hero />);
  expect(play).toHaveBeenCalledTimes(1);
  rerender(<Hero visible={false} />);
  expect(pause).toHaveBeenCalled();
});

test('recovers from blocked autoplay using an explicit play action', async () => {
  play.mockRejectedValueOnce(new DOMException('Blocked', 'NotAllowedError'));
  render(<Hero />);
  fireEvent.click(await screen.findByRole('button'));
  await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
  fireEvent.playing(screen.getByTestId('video'));
  expect(screen.queryByRole('button')).toBeNull();
});

test('reduced motion waits for an explicit play action without interrupting it', () => {
  render(<Hero reducedMotion />);
  expect(play).not.toHaveBeenCalled();
  const pauses = pause.mock.calls.length;
  fireEvent.click(screen.getByRole('button'));
  expect(play).toHaveBeenCalled();
  expect(pause.mock.calls.length).toBe(pauses);
});
