import React, { useEffect, useState } from 'react';

const TeamHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation trigger karne ke liye useEffect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900">
      
      {/* 1. BACKGROUND IMAGE WITH ZOOM ANIMATION */}
      <div 
        className={`absolute inset-0 w-full h-full transition-transform duration-[10000ms] ease-out ${
          isLoaded ? 'scale-110' : 'scale-100'
        }`}
      >
        <img 
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Team Workout" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Overlay taake text clear nazar aaye */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        
        {/* Main Heading - Slide Up Animation */}
        <h1 
          className={`text-white text-5xl md:text-7xl font-extrabold uppercase tracking-wide mb-4 transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Our Team
        </h1>

        {/* Breadcrumb - Fade In Animation */}
        <div 
          className={`flex items-center text-gray-300 text-lg md:text-xl font-medium tracking-widest transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <a href="/" className="hover:text-white transition-colors duration-300">HOME</a>
          <span className="mx-3 text-gray-500">/</span>
          <span className="text-white">OUR TEAM</span>
        </div>

      </div>

      {/* Optional: Agar neeche scroll indicator chahiye */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
         <div className="w-1 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
         </div>
      </div>

    </div>
  );
};

export default TeamHeroSection;