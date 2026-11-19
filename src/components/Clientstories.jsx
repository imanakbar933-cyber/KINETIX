// src/components/ClientStories.jsx

import React, { useState } from "react";
import { motion } from "motion/react";
import "./ClientStories.css";

const ClientStories = () => {
  
const clients = [
  {
    id: 1,
    name: "Rameez Shafqat",
    result: "Lost 12 KG",
    message:
      "I struggled to stay consistent before joining KINETIX. My trainer helped me build a routine that I could actually follow.",
    before: "/assets/ayesha.png",
    after: "/assets/ayeshaafter.png",
  },
  {
    id: 2,
    name: "Hanzala Tariq",
    result: "Lost 16 KG",
    message:
      "The structured workouts and regular guidance helped me improve my fitness. I feel much more confident now.",
    before: "/assets/billalahmed.png",
    after: "/assets/billalahmedafter.png",
  },
  {
    id: 3,
    name: "Zaryab Khalid",
    result: "Lost 9 KG",
    message:
      "I joined to improve my stamina, but ended up developing a much healthier lifestyle. The environment is motivating.",
    before: "/assets/hamza.png",
    after: "/assets/hamzaafter.png",
  },
  {
    id: 4,
    name: "Muneeb Arshad",
    result: "Lost 14 KG",
    message:
      "The trainers pay attention to proper exercise techniques and keep me motivated. My strength and endurance have improved.",
    before: "/assets/ali.png",
    after: "/assets/aliafter.png",
  },
  {
    id: 5,
    name: "Salar Javed",
    result: "Lost 7 KG",
    message:
      "What I like most about KINETIX is the supportive atmosphere. I no longer skip workouts and enjoy my fitness routine.",
    before: "/assets/zani.png",
    after: "/assets/zaniafter.png",
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
