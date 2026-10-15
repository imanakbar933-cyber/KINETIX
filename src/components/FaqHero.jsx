// src/components/FaqHero.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./FaqHero.css";

const FaqHero = () => {
  return (
    <section className="faqhero-section">

      {/* 🎥 Video Background */}
      <video
        className="faqhero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/gym-assets/Barbell.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌑 Dark Overlay */}
      <div className="faqhero-overlay"></div>

      {/* Content */}
      <div className="faqhero-container">

        {/* Main Title */}
        <motion.h1
          className="faqhero-title"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.h1>

        {/* Breadcrumb */}
        <motion.nav
          className="faqhero-breadcrumb"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          aria-label="breadcrumb"
        >
          <Link to="/" className="faqhero-breadcrumb-link">HOME</Link>
          <span className="faqhero-breadcrumb-separator">/</span>
          <span className="faqhero-breadcrumb-current">FAQ</span>
        </motion.nav>

      </div>
    </section>
  );
};

export default FaqHero;