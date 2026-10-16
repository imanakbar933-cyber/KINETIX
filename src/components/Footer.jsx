import "./Footer.css";

function Footer() {

  const quickLinks = [
    "Home",
    "About Us",
    "Membership",
    "Trainers",
    "Contact Us"
  ];

  const services = [
    "Personal Training",
    "Group Classes",
    "Workout Plans",
    "Diet & Nutrition",
    "Progress Tracking",
    "Smart Attendance"
  ];

  return (
    <footer className="gym-footer">

      {/* ================= NEWSLETTER ================= */}

      <section className="footer-newsletter">

        <div className="newsletter-content">

          <p className="newsletter-tag">
            STAY STRONG • STAY UPDATED
          </p>

          <h2>
            Your Fitness Journey
            <br />
            Starts <span>Here.</span>
          </h2>

          <p>
            Get fitness tips, membership updates,
            special offers and gym news directly
            in your inbox.
          </p>

          <div className="newsletter-box">

            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button>
              SUBSCRIBE →
            </button>

          </div>

        </div>

        <div className="footer-quote">
          TRAIN
          <br />
          SWEAT
          <br />
          <span>TRANSFORM</span>
        </div>

      </section>


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
            KINETIX is more than a gym.
            It is a place where consistency,
            strength and dedication become
            a lifestyle.
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
              <strong>Gujranwala, Pakistan</strong>
              <small>KINETIX Main Branch</small>
            </div>
          </div>


          <div className="contact-row">
            <span className="contact-icon">☎</span>

            <div>
              <strong>+92 300 123 4567</strong>
              <small>Call us anytime</small>
            </div>
          </div>


          <div className="contact-row">
            <span className="contact-icon">✉</span>

            <div>
              <strong>info@kinetix.com</strong>
              <small>Send us an email</small>
            </div>
          </div>


          <div className="contact-row">
            <span className="contact-icon">◷</span>

            <div>
              <strong>6:00 AM — 11:00 PM</strong>
              <small>Monday — Sunday</small>
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
          © 2026 <span>KINETIX</span> Fitness Center.
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