import "./OurTeamHero.css";

function OurTeamHero() {
  return (
    <section className="our-team-hero">

      {/* Background Image */}
      <div
        className="our-team-hero-bg"
        style={{ backgroundImage: "url('/images/trainers1-hero.jpg')" }}
      />

      {/* Overlay */}
      <div className="our-team-hero-overlay"></div>

      {/* Green Glow Blobs */}
      <div className="our-team-hero-glow glow-1"></div>
      <div className="our-team-hero-glow glow-2"></div>

      {/* Light Sweep */}
      <div className="our-team-hero-sweep"></div>

      {/* Content */}
      <div className="our-team-hero-content">
        <span className="our-team-hero-accent"></span>
        <h1 className="our-team-hero-title">
          <span className="word">OUR TEAM</span>
        </h1>
      </div>

    </section>
  );
}

export default OurTeamHero;