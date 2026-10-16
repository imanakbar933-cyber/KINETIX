import React, { useState } from 'react';
import './Navbar1.css';

function Navbar2() {
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <nav className="nav2">
      <h2 className="logo2">DARKVIBE</h2>

      <button className="menu-btn2" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <ul className={open ? "menu2 open" : "menu2"}>
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#services">Services</a></li>

        {/* PAGES DROPDOWN */}
        <li className="dropdown2">
          <button
            className="dropbtn2"
            onClick={() => setPagesOpen(!pagesOpen)}
          >
            Pages ▾
          </button>
          <ul className={pagesOpen ? "dropdown-content2 show" : "dropdown-content2"}>
            <li><a href="#team">Team</a></li>
            <li><a href="#classroom">Classroom</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#schedules">Schedules</a></li>
          </ul>
        </li>

        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#join" className="btn2">Join Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar2;