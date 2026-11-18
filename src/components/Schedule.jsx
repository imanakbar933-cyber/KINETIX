
import React, { useState } from "react";
import { motion } from "motion/react";
import "./Schedule.css";

const Schedule = () => {
  const days = [
    "TIME",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const scheduleData = [
    {
      time: "04:00 PM - 05:00 PM",
      mon: "Cardio",
      tue: "Strength Training",
      wed: "Yoga",
      thu: "HIIT",
      fri: "Cardio",
      sat: "Open Gym",
    },
    {
      time: "05:00 PM - 06:00 PM",
      mon: "Strength Training",
      tue: "Cardio",
      wed: "HIIT",
      thu: "Yoga",
      fri: "Strength Training",
      sat: "Full Body",
    },
    {
      time: "06:00 PM - 07:00 PM",
      mon: "HIIT",
      tue: "Yoga",
      wed: "Strength Training",
      thu: "Cardio",
      fri: "Full Body",
      sat: "Cardio",
    },
    {
      time: "07:00 PM - 08:00 PM",
      mon: "Open Gym",
      tue: "Full Body",
      wed: "Cardio",
      thu: "Strength Training",
      fri: "Yoga",
      sat: "HIIT",
    },
    {
      time: "08:00 PM - 09:00 PM",
      mon: "Full Body",
      tue: "Open Gym",
      wed: "Strength Training",
      thu: "Full Body",
      fri: "Cardio",
      sat: "Yoga",
    },
  ];

  const categories = [
    "ALL EVENTS",
    "CARDIO",
    "STRENGTH TRAINING",
    "YOGA",
    "HIIT",
    "OPEN GYM",
    "FULL BODY",
  ];

  const [activeTab, setActiveTab] = useState("ALL EVENTS");

  const filteredSchedule =
    activeTab === "ALL EVENTS"
      ? scheduleData
      : scheduleData.filter((row) =>
          Object.entries(row).some(
            ([key, value]) =>
              key !== "time" &&
              value?.toUpperCase() === activeTab
          )
        );

  return (
    <section className="schedule-section">
      <div className="schedule-container">

        {/* --- Header --- */}
        <div className="schedule-header">
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            YOUR FITNESS, YOUR ROUTINE
          </motion.p>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            KINETIX TRAINING <br /> SCHEDULE
          </motion.h2>
        </div>

        {/* --- Filter Tabs --- */}
        <motion.div
          className="filter-tabs"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={index}
              className={`tab-btn ${activeTab === cat ? "active" : ""}`}
              onClick={() => setActiveTab(cat)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* --- Schedule Table --- */}
        <div className="schedule-table">
          <motion.div
            className="table-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {days.map((day, index) => (
              <div key={index} className="header-cell">
                {day}
              </div>
            ))}
          </motion.div>

          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="table-row"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: rowIndex * 0.12,
                  ease: "easeOut",
                }}
              >
                <div className="table-cell time-cell">{row.time}</div>
                <div className="table-cell">{row.mon}</div>
                <div className="table-cell">{row.tue}</div>
                <div className="table-cell">{row.wed}</div>
                <div className="table-cell">{row.thu}</div>
                <div className="table-cell">{row.fri}</div>
                <div className="table-cell">{row.sat}</div>
              </motion.div>
            ))
          ) : (
            <div className="table-row">
              <div className="table-cell" style={{ gridColumn: "1 / -1" }}>
                No sessions available for this category.
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Schedule;
