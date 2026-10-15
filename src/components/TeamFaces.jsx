// src/components/TeamFaces.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./TeamFaces.css";

const TeamFaces = () => {
  const teamMembers = [
    {
      id: 1,
      name: "AHMED RAZA",
      role: "Head Trainer",
      image: "/gym-assets/AHMED.jpg",
      link: "/team/ahmed",
    },
    {
      id: 2,
      name: "BILAL KHAN",
      role: "Fitness Coach",
      image: "/gym-assets/Bilal.jpg",
      link: "/team/bilal",
    },
    {
      id: 3,
      name: "FATIMA ALI",
      role: "Yoga Instructor",
      image: "/gym-assets/Fatimah.jpg",
      link: "/team/fatima",
    },
  ];

  return (
    <section className="teamfaces-section">
      <div className="teamfaces-container">

        {/* ============================================
            HEADER
            ============================================ */}
        <div className="teamfaces-header">
          <motion.h2
            className="teamfaces-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            THE FACES BEHIND
          </motion.h2>

          <motion.h2
            className="teamfaces-title teamfaces-title-highlight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            KINETIX  Fitness Club
          </motion.h2>
        </div>

        {/* ============================================
            TEAM GRID
            ============================================ */}
        <div className="teamfaces-grid">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* ============================================
   Team Card Component
   ============================================ */
const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      className="teamface-card"
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ y: -10 }}
    >
      {/* ✨ Image Container */}
      <div className="teamface-image-wrapper">

        {/* Image */}
        <img
          src={member.image}
          alt={member.name}
          className="teamface-image"
        />

        {/* Dark Gradient Overlay */}
        <div className="teamface-overlay"></div>

        {/* Bottom Info Row */}
        <div className="teamface-info">

          {/* Name */}
          <div className="teamface-name-block">
            <h3 className="teamface-name">
              {member.name.split(" ")[0]}
            </h3>
            {member.name.split(" ")[1] && (
              <h3 className="teamface-name">
                {member.name.split(" ").slice(1).join(" ")}
              </h3>
            )}
          </div>

          {/* Arrow Button */}
          <Link
            to={member.link}
            className="teamface-arrow"
            aria-label={`View ${member.name} profile`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>

        </div>

      </div>
    </motion.div>
  );
};

export default TeamFaces;