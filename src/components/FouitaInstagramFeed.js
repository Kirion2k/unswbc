import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Skeleton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MODULE_URL = 'https://cdn.fouita.com/public/instagram-feed.js?11';

function hasRenderableContent(root) {
  if (!root) return false

  // Some widgets insert placeholder nodes first
  // We only treat it as loaded once there is something that takes up space
  const elements = root.querySelectorAll('iframe, img, video, svg, canvas, section, article, ul, ol, div')
  for (const el of elements) {
    const rect = el.getBoundingClientRect()
    if (rect.width > 40 && rect.height > 40) return true
  }

  return false
}

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
  const [reloadToken, setReloadToken] = useState(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  // Responsive sanity: keep columns reasonable on small screens
  const resolvedCols = mdUp ? cols : Math.min(2, cols);

  useEffect(() => {
    let cancelled = false;
    let instance = null;
    let observer = null;
    let timeoutId = null;

    async function init() {
      try {
        setError(null);
        setReady(false);

        if (!mountRef.current) return;

        // Clear any previous content
        mountRef.current.innerHTML = '';

        // Dynamic import of the widget module (works in modern browsers).
        const mod = await import(/* webpackIgnore: true */ MODULE_URL);
        const App = mod?.default || mod?.App || mod;
        if (!App) throw new Error('Widget module did not export an App');

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

        // The constructor can succeed even when the widget later fails to render
        // so we wait until it actually adds content to the mount node
        observer = new MutationObserver(() => {
          if (!mountRef.current) return
          const canSeeContent = hasRenderableContent(mountRef.current)
          if (!canSeeContent) return

          if (!cancelled) setReady(true)
          try {
            observer?.disconnect()
          } catch {
            // no op
          }
          if (timeoutId) clearTimeout(timeoutId)
        });

        observer.observe(mountRef.current, { childList: true, subtree: true });

        // If we never see any content, show a helpful error instead of a blank box
        timeoutId = setTimeout(() => {
          if (cancelled) return
          const canSeeContent = hasRenderableContent(mountRef.current)
          if (canSeeContent) {
            setReady(true)
            return
          }

          setReady(false)
          setError(
            'The Instagram feed did not load. This is usually caused by a browser blocker, or the widget key not being allowed for this site domain.'
          )
        }, 7000);
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
        // no op
      }
      try {
        observer?.disconnect()
      } catch {
        // no op
      }
      if (timeoutId) clearTimeout(timeoutId)
    };
  }, [cardHeight, cols, gap, header, height, layout, resolvedCols, reloadToken, ukey, username]);

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
            If you are using an ad blocker or strict privacy mode, it may block the widget CDN.
          </Box>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setReloadToken((t) => t + 1)}
            >
              Retry
            </Button>
            <Button
              variant="outlined"
              href={`https://www.instagram.com/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Instagram
            </Button>
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
            // Mobile: prevent any internal fixed widths from forcing horizontal scrolling
            '& .ft-sff': { width: '100% !important', maxWidth: '100% !important' },
            '& img': { maxWidth: '100% !important' },
          }}
        />
      )}
    </Box>
  );
}


