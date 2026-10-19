import React, { useEffect, useState } from 'react';
import "./TeamHeroSection.css";

const TeamHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="team-hero">
      <div className={`team-hero-image ${isLoaded ? 'zoom-in' : ''}`}>
        <img 
          src="/gym-asserts/TeamHero.jpg" 
          alt="Gym Team Workout" 
        />
      </div>
    </div>
  );
};

export default TeamHeroSection;