import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ContactHighlights.css";

function ContactHighlights() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,
  });

  const features = [
    {
      number: "01",
      title: "Training That Fits You",
      text: "Whether your goal is building strength, losing weight, or improving stamina, your training routine is guided by your current fitness level and personal goals.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v16M18 4v16M6 8h12M6 16h12M3 8v8M21 8v8" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Guidance You Can Trust",
      text: "Our fitness trainers help you understand exercises, maintain proper form, and follow suitable workout routines so you can train safely and confidently.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Progress You Can Track",
      text: "Keep an eye on your workouts, attendance, fitness measurements, and personal milestones. Every improvement matters, and consistency makes the difference.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      ),
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
        delayChildren: 0.15,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.4 + i * 0.18,
      },
    }),
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.9 },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="contact-cta"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="contact-cta-container">
        {/* HEADER */}
        <div className="contact-cta-header">
          <motion.span
            className="contact-cta-badge"
            variants={badgeVariants}
          >
            WHY CHOOSE KINETIX
          </motion.span>

          <motion.h2
            className="contact-cta-title"
            variants={titleVariants}
          >
            MORE THAN A <span className="green">WORKOUT.</span>
          </motion.h2>

          <motion.p
            className="contact-cta-desc"
            variants={descVariants}
          >
            Your fitness journey deserves the right environment, proper guidance, and a team that keeps you moving forward.
          </motion.p>
        </div>

        {/* NEON BOX */}
        <motion.div
          className="contact-cta-box"
          variants={boxVariants}
        >
          <motion.div
            className="contact-cta-neon"
            animate={{
              boxShadow: [
                "inset 0 0 18px var(--accent-soft), inset 0 0 35px var(--accent-soft), 0 0 20px var(--accent-glow), 0 0 45px var(--accent-soft)",
                "inset 0 0 30px var(--accent-glow), inset 0 0 65px var(--accent-soft), 0 0 35px var(--accent-glow), 0 0 75px var(--accent-soft)",
                "inset 0 0 18px var(--accent-soft), inset 0 0 35px var(--accent-soft), 0 0 20px var(--accent-glow), 0 0 45px var(--accent-soft)",
              ],
              borderColor: ["var(--accent)", "var(--accent-glow)", "var(--accent)"],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="contact-cta-inner">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="cta-card"
                custom={i}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: "var(--accent-glow)",
                  boxShadow: "0 20px 45px var(--accent-soft)",
                  transition: { duration: 0.35, ease: "easeOut" },
                }}
              >
                <motion.span
                  className="cta-card-number"
                  whileHover={{ opacity: 0.09, color: "var(--accent)" }}
                  transition={{ duration: 0.3 }}
                >
                  {item.number}
                </motion.span>

                <motion.div
                  className="cta-card-icon"
                  whileHover={{
                    backgroundColor: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                    boxShadow: "0 0 22px var(--accent-glow)",
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="cta-card-title">{item.title}</h3>
                <p className="cta-card-text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BOTTOM CTA */}
        <motion.div
          className="contact-cta-bottom"
          variants={bottomVariants}
        >
          <motion.a
            href="#membership"
            className="cta-button"
            whileHover={{
              y: -4,
              boxShadow:
                "0 0 30px var(--accent-glow), 0 0 60px var(--accent-soft), 0 15px 40px var(--shadow-color)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Start Your Fitness Journey
            <motion.span
              className="cta-arrow"
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.3 }}
            >
              ↗
            </motion.span>
          </motion.a>
          <p className="cta-note">Every step forward counts.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ContactHighlights;