import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const [showTransition, setShowTransition] = useState(true);

  // 1. Page load hote hi transition chalao
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Navbar se aane wale signal ko suno (jab Home click ho)
  useEffect(() => {
    const playAnimation = () => {
      setShowTransition(true);
      // Animation ko 2.5 second baad band karo
      setTimeout(() => {
        setShowTransition(false);
      }, 1500);
    };

    // Event listener add karo
    window.addEventListener("triggerHomeAnimation", playAnimation);

    // Cleanup: Component unmount hone par listener hatao
    return () => {
      window.removeEventListener("triggerHomeAnimation", playAnimation);
    };
  }, []);

  return (
    <>
      {/* 👇 3D WRAP IMAGE TRANSITION (Sabse upar) */}
      {showTransition && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 9999999, 
            backgroundColor: '#050706',
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            overflow: 'hidden', perspective: '1000px'
          }}
        >
          <img 
            src="/images/kinetix2.png" 
            alt="Kinetix Transition" 
            style={{
              width: '80vw', height: 'auto', objectFit: 'contain', display: 'block',
              animation: 'wrapReveal 2s cubic-bezier(0.22, 1, 0.36, 1) forwards'
            }} 
          />
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <div className="outline-text">
            <br />
            GET FIT
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
    </>
  );
}

export default Hero;