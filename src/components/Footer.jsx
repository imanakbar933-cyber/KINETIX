import "./Footer.css";

function Footer() {
  const quickLinks = [
    "Home",
    "About KINETIX",
    "Membership Plans",
    "Our Trainers",
    "Our Classes",
    "Contact Us",
  ];

  const services = [
    "Strength Training",
    "Cardio & Endurance",
    "Personal Training",
    "Workout Planning",
    "Diet & Nutrition",
    "Progress Tracking",
    "Attendance Management",
  ];

  return (
    <footer className="gym-footer">

      {/* ================= FOOTER CONTENT ================= */}
      <section className="footer-content">

        {/* BRAND */}
        <div className="footer-brand">

          <h2>
            KIN<span>ETIX</span>
          </h2>

          <p className="footer-slogan">
            TRAIN • SWEAT • TRANSFORM
          </p>

          <p className="footer-description">
            KINETIX Fitness Club is a place to build strength,
            improve fitness, and develop healthier habits
            through consistent training and proper guidance.
          </p>

          <div className="social-links">
            <a href="#">f</a>
            <a href="#">◎</a>
            <a href="#">𝕏</a>
            <a href="#">▶</a>
            <a href="#">in</a>
          </div>

        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <div className="footer-title-line"></div>

          {quickLinks.map((link, index) => (
            <a href="#" key={index}>
              <span>›</span>
              {link}
            </a>
          ))}
        </div>

        {/* SERVICES */}
        <div className="footer-column">
          <h3>Our Services</h3>
          <div className="footer-title-line"></div>

          {services.map((service, index) => (
            <a href="#" key={index}>
              <span>›</span>
              {service}
            </a>
          ))}
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <div className="footer-title-line"></div>

          <div className="contact-row">
            <span className="contact-icon">⌖</span>
            <div>
              <strong>Satellite Town, Gujranwala</strong>
              <small>Punjab, Pakistan</small>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon">☎</span>
            <div>
              <strong>+92 300 847 2619</strong>
              <small>Contact our fitness team</small>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon">✉</span>
            <div>
              <strong>hello@kinetixfitness.pk</strong>
              <small>Membership &amp; general enquiries</small>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon">◷</span>
            <div>
              <strong>6:00 AM — 10:00 PM</strong>
              <small>Monday — Saturday</small>
            </div>
          </div>

        </div>

      </section>

      {/* ================= BOTTOM ================= */}
      <div className="footer-bottom">

        <div className="footer-line-design">
          ──────╱╲────╱╲──────
        </div>

        <p>
          © 2026 <span>KINETIX</span> Fitness Club.
          All rights reserved.
        </p>

        <div className="footer-motto">
          STRONGER • HEALTHIER • HAPPIER
        </div>

      </div>

    </footer>
  );
}

export default Footer;