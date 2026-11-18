import { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current.querySelectorAll(".animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container">

        {/* ===== LEFT SIDE (IMAGES) ===== */}
        <div className="about-left animate">

          {/* Badi Image - Unsplash se */}
          <div className="about-img-main">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Gym Training"
            />
          </div>

          {/* Chhoti Image - Unsplash se */}
          <div className="about-img-small">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
              alt="Personal Training"
            />
          </div>

          {/* 1250+ Badge */}
          <div className="about-badge">
            <h3>1250+</h3>
            <p>TRAINED PEOPLE</p>
          </div>

        </div>

        {/* ===== RIGHT SIDE (TEXT) ===== */}
        <div className="about-right animate">

          <h2 className="about-heading">
            OUR <span>KINETIX</span> <br /> STORY
          </h2>

         
<p className="about-para">
  Founded in 2024 in Gujranwala, Pakistan, KINETIX was built with
  one simple vision: to create a fitness space where people feel
  motivated, supported, and confident in their fitness journey.
  What started as a passion for fitness has grown into a community
  of dedicated members, experienced trainers, and people working
  every day towards healthier lifestyles. From personalized
  workout plans to professional fitness guidance, KINETIX is
  committed to helping every member achieve real and lasting
  results.
</p>


          <a href="#join" className="about-btn">
            <span>JOIN US</span>
            <span className="btn-arrow">➜</span>
          </a>

        </div>

      </div>
    </section>
  );
}

export default About;