// src/components/ClassDetailContent.jsx

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./ClassDetailContent.css";

const ClassDetailContent = ({ cls }) => {
  return (
    <section className="classdetailcontent-section">
      <div className="classdetailcontent-container">

        <div className="classdetailcontent-grid">

          {/* LEFT — About + Features */}
          <motion.div
            className="classdetailcontent-left"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9 }}
          >

            <h2 className="classdetailcontent-heading">ABOUT THIS CLASS</h2>
            <p className="classdetailcontent-about">{cls.about}</p>

            <h2 className="classdetailcontent-heading">WHAT YOU'LL GET</h2>
            <ul className="classdetailcontent-features">
              {cls.features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <span className="feature-check">✓</span>
                  {feat}
                </motion.li>
              ))}
            </ul>

          </motion.div>

          {/* RIGHT — Info Box */}
          <motion.div
            className="classdetailcontent-right"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >

            <div className="classdetailcontent-box">

              <h3 className="classdetailcontent-box-title">
                CLASS DETAILS
              </h3>

              <p className="classdetailcontent-box-desc">
                {cls.description}
              </p>

              {/* Box Items — Dynamic */}
              <div className="classdetailcontent-box-items">

                <div className="box-item">
                  <span className="box-icon">📅</span>
                  <span className="box-label">DATE:</span>
                  <span className="box-value">{cls.date}</span>
                </div>

                <div className="box-item">
                  <span className="box-icon">🕐</span>
                  <span className="box-label">TIME:</span>
                  <span className="box-value">{cls.time}</span>
                </div>

                <div className="box-item">
                  <span className="box-icon">🔥</span>
                  <span className="box-label">MAXIMIZE:</span>
                  <span className="box-value">{cls.maximize}</span>
                </div>

                <div className="box-item">
                  <span className="box-icon">📊</span>
                  <span className="box-label">INTENSITY:</span>
                  <span className="box-value">{cls.intensity}</span>
                </div>

                <div className="box-item">
                  <span className="box-icon">📍</span>
                  <span className="box-label">LOCATION:</span>
                  <span className="box-value">{cls.location}</span>
                </div>

              </div>

              <div className="box-divider"></div>

              {/* Price */}
              <div className="box-price-row">
                <span className="box-price-label">Price:</span>
                <span className="box-price-value">{cls.price}</span>
              </div>

              {/* Buy Now */}
              <Link to="/contact" className="box-buy-btn">
                Buy Now
                <span className="box-buy-plus">+</span>
              </Link>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ClassDetailContent;