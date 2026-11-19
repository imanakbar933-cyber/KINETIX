import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ContactMap.css";

function ContactMap() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,   // 👈 HAR BAAR animate hoga
  });

  // ===== Animation Variants =====
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const mapVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="contact-map"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="contact-map-container">
        {/* =========================================
            HEADING
        ========================================= */}
        <div className="contact-map-header">
          <motion.span
            className="contact-map-badge"
            variants={badgeVariants}
          >
            VISIT US
          </motion.span>

          <motion.h2
            className="contact-map-title"
            variants={titleVariants}
          >
            LET'S START SOMETHING <span className="green">GREAT!</span>
          </motion.h2>

          <motion.p
            className="contact-map-desc"
            variants={descVariants}
          >
            Visit KINETIX Fitness Club in Gujranwala and take the first
step towards a stronger, healthier lifestyle.
<br />
Our team is ready to welcome you and help you get started.
          </motion.p>
        </div>

        {/* =========================================
            MAP WRAPPER (with neon border)
        ========================================= */}
        <motion.div
          className="contact-map-wrapper"
          variants={mapVariants}
          whileHover={{
            y: -6,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <motion.div
            className="contact-map-neon"
            animate={{
              boxShadow: [
                "inset 0 0 15px rgba(3, 234, 4, 0.45), inset 0 0 30px rgba(3, 234, 4, 0.25), 0 0 18px rgba(3, 234, 4, 0.5), 0 0 38px rgba(3, 234, 4, 0.28)",
                "inset 0 0 25px rgba(3, 234, 4, 0.75), inset 0 0 55px rgba(3, 234, 4, 0.45), 0 0 28px rgba(3, 234, 4, 0.9), 0 0 65px rgba(3, 234, 4, 0.55)",
                "inset 0 0 15px rgba(3, 234, 4, 0.45), inset 0 0 30px rgba(3, 234, 4, 0.25), 0 0 18px rgba(3, 234, 4, 0.5), 0 0 38px rgba(3, 234, 4, 0.28)",
              ],
              borderColor: ["#03ea04", "#7eff80", "#03ea04"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <iframe
            className="contact-map-frame"
            title="KINETIX Fitness Club Location"
src="https://www.google.com/maps?q=Satellite+Town,+Gujranwala,+Pakistan&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ContactMap;