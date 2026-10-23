import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Trainers.css";

function Trainers() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // ✅ Intersection Observer (Reliable & Har baar animate hoga)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false); // Scroll out hone par reset
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ EXACT SAME ARRAY AS TEAMFACES
  const trainersData = [
    {
      id: 1,
      name: "AHMED RAZA",
      role: "Head Trainer",
      image: "/gym-assets/AHMED.jpg",
      link: "/team/ahmed",
    },
    {
      id: 2,
      name: "BILAL KHAN",
      role: "Fitness Coach",
      image: "/gym-assets/Bilal.jpg",
      link: "/team/bilal",
    },
    {
      id: 3,
      name: "FATIMA ALI",
      role: "Yoga Instructor",
      image: "/gym-assets/Fatimah.jpg",
      link: "/team/fatima",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3; // 3 cards ek waqt mein dikhenge

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 > trainersData.length - visibleCount ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? trainersData.length - visibleCount : prev - 1
    );
  };

  const headingWords = [
    { text: "THE",     green: false, index: 0 },
    { text: "FACES",   green: false, index: 1 },
    { text: "BEHIND",  green: false, index: 2 },
    { text: "KINETIX", green: true,  index: 3 },
  ];

  return (
    <section ref={sectionRef} className={`trainers ${inView ? "in-view" : ""}`}>
      <div className="trainers-container">
        
        {/* ===== LEFT SIDE ===== */}
        <div className="trainers-left">
          
          {/* Tag */}
          <span className="trainers-tag">
            OUR TEAM
          </span>

          {/* Heading Words */}
          <h2 className="trainers-heading">
            {headingWords.map((word) => (
              <span
                key={word.index}
                className={`word ${word.green ? "green" : ""}`}
                style={{ "--i": word.index }} // 👈 Index pass kiya for CSS delay
              >
                {word.text}
              </span>
            ))}
          </h2>

          {/* Controls */}
          <div className="trainers-controls">
            <button
              className="trainer-arrow"
              onClick={handlePrev}
              aria-label="Previous"
            >
              ←
            </button>
            <button className="trainer-arrow" onClick={handleNext} aria-label="Next">
              →
            </button>
          </div>
        </div>

        {/* ===== RIGHT SIDE — SLIDER ===== */}
        <div className="trainers-slider">
          <div
            className="trainers-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCount} + 20px)))`,
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
          >
            {trainersData.map((trainer, idx) => (
              <div
                key={trainer.id}
                className="trainer-card"
                style={{ "--i": idx }} // 👈 Index pass kiya for CSS delay
              >
                <Link to={trainer.link} className="trainer-card-link">
                  <div className="trainer-card-image">
                    <img src={trainer.image} alt={trainer.name} />

                    <div className="trainer-sweep"></div>
                    <div className="trainer-scan"></div>
                    <div className="trainer-card-overlay"></div>

                    {/* ✅ Naam 2 lines mein */}
                    <div className="trainer-name-block">
                      <h3 className="trainer-card-name">
                        {trainer.name.split(" ")[0]}
                      </h3>
                      {trainer.name.split(" ")[1] && (
                        <h3 className="trainer-card-name">
                          {trainer.name.split(" ").slice(1).join(" ")}
                        </h3>
                      )}
                    </div>

                    <span className="trainer-card-arrow">↗</span>

                    <span className="t-corner t-tl"></span>
                    <span className="t-corner t-tr"></span>
                    <span className="t-corner t-bl"></span>
                    <span className="t-corner t-br"></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trainers;