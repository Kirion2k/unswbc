import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, IconButton, Skeleton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InstagramIcon from '@mui/icons-material/Instagram';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PageHero from '../components/PageHero';
import MagneticButton from '../components/MagneticButton';
import logo from '../components/logo full/logo-full-white.png';

const FEED_URL =
  process.env.REACT_APP_INSTAGRAM_FEED_URL ||
  '/.netlify/functions/instagram-feed';
const PROFILE_URL = 'https://www.instagram.com/unswbadminton/';

/* ─── Grid item ─────────────────────────────────────────────────────────── */
function GridItem({ post, onClick }) {
  const isVideo    = post.mediaType === 'VIDEO';
  const isCarousel = post.mediaType === 'CAROUSEL_ALBUM' || post.slides?.length > 1;
  return (
    <motion.div
      whileHover={{ brightness: 0.8 }}
      style={{ position: 'relative', cursor: 'pointer', aspectRatio: '1', overflow: 'hidden', display: 'block' }}
      onClick={() => onClick(post)}
    >
      <img
        src={post.image}
        alt=""
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* Badge: video play icon or carousel stack icon */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        {isVideo && <PlayArrowIcon sx={{ color: 'white', fontSize: 20, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }} />}
        {isCarousel && !isVideo && (
          <Box sx={{ display: 'flex', gap: '2px' }}>
            {[0, 1].map((i) => (
              <Box key={i} sx={{ width: 7, height: 7, borderRadius: '2px', bgcolor: 'white', border: '1.5px solid rgba(0,0,0,0.25)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
            ))}
          </Box>
        )}
      </Box>
      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.38)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {isVideo
          ? <PlayArrowIcon sx={{ color: 'white', fontSize: 44 }} />
          : <InstagramIcon sx={{ color: 'white', fontSize: 28 }} />
        }
      </motion.div>
    </motion.div>
  );
}

/* ─── Skeleton grid ─────────────────────────────────────────────────────── */
function SkeletonGrid() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          sx={{ aspectRatio: '1', width: '100%', height: 'auto', transform: 'none' }}
        />
      ))}
    </Box>
  );
}

/* ─── Post modal ─────────────────────────────────────────────────────────── */
function PostModal({ post, onClose }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);

  // Build slides: carousel uses post.slides, otherwise single-item array
  const slides = post?.slides?.length > 1
    ? post.slides
    : [{ image: post?.image, mediaType: post?.mediaType, videoUrl: post?.videoUrl }];
  const total     = slides.length;
  const slide     = slides[slideIdx] || slides[0];
  const isVideo   = slide?.mediaType === 'VIDEO';

  // Reset slide index when post changes
  useEffect(() => { setSlideIdx(0); }, [post]);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVideo, slideIdx]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  setSlideIdx((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setSlideIdx((i) => Math.min(total - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, total]);

  if (!post) return null;

  const goPrev = (e) => { e.stopPropagation(); setSlideIdx((i) => Math.max(0, i - 1)); };
  const goNext = (e) => { e.stopPropagation(); setSlideIdx((i) => Math.min(total - 1, i + 1)); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9500,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: 'white',
          borderRadius: 12,
          overflow: 'hidden',
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'row',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media side */}
        <Box
          sx={{
            flex: '0 0 auto',
            width: { xs: '100%', md: '56%' },
            bgcolor: 'black',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: '90vh',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isVideo && slide.videoUrl ? (
                <video
                  ref={videoRef}
                  src={slide.videoUrl}
                  muted={muted}
                  loop
                  playsInline
                  style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
                />
              ) : (
                <img
                  src={slide.image}
                  alt=""
                  style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <IconButton
                onClick={goPrev}
                disabled={slideIdx === 0}
                size="small"
                sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.55)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }, '&.Mui-disabled': { opacity: 0.3 } }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={goNext}
                disabled={slideIdx === total - 1}
                size="small"
                sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.55)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }, '&.Mui-disabled': { opacity: 0.3 } }}
              >
                <ChevronRightIcon />
              </IconButton>
              {/* Dot indicators */}
              <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {slides.map((_, i) => (
                  <Box
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSlideIdx(i); }}
                    sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: i === slideIdx ? 'white' : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'background 0.2s' }}
                  />
                ))}
              </Box>
            </>
          )}

          {/* Mute toggle for video */}
          {isVideo && slide.videoUrl && (
            <IconButton
              onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
              sx={{ position: 'absolute', bottom: total > 1 ? 34 : 12, right: 12, bgcolor: 'rgba(0,0,0,0.55)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' } }}
              size="small"
            >
              {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
            </IconButton>
          )}
        </Box>

        {/* Info side */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: '#1c3c6f', display: 'grid', placeItems: 'center', flex: '0 0 auto' }}>
              <img src={logo} alt="UNSWBC" style={{ height: 18, objectFit: 'contain' }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: '0.9rem' }}>unswbadminton</Typography>
            {total > 1 && (
              <Typography sx={{ ml: 'auto', fontSize: '0.8rem', color: 'text.secondary' }}>
                {slideIdx + 1} / {total}
              </Typography>
            )}
          </Box>

          {/* Caption */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
            {post.caption ? (
              <Typography sx={{ color: '#262626', lineHeight: 1.8, fontSize: '0.88rem', whiteSpace: 'pre-line' }}>
                {post.caption}
              </Typography>
            ) : (
              <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>No caption.</Typography>
            )}
          </Box>

          {/* Footer */}
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 1.5 }}>{post.date}</Typography>
            <MagneticButton
              component="a"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              startIcon={<InstagramIcon sx={{ fontSize: '16px !important' }} />}
              sx={{ bgcolor: '#1c3c6f', color: 'white', fontWeight: 800, fontSize: '0.8rem', '&:hover': { bgcolor: '#123456' } }}
            >
              Open on Instagram
            </MagneticButton>
          </Box>
        </Box>
      </motion.div>

      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{ position: 'fixed', top: 16, right: 16, color: 'white', bgcolor: 'rgba(255,255,255,0.12)', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}
      >
        <CloseIcon />
      </IconButton>
    </motion.div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────────── */
function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('posts');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts(data?.posts || []);
          if (data?.profile) setProfile(data.profile);
        }
        setLoading(false);
      })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const imagePosts = posts.filter((p) => p.mediaType !== 'VIDEO');
  const reelPosts  = posts.filter((p) => p.mediaType === 'VIDEO');
  const displayed  = tab === 'posts' ? imagePosts : reelPosts;

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <PageHero
        imageSrc="/unsw-8.jpg"
        imageAlt="UNSW Badminton Club Instagram"
        title="Club"
        highlight="Updates"
        subtitle="The latest from @unswbadminton — results, announcements, and more."
        imagePosition="center center"
      />

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        {/* Profile header card */}
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.09)',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {/* Avatar + handle row */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, p: { xs: 2.5, md: 3.5 }, pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: { xs: 56, md: 72 },
                  height: { xs: 56, md: 72 },
                  borderRadius: '50%',
                  bgcolor: '#1c3c6f',
                  display: 'grid',
                  placeItems: 'center',
                  border: '3px solid rgba(28,60,111,0.2)',
                  flex: '0 0 auto',
                  overflow: 'hidden',
                }}
              >
                {profile?.profilePic ? (
                  <img src={profile.profilePic} alt="UNSWBC" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={logo} alt="UNSWBC" style={{ height: 32, objectFit: 'contain' }} />
                )}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '1rem', md: '1.15rem' }, color: '#0f172a' }}>
                  UNSW Badminton Club
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', mt: 0.25 }}>
                  @unswbadminton
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {!loading && (
                <>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '1.05rem', lineHeight: 1 }}>{imagePosts.length}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.25 }}>Posts</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '1.05rem', lineHeight: 1 }}>{reelPosts.length}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.25 }}>Reels</Typography>
                  </Box>
                </>
              )}
              <MagneticButton
                component="a"
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<InstagramIcon />}
                sx={{ bgcolor: '#1c3c6f', color: 'white', fontWeight: 900, whiteSpace: 'nowrap', '&:hover': { bgcolor: '#123456' } }}
              >
                Follow
              </MagneticButton>
            </Box>
          </Box>

          {/* Posts / Reels tabs */}
          <Box sx={{ display: 'flex', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            {[
              { key: 'posts', label: 'Posts' },
              { key: 'reels', label: 'Reels' },
            ].map(({ key, label }) => (
              <Box
                key={key}
                onClick={() => setTab(key)}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  py: 1.5,
                  cursor: 'pointer',
                  position: 'relative',
                  borderTop: tab === key ? '2px solid #1c3c6f' : '2px solid transparent',
                  mt: '-1px',
                  transition: 'border-color 0.2s',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: tab === key ? '#1c3c6f' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Grid */}
          <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            {loading ? (
              <SkeletonGrid />
            ) : error ? (
              <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  Couldn't load the feed. Visit us directly on Instagram.
                </Typography>
                <MagneticButton
                  component="a"
                  href={PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<InstagramIcon />}
                  sx={{ bgcolor: '#1c3c6f', color: 'white', fontWeight: 900, '&:hover': { bgcolor: '#123456' } }}
                >
                  Open Instagram
                </MagneticButton>
              </Box>
            ) : displayed.length === 0 ? (
              <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography sx={{ color: 'text.secondary' }}>No {tab} found.</Typography>
              </Box>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '3px',
                  }}
                >
                  {displayed.map((post) => (
                    <GridItem key={post.id} post={post} onClick={setSelected} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </Box>
        </Box>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Box>
  );
}

export default NewsPage;
