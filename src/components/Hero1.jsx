
import React from 'react';
import './Hero1.css';

const Hero1 = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>BUILD YOUR <span>STRENGTH</span></h1>
        <h2>TRANSFORM YOUR LIFE</h2>
        <p>
          Start your fitness journey with KINETIX Fitness Club.
          Train with purpose, stay consistent, and work towards
          a stronger, healthier version of yourself with the
          right environment and fitness guidance.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">GET STARTED</button>
          <button className="btn-secondary">VIEW CLASSES</button>
        </div>
      </div>
    </section>
  );
};

export default Hero1;
