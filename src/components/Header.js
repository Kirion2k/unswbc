import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo full/logo-full-white.png';

function Header() {
  return (
    <header style={{
        position: 'fixed',  
        top: 0,
        width: '100%', 
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        zIndex: 1000  
      }}>
        <Link to="/">
          <img src={logo} alt="UNSWBC Logo" style={{ height: '50px' }} />
        </Link>
        <nav>
          <Link to="/home" style={{ margin: '0 20px', color: 'white' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 20px', color: 'white' }}>About</Link>
          <Link to="/events" style={{ margin: '0 20px', color: 'white' }}>Events</Link>
          <Link to="/faqs" style={{ margin: '0 20px', color: 'white' }}>FAQ</Link>
        </nav>
    </header>
  );
}

export default Header;
