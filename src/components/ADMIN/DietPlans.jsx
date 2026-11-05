import React, { useState, useMemo } from "react";
import "./DietPlans.css";

// --- MOCK DATA ---
const initialDietPlans = [
  {
    id: 1,
    title: "Lean Cut 1600",
    goal: "Weight Loss",
    type: "Non-Vegetarian",
    calories: 1600,
    macros: { protein: 140, carbs: 120, fats: 45 },
    members: 62,
    status: "active",
  },
  {
    id: 2,
    title: "Mass Builder 3000",
    goal: "Muscle Gain",
    type: "Non-Vegetarian",
    calories: 3000,
    macros: { protein: 210, carbs: 320, fats: 90 },
    members: 38,
    status: "active",
  },
  {
    id: 3,
    title: "Veg Shred 1800",
    goal: "Weight Loss",
    type: "Vegetarian",
    calories: 1800,
    macros: { protein: 110, carbs: 180, fats: 55 },
    members: 44,
    status: "active",
  },
  {
    id: 4,
    title: "Maintenance 2200",
    goal: "Maintenance",
    type: "Non-Vegetarian",
    calories: 2200,
    macros: { protein: 160, carbs: 220, fats: 70 },
    members: 25,
    status: "active",
  },
  {
    id: 5,
    title: "Keto Kickstart",
    goal: "Keto",
    type: "Non-Vegetarian",
    calories: 2000,
    macros: { protein: 150, carbs: 30, fats: 140 },
    members: 19,
    status: "active",
  },
  {
    id: 6,
    title: "Vegan Muscle 2600",
    goal: "Muscle Gain",
    type: "Vegan",
    calories: 2600,
    macros: { protein: 180, carbs: 280, fats: 80 },
    members: 12,
    status: "active",
  },
];

const stats = [
  { label: "TOTAL PLANS", value: "9", icon: "document", color: "gold" },
  { label: "MEMBERS ASSIGNED", value: "352", icon: "users", color: "gold" },
  { label: "AVG CALORIES", value: "2,089", icon: "fire", color: "gold" },
  { label: "VEGETARIAN PLANS", value: "4", icon: "leaf", color: "gold" },
];

const goalTabs = ["All Goals", "Weight Loss", "Muscle Gain", "Maintenance", "Keto"];
const dietTypes = ["All Types", "Vegetarian", "Non-Vegetarian", "Vegan"];

// --- ICONS (SVG) ---
const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  export: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  assign: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>,
  fire: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
  leaf: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 7-7 5 0 9 4 9 9a7 7 0 0 1-7 7z"></path><path d="M4 13c3-4 8-6 12-6"></path></svg>,
  document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  dots: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>,
};

// --- COMPONENTS ---

const StatCard = ({ stat }) => (
  <div className="dp-stat-card">
    <div className={`dp-stat-icon ${stat.color}`}>{Icons[stat.icon]}</div>
    <div>
      <p className="dp-stat-value">{stat.value}</p>
      <p className="dp-stat-label">{stat.label}</p>
    </div>
  </div>
);

const DietCard = ({ plan }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "Vegetarian": return "green";
      case "Non-Vegetarian": return "red";
      case "Vegan": return "emerald";
      default: return "gray";
    }
  };

  // Macro progress percentages (example logic, adjust as needed)
  const proteinPct = Math.min((plan.macros.protein / 250) * 100, 100);
  const carbsPct = Math.min((plan.macros.carbs / 350) * 100, 100);
  const fatsPct = Math.min((plan.macros.fats / 150) * 100, 100);

  // Circular progress calculation
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  // Assume max calories for progress is 3500
  const caloriePct = Math.min((plan.calories / 3500) * 100, 100);
  const strokeDashoffset = circumference - (caloriePct / 100) * circumference;

  return (
    <div className="dp-card">
      <div className="dp-card-top">
        <div className={`dp-badge dp-badge-goal`}>
          <span className="dp-badge-dot" /> {plan.goal}
        </div>
        <div className={`dp-badge dp-badge-type ${getTypeColor(plan.type)}`}>
          {plan.type}
        </div>
        <button className="dp-dots-btn">{Icons.dots}</button>
      </div>

      <h3 className="dp-card-title">{plan.title}</h3>

      <div className="dp-card-body">
        {/* Circular Progress */}
        <div className="dp-circle-wrapper">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle
              className="dp-circle-bg"
              cx="45"
              cy="45"
              r={radius}
              strokeWidth="8"
              fill="none"
            />
            <circle
              className="dp-circle-fill"
              cx="45"
              cy="45"
              r={radius}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="dp-circle-text">
            <span className="dp-circle-value">{plan.calories}</span>
            <span className="dp-circle-unit">KCAL</span>
          </div>
        </div>

        {/* Macros */}
        <div className="dp-macros">
          <div className="dp-macro-bar-group">
            <div className="dp-macro-bar">
              <div className="dp-macro-segment protein" style={{ width: `${proteinPct}%` }} />
              <div className="dp-macro-segment carbs" style={{ width: `${carbsPct}%` }} />
              <div className="dp-macro-segment fats" style={{ width: `${fatsPct}%` }} />
            </div>
          </div>
          <div className="dp-macro-values">
            <span><strong>P</strong> {plan.macros.protein}g</span>
            <span><strong>C</strong> {plan.macros.carbs}g</span>
            <span><strong>F</strong> {plan.macros.fats}g</span>
          </div>
        </div>
      </div>

      <div className="dp-card-footer">
        <div className="dp-members">
          {Icons.users} {plan.members} members assigned
        </div>
        <div className="dp-actions">
          <button className="dp-btn dp-btn-view">{Icons.eye} View</button>
          <button className="dp-btn dp-btn-assign">{Icons.assign} Assign</button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const DietPlans = () => {
  const [activeGoal, setActiveGoal] = useState("All Goals");
  const [activeType, setActiveType] = useState("All Types");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = useMemo(() => {
    return initialDietPlans.filter((plan) => {
      const matchGoal = activeGoal === "All Goals" || plan.goal === activeGoal;
      const matchType = activeType === "All Types" || plan.type === activeType;
      const matchSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGoal && matchType && matchSearch;
    });
  }, [activeGoal, activeType, searchTerm]);

  return (
    <div className="dp-container">
      {/* Header */}
      <header className="dp-header">
        <div>
          <h1 className="dp-title">Diet Plans</h1>
          <p className="dp-subtitle">
            Nutrition programs, macros & meal plans • <span>Austin HQ</span>
          </p>
        </div>
        <div className="dp-header-actions">
          <button className="dp-btn dp-btn-outline">{Icons.export} Export</button>
          <button className="dp-btn dp-btn-primary">{Icons.plus} New Diet Plan</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="dp-stats-grid">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      {/* Filter Bar */}
      <div className="dp-filter-bar">
        <div className="dp-goal-tabs">
          {goalTabs.map((goal) => (
            <button
              key={goal}
              className={`dp-goal-tab ${activeGoal === goal ? "active" : ""}`}
              onClick={() => setActiveGoal(goal)}
            >
              {goal}
            </button>
          ))}
        </div>

        <div className="dp-search-controls">
          <select
            className="dp-select"
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
          >
            {dietTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="dp-search-wrapper">
            <span className="dp-search-icon">{Icons.search}</span>
            <input
              type="text"
              className="dp-input"
              placeholder="Search plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Diet Plans Grid */}
      <div className="dp-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <DietCard key={plan.id} plan={plan} />
          ))
        ) : (
          <div className="dp-no-data">
            <h3>No diet plans found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlans;