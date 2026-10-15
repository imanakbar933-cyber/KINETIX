// src/components/ClassroomContent.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./Classroom.css";

const Classroom= () => {

  // ✅ 6 Classes Data
  const classes = [
    {
      id: 1,
      title: "ONLINE CLASSES & RESOURCES",
      description:
        "Join our energetic group fitness classes led by experienced instructors.",
      image: "/gym-assets/class1.jpg",
      link: "/classroom/online-classes",
    },
    {
      id: 2,
      title: "NUTRITION COUNSELLING",
      description:
        "Join our energetic group fitness classes led by experienced instructors.",
      image: "/gym-assets/class2.jpg",
      link: "/classroom/nutrition",
    },
    {
      id: 3,
      title: "PERSONAL TRAINING SESSIONS",
      description:
        "Join our energetic group fitness classes led by experienced instructors.",
      image: "/gym-assets/class3.jpg",
      link: "/classroom/personal-training",
    },
    {
      id: 4,
      title: "FITNESS CHALLENGES",
      description:
        "Join our energetic group fitness classes led by experienced instructors.",
      image: "/gym-assets/class4.jpg",
      link: "/classroom/fitness-challenges",
    },
    {
      id: 5,
      title: "WORKSHOPS & SEMINARS",
      description:
        "Join our energetic group fitness classes led by experienced instructors.",
      image: "/gym-assets/class5.jpg",
      link: "/classroom/workshops",
    },
    {
      id: 6,
      title: "GROUP FITNESS CLASSES",
      description:
        "Join our energetic group fitness classes led by experienced instructors.",
      image: "/gym-assets/class6.jpg",
      link: "/classroom/group-fitness",
    },
  ];

  return (
    <section className="classroomcontent-section">
      <div className="classroomcontent-container">

        {/* ============================================
            HEADER — Our Classes
            ============================================ */}
        <div className="classroomcontent-header">

          <motion.p
            className="classroomcontent-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            WHAT WE OFFER
          </motion.p>

          <motion.h2
            className="classroomcontent-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            OUR <span className="classroomcontent-highlight">CLASSES</span>
          </motion.h2>

          <motion.p
            className="classroomcontent-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Discover our wide range of classes designed to help you
            reach your fitness goals faster.
          </motion.p>

        </div>

        {/* ============================================
            CARDS GRID — 6 Classes
            ============================================ */}
        <div className="classroomcontent-grid">
          {classes.map((item, index) => (
            <ClassCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* ============================================
   Class Card Component
   ============================================ */
const ClassCard = ({ item, index }) => {
  return (
    <motion.div
      className="classcard"
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      whileHover={{ y: -10 }}
    >
      <Link to={item.link} className="classcard-link">

        {/* Image */}
        <div className="classcard-image-wrapper">
          <img
            src={item.image}
            alt={item.title}
            className="classcard-image"
          />
          <div className="classcard-overlay"></div>
        </div>

        {/* Content */}
        <div className="classcard-body">

          {/* Title */}
          <h3 className="classcard-title">{item.title}</h3>

          {/* Description */}
          <p className="classcard-desc">{item.description}</p>

          {/* Read More */}
          <div className="classcard-readmore">
            <span>Read more</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

        </div>

      </Link>
    </motion.div>
  );
};

export default Classroom;