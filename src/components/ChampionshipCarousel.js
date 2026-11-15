import React from 'react';
import { FramerCarousel } from './ui/framer-carousel';

export const championshipSlides = [
  { year: '2024', src: '/optimized/unsw-14.jpg', caption: '2024 UniSport Nationals champions', alt: 'UNSW’s 2024 champions with their gold medals, trophy and UniSport Nationals banner' },
  { year: '2025', src: '/optimized/2025-winners.jpg', caption: '2025 UniSport Nationals women’s champions', alt: 'UNSW’s 2025 women’s champions with their trophy, medals and championship banner' },
  { year: '2026', src: '/optimized/2026-winners.jpg', caption: '2026 UniSport Nationals women’s champions', alt: 'UNSW’s 2026 women’s champions holding their trophy and championship banner' },
];

const items = championshipSlides.map(slide => ({ id: slide.year, url: slide.src, title: slide.caption, alt: slide.alt, position: slide.year === '2025' ? 'center 65%' : 'center' }));

export default function ChampionshipCarousel() {
  return <FramerCarousel items={items} label="UniSport championship winners" interval={3500} />;
}
