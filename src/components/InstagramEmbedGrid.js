import React from 'react';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

function normalizePermalink(url) {
  if (!url) return null
  const trimmed = String(url).trim()
  if (!trimmed) return null

  // Strip query params like ?img_index=1 so we can build a stable embed URL
  const noQuery = trimmed.split('?')[0]
  return noQuery.endsWith('/') ? noQuery : `${noQuery}/`
}

function toCaptionedEmbedUrl(permalink) {
  const clean = normalizePermalink(permalink)
  if (!clean) return null

  // Instagram supports a captioned embed view for a single post
  // This shows the image plus the caption inside the embed without needing Meta auth
  return `${clean}embed/captioned/`
}

/**
 * Renders a responsive grid of Instagram captioned embeds.
 * Requires permalinks to *posts/reels*, e.g. https://www.instagram.com/p/SHORTCODE/
 * Instagram does NOT provide a public "latest posts by username" feed without Meta.
 */
export default function InstagramEmbedGrid({
  permalinks,
  profileUrl = 'https://www.instagram.com/unswbadminton/',
}) {
  const links = Array.isArray(permalinks) ? permalinks.map(normalizePermalink).filter(Boolean) : [];

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
            Paste 3 to 9 Instagram post permalinks (for example <b>https://www.instagram.com/p/SHORTCODE/</b>) into the
            `instagramPostPermalinks` array in `src/pages/HomePage.js` and they will render here.
          </Typography>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {links.map((url) => (
              <Grid item xs={12} md={4} key={url}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
                    bgcolor: 'background.paper',
                  }}
                >
                  <iframe
                    title={`Instagram post ${url}`}
                    src={toCaptionedEmbedUrl(url)}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 760,
                      border: 0,
                      display: 'block',
                      background: 'white',
                    }}
                    allow="encrypted-media; fullscreen"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Card>
  );
}


