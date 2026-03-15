/**
 * Club news and announcements.
 * Add new posts to the TOP of the array — they render in order.
 *
 * Fields:
 *  id        — unique slug (used for keys)
 *  category  — 'announcement' | 'result' | 'event'
 *  date      — display string, e.g. "Mar 2026"
 *  title     — post headline
 *  excerpt   — 1–2 sentence summary shown on the card
 *  image     — hero image path (from /public)
 *  featured  — true for the first/hero post (only the first featured is rendered large)
 *  link      — external URL to "Read more" target, or null for no link
 */

export const newsItems = [
  {
    id: 'nationals-2025',
    category: 'result',
    date: 'Nov 2025',
    title: 'UNSW wins UniSport Nationals 2025',
    excerpt:
      'For the second consecutive year UNSW took home the national title at UniSport Nationals 2025, defeating top university teams from across Australia in a dominant tournament performance.',
    image: '/unsw-29.JPG',
    featured: true,
    link: null,
  },
  {
    id: 'trainings-2026',
    category: 'announcement',
    date: 'Mar 2026',
    title: 'Friday Trainings 2026 are now open',
    excerpt:
      'Coached sessions are back every Friday 2:00–4:00 PM at UNSW FAC Level 1. Spots are limited — register on Eventbrite to secure your place.',
    image: '/unsw-66.JPG',
    featured: false,
    link: 'https://www.eventbrite.com/e/unsw-badminton-club-trainings-2026-tickets-1983248371266?aff=ebdsoporgprofile',
  },
  {
    id: 'term1-2026',
    category: 'announcement',
    date: 'Feb 2026',
    title: 'Term 1 2026 sessions have started',
    excerpt:
      'Weekly sessions are back every Tuesday 6–10 PM and Saturday 1–7 PM at UNSW FAC Level 2. No registration needed — just show up at the badminton desk.',
    image: '/unsw-44.JPG',
    featured: false,
    link: null,
  },
  {
    id: 'shirts-2026',
    category: 'announcement',
    date: 'Jan 2026',
    title: '2026 Club Shirts — order form now open',
    excerpt:
      'The annual UNSWBC shirts are available to order. Check our Instagram for the order form. Orders close mid-February — do not miss out.',
    image: '/unsw-55.JPG',
    featured: false,
    link: 'https://www.instagram.com/unswbadminton',
  },
  {
    id: 'tournament-t3-2025',
    category: 'result',
    date: 'Oct 2025',
    title: 'Term 3 internal tournament results',
    excerpt:
      'Congratulations to all participants in our Term 3 internal tournament. A brilliant day of competition with tight matches across every division.',
    image: '/unsw-81.JPG',
    featured: false,
    link: null,
  },
  {
    id: 'dinner-2025',
    category: 'event',
    date: 'Sep 2025',
    title: '2025 Annual Club Dinner',
    excerpt:
      'Over 80 members and alumni joined us for the annual dinner — celebrating a tremendous year on and off the court with awards, speeches, and a lot of good food.',
    image: '/unsw-20.JPG',
    featured: false,
    link: null,
  },
];

export const categoryMeta = {
  announcement: { label: 'Announcement', color: '#1c3c6f', bg: 'rgba(28,60,111,0.10)' },
  result:       { label: 'Result',       color: '#15622a', bg: 'rgba(21,98,42,0.10)'  },
  event:        { label: 'Event',        color: '#7c3200', bg: 'rgba(124,50,0,0.10)'  },
};
