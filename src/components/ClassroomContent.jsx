// src/components/ClassroomContent.jsx

import React from "react";
import { motion } from "motion/react";
import "./ClassroomContent.css";

const ClassroomContent = () => {
  return (
    <section className="classroomcontent-section">
      <div className="classroomcontent-container">

        {/* ============================================
            HEADER — Bara Heading
            ============================================ */}
        <div className="classroomcontent-header">

          <motion.h2
            className="classroomcontent-title"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            EMPOWER YOUR FITNESS JOURNEY
          </motion.h2>

          <motion.h2
            className="classroomcontent-title classroomcontent-title-second"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            IN OUR <span className="classroomcontent-highlight">INTERACTIVE</span> CLASSROOM
          </motion.h2>

        </div>

        {/* ============================================
            VIDEO SECTION — Green Border Frame
            ============================================ */}
        <motion.div
          className="classroomcontent-video-wrapper"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >

          {/* Green Border Frame — Top */}
          <motion.div
            className="classroomcontent-frame classroomcontent-frame-top"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />

          {/* Green Border Frame — Left */}
          <motion.div
            className="classroomcontent-frame classroomcontent-frame-left"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />

          {/* 🎥 Video */}
          <video
            className="classroomcontent-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/gym-assets/classroom.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Buy Now Floating Button */}
          <motion.button
            className="classroomcontent-buy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            animate={{
              y: [0, -8, 0],
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(74, 222, 128, 0.5)",
            }}
          >
            <span>Buy Now</span>
            <span className="buy-plus">+</span>
          </motion.button>

        </motion.div>

      </div>
    </section>
  );
};

export default ClassroomContent;