
import React from "react";
import { motion } from "motion/react";
import "./Newsletter.css";

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
          STAY STRONG AND <br /> STAY INFORMED
        </motion.h1>

        {/* Paragraph with fade-up animation */}
        <motion.p
          className="newsletter-para"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Stay connected with KINETIX Fitness Club! Get fitness
          tips, workout inspiration, healthy lifestyle guidance,
          and updates about our latest gym activities and offers.
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
            placeholder="Enter your email address"
            className="newsletter-input"
            aria-label="Email address"
          />

          <button
            type="button"
            className="newsletter-arrow"
            aria-label="Subscribe to newsletter"
          >
            →
          </button>
        </motion.div>
      </div>

      {/* ---------- RIGHT SIDE: Image in circular glow ---------- */}
      <div className="newsletter-right">

        {/* Glowing pulsing circle behind image */}
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

        {/* Trainer image with floating animation */}
        <motion.img
          src="/gym-assets/Newsletter.jpg"
          alt="Personal training session at KINETIX Fitness Club"
          className="newsletter-img"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          whileInView={{
            opacity: 1,
            scale: [0.98, 1.02, 0.98],
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
