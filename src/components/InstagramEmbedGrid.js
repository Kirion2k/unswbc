import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

// Loads Instagram’s embed script once and re-processes embeds when permalinks change.
function useInstagramEmbeds(permalinks) {
  const depKey = Array.isArray(permalinks) ? permalinks.join('|') : '';
  useEffect(() => {
    const existing = document.querySelector('script[data-instgrm-embed-script="true"]');
    if (!existing) {
      const s = document.createElement('script');
      s.async = true;
      s.defer = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.setAttribute('data-instgrm-embed-script', 'true');
      document.body.appendChild(s);
      s.onload = () => {
        try {
          // eslint-disable-next-line no-undef
          window.instgrm?.Embeds?.process?.();
        } catch {
          // no-op
        }
      };
    } else {
      try {
        // eslint-disable-next-line no-undef
        window.instgrm?.Embeds?.process?.();
      } catch {
        // no-op
      }
    }
  }, [depKey]);
}

/**
 * Renders a responsive grid of real Instagram embeds.
 * Requires permalinks to *posts/reels*, e.g. https://www.instagram.com/p/SHORTCODE/
 * Instagram does NOT support embedding a “profile feed” via this script.
 */
export default function InstagramEmbedGrid({
  permalinks,
  profileUrl = 'https://www.instagram.com/unswbadminton/',
}) {
  const links = Array.isArray(permalinks) ? permalinks.filter(Boolean) : [];
  useInstagramEmbeds(links);

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }} justifyContent="space-between">
          <Typography sx={{ fontWeight: 900 }}>
            Live Instagram posts
          </Typography>
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

      <Box sx={{ px: { xs: 2.5, md: 3 }, pb: { xs: 3, md: 4 } }}>
        {links.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            The embed code you pasted is for embedding a <b>single Instagram post</b>, not a full profile feed.
            Paste 3–9 Instagram post permalinks (e.g. <b>https://www.instagram.com/p/SHORTCODE/</b>) into the
            `instagramPostPermalinks` array in `src/pages/HomePage.js`, and they’ll render here.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {links.map((url) => (
              <Grid item xs={12} md={4} key={url}>
                {/* Instagram requires this exact markup */}
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: '#fff',
                    border: 0,
                    borderRadius: 14,
                    boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
                    margin: 0,
                    maxWidth: '100%',
                    minWidth: 0,
                    width: '100%',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Card>
  );
}


