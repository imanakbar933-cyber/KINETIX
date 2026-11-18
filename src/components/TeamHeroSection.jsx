
import React, { useEffect, useState } from "react";
import "./TeamHeroSection.css";

const TeamHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="team-hero">

      {/* KINETIX Team Hero Image */}
      <div className={`team-hero-image ${isLoaded ? "zoom-in" : ""}`}>
        <img
          src="/gym-asserts/TeamHero.jpg"
          alt="KINETIX Fitness Club training team"
        />
      </div>

    </div>
  );
};

export default TeamHeroSection;
