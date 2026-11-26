
import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";
import KinetixIntro from "./KinetixIntro";

function Hero() {
  const [showIntro, setShowIntro] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  const hideTimer = useRef(null);

  const playIntroAnimation = () => {
    clearTimeout(hideTimer.current);

    setIntroKey((previous) => previous + 1);
    setShowIntro(true);

    hideTimer.current = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
  };

  useEffect(() => {
    window.addEventListener(
      "triggerHomeAnimation",
      playIntroAnimation
    );

    return () => {
      clearTimeout(hideTimer.current);

      window.removeEventListener(
        "triggerHomeAnimation",
        playIntroAnimation
      );
    };
  }, []);

  return (
    <>
      <section className={`hero ${showIntro ? "hero-intro-hidden" : ""}`}>
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

      {showIntro && <KinetixIntro key={introKey} />}
    </>
  );
}

export default Hero;
