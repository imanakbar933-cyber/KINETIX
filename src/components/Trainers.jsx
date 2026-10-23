import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import "./Trainers.css";

function Trainers() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false, // 👈 HAR BAAR animate
  });

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
    // Agar aur members add karne hain to yahan kar sakti hain
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
    { text: "THE", green: false, index: 0 },
    { text: "FACES", green: false, index: 1 },
    { text: "BEHIND", green: false, index: 2 },
    { text: "KINETIX", green: true, index: 3 },
  ];

  // ============================================================
  // ANIMATION VARIANTS
  // ============================================================
  const tagVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
    },
  };

  const wordVariants = (i) => ({
    hidden: { opacity: 0, y: 60, rotateX: -70 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3 + i * 0.15,
      },
    },
  });

  const controlsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 1.0 },
    },
  };

  const cardVariants = (i) => ({
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.6 + i * 0.12,
      },
    },
  });

  return (
    // ✅ Section tag sahi kiya
    <section ref={sectionRef} className="trainers">
      <div className="trainers-container">
        {/* ===== LEFT SIDE ===== */}
        <div className="trainers-left">
          <motion.span
            className="trainers-tag"
            variants={tagVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            OUR TEAM
          </motion.span>

          <h2 className="trainers-heading">
            {headingWords.map((word) => (
              <motion.span
                key={word.index}
                className={`word ${word.green ? "green" : ""}`}
                variants={wordVariants(word.index)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>

          <motion.div
            className="trainers-controls"
            variants={controlsVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <button
              className="trainer-arrow"
              onClick={handlePrev}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="trainer-arrow"
              onClick={handleNext}
              aria-label="Next"
            >
              →
            </button>
          </motion.div>
        </div>

        {/* ===== RIGHT SIDE — SLIDER ===== */}
        <div className="trainers-slider">
          <motion.div
            className="trainers-track"
            animate={{
              x: `calc(-${currentIndex} * (100% / ${visibleCount} + 20px))`,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {trainersData.map((trainer, idx) => (
              <motion.div
                key={trainer.id}
                className="trainer-card"
                variants={cardVariants(idx)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Link to={trainer.link} className="trainer-card-link">
                  <div className="trainer-card-image">
                    <img src={trainer.image} alt={trainer.name} />

                    <div className="trainer-sweep"></div>
                    <div className="trainer-scan"></div>
                    <div className="trainer-card-overlay"></div>

                    {/* ✅ Naam 2 lines mein (Team jaisa) */}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Trainers;