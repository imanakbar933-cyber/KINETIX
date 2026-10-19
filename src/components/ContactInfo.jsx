import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ContactInfo.css";

function ContactInfo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,   // 👈 HAR BAAR animate hoga (scroll pe)
  });

  // ===== Animation Variants =====
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="contact-help"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="contact-help-container">
        {/* =========================================
            LEFT SIDE — INFO
        ========================================= */}
        <div className="contact-help-left">
          <motion.h2
            className="contact-help-title"
            variants={titleVariants}
          >
            HOW CAN I HELP YOU?
          </motion.h2>

          <motion.p
            className="contact-help-desc"
            variants={descVariants}
          >
            Distribute horizontal group background shadow italic. Figma pencil
            edit rectangle figma link slice horizontal text follower.
          </motion.p>

          {/* Info Items */}
          <motion.div
            className="contact-help-list"
            variants={containerVariants}
          >
            <motion.div
              className="contact-help-item"
              variants={itemVariants}
              whileHover={{
                x: 8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className="contact-help-icon"
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "#03ea04",
                  color: "#0b0b0b",
                  boxShadow:
                    "0 0 20px rgba(3, 234, 4, 0.6), 0 0 40px rgba(3, 234, 4, 0.35)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </motion.div>
              <div className="contact-help-text">
                <h4>OFFICE:</h4>
                <p>
                  930 Hilgard Ave, Los Angeles, CA 90024,
                  <br />
                  United States.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="contact-help-item"
              variants={itemVariants}
              whileHover={{
                x: 8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className="contact-help-icon"
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "#03ea04",
                  color: "#0b0b0b",
                  boxShadow:
                    "0 0 20px rgba(3, 234, 4, 0.6), 0 0 40px rgba(3, 234, 4, 0.35)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
                </svg>
              </motion.div>
              <div className="contact-help-text">
                <h4>CONTACT</h4>
                <p>+111 345 543 000</p>
              </div>
            </motion.div>

            <motion.div
              className="contact-help-item"
              variants={itemVariants}
              whileHover={{
                x: 8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className="contact-help-icon"
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "#03ea04",
                  color: "#0b0b0b",
                  boxShadow:
                    "0 0 20px rgba(3, 234, 4, 0.6), 0 0 40px rgba(3, 234, 4, 0.35)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </motion.div>
              <div className="contact-help-text">
                <h4>EMAIL:</h4>
                <p>hello@yourdomain.com</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* =========================================
            RIGHT SIDE — FORM
        ========================================= */}
        <motion.div
          className="contact-help-right"
          variants={formVariants}
          whileHover={{
            borderColor: "rgba(3, 234, 4, 0.3)",
            transition: { duration: 0.4 },
          }}
        >
          <motion.h3
            className="contact-form-title"
            variants={titleVariants}
          >
            GET IN TOUCH
          </motion.h3>

          <motion.p
            className="contact-form-desc"
            variants={descVariants}
          >
            List team variant line style shadow bullet prototype image
            connection follower.
          </motion.p>

          <form className="contact-help-form">
            {/* Row 1 */}
            <motion.div
              className="contact-form-row"
              variants={containerVariants}
            >
              <motion.div
                className="contact-form-group"
                variants={formFieldVariants}
              >
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </motion.div>
              <motion.div
                className="contact-form-group"
                variants={formFieldVariants}
              >
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </motion.div>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              className="contact-form-row"
              variants={containerVariants}
            >
              <motion.div
                className="contact-form-group"
                variants={formFieldVariants}
              >
                <label>Email Address</label>
                <input type="email" placeholder="email" />
              </motion.div>
              <motion.div
                className="contact-form-group"
                variants={formFieldVariants}
              >
                <label>Company Name</label>
                <input type="text" placeholder="Company Name" />
              </motion.div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="contact-form-group"
              variants={formFieldVariants}
            >
              <label>Message</label>
              <textarea rows="6" placeholder="Message"></textarea>
            </motion.div>

            {/* Button */}
            <motion.button
              type="submit"
              className="contact-form-btn"
              variants={formFieldVariants}
              whileHover={{
                y: -3,
                boxShadow:
                  "0 0 20px rgba(3, 234, 4, 0.6), 0 0 40px rgba(3, 234, 4, 0.4), 0 10px 30px rgba(0, 0, 0, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ContactInfo;