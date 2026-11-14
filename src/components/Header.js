import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Container,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useClubTheme } from './ClubThemeProvider';
import { motion } from 'framer-motion';
import lightLogo from './logo full/logo-full-blue.png';
import darkLogo from './logo full/logo-full-white.png';

function Header() {
  const { mode, toggleTheme } = useClubTheme();
  const logo = mode === 'dark' ? darkLogo : lightLogo;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const scrollY = React.useRef(0);
  const location = useLocation();

  useEffect(() => {
    let frame = 0;
    let current = { scrolled: false, direction: 'up' };
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const nextScrolled = currentY > 40;
      if (nextScrolled !== current.scrolled) {
        current.scrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      const delta = currentY - scrollY.current;
      if (Math.abs(delta) >= 8 || currentY <= 80) {
        const nextDirection = currentY > 80 && delta > 0 ? 'down' : 'up';
        if (nextDirection !== current.direction) {
          current.direction = nextDirection;
          setScrollDir(nextDirection);
        }
        scrollY.current = currentY;
      }
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Meet the Team', to: '/meet-the-team' },
    { label: 'Photo Gallery', to: '/photo-gallery' },
    { label: 'Sessions', to: '/sessions' },
    { label: 'Trainings', to: '/trainings' },
    // { label: 'News', to: '/news' }, // Restore with the Instagram feed.
    { label: 'FAQs', to: '/faqs' },
    { label: 'View Queue', to: '/view-queue' },
    { label: 'Contact', to: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{ width: { xs: 280, sm: 320 }, height: '100%', bgcolor: 'var(--club-surface)' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={logo} alt="UNSWBC Logo" style={{ height: 32 }} />
        <IconButton aria-label="Close navigation menu" onClick={toggleDrawer(false)} sx={{ color: 'var(--club-text)' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'var(--club-line)' }} />
      <List>
        {navLinks.map((item, index) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItemButton
                component={Link}
                to={item.to}
                sx={{
                  py: 1.25,
                  color: 'var(--club-text)',
                  '& .MuiListItemText-primary': { fontWeight: 800 },
                  bgcolor: isActive ? 'var(--club-feature-accent)' : 'transparent',
                  '&:hover': { bgcolor: 'var(--club-tint)' },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </motion.div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        transition: 'transform 220ms ease, background-color 220ms ease, border-color 220ms ease',
        transform: scrollDir === 'down' ? 'translateY(-100%)' : 'translateY(0)',
        backdropFilter: 'blur(6px)',
        backgroundColor: scrolled ? 'var(--club-nav-scrolled)' : 'var(--club-nav)',
        borderBottom: '1px solid var(--club-line)',
        color: 'var(--club-text)',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, lg: 2.5 } }}>
        <Toolbar
          sx={{
            px: { xs: 0 },
            display: { xs: 'flex', lg: 'grid' },
            gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            gap: { lg: 2 },
            minHeight: { xs: 60, md: scrolled ? 64 : 72 },
            transition: 'min-height 0.3s ease',
          }}
        >
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{ sx: { bgcolor: 'var(--club-surface)' } }}
          >
            {drawer}
          </Drawer>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, lg: 0 }, minWidth: 0 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', minWidth: 0, textDecoration: 'none' }}>
              <motion.img
                src={logo}
                alt="UNSWBC Logo"
                style={{ height: scrolled ? 32 : 38, objectFit: 'contain', objectPosition: 'left', transition: 'height 0.3s ease' }}
                whileHover={{ scale: 1.05 }}
              />
            </Link>
          </Box>

          <Box component="nav" aria-label="Main navigation" sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5, position: 'relative', justifySelf: 'center' }}>
            {navLinks.map((item) => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

              return (
                <Box key={item.to} sx={{ position: 'relative' }}>
                  <Button
                    component={Link}
                    to={item.to}
                    sx={{
                      color: 'var(--club-text)',
                      opacity: isActive ? 1 : 0.85,
                      fontWeight: isActive ? 800 : 600,
                      px: 1,
                      minWidth: 0,
                      whiteSpace: 'nowrap',
                      transition: 'opacity 220ms ease, background-color 220ms ease',
                      '&:hover': { opacity: 1, bgcolor: 'transparent' },
                    }}
                  >
                    {item.label}
                  </Button>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '15%',
                        right: '15%',
                        height: 2,
                        borderRadius: 999,
                        backgroundColor: 'var(--club-accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ display: { lg: 'none' }, mr: 0.5, width: 44, height: 44, flexShrink: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            sx={{ color: 'var(--club-text)', justifySelf: 'end', width: 44, height: 44, flexShrink: 0 }}
          >
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
