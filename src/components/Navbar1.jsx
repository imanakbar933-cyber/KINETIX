import React, { useState } from 'react';
import './Navbar1.css'

function Navbar1() {
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <nav className="nav1">
      <h2 className="logo1">GYM APP</h2>

      <button className="menu-btn1" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <ul className={open ? "menu1 open" : "menu1"}>
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#services">Services</a></li>

        {/* PAGES DROPDOWN */}
        <li className="dropdown1">
          <button
            className="dropbtn1"
            onClick={() => setPagesOpen(!pagesOpen)}
          >
            Pages ▾
          </button>
          <ul className={pagesOpen ? "dropdown-content1 show" : "dropdown-content1"}>
            <li><a href="#team">Team</a></li>
            <li><a href="#classroom">Classroom</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#schedules">Schedules</a></li>
          </ul>
        </li>

        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#join" className="btn1"> Join Us ➤</a></li>
      </ul>
    </nav>
  );
}

export default Navbar1;