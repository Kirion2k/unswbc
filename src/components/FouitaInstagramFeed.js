import React, { useEffect, useRef, useState } from 'react';
import { Box, Skeleton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MODULE_URL = 'https://cdn.fouita.com/public/instagram-feed.js?11';

export default function FouitaInstagramFeed({
  username = 'unswbadminton',
  ukey = '0f72bdcd-65b2-4fc2-ac12-23f8b7548067',
  // Fouita settings (defaults match the snippet you provided)
  layout = 'masonry',
  header = false,
  cols = 4,
  cardHeight = 300,
  gap = 1,
  height = 1000,
}) {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  // Responsive sanity: keep columns reasonable on small screens
  const resolvedCols = mdUp ? cols : Math.min(2, cols);

  useEffect(() => {
    let cancelled = false;
    let instance = null;

    async function init() {
      try {
        setError(null);
        setReady(false);

        // Dynamic import of the widget module (works in modern browsers).
        const mod = await import(/* webpackIgnore: true */ MODULE_URL);
        const App = mod?.default || mod?.App || mod;
        if (!App) throw new Error('Widget module did not export an App');
        if (!mountRef.current) return;

        // Clear any previous content
        mountRef.current.innerHTML = '';

        instance = new App({
          target: mountRef.current,
          props: {
            settings: {
              layout,
              source: 'insta',
              selected: 'uname',
              uname: username,
              header,
              autoplay: false,
              zigzag: false,
              cols: resolvedCols,
              cardHeight,
              gap,
              direction: 'down',
              height,
              bgColor: '',
              txtColor: '',
              ukey,
            },
          },
        });

        if (!cancelled) setReady(true);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load Instagram feed');
      }
    }

    init();
    return () => {
      cancelled = true;
      try {
        instance?.$destroy?.();
      } catch {
        // no-op
      }
    };
  }, [cardHeight, cols, gap, header, height, layout, resolvedCols, ukey, username]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 420,
        // Let the widget define its own height so we don't get a big blank gap at the bottom.
        height: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
      }}
    >
      {!ready ? (
        <Box sx={{ position: 'absolute', inset: 0, p: 2, zIndex: 1 }}>
          <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 2 }} />
        </Box>
      ) : null}

      {error ? (
        <Box sx={{ p: 3 }}>
          <Box sx={{ fontWeight: 900, color: '#1c3c6f', mb: 1 }}>Couldn’t load the Instagram feed</Box>
          <Box sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {error}
            <br />
            If you’re using an ad-blocker or strict privacy mode, it may block the widget CDN.
          </Box>
        </Box>
      ) : (
        <Box
          ref={mountRef}
          id="ft-insta-app"
          sx={{
            width: '100%',
            height: 'auto',
            // Ensure the widget uses the available width cleanly
            '& *': { boxSizing: 'border-box' },
          }}
        />
      )}
    </Box>
  );
}


