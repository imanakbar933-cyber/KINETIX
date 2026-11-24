import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const [showCurtain, setShowCurtain] = useState(true);

  const playCurtainAnimation = () => {
    setShowCurtain(false);
    setTimeout(() => setShowCurtain(true), 50);
    setTimeout(() => setShowCurtain(false), 2200);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowCurtain(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.addEventListener("triggerHomeAnimation", playCurtainAnimation);
    return () => {
      window.removeEventListener("triggerHomeAnimation", playCurtainAnimation);
    };
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-left">
          
          {/* GET FIT - Inline style for exact Accent color */}
          <div 
            className="outline-text" 
            style={{ 
              WebkitTextStroke: "3px var(--accent)", 
              color: "transparent",
              textShadow: "0 0 10px var(--accent-glow), 0 0 25px var(--accent-soft)"
            }}
          >
            <br />GET FIT
          </div>

          {/* WITH - Inline style for exact Accent color */}
          <div 
            className="outline-text"
            style={{ 
              WebkitTextStroke: "3px var(--accent)", 
              color: "transparent",
              textShadow: "0 0 10px var(--accent-glow), 0 0 25px var(--accent-soft)"
            }}
          >
            WITH
          </div>

          {/* KINETIX FITNESS CLUB - Inline style for exact Accent color & Glow */}
          <h1 
            style={{ 
              color: "var(--accent)",
              textShadow: "0 0 10px var(--accent-glow), 0 0 25px var(--accent-glow), 0 0 45px var(--accent-soft)"
            }}
          >
            KINETIX
            <br />
            FITNESS
            <br />
            CLUB
          </h1>
        </div>

        <div className="hero-right">
          <video
            src="/images/gym-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      {/* ================= CURTAIN ANIMATION ================= */}
      {showCurtain && (
        <div className="curtain-overlay">
          <img 
            src="/images/kinetix2.png" 
            alt="Kinetix" 
            className="curtain-full-image"
          />
          <div className="curtain-black curtain-black-left"></div>
          <div className="curtain-black curtain-black-right"></div>
        </div>
      )}
    </>
  );
}

export default Hero;