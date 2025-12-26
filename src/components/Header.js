import React, { useState } from 'react';
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
import logo from './logo full/logo-full-white.png';

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Meet the Team', to: '/meet-the-team' },
    { label: 'Photo Gallery', to: '/photo-gallery' },
    { label: 'Sessions', to: '/sessions' },
    { label: 'FAQs', to: '/faqs' },
    { label: 'View Queue', to: '/view-queue' },
    { label: 'Contact', to: '/contact' },
  ];

  const drawer = (
    <Box
      sx={{ width: { xs: 280, sm: 320 } }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <img src={logo} alt="UNSWBC Logo" style={{ height: 36 }} />
      </Box>
      <Divider />
      <List>
        {navLinks.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              sx={{
                py: 1.25,
                '& .MuiListItemText-primary': { fontWeight: 800 },
                bgcolor: isActive ? 'rgba(28,60,111,0.14)' : 'transparent',
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" elevation={0}>
      <Container>
        <Toolbar sx={{ px: { xs: 0 }, minHeight: { xs: 60, md: 72 } }}>
          {/* Hamburger Menu for Small Screens */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            {drawer}
          </Drawer>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={logo} alt="UNSWBC Logo" style={{ height: 44 }} />
            </Link>
          </Box>

          {/* Navbar Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navLinks.map((item) => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

              return (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={{
                    color: 'white',
                    opacity: isActive ? 1 : 0.9,
                    bgcolor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
