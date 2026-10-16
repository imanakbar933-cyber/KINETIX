import React, { useState } from 'react';
import './Navbar1.css';

function Navbar3() {
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <nav className="nav3">
      <h2 className="logo3">MYGYM</h2>

      <button className="menu-btn3" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <ul className={open ? "menu3 open" : "menu3"}>
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#services">Services</a></li>

        {/* PAGES DROPDOWN */}
        <li className="dropdown3">
          <button
            className="dropbtn3"
            onClick={() => setPagesOpen(!pagesOpen)}
          >
            Pages ▾
          </button>
          <ul className={pagesOpen ? "dropdown-content3 show" : "dropdown-content3"}>
            <li><a href="#team">Team</a></li>
            <li><a href="#classroom">Classroom</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#schedules">Schedules</a></li>
          </ul>
        </li>

        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#join" className="btn3">Join Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar3;