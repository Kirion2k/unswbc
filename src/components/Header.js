import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Container,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { House, Info, UsersRound, Images, CalendarDays, Dumbbell, CircleHelp, ListOrdered, Mail } from 'lucide-react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useClubTheme } from './ClubThemeProvider';
import { motion } from 'framer-motion';
import { LiquidNavbar } from './ui/liquid-glass-navbar';
import lightLogo from './logo full/logo-full-blue.png';
import darkLogo from './logo full/logo-full-white.png';

function Header() {
  const { mode, toggleTheme } = useClubTheme();
  const logo = mode === 'dark' ? darkLogo : lightLogo;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDarkBackground, setOverDarkBackground] = useState(true);
  const headerLogo = mode === 'dark' || overDarkBackground ? darkLogo : lightLogo;
  const [scrollDir, setScrollDir] = useState('up');
  const scrollY = React.useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const desktop = useMediaQuery('(min-width: 1200px)', { noSsr: true });

  useEffect(() => {
    let frame = 0;
    let current = { scrolled: window.scrollY > 40, direction: 'up', overDark: true };
    setScrolled(current.scrolled);
    setScrollDir('up');
    setOverDarkBackground(true);
    scrollY.current = window.scrollY;
    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const nextScrolled = currentY > 40;
      const center = window.innerWidth >= 900 ? 36 : 30;
      const hero = document.querySelector('[data-page-hero]')?.getBoundingClientRect();
      const overDark = !!(hero && hero.top <= center && hero.bottom > center);
      if (overDark !== current.overDark) {
        current.overDark = overDark;
        setOverDarkBackground(overDark);
      }
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
    window.addEventListener('resize', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', to: '/', icon: <House size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'About', to: '/about', icon: <Info size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'Our Team', to: '/meet-the-team', icon: <UsersRound size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'Photo Gallery', to: '/photo-gallery', icon: <Images size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'Sessions', to: '/sessions', icon: <CalendarDays size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'Trainings', to: '/trainings', icon: <Dumbbell size={16} strokeWidth={1.7} aria-hidden="true" /> },
    // { label: 'News', to: '/news' }, // Restore with the Instagram feed.
    { label: 'FAQs', to: '/faqs', icon: <CircleHelp size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'View Queue', to: '/view-queue', icon: <ListOrdered size={16} strokeWidth={1.7} aria-hidden="true" /> },
    { label: 'Contact', to: '/contact', icon: <Mail size={16} strokeWidth={1.7} aria-hidden="true" /> },
  ];

  const drawer = (
    <Box
      sx={{ width: { xs: 280, sm: 320 }, height: '100%', bgcolor: 'transparent' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={logo} alt="UNSWBC Logo" style={{ height: 32 }} />
        <IconButton aria-label="Close navigation menu" onClick={toggleDrawer(false)} sx={{ color: 'var(--club-text)', '&, &:hover': { border: 'none', backgroundImage: 'none', boxShadow: 'none', bgcolor: 'transparent' } }}>
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
                <ListItemIcon sx={{ minWidth: 32, color: 'inherit', '& svg': { width: 18, height: 18 } }}>{item.icon}</ListItemIcon>
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
        transition: 'transform 220ms ease',
        transform: scrollDir === 'down' ? 'translateY(-100%)' : 'translateY(0)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        borderBottom: 'none',
        boxShadow: 'none',
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
            PaperProps={{ sx: { bgcolor: 'var(--club-nav-scrolled)', backgroundImage: 'var(--club-glass-sheen)', backdropFilter: 'blur(10px) saturate(135%)', WebkitBackdropFilter: 'blur(10px) saturate(135%)', borderRight: '1px solid var(--club-glass-edge)', boxShadow: 'var(--club-glass-shadow)' } }}
          >
            {drawer}
          </Drawer>

          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, lg: 0 }, minWidth: 0 }}>
            <Box
              component={Link}
              to="/"
              aria-label="UNSW Badminton Club home"
              sx={{
                display: 'flex', alignItems: 'center', minWidth: 0, textDecoration: 'none',

              }}
            >
              <motion.img
                src={headerLogo}
                alt="UNSWBC Logo"
                style={{ height: scrolled ? 32 : 38, objectFit: 'contain', objectPosition: 'left', filter: overDarkBackground ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' : 'none', transition: 'height 0.3s ease' }}
                whileHover={{ scale: 1.05 }}
              />
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', lg: 'flex' }, position: 'relative', justifySelf: 'center' }}>
            {desktop && (
              <LiquidNavbar
                className="club-liquid-nav"
                tone={mode}
                compact={false}
                sound={false}
                active={navLinks.findIndex(item => item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to))}
                items={navLinks.map(item => ({ label: item.label, href: item.to, icon: item.icon, fx: 'none' }))}
                onNavigate={navigate}
              />
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ display: { lg: 'none' }, mr: 0.5, width: 44, height: 44, flexShrink: 0, bgcolor: 'var(--club-nav-scrolled)', backgroundImage: 'var(--club-glass-sheen)', border: '1px solid var(--club-glass-edge)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', '&:hover': { bgcolor: 'var(--club-nav-scrolled)' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            sx={{ color: 'var(--club-text)', justifySelf: 'end', width: 44, height: 44, flexShrink: 0, bgcolor: 'var(--club-glass)', backgroundImage: 'var(--club-glass-sheen)', border: '1px solid var(--club-glass-edge)', boxShadow: 'inset 0 1px 0 var(--club-glass-edge)', '&:hover': { bgcolor: 'var(--club-tint)', backgroundImage: 'var(--club-glass-sheen)', boxShadow: 'inset 0 1px 0 var(--club-glass-edge)' } }}
          >
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
