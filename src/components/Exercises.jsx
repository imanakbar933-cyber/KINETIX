// src/components/Exercises.jsx

import React from "react";
import { motion } from "motion/react";
import "./Exercise.css";

const Exercises = () => {
  // ✅ 4 Exercises — Videos ke saath
  const exercisesData = [
    {
      id: 1,
      title: "AB CRUNCH MACHINE",
      description:
        "Sculpt your core with our premium ab crunch machine. Target your abs with controlled movements and adjustable resistance for maximum results.",
      video: "/gym-assets/Ab crunch.mp4",
    },
    {
      id: 2,
      title: "BARBELL",
      description:
        "Build raw strength with our full range of barbells and weight plates. Perfect for squats, deadlifts, bench press, and compound lifts.",
      video: "/gym-assets/Barbell.mp4",
    },
    {
      id: 3,
      title: "CARDIO",
      description:
        "Boost your heart health with our state-of-the-art cardio equipment — treadmills, ellipticals, bikes, and rowing machines.",
      video: "/gym-assets/Cardio.mp4",
    },
    {
      id: 4,
      title: "FLEXIBILITY & STRETCHING",
      description:
        "Improve mobility and prevent injuries with our dedicated stretching zone. Yoga mats, foam rollers, and resistance bands included.",
      video: "/gym-assets/Flexibility.mp4",
    },
  ];

  return (
    <section className="exercises-section">
      <div className="exercises-container">

        {/* ---------- Header ---------- */}
        {/* ✅ Header Section */}
<div className="exercises-header">
  <motion.p
    className="exercises-subtitle"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    TRAIN LIKE A PRO
  </motion.p>

  <motion.h2
    className="exercises-title"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.9, delay: 0.1 }}
  >
    EXPLORE OUR
  </motion.h2>

  <motion.h2
    className="exercises-title highlighted"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.9, delay: 0.25 }}
  >
    EXERCISES
  </motion.h2>

  {/* ✅ NEW — Description Line */}
  <motion.p
    className="exercises-description"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.9, delay: 0.4 }}
  >
    From strength training to cardio and flexibility — discover a complete
    range of workouts designed to push your limits and help you become the
    strongest version of yourself.
  </motion.p>
</div>

        {/* ---------- 4 Cards Grid ---------- */}
        <div className="exercises-grid">
          {exercisesData.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              className="exercise-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              {/* Video Wrapper */}
              <div className="exercise-video-wrapper">
                <motion.video
                  className="exercise-video"
                  src={exercise.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Green overlay on top */}
                <div className="exercise-overlay"></div>

                {/* Number badge */}
                <div className="exercise-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="exercise-content">
                <motion.h3
                  className="exercise-title"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 0.3,
                  }}
                >
                  {exercise.title}
                </motion.h3>

                {/* Green underline */}
                <motion.div
                  className="exercise-underline"
                  initial={{ width: 0 }}
                  whileInView={{ width: "50px" }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 0.5,
                  }}
                />

                <motion.p
                  className="exercise-desc"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15 + 0.6,
                  }}
                >
                  {exercise.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Exercises;

