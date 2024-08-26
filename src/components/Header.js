import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo full/logo-full-white.png';

function Header() {
  return (
    <header style={{ padding: '20px', backgroundColor: '#0c2340', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/">
          <img src={logo} alt="UNSWBC Logo" style={{ height: '50px' }} />
        </Link>
        <nav>
          <Link to="/home" style={{ margin: '0 0 0 20px', color: 'white' }}>Home</Link> 
            <Link to="/about" style={{ margin: '0 10px', color: 'white' }}>About</Link>
            <Link to="/events" style={{ color: 'white' }}>Events</Link>
            <Link to="/faqs" style={{ margin: '0 10px', color: 'white' }}>FAQ</Link>
        </nav>
    </header>
  );
}

export default Header;

