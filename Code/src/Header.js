import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Header.css';

function Header() {
  // State to manage menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle menu open/close state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    // Header component
    <header className="header">
      {/* Left section of header */}
      <div className="header-left">
        {/* Hamburger menu icon */}
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {/* Right section of header */}
      <nav className={`header-right ${menuOpen ? 'open' : ''}`}>
        {/* Navigation links */}
        <ul>
          {/* Home link */}
          <li><Link to="/">Home</Link></li> 
          {/* AstroData link */}
          <li><Link to="/AstroData">AstroData</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;
