// src/components/AboutFAQ.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./AboutFAQ.css";

const AboutFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  
const faqData = [
  {
    id: 1,
    number: "01",
    question: "When was KINETIX established?",
    answer:
      "KINETIX was established in 2024 in Gujranwala, Pakistan, with a vision to make quality fitness training accessible to the local community. Since then, we have focused on creating a welcoming environment where members can work towards their fitness goals with confidence.",
  },
  {
    id: 2,
    number: "02",
    question: "What is the mission of KINETIX?",
    answer:
      "Our mission is to help people build healthier lifestyles through consistent training, proper guidance, and a supportive fitness environment. We believe fitness is not about quick results; it is about making small improvements every day.",
  },
  {
    id: 3,
    number: "03",
    question: "Who will guide me during my workouts?",
    answer:
      "Our fitness team includes experienced trainers who guide members according to their fitness levels and individual goals. Whether you are new to the gym or have been training for years, our trainers help you understand exercises, maintain proper form, and follow a suitable workout routine.",
  },
  {
    id: 4,
    number: "04",
    question: "What makes KINETIX different?",
    answer:
      "At KINETIX, we focus on more than just providing gym equipment. Members can manage their memberships, track attendance, follow workout and diet plans, and monitor their fitness progress. Our goal is to make every member's fitness journey organized, comfortable, and motivating.",
  },
  {
    id: 5,
    number: "05",
    question: "What facilities are available at KINETIX?",
    answer:
      "Members can benefit from strength training equipment, cardio workouts, personalized exercise guidance, workout plans, and fitness progress tracking. We also provide membership options to suit different fitness goals and training preferences.",
  },
  {
    id: 6,
    number: "06",
    question: "How can I become a KINETIX member?",
    answer:
      "Getting started is simple. Visit KINETIX in Gujranwala, explore the available membership plans, and choose the option that suits your fitness goals. Our team will guide you through registration and help you get started with your fitness journey.",
  },
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="aboutfaq-section">

      {/* 🌊 Background Glow */}
      <div className="aboutfaq-bg-glow"></div>

      <div className="aboutfaq-container">

        {/* ============ LEFT SIDE — Title + Description ============ */}
        <div className="aboutfaq-left">

          <motion.p
            className="aboutfaq-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            ABOUT US
          </motion.p>

          <motion.h2
            className="aboutfaq-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Got Questions?
          </motion.h2>

          <motion.h2
            className="aboutfaq-title highlighted"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            We've Got Answers
          </motion.h2>

          <motion.p
            className="aboutfaq-subtitle-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Learn more about KINETIX — our journey, our team, our mission,
            and everything that makes our fitness community special.
          </motion.p>

          {/* ✅ Optional CTA Button */}
          <motion.button
            className="aboutfaq-cta-btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More About Us →
          </motion.button>

        </div>

        {/* ============ RIGHT SIDE — FAQ List ============ */}
        <div className="aboutfaq-right">

          <div className="aboutfaq-list">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.id}
                  className={`aboutfaq-item ${isOpen ? "open" : ""}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                >
                  {/* Gradient Border (Active pe) */}
                  <div className="aboutfaq-item-border"></div>

                  {/* Number Badge */}
                  <motion.div
                    className="aboutfaq-number"
                    animate={{
                      color: isOpen ? "#4ade80" : "#4a4a4a",
                      scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.number}
                  </motion.div>

                  {/* Question Row */}
                  <div
                    className="aboutfaq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="aboutfaq-q-text">{item.question}</h3>

                    <motion.div
                      className="aboutfaq-icon"
                      animate={{
                        rotate: isOpen ? 90 : 0,
                        scale: isOpen ? 1.1 : 1,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="aboutfaq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.p
                          className="aboutfaq-a-text"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1,
                          }}
                        >
                          {item.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active Glowing Dot */}
                  {isOpen && (
                    <motion.div
                      className="aboutfaq-active-dot"
                      layoutId="aboutActiveDot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutFAQ;