import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Instagram-style gallery feed.
 * NOTE: Instagram does not allow reliable unauthenticated fetching of post thumbnails/captions.
 * Provide posts with { id, image, caption, date, url }.
 */
export default function InstagramNewsFeed({
  posts,
  feedUrl,
  profileUrl = 'https://www.instagram.com/unswbadminton/',
  title = 'News',
}) {
  const safePosts = useMemo(() => (Array.isArray(posts) ? posts : []), [posts]);
  const [livePosts, setLivePosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!feedUrl) return undefined;

    setIsLoading(true);
    setLoadError(null);

    fetch(feedUrl)
      .then(async (res) => {
        const contentType = res.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        // Common failure mode: dev server returns index.html (text/html),
        // so JSON parsing throws: "Unexpected token <".
        if (!res.ok) {
          const bodyText = await res.text().catch(() => '');
          throw new Error(
            `Feed request failed (${res.status}). ${bodyText.startsWith('<') ? 'Endpoint returned HTML (is the feed endpoint configured?)' : ''}`.trim()
          );
        }

        if (!isJson) {
          const bodyText = await res.text().catch(() => '');
          if (bodyText.trim().startsWith('<')) {
            throw new Error(
              'Live feed endpoint returned HTML (likely your app index.html). Configure a real feed URL or run serverless functions.'
            );
          }
          throw new Error('Live feed endpoint did not return JSON.');
        }

        return await res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const next = Array.isArray(data) ? data : (data?.posts || data?.items || []);
        if (Array.isArray(next) && next.length) {
          setLivePosts(next);
        } else {
          throw new Error('Feed returned no posts');
        }
      })
      .catch((e) => {
        if (!isMounted) return;
        setLoadError(e?.message || 'Unable to load Instagram feed');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [feedUrl]);

  const displayPosts = livePosts || safePosts;

  const openPost = (post) => setActive(post);
  const closePost = () => setActive(null);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          {title}
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
      </Box>

      {loadError ? (
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          Couldn’t load the live feed ({loadError}). Showing recent highlights instead.
        </Typography>
      ) : null}

      <Grid container spacing={3}>
        {(isLoading && !livePosts ? Array.from({ length: 6 }) : displayPosts).map((post, idx) => (
          <Grid item xs={12} sm={6} md={4} key={(post && (post.id || post.url)) || `skeleton-${idx}`}>
            <Card sx={{ height: '100%', overflow: 'hidden' }}>
              <CardActionArea
                onClick={() => (post ? openPost(post) : null)}
                sx={{ position: 'relative' }}
              >
                {post ? (
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt={post.caption ? `Instagram post: ${post.caption}` : 'Instagram post'}
                    sx={{ height: 260, objectFit: 'cover' }}
                  />
                ) : (
                  <Skeleton variant="rectangular" height={260} />
                )}

                {/* Hover overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    transition: 'opacity 220ms ease',
                    background:
                      'linear-gradient(to top, rgba(2,6,23,0.85), rgba(2,6,23,0.10))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 2,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <InstagramIcon sx={{ color: 'white' }} />
                    <Typography sx={{ color: 'white', fontWeight: 900 }}>
                      View post
                    </Typography>
                  </Stack>
                  {post?.caption ? (
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.88)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                      }}
                    >
                      {post.caption}
                    </Typography>
                  ) : null}
                </Box>
              </CardActionArea>

              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Chip
                    size="small"
                    label="Instagram"
                    icon={<InstagramIcon />}
                    sx={{ bgcolor: 'rgba(28,60,111,0.10)', color: '#1c3c6f', fontWeight: 800 }}
                  />
                  {post?.date ? (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {post.date}
                    </Typography>
                  ) : null}
                </Stack>

                {post ? (
                  <>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.title || 'Club update'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.75,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.caption || 'Tap to view.'}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Skeleton width="70%" />
                    <Skeleton width="95%" />
                    <Skeleton width="85%" />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={Boolean(active)} onClose={closePost} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 900, pr: 6 }}>
          {active?.title || 'Instagram post'}
          <IconButton
            aria-label="Close"
            onClick={closePost}
            sx={{ position: 'absolute', right: 12, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {active?.image ? (
            <Box
              component="img"
              src={active.image}
              alt={active.caption ? `Instagram post: ${active.caption}` : 'Instagram post'}
              sx={{
                width: '100%',
                height: 320,
                objectFit: 'cover',
                borderRadius: 2,
                border: '1px solid rgba(15, 23, 42, 0.08)',
              }}
            />
          ) : null}

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
            <InstagramIcon sx={{ color: '#1c3c6f' }} />
            {active?.date ? (
              <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>
                {active.date}
              </Typography>
            ) : null}
          </Stack>

          {active?.caption ? (
            <Typography sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.85 }}>
              {active.caption}
            </Typography>
          ) : null}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
            <Button
              component="a"
              href={active?.url || profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<InstagramIcon />}
            >
              Open on Instagram
            </Button>
            <Button onClick={closePost} variant="outlined">
              Close
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}


