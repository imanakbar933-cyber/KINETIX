
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
            entry.target.classList.remove("in-view");
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
            KINETIX Fitness Club is built around a simple belief: fitness
            should become a part of everyday life, not just a temporary goal.
            We aim to create a welcoming space where people can focus on
            strength, improve their fitness, and build healthier habits.
            Whether someone is beginning their fitness journey or working
            towards a new personal goal, KINETIX encourages consistency,
            dedication, and progress at every step.
          </p>
        </div>

      </div>

    </section>
  );
}

export default OurStory;
