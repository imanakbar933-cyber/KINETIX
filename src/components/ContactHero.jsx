import "./ContactHero.css";

function ContactHero() {
  return (
    <section className="contact-hero">

      {/* Background Image */}
      <div className="contact-hero-bg"></div>

      {/* Dark Overlay */}
      <div className="contact-hero-overlay"></div>

      {/* Green Glow Blobs */}
      <div className="contact-hero-glow glow-1"></div>
      <div className="contact-hero-glow glow-2"></div>

      {/* Light Sweep */}
      <div className="contact-hero-sweep"></div>

      {/* Content */}
      <div className="contact-hero-content">

        {/* Green Accent Line */}
        <span className="contact-hero-accent"></span>

        {/* Title with letter-by-letter animation */}
        <h1 className="contact-title">
          {"CONTACT US".split("").map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{ "--i": i }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

       

      </div>

    </section>
  );
}

export default ContactHero;