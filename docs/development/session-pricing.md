# Session pricing

The Sessions page uses the supplied 21st.dev pricing-section pattern adapted to the club's existing glass surfaces, Geist typography and light/dark tokens.

- Components: `src/components/ui/pricing-section.tsx`, `pricing-card.tsx`, `pricing-tab.tsx` and the local badge, button and card primitives.
- Component styles: `src/components/ui/pricing-section.css`. Tailwind entry: `src/styles/tailwind.css`.
- The project already supports TypeScript, shadcn configuration and Tailwind 3. Its `tw-` utility prefix avoids collisions with Bootstrap and MUI. Imports resolve through the existing `src` base directory; no additional project setup is needed.
- `sessionCards` in `src/pages/SessionsPage.js` remains the source for all times, prices and the popular-session marker. The selector uses Members/Visitors; prices are AUD per session, with no recurring billing or discount claims.
- CTA links go to the registration instructions on the same page. No checkout, account or context provider is required.
- Cards display in three columns from 1000px and stack below that width. The selector supports native keyboard operation; motion follows the visitor's reduced-motion setting.
- `@number-flow/react` animates amounts; Lucide supplies icons. No additional images are needed for this section.

Validate with `npm run typecheck`, `npm test -- --watchAll=false --runInBand`, and `npm run build`.
