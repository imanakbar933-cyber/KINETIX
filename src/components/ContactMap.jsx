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
            Undo image pen asset distribute auto library. Move list
            underline frame opacity plugin outline project.
            <br />
            Style variant slice shadow export blur plugin pixel.
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
            title="Jalal Textile Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.317591906877!2d90.41884431498202!3d23.80602698456274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c700d3f05b59%3A0xb2c5e19d6a77d1a0!2sZeroGround!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
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