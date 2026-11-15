import { flightPoint, handoffPoint, journeyPoint, smoothDock, shuttleColour, buildTrail } from './ScrollShuttle';
it('starts at the original logo and joins the gutter path after the handoff', () => {
  const source = { x: 38, y: 48 };
  const target = flightPoint(.02, 1440, 1000);
  expect(handoffPoint(source, target, 0)).toEqual({ ...source, blend: 0 });
  expect(handoffPoint(source, target, 320)).toEqual({ ...target, blend: 1 });
  const middle = handoffPoint(source, target, 160);
  expect(middle.blend).toBe(.5);
  expect(middle.y).toBeGreaterThan(source.y);
  expect(middle.y).toBeLessThan(target.y);
  expect(handoffPoint(source, target, -100).blend).toBe(0);
});
it('keeps the scrolling route in the gutter and makes vertical travel monotonic', () => {
  let previousY = 0;
  for (let index = 0; index <= 100; index++) {
    const point = flightPoint(index / 100, 1440, 1000);
    expect(point.x).toBeGreaterThanOrEqual(24);
    expect(point.x).toBeLessThanOrEqual(60);
    expect(point.y).toBeGreaterThanOrEqual(previousY);
    previousY = point.y;
  }
});

it('lands precisely on the footer mark and retraces the same route upwards', () => {
  const layout = { width: 1440, height: 1000, maxScroll: 9000, source: { x: 38, y: 48, size: 38 }, footer: { x: 102, y: 9650, size: 32 } };
  const start = journeyPoint(0, layout), end = journeyPoint(1, layout);
  expect(start.x).toBe(38); expect(start.y).toBe(48); expect(start.size).toBe(38);
  expect(end.x).toBe(102); expect(end.y).toBe(650); expect(end.size).toBe(32); expect(end.landing).toBe(1);
  const approach = journeyPoint(.999, layout);
  expect(approach.scrollY + approach.y).toBeCloseTo(layout.footer.y, 1);
  expect(journeyPoint(1 - 620 / layout.maxScroll, layout).landing).toBe(0);
  expect(smoothDock(.001)).toBeLessThan(.000001);
  expect(smoothDock(.999)).toBeGreaterThan(.999999);
});
it('uses white over dark heroes and navy over light page backgrounds', () => {
  const layout = { heroBottom: 1200, heroFade: 200, dark: false };
  expect(shuttleColour(900, layout)).toContain('#ffffff 100%');
  expect(shuttleColour(1300, layout)).toContain('#ffffff 0%');
  expect(shuttleColour(1300, { ...layout, dark: true })).toBe('#ffffff');
});

it('draws only travelled positions behind a downward flight with a gap for the logo', () => {
  const points = buildTrail([{ x: 0, y: 0 }, { x: 0, y: 50 }, { x: 0, y: 100 }], 20, 60);
  expect(points[0].y).toBe(20);
  expect(points[points.length - 1].y).toBe(80);
  expect(points.every(point => point.y < 100)).toBe(true);
  expect(buildTrail([{ x: 0, y: 0 }, { x: 0, y: 10 }], 20)).toEqual([]);
});
it('keeps a reversed trail below an upward flight instead of in front of it', () => {
  const points = buildTrail([{ x: 0, y: 100 }, { x: 0, y: 50 }, { x: 0, y: 0 }], 20, 60);
  expect(points[0].y).toBe(80);
  expect(points[points.length - 1].y).toBe(20);
  expect(points.every(point => point.y > 0)).toBe(true);
});
it('tracks the visible footer during a spring-delayed landing', () => {
  const layout = { width: 1440, height: 1000, maxScroll: 9000, source: { x: 38, y: 48, size: 38 }, footer: { x: 102, y: 9650, size: 32 } };
  const point = journeyPoint(.999, layout, 9000);
  expect(point.y).toBeCloseTo(650, 1);
});
