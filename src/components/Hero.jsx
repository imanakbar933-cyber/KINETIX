
import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";

function Hero() {
  const [showIntro, setShowIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);

  const hideTimer = useRef(null);
  const restartTimer = useRef(null);

  const playIntroAnimation = () => {
    clearTimeout(hideTimer.current);
    clearTimeout(restartTimer.current);

    setShowIntro(false);

    restartTimer.current = setTimeout(() => {
      setIntroKey((previous) => previous + 1);
      setShowIntro(true);

      hideTimer.current = setTimeout(() => {
        setShowIntro(false);
      }, 3400);
    }, 50);
  };

  useEffect(() => {
    hideTimer.current = setTimeout(() => {
      setShowIntro(false);
    }, 3400);

    window.addEventListener("triggerHomeAnimation", playIntroAnimation);

    return () => {
      clearTimeout(hideTimer.current);
      clearTimeout(restartTimer.current);
      window.removeEventListener("triggerHomeAnimation", playIntroAnimation);
    };
  }, []);

  const letters = "KINETIX".split("");

  return (
    <>
      {/* EXISTING HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <div className="outline-text">
            <br />GET FIT
          </div>

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

      {/* PREMIUM KINETIX INTRO */}
      {showIntro && (
        <div className="kinetix-intro" key={introKey}>
          <div className="intro-grid"></div>
          <div className="intro-glow intro-glow-one"></div>
          <div className="intro-glow intro-glow-two"></div>

          <div className="intro-content">

            {/* CUSTOM KINETIX LOGO */}
            <div className="intro-logo">
              <svg viewBox="0 0 120 120" className="intro-logo-svg">
                <path
                  d="M28 17 H48 V49 L78 17 H105 L66 59 L107 103 H79 L48 70 V103 H28 Z"
                  fill="currentColor"
                  className="logo-main-shape"
                />
                <path
                  d="M15 8 H105 V112 H15 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="logo-frame"
                />
                <path
                  d="M15 29 V8 H37"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="logo-corner"
                />
                <path
                  d="M83 112 H105 V90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="logo-corner"
                />
              </svg>
            </div>

            <div className="intro-brand-label">
              EST. FOR STRENGTH
            </div>

            {/* LETTER BY LETTER REVEAL */}
            <div className="intro-word">
              {letters.map((letter, index) => (
                <span
                  className="intro-letter"
                  key={`${letter}-${index}`}
                  style={{
                    animationDelay: `${0.35 + index * 0.18}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <div className="intro-line"></div>

            <p className="intro-tagline">
              FITNESS <span>•</span> STRENGTH <span>•</span> PERFORMANCE
            </p>

          </div>

          <div className="intro-bottom">
            <span>WELCOME TO</span>
            <span className="intro-bottom-brand">KINETIX FITNESS CLUB</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
