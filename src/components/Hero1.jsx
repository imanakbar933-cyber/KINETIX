import React from 'react';
import './Hero1.css';

const Hero1 = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>BUILD YOUR <span>BODY</span></h1>
        <h2>TRANSFORM YOUR LIFE</h2>
        <p>
          Join Iron Fit today and get access to world-class equipment, 
          expert trainers, and a community that pushes you to be your best.
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