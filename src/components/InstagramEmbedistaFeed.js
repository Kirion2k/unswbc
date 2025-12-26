import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Skeleton, Stack, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

/**
 * Embedista feed runs via script tags (document.write), which React cannot safely execute inline.
 * We host a tiny wrapper HTML in /public and iframe it here.
 */
export default function InstagramEmbedistaFeed({
  profileUrl = 'https://www.instagram.com/unswbadminton/',
  height = 760,
}) {
  const [loaded, setLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!loaded) return undefined;
    const t = window.setTimeout(() => setShowHelp(true), 3500);
    return () => window.clearTimeout(t);
  }, [loaded]);

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 900 }}>Live Instagram feed</Typography>
          <Button
            component="a"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<InstagramIcon />}
          >
            Follow
          </Button>
        </Stack>
      </CardContent>

      <Box sx={{ position: 'relative', width: '100%', height: { xs: 680, md: height }, bgcolor: 'background.paper' }}>
        {!loaded ? (
          <Box sx={{ position: 'absolute', inset: 0, p: 2 }}>
            <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 2 }} />
          </Box>
        ) : null}

        {showHelp ? (
          <Box sx={{ position: 'absolute', left: 12, right: 12, top: 12, zIndex: 2 }}>
            <Alert
              severity="info"
              sx={{
                bgcolor: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(15, 23, 42, 0.08)',
              }}
            >
              If the feed stays blank, it’s being blocked by Embedista/Instagram protections or browser privacy/ad‑blockers.
              Try opening the feed in a new tab or disabling content blockers for this site.
            </Alert>
          </Box>
        ) : null}

        <iframe
          title="Instagram feed"
          src="/embedista-instagram-feed.html"
          loading="lazy"
          style={{ width: '100%', height: '100%', border: 0 }}
          onLoad={() => setLoaded(true)}
          allow="encrypted-media; fullscreen"
        />
      </Box>
    </Card>
  );
}


