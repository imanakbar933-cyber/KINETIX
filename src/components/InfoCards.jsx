import React from "react";
import { motion } from "framer-motion";
import "./InfoCards.css";

function InfoCards() {
  const cardsData = [
    {
      number: "01",
      title: "EMPOWERING\nHEALTHIER LIVES",
      image: "/images/card2.jpg",
      desc: "At KINETIX, we are dedicated to empowering individuals to lead healthier lives. We provide the tools, support, and guidance needed to achieve fitness goals, improve overall well-being, and foster a sustainable commitment to health.",
    },
    {
      number: "02",
      title: "BUILDING A SUPPORTIVE\nCOMMUNITY",
      image: "/images/card3.jpg",
      desc: "At KINETIX, we are dedicated to building a supportive community where every member feels valued. We provide the tools, support, and guidance needed to achieve fitness goals, improve overall well-being, and foster a sustainable commitment to health.",
    },
  ];

  // ===== Animations =====
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut", delay: 0.25 },
    },
  };

  const titleLineVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.35 + i * 0.12,
      },
    }),
  };

  const descVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <section className="info-cards">
      <div className="info-cards-grid">
        {cardsData.map((card, i) => (
          <motion.div
            className="info-card"
            key={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}   // 👈 HAR BAAR
          >
            <div className="info-card-image">
              <img src={card.image} alt={card.title} />

              {/* Hover effects */}
              <div className="glitch-layer"></div>
              <div className="scan-line"></div>
              <div className="cursor-glow"></div>
              <div className="ripple-ring"></div>
              <div className="info-card-overlay"></div>

              {/* Content */}
              <div className="info-card-content">
                <motion.span
                  className="info-card-number"
                  variants={numberVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  {card.number}
                </motion.span>

                <h3 className="info-card-title">
                  {card.title.split("\n").map((line, idx) => (
                    <motion.span
                      key={idx}
                      className="line"
                      custom={idx}
                      variants={titleLineVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </h3>
              </div>
            </div>

            <motion.p
              className="info-card-desc"
              variants={descVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {card.desc}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default InfoCards;