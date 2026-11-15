# Liquid-glass navbar integration

The app remains React 18 / Create React App with MUI and React Router. TypeScript and Tailwind 3 are enabled alongside existing JavaScript and styles; no framework migration is required. `npx shadcn@latest info --json` recognizes the manual shadcn configuration, TypeScript, Tailwind v3, and the component paths.

## Paths

- Reusable UI primitives: `src/components/ui/`.
- Liquid navbar: `src/components/ui/liquid-glass-navbar.tsx`.
- Standalone example: `src/components/ui/liquid-glass-navbar-demo.tsx`.
- Site-specific components: `src/components/`.
- Existing global styles: `src/index.css`; MUI theme: `src/theme.js`.
- Tailwind utilities and shadcn tokens: `src/styles/tailwind.css`.
- Class-name helper: `src/lib/utils.ts`.

`src/components/ui` is this app's equivalent of `/components/ui`: CRA compiles application code inside `src`. A separate `ui` directory keeps reusable primitives apart from site-specific components and gives the shadcn CLI a predictable destination. `components.json` maps `aliases.ui` to that directory.

TypeScript's `baseUrl: "src"` supports `components/ui/liquid-glass-navbar` imports. The example uses a relative import. CRA does not support an arbitrary `@/` bundler alias without additional configuration, so this integration uses CRA's native absolute imports rather than adding an alias plugin.

## Reproduce the setup

The dependencies and configuration are committed with the integration. On a checkout, run:

```sh
npm ci
npm run typecheck
npm test -- --watchAll=false --runInBand
npm run build
npx shadcn@latest info --json
```

For an existing CRA project without this setup, the relevant installation commands are:

```sh
npm install -D typescript@4.9.5 @types/react@18 @types/react-dom@18 tailwindcss@3 tailwindcss-animate
npm install clsx tailwind-merge@2
npx tailwindcss init
```

Then add the TypeScript configuration, Tailwind stylesheet, and `components.json` as shown in this repository. Tailwind's global reset is disabled and utilities use the `tw-` prefix to avoid changing MUI/Bootstrap layouts. The `cn` helper merges that prefixed utility syntax. CRA uses Tailwind 3 through its existing build pipeline; no custom PostCSS configuration is needed. See the [official CRA setup](https://v3.tailwindcss.com/docs/guides/create-react-app).

For a new CLI-supported project, use `npx shadcn@latest init`; for this existing app the manual configuration preserves the established theme and layout. To inspect a future component before installing it, use `npx shadcn@latest add button --dry-run`. Review generated dependencies and Tailwind compatibility before applying it. See [shadcn manual installation](https://ui.shadcn.com/docs/installation/manual) and [configuration aliases](https://ui.shadcn.com/docs/components-json).

## App integration

`Header.js` supplies the nine existing route labels and URLs, the active route index, `tone` from `ClubThemeProvider`, `compact={false}`, and `sound={false}`. `onNavigate` delegates ordinary link clicks to React Router without reloading the page; modified link clicks keep normal browser behavior. Arrow keys move link focus; Enter follows the focused link. No new context provider is required.

The component's default items, exported Nimbus icons, icon scenes, controlled/uncontrolled active state, optional audio, and CSS fallback remain available. The standalone example uses the already installed `lucide-react` icons. The actual navbar uses a consistent set of small Lucide icons, balanced 16px padding at the capsule ends, and the reference’s roomier 16px item padding, 8px icon gap, and 14px type on wide screens. Between 1200px and 1535px, content scales down progressively while retaining breathing room. The toolbar grid keeps the capsule centered and preserves the logo and theme-toggle positions. It mounts only above the existing 1200px desktop breakpoint; smaller screens retain the existing drawer.

The supplied water shader and drop physics are adapted from Nimbus UI / guglielmogiannattasio.it. Rendering pauses when idle, offscreen, or in a background tab, the soft water layer renders at CSS-pixel resolution, and reduced motion uses the static CSS drop. WebGL loss also switches to CSS. The expensive SVG refraction filter is omitted, simulation buffers are reused, ripples finish sooner, pending timers and GPU resources are cleaned up, and optional audio is closed on unmount. Home and Contact hit areas extend to the capsule rim with symmetrical padding around their icon-and-label groups. Negative outer margins retain the capsule width and the positions of the middle links.

This component needs no photographic assets; existing club logos are retained. The demo is source-only and adds no public route.
