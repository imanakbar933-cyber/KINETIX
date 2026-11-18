// src/components/FAQ.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(1);

 
const faqData = [
  {
    id: 1,
    question: "How can I become a KINETIX member?",
    answer:
      "You can get started by visiting KINETIX Fitness Club in Gujranwala or contacting our team for membership details. Our staff can explain the available plans, registration process, and help you choose an option that suits your fitness goals.",
  },
  {
    id: 2,
    question: "What are the membership fees and registration charges?",
    answer:
      "Membership charges depend on the selected plan and duration. Our team will share the current fee structure, any applicable registration charges, and payment details before you sign up.",
  },
  {
    id: 3,
    question: "What gym equipment is available at KINETIX?",
    answer:
      "Our training facilities include strength-training equipment, free weights, barbells, and cardio workout options. Members can choose exercises according to their fitness level and training goals.",
  },
  {
    id: 4,
    question: "Do you provide personal training and workout plans?",
    answer:
      "Yes, members can get trainer guidance for exercise techniques and workout routines. Training recommendations can be adjusted according to individual fitness goals, experience, and progress.",
  },
  {
    id: 5,
    question: "What are the gym opening and closing hours?",
    answer:
      "Our gym operates according to its scheduled training hours. Please contact the KINETIX team to confirm the latest opening and closing times before planning your visit.",
  },
  {
    id: 6,
    question: "Do you provide diet plans and nutrition guidance?",
    answer:
      "Members can explore nutrition guidance and diet-plan options according to their fitness goals. Recommendations may consider daily routine, food preferences, and training requirements.",
  },
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        {/* ============ LEFT SIDE — Title + Description ============ */}
        <div className="faq-left">

          <motion.h2
            className="faq-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
           Questions About KINETIX? <br /> We're Here to Help
          </motion.h2>

          <motion.p
            className="faq-subtitle-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
           Learn more about membership plans, gym facilities, training
options, and everything you need before joining KINETIX.
          </motion.p>

          {/* ✅ Optional Button — Screenshot 2 jaisa */}
          <motion.button
            className="faq-cta-btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Read Our Full FAQs →
          </motion.button>

        </div>

        {/* ============ RIGHT SIDE — FAQ List ============ */}
        <div className="faq-right">

          <div className="faq-list">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.id}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="faq-q-text">{item.question}</h3>

                    <motion.div
                      className="faq-icon"
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <p className="faq-a-text">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;