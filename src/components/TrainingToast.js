import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';

export default function TrainingToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('trainingToastDismissed')) return;
    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('trainingToastDismissed', '1');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 8000,
            maxWidth: 340,
            width: 'calc(100vw - 48px)',
          }}
        >
          <Box
            sx={{
              bgcolor: '#1c3c6f',
              color: 'white',
              borderRadius: 3,
              p: 2.5,
              boxShadow: '0 24px 64px rgba(2,6,23,0.40)',
              border: '1px solid rgba(255,255,255,0.13)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15))',
              },
            }}
          >
            <IconButton
              onClick={dismiss}
              size="small"
              aria-label="Dismiss"
              sx={{ position: 'absolute', top: 10, right: 10, color: 'rgba(255,255,255,0.55)', '&:hover': { color: 'white' } }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.14)',
                  borderRadius: 999,
                  width: 30,
                  height: 30,
                  display: 'grid',
                  placeItems: 'center',
                  flex: '0 0 auto',
                }}
              >
                <SportsTennisIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography
                variant="overline"
                sx={{ fontSize: '0.65rem', letterSpacing: '0.16em', fontWeight: 900, color: 'rgba(255,255,255,0.65)', lineHeight: 1 }}
              >
                Now on
              </Typography>
            </Box>

            <Typography sx={{ fontWeight: 900, fontSize: '1.05rem', lineHeight: 1.25, mb: 0.6, pr: 3 }}>
              Friday Trainings are back!
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.65, mb: 2 }}>
              Coached sessions every Friday · 2:00–4:00 PM<br />
              UNSW FAC Level 1 · $25 per person
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <Box
                component={RouterLink}
                to="/trainings"
                onClick={dismiss}
                sx={{
                  display: 'inline-block',
                  bgcolor: 'white',
                  color: '#1c3c6f',
                  fontWeight: 900,
                  fontSize: '0.83rem',
                  px: 2.25,
                  py: 0.9,
                  borderRadius: 2,
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Learn more →
              </Box>
              <Typography
                component="span"
                onClick={dismiss}
                sx={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  '&:hover': { color: 'rgba(255,255,255,0.8)' },
                  transition: 'color 0.2s',
                }}
              >
                Dismiss
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
