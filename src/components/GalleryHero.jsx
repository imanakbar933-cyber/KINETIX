// src/components/GalleryHero.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./GalleryHero.css";

const GalleryHero = () => {
  return (
    <section className="galleryhero-section">

      {/* 🖼️ Background Image */}
      <div className="galleryhero-bg"></div>

      {/* 🌑 Dark Overlay */}
      <div className="galleryhero-overlay"></div>

      {/* Content */}
      <div className="galleryhero-container">

        {/* Main Title */}
        <motion.h1
          className="galleryhero-title"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          GALLERY
        </motion.h1>

        {/* Breadcrumb */}
        <motion.nav
          className="galleryhero-breadcrumb"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          aria-label="breadcrumb"
        >
          <Link to="/" className="galleryhero-link">HOME</Link>
          <span className="galleryhero-sep">/</span>
          <span className="galleryhero-current">GALLERY</span>
        </motion.nav>

      </div>
    </section>
  );
};

export default GalleryHero;