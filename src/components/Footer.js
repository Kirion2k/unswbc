import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import logo from './logo full/logo-full-white.png';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#1c3c6f', color: 'white', textAlign: 'center', padding: '20px 0' }}>
      {/* Logo Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <img src={logo} alt="UNSWBC Logo" style={{ height: '50px', marginRight: '10px' }} />
      </Box>

      {/* Social Media Icons */}
      <Box sx={{ mb: 2 }}>
        <IconButton
          href="https://www.facebook.com/UNSWBC"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white', margin: '0 10px' }}
        >
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/unswbadmintonclub"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white', margin: '0 10px' }}
        >
          <Instagram fontSize="large" />
        </IconButton>
      </Box>

      {/* Footer Text */}
      <Typography variant="body2">
        © 2024 UNSW Badminton Club. All Rights Reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
