import "./AboutHero.css";

function AboutHero() {
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

        <h1 className="about-title">
          <span className="word">ABOUT</span>
        </h1>

      </div>

    </section>
  );
}

export default AboutHero;