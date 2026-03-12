# UNSW Badminton Club Website Redesign

## Overview

Redesign the existing UNSW Badminton Club React website to feel like a modern sports brand in a university club setting. Keep the existing navy color palette. Add comprehensive dynamic elements (scroll animations, motion backgrounds, hover effects, typography animations, page transitions). Add developer infrastructure (CLAUDE.md, Puppeteer screenshot workflow).

## Design Direction

**Aesthetic**: Modern Sports Brand × University Club — bold, energetic, dynamic. Nike/Adidas-inspired with strong typography, action shots, and kinetic animations, grounded in a university club context.

**Color Palette** (unchanged):
- Primary Navy: `#1c3c6f`
- Dark Navy: `#123456`
- Off White: `#f8f9fa`
- Text Primary: `#0f172a`
- Text Secondary: `#475569`
- Navbar: `rgba(2, 6, 23, 0.78)` with backdrop blur

**Typography**: Inter (existing), push weights to 800-900 for headlines, larger sizes, tighter letter-spacing for sports brand feel.

## Architecture

### Tech Stack (existing, no changes)
- React 18 + React Router 6
- MUI 6 + Emotion
- Framer Motion (already installed — will leverage heavily)
- Deployed on Netlify

### New Dependencies
- `puppeteer` (devDependency) — screenshot workflow

## Component Changes

### 1. CLAUDE.md File
Project configuration file at repo root containing:
- Tech stack summary
- Project structure overview
- Dev commands (`npm start`, `npm run build`, `npm run screenshots`)
- Deployment info (Netlify)
- Color palette reference
- Coding conventions (MUI sx prop, Framer Motion for animations, Inter font)
- Environment variables needed

### 2. Puppeteer Screenshot Workflow
- `scripts/take-screenshots.js` — Puppeteer script
- Expects dev server to be running on `localhost:3000` (documented in CLAUDE.md)
- Launches headless browser, navigates to each route
- Captures full-page screenshots at desktop (1440px) and mobile (375px) widths
- Saves to `screenshots/` directory with timestamped filenames (e.g., `home-desktop-2026-03-12T10-30-00.png`)
- `npm run screenshots` script in package.json
- `.gitignore` updated to ignore `screenshots/` directory

### 3. Homepage Redesign (`src/pages/HomePage.js`)

**Hero Section**:
- Dark full-viewport hero with animated gradient mesh background (CSS keyframe animation)
- Floating shuttlecock SVG particles (Framer Motion animated positioned elements)
- Bold headline with staggered letter-by-letter animation on mount
- Overline text: "UNSW BADMINTON CLUB" in uppercase, tracked-out, muted
- Headline: Large (clamp 3rem–5rem), weight 900, tight letter-spacing
- Subtext with key stats inline
- Two CTAs: Primary filled "Join the Club →", Secondary outlined "View Sessions"

**Stats Counter Bar**:
- Full-width navy background section
- 4 stats: 150+ Active Members, 2× National Champions, 4 Weekly Sessions, Est. 2018
- Numbers animate counting up when section enters viewport (useInView + animated counter)
- Staggered reveal for each stat

**About Preview Section**:
- Scroll-triggered fade-in
- Split layout: text left, image right
- Brief club description with "Learn More →" link
- Image with subtle parallax on scroll

**Sessions Preview**:
- Cards showing next upcoming sessions
- 3D tilt effect on hover (perspective transform via Framer Motion)
- Each card shows day, time, location
- CTA to full sessions page

**Achievement Showcase**:
- Timeline or trophy case style
- UniSport 2024 & 2025 National Champions highlighted
- Animated on scroll entry

**Partner Logos**:
- Animated horizontal marquee (CSS animation, duplicated items for seamless loop)
- UNSW, ARC Sport, Badminton Australia, Badminton NSW logos
- Subtle grayscale → color on hover

**Full-Width CTA Banner**:
- Bold headline "Ready to Play?"
- Navy background with subtle animated gradient
- Primary CTA button

### 4. Shared Animation Components

**ScrollReveal wrapper** (`src/components/ScrollReveal.js`):
- Wraps any content in Framer Motion `motion.div`
- Uses `useInView` to trigger entrance animation
- Props: direction (up/down/left/right), delay, duration
- Stagger children variant

**AnimatedCounter** (`src/components/AnimatedCounter.js`):
- Animates number from 0 to target on viewport entry
- Configurable duration, prefix, suffix
- Static values (e.g., "Est. 2018") rendered as plain text, not animated

**TiltCard** (`src/components/TiltCard.js`):
- 3D perspective tilt on mouse move
- Glow effect following cursor
- Smooth reset on mouse leave

**MagneticButton** (`src/components/MagneticButton.js`):
- Button that subtly pulls toward cursor on hover
- Scale up effect
- Wraps MUI Button

**LetterAnimation** (`src/components/LetterAnimation.js`):
- Replaces usage of `typewriter-effect` package with Framer Motion-based letter animation
- Splits text into individual letter spans
- Staggered animation on mount/viewport entry
- Configurable animation type (fade-up, slide-in, scale)

**PageTransition** (`src/components/PageTransition.js`):
- Framer Motion AnimatePresence wrapper for routes
- Fade + slide transition between pages
- Applied in App.js: use `useLocation` as key on `Routes` wrapped in `AnimatePresence`, each route's element wrapped in a `motion.div` for enter/exit animations
- This approach ensures outgoing routes remain mounted during exit animation

**ParallaxImage** (`src/components/ParallaxImage.js`):
- Image that moves at different scroll speed
- Uses Framer Motion useScroll + useTransform

**FloatingParticles** (`src/components/FloatingParticles.js`):
- Animated SVG shuttlecock silhouettes
- Random positions, sizes, drift animations
- Used in hero sections

**LogoMarquee** (`src/components/LogoMarquee.js`):
- Infinite horizontal scroll of partner logos
- CSS animation with duplicated items
- Grayscale → color on hover

### 5. Header Enhancement (`src/components/Header.js`)
- Scroll-aware: shrinks padding and adds stronger backdrop blur on scroll
- Active nav link gets animated underline (Framer Motion layoutId)
- Mobile hamburger menu with smooth slide-in animation

### 6. Page Hero Enhancement (`src/components/PageHero.js`)
- All page heroes get letter animation on title
- Subtle parallax on background image
- Fade-in on subtitle and breadcrumb

### 7. Other Page Enhancements

**All pages**:
- Wrap sections in ScrollReveal for entrance animations
- Cards get TiltCard treatment
- Buttons get MagneticButton treatment

**About Page**: ScrollReveal on each section, achievement timeline with staggered entry

**Sessions Page**: Session cards with TiltCard, animated pricing display

**FAQ Page**: Accordion items stagger in on scroll

**Photo Gallery**: Masonry-style grid, images scale smoothly on hover, staggered load animation

**Contact Page**: Form fields animate in sequentially, submit button with MagneticButton

**Values Page**: Value cards with TiltCard and icon animations

**Meet The Team**: Team member cards with TiltCard, photo zoom on hover

### 8. Footer Enhancement
- Staggered column reveal on scroll
- Social icons with hover scale/color animation
- Subtle top border gradient animation

## Performance Considerations

- All animations use `transform` and `opacity` only (GPU-accelerated)
- `useInView` with `once: true` so animations don't re-trigger
- Lazy load images below the fold
- Particles limited to ~15 elements
- Page transitions kept under 300ms
- `will-change` applied judiciously, removed after animation
- `prefers-reduced-motion` media query respected — elements appear immediately in final state with no animation (not hidden)

## File Structure (new/modified)

```
CLAUDE.md                              (new)
scripts/take-screenshots.js            (new)
src/components/ScrollReveal.js         (new)
src/components/AnimatedCounter.js      (new)
src/components/TiltCard.js             (new)
src/components/MagneticButton.js       (new)
src/components/LetterAnimation.js      (new)
src/components/PageTransition.js       (new)
src/components/ParallaxImage.js        (new)
src/components/FloatingParticles.js    (new)
src/components/LogoMarquee.js          (new)
src/components/Header.js               (modified)
src/components/PageHero.js             (modified)
src/components/Footer.js               (modified)
src/pages/HomePage.js                  (modified — major redesign)
src/pages/AboutPage.js                 (modified — add animations)
src/pages/SessionsPage.js              (modified — add animations)
src/pages/FAQsPage.js                  (modified — add animations)
src/pages/PhotoGalleryPage.js          (modified — add animations)
src/pages/ContactPage.js               (modified — add animations)
src/pages/ValuesPage.js                (modified — add animations)
src/pages/MeetTheTeamPage.js           (modified — add animations)
src/pages/MembershipResourcesPage.js   (modified — add animations)
src/theme.js                           (modified — minor typography tweaks)
src/App.js                             (modified — add PageTransition)
package.json                           (modified — add scripts + puppeteer)
.gitignore                             (modified — add screenshots/)
```

## Framework Notes

- **Bootstrap/React-Bootstrap**: Retained as-is. Some pages use Bootstrap grid. No migration planned — coexists with MUI.
- **react-slick / carousel packages**: Retained where currently used. New marquee component uses CSS animation instead.
- **typewriter-effect**: Will be replaced by LetterAnimation component (Framer Motion based).
- **ViewQueue page** (`/view-queue`): Simple iframe embed — no animation changes needed, left as-is.
- **TeamPage** (`src/pages/TeamPage.js`, `src/components/TeamPage.js`): Legacy redirect/duplicate files — left as-is, not part of redesign.

## Out of Scope

- No backend changes
- No new pages/routes
- No changes to Instagram integration or Netlify functions
- No changes to content/copy (beyond minor hero text)
- No changes to color palette
- No removal or migration of Bootstrap — coexists with MUI
