// src/components/ScheduleHero.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./ScheduleHero.css";

const ScheduleHero = () => {
  return (
    <section className="schedulehero-section">

      {/* 🎥 Video Background */}
      <video
        className="schedulehero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/gym-assets/FAQ.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌑 Dark Overlay */}
      <div className="schedulehero-overlay"></div>

      {/* Content */}
      <div className="schedulehero-container">

        {/* Main Title */}
        <motion.h1
          className="schedulehero-title"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          WORKING SCHEDULES
        </motion.h1>

        {/* Breadcrumb */}
        <motion.nav
          className="schedulehero-breadcrumb"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          aria-label="breadcrumb"
        >
          <Link to="/" className="schedulehero-breadcrumb-link">HOME</Link>
          <span className="schedulehero-breadcrumb-separator">/</span>
          <span className="schedulehero-breadcrumb-current">WORKING SCHEDULES</span>
        </motion.nav>

      </div>
    </section>
  );
};

export default ScheduleHero;