import { useEffect, useRef, useState } from "react";
import "./ContactMap.css";

function ContactMap() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // 👇 Scroll pe fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`contact-map ${visible ? "is-visible" : ""}`}
    >
      <div className="contact-map-container">

        {/* =========================================
            HEADING
        ========================================= */}
        <div className="contact-map-header">
          <h2 className="contact-map-title">
            LET'S START SOMETHING GREAT!
          </h2>

          <p className="contact-map-desc">
            Undo image pen asset distribute auto library. Move list
            underline frame opacity plugin outline project.
            <br />
            Style variant slice shadow export blur plugin pixel.
          </p>
        </div>

        {/* =========================================
            MAP WRAPPER (with neon border)
        ========================================= */}
        <div className="contact-map-wrapper">
          <div className="contact-map-neon"></div>

          <iframe
            className="contact-map-frame"
            title="Kinetix Gym Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.317591906877!2d90.41884431498202!3d23.80602698456274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c700d3f05b59%3A0xb2c5e19d6a77d1a0!2sZeroGround!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default ContactMap;