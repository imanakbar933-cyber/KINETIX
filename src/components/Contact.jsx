// src/components/Contact.jsx

import React from "react";
import { motion } from "motion/react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact">

      {/* ---------- LEFT SIDE: Text + Buttons ---------- */}
      <div className="contact-left">

        {/* Heading — fade-up */}
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          GET STARTED <br /> TODAY
        </motion.h1>

        {/* Paragraph — fade-up with blur */}
        <motion.p
          className="contact-para"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Ready to take the first step towards a healthier,
          stronger you?
        </motion.p>

        {/* Buttons — staggered fade-up */}
        <motion.div
          className="contact-buttons"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15, delayChildren: 0.4 },
            },
          }}
        >
          <motion.button
            className="contact-btn-green"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4, scale: 1.04 }}
          >
            GET STARTED TODAY <span className="arrow">›</span>
          </motion.button>

          <motion.button
            className="contact-btn-outline"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4, scale: 1.04 }}
          >
            CONTACT US <span className="arrow">›</span>
          </motion.button>
        </motion.div>
      </div>

      {/* ---------- RIGHT SIDE: Arch-shaped Image ---------- */}
      <div className="contact-right">

        {/* Rotating gradient glow ring */}
        <motion.div
          className="contact-glow"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Image container — Arch shape */}
        <motion.div
          className="contact-img-wrapper"
          initial={{ opacity: 0, x: 150, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {/* Image — infinite parallax float */}
          <motion.img
            src="/assets/Contact.jpg"
            alt="Man working out"
            className="contact-img"
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Green overlay tint */}
          <div className="contact-overlay"></div>  
        </motion.div>

      </div>

    </section>
  );
};
export default Contact;

