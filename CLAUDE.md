# UNSW Badminton Club Website

## Tech Stack
- React 18 (Create React App)
- MUI 6 + Emotion (styling)
- Framer Motion 11 (animations)
- React Router 6 (routing)
- Bootstrap 5 / React-Bootstrap (grid in some pages)
- Deployed on Netlify with serverless functions

## Dev Commands
- `npm start` — dev server on localhost:3000
- `npm run build` — production build to /build
- `npm run screenshots` — capture all pages (requires dev server running)

## Project Structure
- `src/pages/` — page components (one per route)
- `src/components/` — reusable components (Header, Footer, PageHero, animation wrappers)
- `src/theme.js` — MUI theme (colors, typography, component overrides)
- `public/` — static assets, gallery images, thumbnails
- `netlify/functions/` — serverless functions (Instagram feed)
- `scripts/` — dev tooling (screenshots)

## Color Palette
- Primary Navy: `#1c3c6f`
- Dark Navy: `#123456`
- Off White: `#f8f9fa`
- Text Primary: `#0f172a`
- Text Secondary: `#475569`

## Conventions
- Use MUI `sx` prop for component styling
- Use Framer Motion for all animations
- Font: Inter (Google Fonts, loaded in public/index.html)
- Wrap sections in `ScrollReveal` for entrance animations
- Use `TiltCard` for interactive card hover effects
- Use `MagneticButton` for CTA buttons
- Respect `prefers-reduced-motion` — elements appear in final state with no animation

## Environment Variables
- `REACT_APP_WEB3FORMS_ACCESS_KEY` — contact form API key
- `REACT_APP_INSTAGRAM_FEED_URL` — Instagram feed endpoint
- `INSTAGRAM_ACCESS_TOKEN` — Instagram API (Netlify function)
- `INSTAGRAM_APP_ID` / `INSTAGRAM_APP_SECRET` — Instagram OAuth (Netlify function)
