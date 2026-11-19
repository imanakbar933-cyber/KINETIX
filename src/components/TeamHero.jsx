
import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./TeamHero.css";

const TeamHero = ({
  title = "OUR TEAM",
  breadcrumb = "OUR TEAM",
}) => {
  return (
    <section className="teamhero-section">

      {/* Dark Overlay */}
      <div className="teamhero-overlay"></div>

      {/* Hero Content */}
      <div className="teamhero-container">

        {/* Main Title */}
        <motion.h1
          className="teamhero-title"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          {title}
        </motion.h1>

        {/* Breadcrumb */}
        <motion.nav
          className="teamhero-breadcrumb"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: "easeOut",
          }}
          aria-label="Breadcrumb"
        >
          <Link to="/" className="breadcrumb-link">
            HOME
          </Link>

          <span className="breadcrumb-separator">/</span>

          <span className="breadcrumb-current">
            {breadcrumb}
          </span>
        </motion.nav>

      </div>
    </section>
  );
};

export default TeamHero;
