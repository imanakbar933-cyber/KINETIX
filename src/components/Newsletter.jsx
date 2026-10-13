// src/components/Newsletter.jsx

import React from "react";
import { motion } from "motion/react";
import './Newsletter.css';  

const Newsletter = () => {
  return (
    <section className="newsletter">

      {/* ---------- LEFT SIDE: Text + Form ---------- */}
      <div className="newsletter-left">

        {/* Heading with slide-in animation */}
        <motion.h1
          className="newsletter-title"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          STAY FIT AND <br /> INFORMED
        </motion.h1>

        {/* Paragraph with fade-up animation */}
        <motion.p
          className="newsletter-para"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Get fit, stay motivated! Subscribe now to receive 
          personalized workout plans, nutrition guides, and 
           early access to our gym events and challenges.
        </motion.p>

        {/* Email input + arrow with fade-up */}
        <motion.div
          className="newsletter-form"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <input
            type="email"
            placeholder="hello@yourdomain.com"
            className="newsletter-input"
          />
          <button className="newsletter-arrow">→</button>
        </motion.div>
      </div>

      {/* ---------- RIGHT SIDE: Image in circular glow ---------- */}
      <div className="newsletter-right">

        {/* Glowing pulsing circle behind image — AUTO animation */}
        <motion.div
          className="newsletter-glow"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* The image inside the circle — AUTO floating animation */}
        <motion.img
          src="/gym-assets/Newsletter.jpg"
          alt="Trainer helping client"
          className="newsletter-img"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          whileInView={{
            opacity: 1,
            scale: [0.98, 1.02, 0.98],   // breathing
            rotate: 0,
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            opacity: { duration: 1 },
            rotate: { duration: 1.2, ease: "easeOut" },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      

       
        
      </div>

    </section>
  );
};

export default Newsletter;

