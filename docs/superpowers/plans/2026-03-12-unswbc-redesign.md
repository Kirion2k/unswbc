# UNSW Badminton Club Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the UNSW Badminton Club website into a bold, modern sports brand experience with comprehensive dynamic elements while keeping the existing navy color palette.

**Architecture:** Shared animation components (ScrollReveal, TiltCard, AnimatedCounter, etc.) built first as reusable primitives. Then layout components (Header, Footer, PageHero) enhanced. Then HomePage fully redesigned. Finally all other pages get animation treatment. Puppeteer screenshot workflow added for visual verification.

**Tech Stack:** React 18, MUI 6, Framer Motion 11, Puppeteer (dev), deployed on Netlify.

**Spec:** `docs/superpowers/specs/2026-03-12-unswbc-redesign-design.md`

---

## Chunk 1: Infrastructure & Shared Animation Components

### Task 1: CLAUDE.md, .gitignore, package.json updates

**Files:**
- Create: `CLAUDE.md`
- Modify: `.gitignore`
- Modify: `package.json`

- [ ] **Step 1: Create CLAUDE.md**

```markdown
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
```

- [ ] **Step 2: Update .gitignore — add screenshots directory**

Add to `.gitignore`:
```
screenshots/
```

- [ ] **Step 3: Install puppeteer and add screenshots script to package.json**

Run: `cd /home/kirion2k/unswbc && npm install --save-dev puppeteer`

Add to `package.json` scripts:
```json
"screenshots": "node scripts/take-screenshots.js"
```

- [ ] **Step 4: Create Puppeteer screenshot script**

Create: `scripts/take-screenshots.js`

```js
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';
const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'sessions', path: '/sessions' },
  { name: 'faqs', path: '/faqs' },
  { name: 'values', path: '/values' },
  { name: 'photo-gallery', path: '/photo-gallery' },
  { name: 'contact', path: '/contact' },
  { name: 'membership-resources', path: '/membership-resources' },
  { name: 'meet-the-team', path: '/meet-the-team' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

async function takeScreenshots() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.join(__dirname, '..', 'screenshots', timestamp);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const viewport of VIEWPORTS) {
    await page.setViewport({ width: viewport.width, height: viewport.height });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      console.log(`Capturing ${route.name} (${viewport.name})...`);

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 1500)); // let animations settle

        const filename = `${route.name}-${viewport.name}.png`;
        await page.screenshot({
          path: path.join(outDir, filename),
          fullPage: true,
        });
      } catch (err) {
        console.error(`Failed: ${route.name} (${viewport.name}): ${err.message}`);
      }
    }
  }

  await browser.close();
  console.log(`\nScreenshots saved to: ${outDir}`);
}

takeScreenshots().catch(console.error);
```

- [ ] **Step 5: Remove typewriter-effect and uninstall**

Run: `cd /home/kirion2k/unswbc && npm uninstall typewriter-effect`

This package is replaced by the new `LetterAnimation` component.

- [ ] **Step 6: Commit infrastructure**

```bash
git add CLAUDE.md .gitignore package.json package-lock.json scripts/take-screenshots.js
git commit -m "Add CLAUDE.md, Puppeteer screenshot workflow, remove typewriter-effect"
```

---

### Task 2: theme.js typography tweaks

**Files:**
- Modify: `src/theme.js`

- [ ] **Step 1: Update theme typography for sports brand feel**

In `src/theme.js`, update the typography section to push headline weights and tighten letter-spacing:

```js
    h1: { fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h3: { fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h4: { fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 },
    h5: { fontWeight: 800, letterSpacing: '-0.01em' },
    h6: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 800 },
```

- [ ] **Step 2: Commit**

```bash
git add src/theme.js
git commit -m "Tighten typography weights and letter-spacing for sports brand feel"
```

---

### Task 3: ScrollReveal component

**Files:**
- Create: `src/components/ScrollReveal.js`

- [ ] **Step 1: Create ScrollReveal.js**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const directionOffsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
  style,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div style={style} {...props}>{children}</div>;
  }

  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  once = true,
  amount = 0.15,
  style,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div style={style} {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  direction = 'up',
  duration = 0.5,
  style,
  ...props
}) {
  const offset = directionOffsets[direction] || directionOffsets.up;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ScrollReveal.js
git commit -m "Add ScrollReveal animation component"
```

---

### Task 4: AnimatedCounter component

**Files:**
- Create: `src/components/AnimatedCounter.js`

- [ ] **Step 1: Create AnimatedCounter.js**

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export default function AnimatedCounter({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  style,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AnimatedCounter.js
git commit -m "Add AnimatedCounter component"
```

---

### Task 5: TiltCard component

**Files:**
- Create: `src/components/TiltCard.js`

- [ ] **Step 1: Create TiltCard.js**

```jsx
import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@mui/material';

export default function TiltCard({
  children,
  sx = {},
  tiltDeg = 6,
  glowColor = 'rgba(28, 60, 111, 0.08)',
  ...props
}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * tiltDeg,
      rotateY: (x - 0.5) * tiltDeg,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={transform}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
        height: '100%',
      }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 20px 60px rgba(2, 6, 23, 0.12)',
          },
          ...sx,
        }}
        {...props}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'opacity 0.3s ease',
            opacity: transform.rotateX === 0 && transform.rotateY === 0 ? 0 : 1,
          }}
        />
        {children}
      </Card>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TiltCard.js
git commit -m "Add TiltCard 3D hover component"
```

---

### Task 6: MagneticButton component

**Files:**
- Create: `src/components/MagneticButton.js`

- [ ] **Step 1: Create MagneticButton.js**

```jsx
import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@mui/material';

export default function MagneticButton({
  children,
  strength = 0.3,
  sx = {},
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{ display: 'inline-block' }}
    >
      <Button
        component={motion.button}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        sx={{
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MagneticButton.js
git commit -m "Add MagneticButton hover effect component"
```

---

### Task 7: LetterAnimation component

**Files:**
- Create: `src/components/LetterAnimation.js`

- [ ] **Step 1: Create LetterAnimation.js**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function LetterAnimation({
  text,
  as: Tag = 'span',
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  type = 'fade-up',
  inView = false,
  style = {},
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag style={style} {...props}>{text}</Tag>;
  }

  const getVariants = () => {
    switch (type) {
      case 'slide-in':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const letterVariants = getVariants();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const viewProps = inView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true } }
    : { initial: 'hidden', animate: 'visible' };

  return (
    <motion.span
      variants={containerVariants}
      style={{ display: 'inline-block', ...style }}
      {...viewProps}
      {...props}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LetterAnimation.js
git commit -m "Add LetterAnimation staggered text component"
```

---

### Task 8: PageTransition component + App.js integration

**Files:**
- Create: `src/components/PageTransition.js`
- Modify: `src/App.js`

- [ ] **Step 1: Create PageTransition.js**

```jsx
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Update App.js — add AnimatePresence + PageTransition**

Replace `src/App.js` with:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQsPage from './pages/FAQsPage';
import ValuesPage from './pages/ValuesPage';
import SessionsPage from './pages/SessionsPage';
import MembershipResourcesPage from './pages/MembershipResourcesPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import ViewQueue from './components/ViewQueue';
import ContactPage from './pages/ContactPage';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/faqs" element={<PageTransition><FAQsPage /></PageTransition>} />
        <Route path="/values" element={<PageTransition><ValuesPage /></PageTransition>} />
        <Route path="/sessions" element={<PageTransition><SessionsPage /></PageTransition>} />
        <Route path="/membership-resources" element={<PageTransition><MembershipResourcesPage /></PageTransition>} />
        <Route path="/photo-gallery" element={<PageTransition><PhotoGalleryPage /></PageTransition>} />
        <Route path="/meet-the-team" element={<PageTransition><MeetTheTeamPage /></PageTransition>} />
        <Route path="/view-queue" element={<ViewQueue />} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <ScrollToTop />
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PageTransition.js src/App.js
git commit -m "Add page transitions with AnimatePresence"
```

---

### Task 9: FloatingParticles component

**Files:**
- Create: `src/components/FloatingParticles.js`

- [ ] **Step 1: Create FloatingParticles.js**

```jsx
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Simplified shuttlecock silhouette SVG path
const SHUTTLECOCK_PATH = 'M12 2C12 2 8 8 8 14C8 18 10 22 12 22C14 22 16 18 16 14C16 8 12 2 12 2Z';

function Particle({ size, x, y, duration, delay, opacity }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        y: [0, -80, -160],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <path d={SHUTTLECOCK_PATH} fill="rgba(255,255,255,0.12)" />
    </motion.svg>
  );
}

export default function FloatingParticles({ count = 12 }) {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 12 + Math.random() * 18,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      opacity: 0.06 + Math.random() * 0.1,
    })),
    [count]
  );

  if (prefersReducedMotion) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FloatingParticles.js
git commit -m "Add FloatingParticles shuttlecock animation"
```

---

### Task 10: LogoMarquee component

**Files:**
- Create: `src/components/LogoMarquee.js`

- [ ] **Step 1: Create LogoMarquee.js**

```jsx
import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export default function LogoMarquee({ logos, speed = 30 }) {
  // Duplicate logos for seamless loop
  const items = [...logos, ...logos];

  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        py: 2,
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
          width: 'max-content',
          animation: `${scroll} ${speed}s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {items.map((logo, i) => (
          <Box
            key={i}
            component="img"
            src={logo.src}
            alt={logo.alt}
            sx={{
              height: { xs: 36, md: 48 },
              width: 'auto',
              maxWidth: 140,
              filter: 'grayscale(100%) opacity(0.5)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'grayscale(0%) opacity(1)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LogoMarquee.js
git commit -m "Add LogoMarquee infinite scroll component"
```

---

### Task 11: ParallaxImage component

**Files:**
- Create: `src/components/ParallaxImage.js`

- [ ] **Step 1: Create ParallaxImage.js**

```jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  if (prefersReducedMotion) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
        {...props}
      />
    );
  }

  return (
    <div ref={ref} style={{ overflow: 'hidden', position: 'relative', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          position: 'absolute',
          top: '-10%',
        }}
        {...props}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParallaxImage.js
git commit -m "Add ParallaxImage scroll effect component"
```

---

## Chunk 2: Layout Component Enhancements

### Task 12: Header enhancement — scroll-aware + animated nav

**Files:**
- Modify: `src/components/Header.js`

- [ ] **Step 1: Rewrite Header.js with scroll-aware behavior and animated underline**

Replace `src/components/Header.js` with:

```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Container,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo full/logo-full-white.png';

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Meet the Team', to: '/meet-the-team' },
    { label: 'Photo Gallery', to: '/photo-gallery' },
    { label: 'Sessions', to: '/sessions' },
    { label: 'FAQs', to: '/faqs' },
    { label: 'View Queue', to: '/view-queue' },
    { label: 'Contact', to: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{ width: { xs: 280, sm: 320 }, height: '100%', bgcolor: '#0a1628' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={logo} alt="UNSWBC Logo" style={{ height: 36 }} />
        <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {navLinks.map((item, index) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItemButton
                component={Link}
                to={item.to}
                sx={{
                  py: 1.25,
                  color: 'white',
                  '& .MuiListItemText-primary': { fontWeight: 800 },
                  bgcolor: isActive ? 'rgba(28,60,111,0.4)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(28,60,111,0.3)' },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </motion.div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        transition: 'all 0.3s ease',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        backgroundColor: scrolled ? 'rgba(2, 6, 23, 0.92)' : 'rgba(2, 6, 23, 0.78)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container>
        <Toolbar
          sx={{
            px: { xs: 0 },
            minHeight: { xs: 60, md: scrolled ? 64 : 72 },
            transition: 'min-height 0.3s ease',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{ sx: { bgcolor: '#0a1628' } }}
          >
            {drawer}
          </Drawer>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <motion.img
                src={logo}
                alt="UNSWBC Logo"
                style={{ height: scrolled ? 38 : 44, transition: 'height 0.3s ease' }}
                whileHover={{ scale: 1.05 }}
              />
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, position: 'relative' }}>
            {navLinks.map((item) => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

              return (
                <Box key={item.to} sx={{ position: 'relative' }}>
                  <Button
                    component={Link}
                    to={item.to}
                    sx={{
                      color: 'white',
                      opacity: isActive ? 1 : 0.85,
                      fontWeight: isActive ? 800 : 600,
                      px: 1.5,
                      '&:hover': { opacity: 1, bgcolor: 'transparent' },
                    }}
                  >
                    {item.label}
                  </Button>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '15%',
                        right: '15%',
                        height: 2,
                        borderRadius: 999,
                        backgroundColor: 'white',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.js
git commit -m "Enhance Header with scroll-aware behavior and animated nav underline"
```

---

### Task 13: PageHero enhancement — letter animation + parallax

**Files:**
- Modify: `src/components/PageHero.js`

- [ ] **Step 1: Rewrite PageHero.js**

Replace `src/components/PageHero.js` with:

```jsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import LetterAnimation from './LetterAnimation';

export default function PageHero({
  imageSrc,
  imageAlt,
  imagePosition = 'center',
  title,
  highlight,
  subtitle,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '62vh', sm: '68vh', md: '88vh' },
        bgcolor: 'black',
        overflow: 'hidden',
      }}
    >
      <Box
        component={motion.img}
        src={imageSrc}
        alt={imageAlt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        initial={prefersReducedMotion ? { opacity: 0.56 } : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.56, scale: 1 }}
        transition={{ duration: 1.6 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          objectFit: 'cover',
          objectPosition: imagePosition,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 600px at 50% 30%, rgba(28,60,111,0.14), rgba(0,0,0,0.34)), linear-gradient(to bottom, rgba(0,0,0,0.34), rgba(0,0,0,0.56))',
        }}
      />

      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: { xs: '62vh', sm: '68vh', md: '88vh' },
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 9, sm: 10, md: 12 },
          pb: { xs: 6, sm: 7, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: 820, textAlign: { xs: 'left', md: 'left' } }}>
          {children || (
            <>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2.15rem', sm: '2.7rem', md: '4rem' },
                  lineHeight: 1.05,
                  fontWeight: 900,
                }}
              >
                <LetterAnimation text={title || ''} delay={0.2} staggerDelay={0.03} />{' '}
                {highlight ? (
                  <Box component="span" sx={{ color: '#1c3c6f' }}>
                    <LetterAnimation text={highlight} delay={0.4} staggerDelay={0.03} />
                  </Box>
                ) : null}
              </Typography>
              {subtitle ? (
                <Typography
                  component={motion.p}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  sx={{
                    mt: 2,
                    color: 'rgba(255,255,255,0.86)',
                    fontSize: { xs: '0.98rem', sm: '1.05rem', md: '1.2rem' },
                    lineHeight: 1.6,
                    maxWidth: 700,
                  }}
                >
                  {subtitle}
                </Typography>
              ) : null}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PageHero.js
git commit -m "Enhance PageHero with letter animation and improved parallax"
```

---

### Task 14: Footer enhancement — staggered reveal + hover animations

**Files:**
- Modify: `src/components/Footer.js`

- [ ] **Step 1: Rewrite Footer.js**

Replace `src/components/Footer.js` with:

```jsx
import React from 'react';
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './logo full/logo-full-white.png';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1c3c6f',
        color: 'white',
        mt: 10,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #123456, #1c3c6f, #123456)',
        },
      }}
    >
      <Container sx={{ py: 6 }}>
        <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <StaggerItem>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <img src={logo} alt="UNSWBC Logo" style={{ height: 44 }} />
                </Box>
                <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.85)', maxWidth: 420 }}>
                  A welcoming badminton community at UNSW, social play, training, and competition.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton
                    component={motion.a}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/UNSWBC"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.10)' }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    component={motion.a}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/unswbadminton"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.10)' }}
                  >
                    <Instagram />
                  </IconButton>
                </Box>
              </StaggerItem>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StaggerItem>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Quick links</Typography>
                <Box sx={{ display: 'grid', gap: 0.75 }}>
                  {[
                    { label: 'Home', to: '/' },
                    { label: 'Sessions', to: '/sessions' },
                    { label: 'FAQs', to: '/faqs' },
                    { label: 'Contact', to: '/contact' },
                  ].map((l) => (
                    <Link
                      key={l.to}
                      component={RouterLink}
                      to={l.to}
                      underline="none"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        transition: 'all 0.2s ease',
                        '&:hover': { color: 'white', pl: 0.5 },
                        width: 'fit-content',
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </Box>
              </StaggerItem>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StaggerItem>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Location</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  Fitness and Aquatic Centre (B5), Gate 2, High St, UNSW Sydney, Kensington NSW 2033, Australia
                </Typography>
              </StaggerItem>
            </Grid>
          </Grid>
        </StaggerContainer>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.15)' }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          &copy; 2026 UNSW Badminton Club. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.js
git commit -m "Enhance Footer with staggered reveal and hover animations"
```

---

## Chunk 3: Homepage Redesign

### Task 15: Complete HomePage redesign

**Files:**
- Modify: `src/pages/HomePage.js`

- [ ] **Step 1: Rewrite HomePage.js with all dynamic elements**

Replace `src/pages/HomePage.js` with:

```jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { keyframes } from '@mui/system';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import LetterAnimation from '../components/LetterAnimation';
import FloatingParticles from '../components/FloatingParticles';
import LogoMarquee from '../components/LogoMarquee';
import ParallaxImage from '../components/ParallaxImage';
import unswLogo from '../unsw-logo.png';
import arcLogo from '../arc-logo.jpg';
import badmintonAuLogo from '../badminton-au.png';
import badmintonNswLogo from '../nsw-badminton.png';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const heroImage = '/unsw-64.jpg';

  const featureSections = [
    {
      title: 'Who we are',
      body: 'A welcoming community of players across every level, from first timers to competitive athletes.',
      body2: 'Whether you are brand new or already competing, you will find friendly games, good people, and a club culture that makes it easy to get involved.',
      image: '/unsw-1.jpg',
      tone: 'navy',
    },
    {
      title: 'Training & improvement',
      body: 'Build fundamentals, learn tactics, and sharpen your game with structured sessions and great partners.',
      body2: 'We focus on consistency and confidence on court, so you can level up your skills and enjoy better games week after week.',
      image: '/unsw-2.jpg',
      tone: 'light',
    },
    {
      title: 'Community & events',
      body: 'Tournaments, socials, and club culture that makes you want to come back every week.',
      body2: 'From club events to team competitions, there is always something to look forward to, and plenty of chances to meet new people.',
      image: '/unsw-41.jpg',
      tone: 'navy',
    },
  ];

  const cards = [
    { img: '/unsw-13.jpg', title: 'Session info', description: 'Times, location, pricing, and how sessions run.', link: '/sessions' },
    { img: '/unsw-9.jpg', title: 'FAQs', description: 'Quick answers before your first session.', link: '/faqs' },
    { img: '/unsw-49.jpg', title: 'Get in touch', description: 'Questions? Message us or follow our socials.', link: '/contact' },
  ];

  const stats = [
    { value: 150, suffix: '+', label: 'Active Members' },
    { value: 2, suffix: '×', label: 'National Champions' },
    { value: 4, suffix: '', label: 'Weekly Sessions' },
    { label: 'Est. 2018', static: true },
  ];

  const partners = [
    { src: unswLogo, alt: 'UNSW' },
    { src: arcLogo, alt: 'ARC Sport' },
    { src: badmintonAuLogo, alt: 'Badminton Australia' },
    { src: badmintonNswLogo, alt: 'Badminton NSW' },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      {/* ─── Hero ─── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          bgcolor: '#0a1628',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component={motion.img}
          src={heroImage}
          alt="UNSW Badminton Club"
          loading="eager"
          fetchPriority="high"
          initial={prefersReducedMotion ? { opacity: 0.35 } : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 2 }}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 0%',
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(28,60,111,0.4) 50%, rgba(10,22,40,0.85) 100%)',
            backgroundSize: '200% 200%',
            animation: prefersReducedMotion ? 'none' : `${gradientShift} 15s ease infinite`,
          }}
        />

        <FloatingParticles count={12} />

        <Container sx={{ position: 'relative', zIndex: 1, py: { xs: 14, md: 0 } }}>
          <Box sx={{ maxWidth: 800 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.45)',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                UNSW Badminton Club
              </Typography>
            </motion.div>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 'clamp(2.5rem, 8vw, 4.5rem)', md: 'clamp(3.5rem, 5vw, 5rem)' },
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: 'white',
              }}
            >
              <LetterAnimation text="WHERE" delay={0.3} staggerDelay={0.04} />
              <br />
              <LetterAnimation text="CHAMPIONS" delay={0.5} staggerDelay={0.03} />
              <br />
              <Box
                component="span"
                sx={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.7)',
                  color: 'transparent',
                }}
              >
                <LetterAnimation text="ARE MADE" delay={0.8} staggerDelay={0.04} />
              </Box>
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              sx={{
                mt: 3,
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              2&times; UniSport National Champions. 150+ members. Sydney&apos;s most competitive university badminton community.
            </Typography>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}
            >
              <MagneticButton
                variant="contained"
                component={RouterLink}
                to="/sessions"
                sx={{
                  bgcolor: '#1c3c6f',
                  color: 'white',
                  fontWeight: 800,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': { bgcolor: '#123456' },
                }}
              >
                Join the Club &rarr;
              </MagneticButton>
              <MagneticButton
                variant="outlined"
                component={RouterLink}
                to="/sessions"
                sx={{
                  borderColor: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.5)', bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                View Sessions
              </MagneticButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── Stats Counter Bar ─── */}
      <Box sx={{ bgcolor: '#1c3c6f', py: { xs: 5, md: 6 } }}>
        <Container>
          <StaggerContainer staggerDelay={0.12}>
            <Grid container spacing={3} justifyContent="center" textAlign="center">
              {stats.map((stat, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <StaggerItem>
                    <Typography
                      sx={{
                        fontSize: { xs: '2.2rem', md: '2.8rem' },
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.static ? (
                        stat.label
                      ) : (
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} />
                      )}
                    </Typography>
                    {!stat.static && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          color: 'rgba(255,255,255,0.6)',
                          fontWeight: 700,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    )}
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>

      {/* ─── Feature Sections ─── */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Welcome" title="A club built for every level" sx={{ mb: 5 }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {featureSections.map((s, index) => {
            const imageFirst = index % 2 === 0;
            const overline = index === 0 ? 'Community' : index === 1 ? 'Training' : 'Events';

            return (
              <Grid item xs={12} key={s.title}>
                <ScrollReveal delay={index * 0.1}>
                  <TiltCard>
                    <Grid container alignItems="stretch">
                      <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                          order: { xs: 0, md: imageFirst ? 0 : 1 },
                          display: 'flex',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={s.image}
                          alt={s.title}
                          sx={{
                            width: '100%',
                            flexGrow: 1,
                            height: { xs: 240, sm: 300, md: '100%' },
                            minHeight: { md: 360 },
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                          order: { xs: 1, md: imageFirst ? 1 : 0 },
                          bgcolor: s.tone === 'navy' ? 'rgba(28,60,111,0.04)' : 'transparent',
                          display: 'flex',
                        }}
                      >
                        <CardContent
                          sx={{
                            p: { xs: 3, md: 4 },
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
                            <Typography
                              variant="overline"
                              sx={{
                                color: '#1c3c6f',
                                letterSpacing: '0.14em',
                                fontWeight: 900,
                              }}
                            >
                              {overline}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ fontWeight: 900, mt: 0.5, color: '#0b1220', lineHeight: 1.2 }}
                            >
                              {s.title}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 1.25,
                                color: 'text.secondary',
                                lineHeight: 1.9,
                                fontSize: { xs: '1rem', md: '1.05rem' },
                              }}
                            >
                              {s.body}
                            </Typography>
                            {s.body2 && (
                              <Typography
                                sx={{
                                  mt: 1,
                                  color: 'text.secondary',
                                  lineHeight: 1.9,
                                  fontSize: { xs: '1rem', md: '1.05rem' },
                                }}
                              >
                                {s.body2}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </TiltCard>
                </ScrollReveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* ─── About Preview ─── */}
      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <ScrollReveal direction="left">
              <Typography
                variant="overline"
                sx={{ color: '#1c3c6f', letterSpacing: '0.14em', fontWeight: 900 }}
              >
                About Us
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mt: 1,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  lineHeight: 1.15,
                }}
              >
                More than a club — a community
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.85, fontSize: '1.05rem' }}>
                From social games to national competitions, UNSW Badminton Club brings together players of
                every level in a welcoming, high-energy environment.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <MagneticButton
                  variant="outlined"
                  component={RouterLink}
                  to="/about"
                  sx={{ fontWeight: 800 }}
                >
                  Learn More &rarr;
                </MagneticButton>
              </Box>
            </ScrollReveal>
          </Grid>
          <Grid item xs={12} md={6}>
            <ScrollReveal direction="right">
              <Box sx={{ borderRadius: 4, overflow: 'hidden', height: { xs: 280, md: 380 } }}>
                <ParallaxImage
                  src="/unsw-14.JPG"
                  alt="UNSW Badminton Club community"
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>

      {/* ─── Sessions Preview ─── */}
      <Container sx={{ pb: { xs: 6, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Sessions" title="Join us on court" sx={{ mb: 5 }} />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {[
              { day: 'Tuesdays', time: '6 – 10pm', note: 'After class games' },
              { day: 'Saturdays', time: '1 – 4pm', note: 'Afternoon session' },
              { day: 'Saturdays', time: '4 – 7pm', note: 'Evening session' },
            ].map((session) => (
              <Grid item xs={12} md={4} key={`${session.day}-${session.time}`}>
                <StaggerItem>
                  <TiltCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        {session.day}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 800, color: '#1c3c6f', fontSize: '1.1rem', mt: 0.5 }}
                      >
                        {session.time}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mt: 1, lineHeight: 1.7 }}>
                        {session.note}
                      </Typography>
                      <Typography sx={{ mt: 1, fontSize: '0.85rem', color: 'text.secondary' }}>
                        UNSW Fitness &amp; Aquatic Centre, Level 2
                      </Typography>
                    </CardContent>
                  </TiltCard>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <MagneticButton
            variant="contained"
            component={RouterLink}
            to="/sessions"
            sx={{ fontWeight: 800 }}
          >
            Full Session Details &rarr;
          </MagneticButton>
        </Box>
      </Container>

      {/* ─── Achievement Showcase ─── */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container>
          <ScrollReveal>
            <SectionHeading overline="Achievements" title="National Champions" sx={{ mb: 5 }} />
          </ScrollReveal>
          <ScrollReveal>
            <Card
              sx={{
                overflow: 'hidden',
                borderRadius: 4,
                position: 'relative',
                minHeight: { xs: 400, md: 360 },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/unsw-29.JPG)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(28,60,111,0.96), rgba(28,60,111,0.86) 46%, rgba(2,6,23,0.15) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  px: { xs: 3, md: 6 },
                  py: { xs: 4, md: 6 },
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ maxWidth: 600 }}>
                  <Typography variant="overline" sx={{ letterSpacing: '0.14em', fontWeight: 900, color: 'rgba(255,255,255,0.82)' }}>
                    UniSport Nationals
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.12, mt: 0.5 }}>
                    Champions in 2024 &amp; 2025
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.85 }}>
                    UNSW won the UniSport Nationals badminton title back-to-back. National-level players,
                    a strong team culture, and a legacy of excellence.
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.1 }}>
                          <AnimatedCounter target={2} suffix="×" />
                        </Typography>
                        <Typography sx={{ mt: 0.5, color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                          National Titles
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.10)' }}>
                        <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', lineHeight: 1.1 }}>
                          <AnimatedCounter target={150} suffix="+" />
                        </Typography>
                        <Typography sx={{ mt: 0.5, color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                          Active Members
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Card>
          </ScrollReveal>
        </Container>
      </Box>

      {/* ─── Explore Cards ─── */}
      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <ScrollReveal>
          <SectionHeading overline="Explore" title="Explore the club" sx={{ mb: 5 }} />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.1}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <StaggerItem>
                  <TiltCard>
                    <CardActionArea component={RouterLink} to={card.link} sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        image={card.img}
                        alt={card.title}
                        sx={{
                          height: { xs: 180, md: 220 },
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '&:hover': { transform: 'scale(1.04)' },
                        }}
                      />
                      <CardContent
                        sx={{
                          p: 3,
                          minHeight: { xs: 132, md: 140 },
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                          {card.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, flexGrow: 1 }}>
                          {card.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </TiltCard>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>

      {/* ─── Partners Marquee ─── */}
      <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: 'white' }}>
        <Container>
          <ScrollReveal>
            <SectionHeading overline="Our partners" title="Affiliated with" sx={{ mb: 3 }} />
          </ScrollReveal>
          <LogoMarquee logos={partners} speed={25} />
        </Container>
      </Box>

      {/* ─── CTA Banner ─── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: '#1c3c6f',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #123456 0%, #1c3c6f 50%, #123456 100%)',
            backgroundSize: '200% 200%',
            animation: prefersReducedMotion ? 'none' : `${gradientShift} 12s ease infinite`,
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: 'white',
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Ready to Play?
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                maxWidth: 500,
                mx: 'auto',
                mb: 4,
              }}
            >
              Join 150+ members at Sydney&apos;s top university badminton club.
            </Typography>
            <MagneticButton
              variant="contained"
              component={RouterLink}
              to="/sessions"
              sx={{
                bgcolor: 'white',
                color: '#1c3c6f',
                fontWeight: 900,
                px: 5,
                py: 1.5,
                fontSize: '1.05rem',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
              }}
            >
              View Sessions &rarr;
            </MagneticButton>
          </ScrollReveal>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
```

- [ ] **Step 2: Verify — run `npm start` and check homepage renders**

Run: `npm start` (dev server should be running)
Expected: Homepage loads with animated hero, stats bar, feature cards with tilt, marquee logos, CTA banner.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.js
git commit -m "Redesign HomePage with bold hero, stats counter, tilt cards, particles, and CTA"
```

---

## Chunk 4: Page Enhancements

### Task 16: About Page animations

**Files:**
- Modify: `src/pages/AboutPage.js`

- [ ] **Step 1: Rewrite AboutPage.js with animation components**

Replace `src/pages/AboutPage.js` — key changes:
- Replace `import { motion } from 'framer-motion'` with imports for `ScrollReveal`, `TiltCard`, `MagneticButton`
- Replace all `<motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>` wrappers with `<ScrollReveal>`
- Replace `<motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }}>` wrappers with `<ScrollReveal delay={index * 0.05}>`
- Replace `<Card sx={{ overflow: 'hidden' }}>` in the vision/activity `.map()` with `<TiltCard sx={{ overflow: 'hidden' }}>`
- Replace the CTA button:

```jsx
// Before:
<Button component={RouterLink} to="/sessions" variant="contained" size="large" fullWidth sx={{ py: 1.6, fontWeight: 900, bgcolor: 'white', color: '#1c3c6f', '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' } }}>
  Join us today
</Button>

// After:
<MagneticButton component={RouterLink} to="/sessions" variant="contained" size="large" fullWidth sx={{ py: 1.6, fontWeight: 900, bgcolor: 'white', color: '#1c3c6f', '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' } }}>
  Join us today
</MagneticButton>
```

Full import block:
```jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/AboutPage.js
git commit -m "Add scroll animations and tilt cards to AboutPage"
```

---

### Task 17: Sessions Page animations

**Files:**
- Modify: `src/pages/SessionsPage.js`

- [ ] **Step 1: Rewrite SessionsPage.js with animation components**

Replace `src/pages/SessionsPage.js` — key changes:
- Replace `import { motion } from 'framer-motion'` with imports for `ScrollReveal, { StaggerContainer, StaggerItem }`, `TiltCard`, `MagneticButton`
- Remove the `fadeUp` and `stagger` variant objects (lines 34-42)
- Replace `<Grid ... component={motion.div} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>` with `<StaggerContainer><Grid ...>`
- Replace `<Box component={motion.div} variants={fadeUp} ...>` with `<StaggerItem>`
- Wrap session cards `<Card>` with `<TiltCard>`
- Replace CTA buttons with `<MagneticButton>`

Full import block:
```jsx
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Card, CardContent, Chip, Collapse, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined'
import HowToRegOutlined from '@mui/icons-material/HowToRegOutlined'
import SportsTennisOutlined from '@mui/icons-material/SportsTennisOutlined'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'
```

Example transformation for quick steps section:
```jsx
// Before:
<Grid container ... component={motion.div} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
  {quickSteps.map((step, index) => (
    <Grid item xs={12} md={4} key={step.title}>
      <Box component={motion.div} variants={fadeUp} sx={{ height: '100%' }}>
        <Card sx={{ height: '100%' }}>

// After:
<StaggerContainer>
  <Grid container spacing={{ xs: 2, md: 3 }}>
    {quickSteps.map((step, index) => (
      <Grid item xs={12} md={4} key={step.title}>
        <StaggerItem style={{ height: '100%' }}>
          <TiltCard>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/SessionsPage.js
git commit -m "Add scroll animations and tilt cards to SessionsPage"
```

---

### Task 18: FAQ Page animations

**Files:**
- Modify: `src/pages/FAQsPage.js`

- [ ] **Step 1: Add ScrollReveal to FAQ items**

Replace `src/pages/FAQsPage.js` — key changes:

Add import:
```jsx
import ScrollReveal from '../components/ScrollReveal';
```

Replace the FAQ map:
```jsx
// Before:
{faqs.map((faq, index) => (
  <Accordion key={index} sx={{ mb: 2 }}>

// After:
{faqs.map((faq, index) => (
  <ScrollReveal key={index} delay={Math.min(index * 0.05, 0.4)}>
    <Accordion sx={{ mb: 2 }}>
      ...
    </Accordion>
  </ScrollReveal>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/FAQsPage.js
git commit -m "Add staggered scroll animations to FAQsPage"
```

---

### Task 19: Photo Gallery Page — masonry + hover animations

**Files:**
- Modify: `src/pages/PhotoGalleryPage.js`

- [ ] **Step 1: Rewrite PhotoGalleryPage with masonry grid and improved animations**

Replace `src/pages/PhotoGalleryPage.js` with:

```jsx
import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Container, Typography } from '@mui/material';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';

function PhotoGalleryPage() {
  const galleryImages = [
    '/unsw-1.jpg', '/unsw-2.jpg', '/unsw-3.jpg', '/unsw-4.jpg', '/unsw-5.jpg',
    '/unsw-6.jpg', '/unsw-7.jpg', '/unsw-8.jpg', '/unsw-9.jpg', '/unsw-10.jpg',
    '/unsw-11.jpg', '/unsw-12.jpg', '/unsw-13.jpg', '/unsw-14.JPG', '/unsw-17.jpg',
    '/unsw-18.JPG', '/unsw-19.jpg',
    ...Array.from({ length: 62 }, (_, i) => `/unsw-${20 + i}.JPG`),
  ].map((full) => {
    const base = full.replace(/^\//, '').replace(/\.[^.]+$/, '');
    return { full, thumb: `/thumbs/${base}.jpg` };
  });

  // Masonry height pattern — alternate between tall and short
  const getHeight = (index) => {
    const pattern = [320, 240, 280, 360, 260, 300];
    return pattern[index % pattern.length];
  };

  return (
    <Box>
      <PageHero
        imageSrc="/unsw-81.JPG"
        imageAlt="Photo Gallery"
        title="Photo"
        highlight="Gallery"
        subtitle="Moments from sessions, events, and competitions. The community on and off court."
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeading overline="Gallery" title="Our memories" sx={{ mb: 5 }} />
        <Box
          sx={{
            columns: { xs: 1, sm: 2, md: 3 },
            columnGap: { xs: 2, md: 3 },
          }}
        >
          {galleryImages.map((img, index) => (
            <ScrollReveal
              key={index}
              delay={Math.min(index * 0.02, 0.4)}
              style={{ breakInside: 'avoid', marginBottom: '16px' }}
            >
              <Card
                sx={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 20px 60px rgba(2,6,23,0.15)',
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    '&:hover img': { transform: 'scale(1.06)' },
                    '&:hover .unswbc-overlay': { opacity: 1 },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={img.thumb}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                      sx={{
                        height: { xs: 220, sm: getHeight(index) },
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    <Box
                      className="unswbc-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(2,6,23,0.70), rgba(2,6,23,0.05))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        position: 'absolute',
                        left: 16,
                        bottom: 12,
                        color: 'white',
                        fontWeight: 800,
                        opacity: 0,
                        transform: 'translateY(6px)',
                        transition: 'all 0.3s ease',
                        '.unswbc-overlay:hover ~ &, .MuiCardActionArea-root:hover &': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      Photo {index + 1}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default PhotoGalleryPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/PhotoGalleryPage.js
git commit -m "Enhance PhotoGalleryPage with masonry grid and improved hover effects"
```

---

### Task 20: Contact Page animations

**Files:**
- Modify: `src/pages/ContactPage.js`

- [ ] **Step 1: Add ScrollReveal and MagneticButton to ContactPage**

Add imports:
```jsx
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
```

Wrap the form Grid container's two children in `<ScrollReveal>`:
```jsx
// Form card (left side)
<Grid item xs={12} md={7}>
  <ScrollReveal>
    <Card sx={{ height: '100%' }}>
      ...
    </Card>
  </ScrollReveal>
</Grid>

// Info card (right side)
<Grid item xs={12} md={5}>
  <ScrollReveal delay={0.1}>
    <Card sx={{ height: '100%' }}>
      ...
    </Card>
  </ScrollReveal>
</Grid>
```

Replace submit button:
```jsx
// Before:
<Button type="submit" variant="contained" color="primary">
  Send message
</Button>

// After:
<MagneticButton type="submit" variant="contained" color="primary">
  Send message
</MagneticButton>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ContactPage.js
git commit -m "Add scroll animations to ContactPage"
```

---

### Task 21: Values Page animations

**Files:**
- Modify: `src/pages/ValuesPage.js`

- [ ] **Step 1: Rewrite ValuesPage.js with animation components**

Replace `src/pages/ValuesPage.js` with:

```jsx
import React from 'react';
import { Box, CardContent, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import { Link as RouterLink } from 'react-router-dom';

function ValuesPage() {
  const values = [
    { title: 'Sportsmanship', body: 'Respect first — for opponents, teammates, and the game. We play hard and fair.', icon: <EmojiEventsIcon /> },
    { title: 'Community', body: 'A club should feel welcoming. New faces, new friends, and good vibes on and off court.', icon: <GroupsIcon /> },
    { title: 'Growth', body: 'From beginner basics to advanced tactics — we focus on steady improvement every session.', icon: <TrendingUpIcon /> },
    { title: 'Inclusivity', body: 'All skill levels are welcome. We create space for everyone to enjoy badminton.', icon: <VolunteerActivismIcon /> },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-15.JPG"
        imageAlt="Badminton values"
        title="Our"
        highlight="Values"
        subtitle="The culture we build is as important as the results we chase."
        imagePosition="center 35%"
      />

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="UNSWBC" title="What we stand for" sx={{ mb: 5 }} />
        </ScrollReveal>

        <Grid container spacing={3}>
          {values.map((v, index) => (
            <Grid item xs={12} sm={6} md={3} key={v.title}>
              <ScrollReveal delay={index * 0.08}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        bgcolor: 'rgba(28,60,111,0.12)',
                        color: '#1c3c6f',
                        display: 'grid',
                        placeItems: 'center',
                        mb: 2,
                      }}
                    >
                      {v.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                      {v.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      {v.body}
                    </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <ScrollReveal>
          <TiltCard sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Ready to jump in?
              </Typography>
              <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.88)', maxWidth: 760, lineHeight: 1.7 }}>
                Whether you're coming for social games, training, or competition, you'll find a place in the club.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <MagneticButton
                  component={RouterLink}
                  to="/sessions"
                  variant="contained"
                  sx={{ bgcolor: 'white', color: '#1c3c6f', fontWeight: 900, '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' } }}
                >
                  Check Sessions &rarr;
                </MagneticButton>
              </Box>
            </CardContent>
          </TiltCard>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default ValuesPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ValuesPage.js
git commit -m "Add tilt cards and scroll animations to ValuesPage"
```

---

### Task 22: Meet The Team Page animations

**Files:**
- Modify: `src/pages/MeetTheTeamPage.js`

- [ ] **Step 1: Rewrite MeetTheTeamPage.js with animation components**

Replace `src/pages/MeetTheTeamPage.js` with:

```jsx
import React from 'react'
import { Avatar, Box, CardContent, Container, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'

function MeetTheTeamPage() {
  const executives = [
    { name: 'Aaron Zhang', position: 'President' },
    { name: 'Daniel Hu', position: 'Vice President' },
    { name: 'Harry Shi', position: 'Secretary' },
    { name: 'Amanda Zhang', position: 'Treasurer' },
    { name: 'Charles Ni', position: 'Arc Delegate' },
    { name: 'Ray Zhang', position: 'Grievance Officer' },
  ]

  const committee = [
    'Events & socials',
    'Competition & tournaments',
    'Marketing & content',
    'Training support',
    'Session operations',
    'Sponsorships & partnerships',
  ]

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-20.jpg"
        imageAlt="Meet the Team"
        title="Meet the"
        highlight="Team"
        subtitle="A volunteer committee keeping sessions running smoothly and the club thriving."
        imagePosition="center 30%"
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Leadership" title="Executives" sx={{ mb: 5 }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {executives.map((exec, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ScrollReveal delay={index * 0.05}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <motion.div whileHover={{ scale: 1.08 }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: 'rgba(28,60,111,0.12)',
                          color: '#1c3c6f',
                          fontWeight: 900,
                          mb: 2,
                        }}
                      >
                        {exec.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                      </Avatar>
                    </motion.div>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>
                      {exec.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {exec.position}
                    </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 7, md: 12 } }}>
        <ScrollReveal>
          <SectionHeading overline="Team" title="Committee" sx={{ mb: 5 }} />
        </ScrollReveal>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {committee.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <ScrollReveal delay={index * 0.04}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: '#1c3c6f' }}>
                      {role}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      The behind the scenes work that makes sessions, events, and competitions run smoothly.
                    </Typography>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <ScrollReveal>
            <SectionHeading overline="Contact" title="Reach out to us" sx={{ mb: 4 }} />
            <TiltCard sx={{ bgcolor: '#1c3c6f', color: 'white' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      Got questions for the team?
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.88)', lineHeight: 1.85 }}>
                      Contact us here and we'll get back to you soon.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MagneticButton
                      component={RouterLink}
                      to="/contact"
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: 'white',
                        color: '#1c3c6f',
                        fontWeight: 900,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
                      }}
                    >
                      Go to contact
                    </MagneticButton>
                  </Grid>
                </Grid>
              </CardContent>
            </TiltCard>
          </ScrollReveal>
        </Box>
      </Container>
    </Box>
  )
}

export default MeetTheTeamPage
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/MeetTheTeamPage.js
git commit -m "Add tilt cards and scroll animations to MeetTheTeamPage"
```

---

### Task 23: Membership Resources Page animations

**Files:**
- Modify: `src/pages/MembershipResourcesPage.js`

- [ ] **Step 1: Rewrite MembershipResourcesPage.js with animation components**

Replace `src/pages/MembershipResourcesPage.js` with:

```jsx
import React from 'react';
import { Box, CardContent, Container, Grid, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';

function MembershipResourcesPage() {
  const resources = [
    {
      title: 'What to bring',
      items: [
        'Badminton racket (or hire one from UNSW FAC)',
        'Non-marking court shoes',
        'Water bottle + towel',
        'A good attitude — you\'ll meet heaps of people',
      ],
    },
    {
      title: 'Beginner tips',
      items: [
        'Warm up first (especially ankles/shoulders)',
        'Keep your grip relaxed until impact',
        'Focus on consistency before power',
        'Ask committee members for quick technique tips',
      ],
    },
    {
      title: 'Club resources',
      items: [
        'Queue system: see View Queue for live updates during sessions',
        'FAQs: common questions answered before your first session',
        'Socials: announcements for events, shirts, and trials',
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-21.JPG"
        imageAlt="Membership resources"
        title="Membership"
        highlight="Resources"
        subtitle="Everything you need to get started — gear, session tips, and helpful links."
        imagePosition="center 35%"
      />

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <ScrollReveal>
          <SectionHeading overline="Guide" title="Make your first session easy" sx={{ mb: 5 }} />
        </ScrollReveal>

        <Grid container spacing={3}>
          {resources.map((r, index) => (
            <Grid item xs={12} md={4} key={r.title}>
              <ScrollReveal delay={index * 0.08}>
                <TiltCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5, color: '#1c3c6f' }}>
                      {r.title}
                    </Typography>
                    <List dense disablePadding>
                      {r.items.map((t) => (
                        <ListItem key={t} disableGutters sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={t}
                            primaryTypographyProps={{ sx: { color: 'text.secondary', lineHeight: 1.7 } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <ScrollReveal>
          <TiltCard>
            <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                Helpful links
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                - View Queue: <Link component={RouterLink} to="/view-queue" underline="hover">/view-queue</Link>
                <br />
                - FAQs: <Link component={RouterLink} to="/faqs" underline="hover">/faqs</Link>
                <br />
                - Contact: <Link component={RouterLink} to="/contact" underline="hover">/contact</Link>
              </Typography>
            </CardContent>
          </TiltCard>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

export default MembershipResourcesPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/MembershipResourcesPage.js
git commit -m "Add scroll animations to MembershipResourcesPage"
```

---

### Task 24: Final verification and screenshot capture

- [ ] **Step 1: Run dev server and visually verify all pages**

Run: `npm start`
Check each route loads without errors in the browser console.

- [ ] **Step 2: Capture screenshots**

Run: `npm run screenshots`
Expected: `screenshots/` directory created with timestamped folder containing desktop + mobile screenshots of all pages.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "Complete UNSW Badminton Club website redesign"
```
