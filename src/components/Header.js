import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './logo full/logo-full-white.png';

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'About', 'Meet the Team', 'Photo Gallery', 'Sessions', 'FAQs', 'View Queue', 'Contact'].map((text) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(/\s/g, '-')}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4, // Adds spacing between the logo and navigation buttons
        }}
      >
        {/* Hamburger Menu for Small Screens */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{ display: { sm: 'none' }, position: 'absolute', left: 16 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>

        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link to="/">
            <img src={logo} alt="UNSWBC Logo" style={{ height: '50px', marginRight: 8 }} />
          </Link>
        </Box>

        {/* Navbar Links */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            gap: 2,
          }}
        >
          <Button component={Link} to="/" sx={{ color: 'white' }}>
            Home
          </Button>
          <Button component={Link} to="/about" sx={{ color: 'white' }}>
            About
          </Button>
          {/* <Button component={Link} to="/meet-the-team" sx={{ color: 'white' }}>
            Meet the Team
          </Button> */}
          <Button component={Link} to="/photo-gallery" sx={{ color: 'white' }}>
            Photo Gallery
          </Button>
          <Button component={Link} to="/sessions" sx={{ color: 'white' }}>
            Sessions
          </Button>
          <Button component={Link} to="/faqs" sx={{ color: 'white' }}>
            FAQs
          </Button>
          <Button component={Link} to="/view-queue" sx={{ color: 'white' }}>
            View Queue
          </Button>
          <Button component={Link} to="/contact" sx={{ color: 'white' }}>
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
