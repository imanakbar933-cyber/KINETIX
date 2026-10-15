// src/components/ClassroomHero.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./ClassroomHero.css";

const ClassroomHero = () => {
  return (
    <section className="classroomhero-section">

      {/* 🖼️ Background Image (CSS se aayega) */}
      <div className="classroomhero-bg-image"></div>

      {/* 🌑 Dark Overlay */}
      <div className="classroomhero-overlay"></div>

      {/* Content */}
      <div className="classroomhero-container">

        {/* Main Title */}
        <motion.h1
          className="classroomhero-title"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          OUR CLASSROOM
        </motion.h1>

        {/* Breadcrumb */}
        <motion.nav
          className="classroomhero-breadcrumb"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          aria-label="breadcrumb"
        >
          <Link to="/" className="classroomhero-breadcrumb-link">HOME</Link>
          <span className="classroomhero-breadcrumb-separator">/</span>
          <span className="classroomhero-breadcrumb-current">OUR CLASSROOM</span>
        </motion.nav>

      </div>
    </section>
  );
};

export default ClassroomHero;