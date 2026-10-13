// src/components/ClientStories.jsx

import React, { useState } from "react";
import { motion } from "motion/react";
import "./ClientStories.css";

const ClientStories = () => {
  const clients = [
    {
      name: "Ayesha Khan",
      result: "Lost 25 KG",
      message: "KINETIX changed my life completely.",
      before: "/gym-assets/ayesha.png",
      after: "/gym-assets/ayeshaafter.png",
    },
    {
      name: "Bilal Ahmed",
      result: "Lost 35 KG",
      message: "The trainers here are truly amazing.",
      before: "/gym-assets/billalahmed.png",
      after: "/gym-assets/billalahmedafter.png",
    },
    {
      name: "Hamza",
      result: "Lost 20 KG",
      message: "Best gym in town. Highly recommended!",
      before: "/gym-assets/hamza.png",
      after: "/gym-assets/hamzaafter.png",
    },
    {
      name: "Ali",
      result: "Lost 30 KG",
      message: "I feel stronger and healthier than ever.",
      before: "/gym-assets/ali.png",
      after: "/gym-assets/aliafter.png",
    },
    {
      name: "Zani",
      result: "Lost 15 KG",
      message: "Amazing experience and great trainers!",
      before: "/gym-assets/zani.png",
      after: "/gym-assets/zaniafter.png",
    },
  ];

  return (
    <section className="cs-section">

      {/* Header */}
      <div className="cs-header">
        <p className="cs-eyebrow">CLIENT STORIES</p>
        <h2 className="cs-title">
          See Their <span className="cs-title-highlight">Transformations</span>
        </h2>
        <p className="cs-subtitle">Hover on each photo to see before & after</p>
      </div>

      {/* ✅ 5 Cards Ek Row Mein */}
      <div className="cs-grid">
        {clients.map((client, index) => (
          <ClientCard key={index} client={client} index={index} />
        ))}
      </div>

    </section>
  );
};

/* ============================================
   Client Card
   ============================================ */
const ClientCard = ({ client, index }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="cs-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Box */}
      <div className="cs-image-box">

        {/* Before Image */}
        <img
          src={client.before}
          alt={`${client.name} - Before`}
          className="cs-img"
          style={{ opacity: hover ? 0 : 1 }}
        />

        {/* After Image */}
        <img
          src={client.after}
          alt={`${client.name} - After`}
          className="cs-img cs-img-abs"
          style={{ opacity: hover ? 1 : 0 }}
        />

        {/* BEFORE / AFTER Label */}
        <span className={`cs-label ${hover ? "cs-label-after" : ""}`}>
          {hover ? "AFTER" : "BEFORE"}
        </span>

        {/* Result Badge */}
        <span className="cs-result-badge">✅ {client.result}</span>

        {/* Overlay */}
        <div className="cs-overlay"></div>
      </div>

      {/* Info */}
      <div className="cs-info">
        <h3 className="cs-name">{client.name}</h3>
        <p className="cs-message">"{client.message}"</p>
      </div>

    </motion.div>
  );
};

export default ClientStories;

