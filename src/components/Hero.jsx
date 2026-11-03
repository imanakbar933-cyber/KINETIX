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
          <div className="outline-text"><br />GET FIT</div>
          <div className="outline-text">WITH</div>
          <h1>
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

      {/* ================= CURTAIN ANIMATION (NEW APPROACH) ================= */}
      {showCurtain && (
        <div className="curtain-overlay">
          {/* Full image as background */}
          <img 
            src="/images/kinetix2.png" 
            alt="Kinetix" 
            className="curtain-full-image"
          />

          {/* Left black curtain */}
          <div className="curtain-black curtain-black-left"></div>

          {/* Right black curtain */}
          <div className="curtain-black curtain-black-right"></div>
        </div>
      )}
    </>
  );
}

export default Hero;