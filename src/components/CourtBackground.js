import React, { useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useClubTheme } from './ClubThemeProvider';

const WIDTH = 1440;
const HEIGHT = 950;
const angle = 24 * Math.PI / 180;
const project = (x, y) => [1060 + x * Math.cos(angle) - y * Math.sin(angle), 475 + x * Math.sin(angle) + y * Math.cos(angle)];
const line = (x1, y1, x2, y2, tone = 0.22, width = 1.25) => ({ points: [project(x1, y1), project(x2, y2)], tone, width });
const markings = [
  line(-230, -535, 230, -535), line(230, -535, 230, 535),
  line(230, 535, -230, 535), line(-230, 535, -230, -535),
  line(-193, -535, -193, 535, 0.14), line(193, -535, 193, 535, 0.14),
  ...[-474, -158, 158, 474].map(y => line(-230, y, 230, y, 0.17)),
  line(0, -535, 0, -158, 0.17), line(0, 158, 0, 535, 0.17),
  line(-260, 0, 260, 0, 0.4, 2),
  ...[-18, -12, -6, 6, 12, 18].map(y => line(-230, y, 230, y, 0.1, 0.6)),
  ...Array.from({ length: 59 }, (_, i) => line(-230 + i * 8, -18, -230 + i * 8, 18, 0.12, 0.6)),
];
const outline = [[-230, -535], [230, -535], [230, 535], [-230, 535]].map(([x, y]) => project(x, y));
const path = points => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');

export default function CourtBackground({ surfaceRef }) {
  const { mode } = useClubTheme();
  const dark = mode === 'dark';
  const ink = dark ? '169,202,255' : '28,60,111';
  const intensity = dark ? 0.55 : 0.4;
  const canvasRef = useRef(null);
  const interactive = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', { noSsr: true });

  useEffect(() => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    const surface = surfaceRef.current;
    const backdrop = canvas?.parentElement;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!ctx || !surface || !backdrop) return;
    let frame = 0;
    let visible = true;
    let width = 1;
    let height = 1;
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    const cursor = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0 };

    const warp = (x, y) => {
      const dx = x - cursor.x;
      const dy = y - cursor.y;
      const distance = Math.hypot(dx, dy);
      const force = Math.exp(-(distance * distance) / (2 * 160 * 160)) * 24 * cursor.strength;
      return [x + dx / Math.max(1, distance) * force, y + dy / Math.max(1, distance) * force];
    };
    const draw = () => {
      ctx.fillStyle = dark ? '#0c1422' : '#f8f9fa';
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);
      ctx.beginPath();
      outline.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
      ctx.closePath();
      ctx.fillStyle = `rgba(${ink}, 0.018)`;
      ctx.fill();
      markings.forEach(({ points: [[x1, y1], [x2, y2]], tone, width: strokeWidth }) => {
        const steps = Math.max(2, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 16));
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const [x, y] = warp(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${ink}, ${tone * intensity})`;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
      });
      ctx.restore();

    };
    const tick = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      cursor.x += (cursor.targetX - cursor.x) * 0.16;
      cursor.y += (cursor.targetY - cursor.y) * 0.16;
      cursor.strength += (cursor.targetStrength - cursor.strength) * 0.12;
      draw();
      const unsettled = Math.abs(cursor.targetStrength - cursor.strength) > 0.002 || Math.hypot(cursor.targetX - cursor.x, cursor.targetY - cursor.y) > 0.2;
      if (unsettled) frame = requestAnimationFrame(tick);
    };
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick); };
    const resize = () => {
      width = backdrop.clientWidth;
      height = backdrop.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      scale = Math.max(width / WIDTH, height / HEIGHT);
      offsetX = width - WIDTH * scale;
      offsetY = (height - HEIGHT * scale) / 2;
      draw();
      canvas.style.opacity = '1';
    };
    const move = event => {
      if (event.pointerType === 'touch') return;
      const bounds = backdrop.getBoundingClientRect();
      cursor.targetX = (event.clientX - bounds.left - offsetX) / scale;
      cursor.targetY = (event.clientY - bounds.top - offsetY) / scale;
      if (cursor.targetStrength === 0) { cursor.x = cursor.targetX; cursor.y = cursor.targetY; }
      cursor.targetStrength = 1;
      schedule();
    };
    const leave = () => { cursor.targetStrength = 0; schedule(); };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; cursor.strength = 0; cursor.targetStrength = 0; };
    const visibility = () => { if (document.hidden) stop(); else schedule(); };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop(); else schedule();
    });
    resizeObserver.observe(backdrop);
    intersectionObserver.observe(backdrop);
    surface.addEventListener('pointermove', move, { passive: true });
    surface.addEventListener('pointerleave', leave, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    resize();
    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      surface.removeEventListener('pointermove', move);
      surface.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
      canvas.style.opacity = '0';
    };
  }, [surfaceRef, interactive, dark, ink, intensity]);

  return (
    <Box aria-hidden="true" data-court-background sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'clip', zIndex: 0 }}>
      <Box sx={{ position: 'sticky', top: 0, height: '100svh', width: '100%' }}>
        <Box component="svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMaxYMid slice" sx={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <path d={`${path(outline)}Z`} fill={`rgba(${ink},.018)`} />
          {markings.map(({ points, tone, width }, i) => <path key={i} d={path(points)} stroke={`rgb(${ink})`} strokeOpacity={tone * intensity} strokeWidth={width} fill="none" />)}
        </Box>
        {interactive && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0 }} />}
      </Box>
    </Box>
  );
}
