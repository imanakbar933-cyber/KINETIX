import React, { useState } from 'react';
import './Navbar.css';

function Navbar4() {
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <nav className="gym-nav">
      {/* LOGO */}
      <div className="gym-logo">
        <span className="gym-icon">🏋️</span>
        <div className="gym-logo-text">
          <h1>ROYAL GOLD</h1>
          <p>GYM</p>
        </div>
      </div>

      {/* HAMBURGER (Mobile) */}
      <button className="gym-menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* MENU */}
      <ul className={open ? "gym-menu open" : "gym-menu"}>
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>

        {/* PAGES DROPDOWN */}
        <li className="gym-dropdown">
          <button
            className="gym-dropbtn"
            onClick={() => setPagesOpen(!pagesOpen)}
          >
            Pages <span className="gym-arrow">⌄</span>
          </button>
          <ul className={pagesOpen ? "gym-dropdown-content show" : "gym-dropdown-content"}>
            <li><a href="#team">Team</a></li>
            <li><a href="#classroom">Classroom</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#schedules">Schedules</a></li>
          </ul>
        </li>

        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* JOIN US BUTTON */}
      <a href="#join" className="gym-join-btn">
        Join Us ➤
      </a>
    </nav>
  );
}

export default Navbar4;