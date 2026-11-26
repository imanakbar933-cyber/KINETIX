import { useEffect, useState } from "react";
import "./AboutHero.css";

function AboutHero() {
  // Current theme track karo (dark / light / custom)
  const [currentTheme, setCurrentTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );

  // Navbar jab data-theme change kare, usko observe karo
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCurrentTheme(
        document.documentElement.getAttribute("data-theme") || "dark"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Title color decide karo
  const titleColor =
    currentTheme === "custom"
      ? "var(--accent, #03ea04)"
      : "#ffffff";

  return (
    <section className="about-hero">

      {/* ===== BACKGROUND VIDEO ===== */}
      <video
        className="about-hero-video"
        src="/images/About.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* ===== DARK OVERLAY ===== */}
      <div className="about-hero-overlay"></div>

      {/* ===== GREEN GLOW BLOBS ===== */}
      <div className="about-hero-glow glow-1"></div>
      <div className="about-hero-glow glow-2"></div>

      {/* ===== LIGHT SWEEP ===== */}
      <div className="about-hero-sweep"></div>

      {/* ===== HERO CONTENT ===== */}
      <div className="about-hero-content">

        {/* Accent Line */}
        <span className="about-hero-accent"></span>

        {/* Title — har letter alag span, inline color */}
        <h1
          className="about-title"
          style={{ color: titleColor }}
        >
          {"ABOUT".split("").map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{
                "--i": i,
                color: titleColor,
                WebkitTextFillColor: titleColor,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

      </div>

    </section>
  );
}

export default AboutHero;