import React from 'react';
import './Navbar5.css';   // <-- Yahan Navbar5.css import kiya hai

function Navbar5() {
  return (
    <div className="app-container">
      
      {/* ============ HERO SECTION ============ */}
      <section className="hero-section">
        
        {/* 1. Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
        >
          <source src="/assets/gym-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 2. Dark Overlay */}
        <div className="hero-overlay"></div>

        {/* 3. Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">
            Pulse<span>Flex</span>
          </div>

          <ul className="navbar-links">
            <li>Home</li>
            <li>About</li>
            <li>Programs</li>
            <li>Membership</li>
            <li>Gallery</li>
          </ul>

          <button className="navbar-contact-btn">
            Contact
          </button>
        </nav>

        {/* 4. Hero Text Content */}
        <div className="hero-content">
          <p className="hero-tagline">Join UNIVERSAL and start your transformation</p>
          <h1>Push your limits at UNIVERSAL</h1>
          <p>Fitness with pro-level coaching and a supportive fitness community.</p>
          <button className="hero-btn">Join Now</button>
        </div>

      </section>

    </div>
  );
}

export default Navbar5;