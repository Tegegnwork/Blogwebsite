import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <a href="/">21</a>
        </div>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
            <li className="nav-item"><a href="/services">Services</a></li>
            <li className="nav-item"><a href="/blog">Blog</a></li>
            <li className="nav-item"><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;