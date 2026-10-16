import { useEffect, useRef, useState } from "react";
import "./ContactHighlights.css";

function ContactHighlights() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 👇 3 cards — clean, no emoji, SVG icons
  const features = [
    {
      number: "01",
      title: "Train With Purpose",
      text: "Every session is designed to move you closer to your goal. No wasted reps, no random routines — just focused progress.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v16M18 4v16M6 8h12M6 16h12M3 8v8M21 8v8" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Backed By Experts",
      text: "Certified trainers, personalized plans, and constant guidance — you'll never train alone or guess what to do next.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Built For Results",
      text: "Track progress, hit milestones, and see real change. We focus on outcomes — not just workouts.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`contact-cta ${visible ? "is-visible" : ""}`}
    >
      <div className="contact-cta-container">

        {/* HEADER */}
        <div className="contact-cta-header">
          <span className="contact-cta-badge">WHY CHOOSE US</span>

          <h2 className="contact-cta-title">
            MORE THAN A <span className="green">GYM.</span>
          </h2>

          <p className="contact-cta-desc">
            We build people — not just bodies. Here's what makes us different.
          </p>
        </div>

        {/* NEON BOX */}
        <div className="contact-cta-box">
          <div className="contact-cta-neon"></div>

          <div className="contact-cta-inner">
            {features.map((item, i) => (
              <div
                key={i}
                className="cta-card"
                style={{ "--delay": `${0.6 + i * 0.18}s` }}
              >
                <span className="cta-card-number">{item.number}</span>

                <div className="cta-card-icon">{item.icon}</div>

                <h3 className="cta-card-title">{item.title}</h3>
                <p className="cta-card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="contact-cta-bottom">
          <a href="#membership" className="cta-button">
            Start Your Journey
            <span className="cta-arrow">↗</span>
          </a>
          <p className="cta-note">No pressure. Just progress.</p>
        </div>

      </div>
    </section>
  );
}

export default ContactHighlights;