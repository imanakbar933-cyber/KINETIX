import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import "./Trainers.css";

function Trainers() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,   // 👈 HAR BAAR animate
  });

  const trainersData = [
    { id: 1, name: "HENRY",      image: "/images/trainer1.jpg" },
    { id: 2, name: "JAMES",      image: "/images/trainer2.jpg" },
    { id: 3, name: "MIKE",       image: "/images/trainer3.jpg" },
    { id: 4, name: "DAVID KHAN", image: "/images/trainer4.jpg" },
    { id: 5, name: "ALEX BROWN", image: "/images/trainer5.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

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

  // ============================================================
  // ANIMATION VARIANTS — one by one flow
  // ============================================================

  // 1. Tag
  const tagVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
    },
  };

  // 2. Heading words — one by one
  const wordVariants = (i) => ({
    hidden: { opacity: 0, y: 60, rotateX: -70 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3 + i * 0.15,   // ek ke baad ek
      },
    },
  });

  // 3. Controls
  const controlsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 1.0 },
    },
  };

  // 4. Cards — one by one
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
    <section ref={sectionRef} className="trainers">
      <div className="trainers-container">
        {/* ===== LEFT SIDE ===== */}
        <div className="trainers-left">
          {/* Tag */}
          <motion.span
            className="trainers-tag"
            variants={tagVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            OUR TEAM
          </motion.span>

          {/* Heading — words one by one */}
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

          {/* Controls */}
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
                <Link
                  to={`/trainers/${trainer.id}`}
                  className="trainer-card-link"
                >
                  <div className="trainer-card-image">
                    <img src={trainer.image} alt={trainer.name} />

                    <div className="trainer-sweep"></div>
                    <div className="trainer-scan"></div>
                    <div className="trainer-card-overlay"></div>

                    <h3 className="trainer-card-name">{trainer.name}</h3>
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