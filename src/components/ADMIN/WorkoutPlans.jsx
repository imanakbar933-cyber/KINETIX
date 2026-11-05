// src/components/ADMIN/WorkoutPlans.jsx
import React, { useState, useMemo } from "react";
import "./WorkoutPlans.css"; // CSS file import karna mat bhoolen

// --- MOCK DATA ---
const initialWorkoutPlans = [
  { id: 1, title: "Hypertrophy Builder", level: "Intermediate", goal: "Muscle Gain", days: 5, duration: "8 weeks", members: 34, color: "yellow", icon: "dumbbell" },
  { id: 2, title: "Shred & Burn", level: "Beginner", goal: "Fat Loss", days: 4, duration: "6 weeks", members: 58, color: "purple", icon: "fire" },
  { id: 3, title: "Powerlifting 5x5", level: "Advanced", goal: "Strength", days: 3, duration: "12 weeks", members: 21, color: "cyan", icon: "bolt" },
];

const stats = [
  { label: "TOTAL PLANS", value: "9", icon: "document", color: "yellow" },
  { label: "MEMBERS ASSIGNED", value: "320", icon: "users", color: "cyan" },
  { label: "EXERCISES LIBRARY", value: "244", icon: "dumbbell", color: "purple" },
  { label: "MOST POPULAR", value: "Beginner", icon: "star", color: "yellow" },
];

const goals = ["All Goals", "Muscle Gain", "Fat Loss", "Strength", "Endurance", "Mobility"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

// --- ICONS (SVG) ---
const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  export: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  assign: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>,
  dumbbell: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5h11"></path><path d="M6.5 17.5h11"></path><path d="M3 10.5h18"></path><path d="M3 13.5h18"></path><path d="M6 6.5v11"></path><path d="M18 6.5v11"></path></svg>,
  fire: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
  bolt: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  star: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  calendar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
};

const WorkoutPlans = () => {
  const [activeGoal, setActiveGoal] = useState("All Goals");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = useMemo(() => {
    return initialWorkoutPlans.filter((plan) => {
      const matchGoal = activeGoal === "All Goals" || plan.goal === activeGoal;
      const matchLevel = activeLevel === "All Levels" || plan.level === activeLevel;
      const matchSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGoal && matchLevel && matchSearch;
    });
  }, [activeGoal, activeLevel, searchTerm]);

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="wp-container">
      {/* Header */}
      <header className="wp-header">
        <div>
          <h1 className="wp-title">Workout Plans</h1>
          <p className="wp-subtitle">Build & assign training programs to members • <span>Austin HQ</span></p>
        </div>
        <div className="wp-header-actions">
          <button className="wp-btn">{Icons.export} Export</button>
          <button className="wp-btn wp-btn-primary">{Icons.plus} New Plan</button>
        </div>
      </header>

      {/* Stats */}
      <div className="wp-stats-grid">
        {stats.map((stat, i) => (
          <div className="wp-stat-card" key={i}>
            <div className={`wp-stat-icon ${stat.color}`}>{Icons[stat.icon]}</div>
            <div>
              <h3 className="wp-stat-value">{stat.value}</h3>
              <p className="wp-stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="wp-filter-bar">
        <div className="wp-goal-tabs">
          {goals.map((goal) => (
            <button
              key={goal}
              className={`wp-goal-tab ${activeGoal === goal ? "active" : ""}`}
              onClick={() => setActiveGoal(goal)}
            >
              {goal}
            </button>
          ))}
        </div>

        <div className="wp-search-controls">
          <select className="wp-select" value={activeLevel} onChange={(e) => setActiveLevel(e.target.value)}>
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <div className="wp-search-wrapper">
            <span className="wp-search-icon">{Icons.search}</span>
            <input
              type="text"
              className="wp-input"
              placeholder="Search plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="wp-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <div className="wp-card" key={plan.id}>
              <div className={`wp-card-header ${plan.color}`}>{Icons[plan.icon]}</div>
              <div className="wp-card-body">
                <div className="wp-card-badges">
                  <span className={`wp-badge ${plan.color}`}>{plan.level}</span>
                  <span className={`wp-badge ${plan.color}`}>{plan.goal}</span>
                </div>
                <h3 className="wp-card-title">{plan.title}</h3>

                <div className="wp-card-details">
                  <span>{Icons.calendar} {plan.days} days/wk</span>
                  <span>{Icons.clock} {plan.duration}</span>
                  <span>{Icons.users} {plan.members}</span>
                </div>

                <div className="wp-week-days">
                  {weekDays.map((day, idx) => (
                    <div className="wp-day-circle" key={idx}>{day}</div>
                  ))}
                </div>

                <div className="wp-card-actions">
                  <button className="wp-btn wp-btn-view">{Icons.eye} View</button>
                  <button className={`wp-btn wp-btn-assign ${plan.color}`}>{Icons.assign} Assign</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="wp-no-data">
            <h3>No plans found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlans;