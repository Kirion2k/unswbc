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
        await new Promise(r => setTimeout(r, 1500));

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
