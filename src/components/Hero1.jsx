
import React from "react";
import "./Hero1.css";

function Hero1() {
  return (
    <section className="hero">
      <div className="hero-left">

        {/* GET FIT */}
        <div
          className="outline-text"
          style={{
            WebkitTextStroke: "3px var(--accent)",
            color: "transparent",
            textShadow:
              "0 0 10px var(--accent-glow), 0 0 25px var(--accent-soft)"
          }}
        >
          <br />GET FIT
        </div>

        {/* WITH */}
        <div
          className="outline-text"
          style={{
            WebkitTextStroke: "3px var(--accent)",
            color: "transparent",
            textShadow:
              "0 0 10px var(--accent-glow), 0 0 25px var(--accent-soft)"
          }}
        >
          WITH
        </div>

        {/* KINETIX FITNESS CLUB */}
        <h1
          style={{
            color: "var(--accent)",
            textShadow:
              "0 0 10px var(--accent-glow), 0 0 25px var(--accent-glow), 0 0 45px var(--accent-soft)"
          }}
        >
          KINETIX
          <br />
          FITNESS
          <br />
          CLUB
        </h1>
      </div>

      {/* GYM VIDEO */}
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
  );
}

export default Hero1;
