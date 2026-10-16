import { useEffect, useRef } from "react";
import "./OurStory.css";

function OurStory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");   // ✅ reset on scroll away
          }
        });
      },
      { threshold: 0.0 }
    );

    const elements = sectionRef.current.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="our-story" ref={sectionRef}>

      {/* ===== BACKGROUND WATERMARK ===== */}
      <div className="our-story-watermark">
        OUR MISSION
      </div>

      {/* ===== CONTENT ===== */}
      <div className="our-story-container">

        {/* ===== LEFT SIDE ===== */}
        <div className="our-story-left">

          <span className="our-story-tag reveal">
            OUR STORY
          </span>

          <h2 className="our-story-heading reveal">
            THE KINETIX <br />
            JOURNEY
          </h2>

        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div className="our-story-right reveal">
          <p className="our-story-para">
            At KINETIX, we believe that fitness is not just a goal, but a
            way of life. Founded in [year], our gym was born out of a passion
            for health, wellness, and community. What started as a small fitness
            center has now grown into a thriving hub for fitness enthusiasts of
            all levels.
          </p>
        </div>

      </div>

    </section>
  );
}

export default OurStory;