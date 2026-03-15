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
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo full/logo-full-white.png';

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const scrollY = React.useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      if (currentY > scrollY.current && currentY > 80) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }
      scrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    { label: 'FAQs', to: '/faqs' },
    { label: 'View Queue', to: '/view-queue' },
    { label: 'Contact', to: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{ width: { xs: 280, sm: 320 }, height: '100%', bgcolor: '#0a1628' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={logo} alt="UNSWBC Logo" style={{ height: 36 }} />
        <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
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
                  color: 'white',
                  '& .MuiListItemText-primary': { fontWeight: 800 },
                  bgcolor: isActive ? 'rgba(28,60,111,0.4)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(28,60,111,0.3)' },
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
        transition: 'all 0.35s ease',
        transform: scrollDir === 'down' ? 'translateY(-100%)' : 'translateY(0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
        backgroundColor: scrolled ? 'rgba(2, 6, 23, 0.92)' : 'rgba(2, 6, 23, 0.78)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container>
        <Toolbar
          sx={{
            px: { xs: 0 },
            minHeight: { xs: 60, md: scrolled ? 64 : 72 },
            transition: 'min-height 0.3s ease',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{ sx: { bgcolor: '#0a1628' } }}
          >
            {drawer}
          </Drawer>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <motion.img
                src={logo}
                alt="UNSWBC Logo"
                style={{ height: scrolled ? 38 : 44, transition: 'height 0.3s ease' }}
                whileHover={{ scale: 1.05 }}
              />
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, position: 'relative' }}>
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
                      color: 'white',
                      opacity: isActive ? 1 : 0.85,
                      fontWeight: isActive ? 800 : 600,
                      px: 1.5,
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
                        backgroundColor: 'white',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
