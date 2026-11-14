import React, { useRef } from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import useHeroScroll from './useHeroScroll';

function Page() {
  const ref = useRef(null);
  useHeroScroll(ref);
  return <div><section ref={ref} data-testid="hero" /><section data-page-content style={{ paddingTop: 48 }} /><input aria-label="Input" /></div>;
}

beforeEach(() => {
  jest.useFakeTimers();
  window.scrollTo = jest.fn();
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
});
afterEach(() => { cleanup(); jest.useRealTimers(); jest.restoreAllMocks(); });

function setup() {
  const result = render(<Page />);
  result.getByTestId('hero').getBoundingClientRect = () => ({ bottom: 900 });
  document.querySelector('[data-page-content]').getBoundingClientRect = () => ({ top: 900 });
  return result;
}

test('scrolls to content once and then leaves subsequent scrolling alone', () => {
  setup();
  fireEvent.wheel(window, { deltaY: 30 });
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 924, behavior: 'smooth' });
  act(() => jest.advanceTimersByTime(1200));
  fireEvent.wheel(window, { deltaY: 30 });
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
});

test('ignores zoom gestures, horizontal scrolling and keyboard input in fields', () => {
  const page = setup();
  fireEvent.wheel(window, { deltaY: 30, ctrlKey: true });
  fireEvent.wheel(window, { deltaY: 1, deltaX: 40 });
  fireEvent.keyDown(page.getByLabelText('Input'), { key: 'ArrowDown' });
  expect(window.scrollTo).not.toHaveBeenCalled();
  fireEvent.keyDown(window, { key: 'PageDown' });
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
});

test('uses an instant transition for reduced motion and releases the gesture', () => {
  window.matchMedia.mockReturnValue({ matches: true });
  setup();
  fireEvent.wheel(window, { deltaY: 30 });
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 924, behavior: 'instant' });
  fireEvent.wheel(window, { deltaY: 30 });
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
});

test('upward input cancels a smooth transition and unmounting removes listeners', () => {
  const page = setup();
  fireEvent.wheel(window, { deltaY: 30 });
  fireEvent.wheel(window, { deltaY: -30 });
  expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' });
  page.unmount();
  fireEvent.wheel(window, { deltaY: 30 });
  expect(window.scrollTo).toHaveBeenCalledTimes(2);
});
