import React, { useState } from "react";
import { motion } from "motion/react";
import "./Schedule.css";

const Schedule = () => {
  const days = ['TIME', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  const scheduleData = [
    { time: '04:00 PM - 05:30 PM', mon: 'Cardio',    tue: 'Yoga',       wed: 'Crossfit',   thu: 'Cardio',     fri: 'Open Gym'   },
    { time: '05:30 PM - 07:00 PM', mon: 'Yoga',      tue: 'Crossfit',   wed: 'Cardio',     thu: 'Open Gym',   fri: 'Total Body' },
    { time: '07:00 PM - 08:30 PM', mon: 'Crossfit',  tue: 'Cardio',     wed: 'Yoga',       thu: 'Total Body', fri: 'Cardio'     },
    { time: '08:30 PM - 09:30 PM', mon: 'Open Gym',  tue: 'Total Body', wed: 'Cardio',     thu: 'Crossfit',   fri: 'Yoga'       },
    { time: '09:30 PM - 10:30 PM', mon: 'Total Body',tue: 'Open Gym',   wed: 'Crossfit',   thu: 'Yoga',       fri: 'Cardio'     },
  ];

  const categories = ['ALL EVENTS', 'CARDIO', 'YOGA', 'CROSSFIT', 'OPEN GYM', 'TOTAL BODY'];

  // ✅ State: kaunsa tab active hai
  const [activeTab, setActiveTab] = useState('CARDIO');   // default CARDIO active

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
            FIND YOUR FITNESS TIME
          </motion.p>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            OUR WORKING HOURS & <br /> SCHEDULES
          </motion.h2>
        </div>

        {/* --- Filter Tabs (Clickable) --- */}
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
              // ✅ Ab active class dynamic hai
              className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}   // ✅ Click handler
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}         // ✅ Click pe chhota ho
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
              <div key={index} className="header-cell">{day}</div>
            ))}
          </motion.div>

          {scheduleData.map((row, rowIndex) => (
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Schedule;