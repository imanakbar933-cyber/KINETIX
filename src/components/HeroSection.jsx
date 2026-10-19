// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
        alt="People working out" 
        className="hero-bg-image"
      />
      
      {/* Dark Overlay to make text readable */}
      <div className="hero-overlay"></div>
      
      {/* Text Content */}
      <div className="hero-content">
        <h1>SERVICES</h1>
        <p>HOME / SERVICES</p>
      </div>
    </section>
  );
};

export default HeroSection;