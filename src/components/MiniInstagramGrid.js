import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InstagramIcon from '@mui/icons-material/Instagram';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MagneticButton from './MagneticButton';
import logo from './logo full/logo-full-white.png';

const FEED_URL =
  process.env.REACT_APP_INSTAGRAM_FEED_URL ||
  '/.netlify/functions/instagram-feed';

/* ─── Grid cell ─────────────────────────────────────────────────────────── */
function GridCell({ post, onClick }) {
  const isVideo    = post.mediaType === 'VIDEO';
  const isCarousel = post.mediaType === 'CAROUSEL_ALBUM' || post.slides?.length > 1;
  return (
    <motion.div
      style={{ position: 'relative', cursor: 'pointer', aspectRatio: '1', overflow: 'hidden' }}
      onClick={() => onClick(post)}
    >
      <img
        src={post.image}
        alt=""
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <Box sx={{ position: 'absolute', top: 6, right: 6 }}>
        {isVideo && <PlayArrowIcon sx={{ color: 'white', fontSize: 16, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }} />}
        {isCarousel && !isVideo && (
          <Box sx={{ display: 'flex', gap: '2px' }}>
            {[0, 1].map((i) => (
              <Box key={i} sx={{ width: 6, height: 6, borderRadius: '2px', bgcolor: 'white', border: '1.5px solid rgba(0,0,0,0.25)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
            ))}
          </Box>
        )}
      </Box>
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
        }}
      >
        {isVideo
          ? <PlayArrowIcon sx={{ color: 'white', fontSize: 36 }} />
          : <InstagramIcon sx={{ color: 'white', fontSize: 24 }} />}
      </motion.div>
    </motion.div>
  );
}

/* ─── Skeleton row ───────────────────────────────────────────────────────── */
function SkeletonCells({ count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          sx={{ aspectRatio: '1', width: '100%', height: 'auto', transform: 'none' }}
        />
      ))}
    </>
  );
}

/* ─── Post modal ─────────────────────────────────────────────────────────── */
function PostModal({ post, onClose }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);

  const slides = post?.slides?.length > 1
    ? post.slides
    : [{ image: post?.image, mediaType: post?.mediaType, videoUrl: post?.videoUrl }];
  const total   = slides.length;
  const slide   = slides[slideIdx] || slides[0];
  const isVideo = slide?.mediaType === 'VIDEO';

  useEffect(() => { setSlideIdx(0); }, [post]);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVideo, slideIdx]);

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
        position: 'fixed', inset: 0, zIndex: 9500,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
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
          background: 'white', borderRadius: 12, overflow: 'hidden',
          maxWidth: 900, width: '100%', maxHeight: '90vh',
          display: 'flex', flexDirection: 'row',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '56%' }, bgcolor: 'black', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '90vh' }}>
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
                <img src={slide.image} alt="" style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain', display: 'block' }} />
              )}
            </motion.div>
          </AnimatePresence>

          {total > 1 && (
            <>
              <IconButton onClick={goPrev} disabled={slideIdx === 0} size="small"
                sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.55)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }, '&.Mui-disabled': { opacity: 0.3 } }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={goNext} disabled={slideIdx === total - 1} size="small"
                sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.55)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }, '&.Mui-disabled': { opacity: 0.3 } }}>
                <ChevronRightIcon />
              </IconButton>
              <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {slides.map((_, i) => (
                  <Box key={i} onClick={(e) => { e.stopPropagation(); setSlideIdx(i); }}
                    sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: i === slideIdx ? 'white' : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'background 0.2s' }} />
                ))}
              </Box>
            </>
          )}

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

        {/* Info */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
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
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
            {post.caption ? (
              <Typography sx={{ color: '#262626', lineHeight: 1.8, fontSize: '0.88rem', whiteSpace: 'pre-line' }}>
                {post.caption}
              </Typography>
            ) : (
              <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>No caption.</Typography>
            )}
          </Box>
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

      <IconButton
        onClick={onClose}
        sx={{ position: 'fixed', top: 16, right: 16, color: 'white', bgcolor: 'rgba(255,255,255,0.12)', '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}
      >
        <CloseIcon />
      </IconButton>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
/**
 * MiniInstagramGrid
 *
 * Props:
 *   maxItems  {number}   — how many posts to display (default 9)
 *   columns   {number}   — grid columns (default 3)
 *   gap       {string}   — CSS gap value (default '3px')
 *   showViewAll {bool}   — show "View all on Club Updates →" link (default true)
 */
export default function MiniInstagramGrid({ maxItems = 9, columns = 3, gap = '3px', showViewAll = true }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.posts || []);
        setPosts(raw);
        setLoading(false);
      })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const displayed = posts.slice(0, maxItems);

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <SkeletonCells count={maxItems} />
        ) : error ? (
          <Box sx={{ gridColumn: '1 / -1', p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              Couldn't load posts.{' '}
              <a href="https://www.instagram.com/unswbadminton/" target="_blank" rel="noopener noreferrer" style={{ color: '#1c3c6f' }}>
                Visit us on Instagram
              </a>
            </Typography>
          </Box>
        ) : displayed.length === 0 ? null : (
          displayed.map((post) => (
            <GridCell key={post.id} post={post} onClick={setSelected} />
          ))
        )}
      </Box>

      {showViewAll && !loading && !error && posts.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <MagneticButton
            component={RouterLink}
            to="/news"
            variant="outlined"
            size="small"
            startIcon={<InstagramIcon />}
            sx={{ fontWeight: 800, borderColor: '#1c3c6f', color: '#1c3c6f', '&:hover': { borderColor: '#123456', bgcolor: 'rgba(28,60,111,0.06)' } }}
          >
            View all on Club Updates →
          </MagneticButton>
        </Box>
      )}

      <AnimatePresence>
        {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
