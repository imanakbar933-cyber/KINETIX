// src/components/ClassDetailHero.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./ClassDetailHero.css";

const ClassDetailHero = ({ title, image }) => {
  return (
    <section className="classdetailhero-section">

      {/* Background Image */}
      <div
        className="classdetailhero-bg"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="classdetailhero-overlay"></div>

      {/* Content */}
      <div className="classdetailhero-container">

        {/* Title — Dynamic */}
        <motion.h1
          className="classdetailhero-title"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        {/* Breadcrumb — Dynamic */}
        <motion.nav
          className="classdetailhero-breadcrumb"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Link to="/" className="classdetailhero-link">HOME</Link>
          <span className="classdetailhero-sep">/</span>
          <Link to="/ClassroomPage" className="classdetailhero-link">CLASSROOM</Link>
          <span className="classdetailhero-sep">/</span>
          <span className="classdetailhero-current">{title}</span>
        </motion.nav>

      </div>
    </section>
  );
};

export default ClassDetailHero;