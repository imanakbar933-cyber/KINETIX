import React, { useState, useMemo, useEffect } from "react";
import "./WorkoutPlans.css";

// --- MOCK DATA ---
const initialWorkoutPlans = [
  { 
    id: 1, title: "Hypertrophy Builder", level: "Intermediate", goal: "Muscle Gain", 
    days: 5, duration: "8 weeks", activeDays: [0, 1, 2, 3, 4], 
    exercises: ["Bench Press 4x8", "Incline Dumbbell 3x10", "Cable Fly 3x12", "Tricep Pushdown 4x15"] 
  },
  { 
    id: 2, title: "Shred & Burn", level: "Beginner", goal: "Fat Loss", 
    days: 4, duration: "6 weeks", activeDays: [0, 2, 4, 6], 
    exercises: ["HIIT Treadmill 20m", "Kettlebell Swings 4x15", "Burpees 3x20", "Mountain Climbers 3x30s"] 
  },
  { 
    id: 3, title: "Powerlifting 5x5", level: "Advanced", goal: "Strength", 
    days: 3, duration: "12 weeks", activeDays: [1, 3, 5], 
    exercises: ["Squats 5x5", "Deadlifts 5x5", "Overhead Press 5x5", "Barbell Rows 5x5"] 
  },
];

const mockMembers = [
  { id: 101, name: "Ali Khan", email: "ali@example.com", avatar: "AK" },
  { id: 102, name: "Sara Ahmed", email: "sara@example.com", avatar: "SA" },
  { id: 103, name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: 104, name: "Zainab Tariq", email: "zainab@example.com", avatar: "ZT" },
  { id: 105, name: "Usman Raza", email: "usman@example.com", avatar: "UR" },
];

const goals = ["All Goals", "Muscle Gain", "Fat Loss", "Strength", "Endurance", "Mobility"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  assign: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>,
  dumbbell: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5h11"></path><path d="M6.5 17.5h11"></path><path d="M3 10.5h18"></path><path d="M3 13.5h18"></path><path d="M6 6.5v11"></path><path d="M18 6.5v11"></path></svg>,
  fire: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
  bolt: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  star: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  close: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  clock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  calendar: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
};

const WorkoutCard = ({ plan, assignedCount, onView, onAssign }) => {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  const getIcon = (title) => {
    if (title.includes("Shred") || title.includes("Burn")) return Icons.fire;
    if (title.includes("Power")) return Icons.bolt;
    return Icons.dumbbell;
  };

  return (
    <div className="wp-card">
      <div className="wp-card-header">
        <div className="wp-card-icon">{getIcon(plan.title)}</div>
      </div>

      <div className="wp-card-body">
        <div className="wp-card-badges">
          <span className="wp-badge level">{plan.level}</span>
          <span className="wp-badge goal">{plan.goal}</span>
        </div>
        
        <h3 className="wp-card-title">{plan.title}</h3>

        <div className="wp-card-details">
          <span>{Icons.calendar} {plan.days} days/wk</span>
          <span>{Icons.clock} {plan.duration}</span>
          <span>{Icons.users} {assignedCount}</span>
        </div>

        <div className="wp-week-days">
          {weekDays.map((day, idx) => {
            const isActive = plan.activeDays.includes(idx);
            return (
              <div className={`wp-day-circle ${isActive ? 'active' : ''}`} key={idx}>
                {day}
              </div>
            );
          })}
        </div>

        <div className="wp-card-actions">
          <button className="wp-btn wp-btn-view" onClick={() => onView(plan)}>
            {Icons.eye} View
          </button>
          <button className="wp-btn wp-btn-assign" onClick={() => onAssign(plan)}>
            {Icons.assign} Assign
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkoutPlans = () => {
  // LocalStorage keys updated to v2 to avoid old cache issues
  const [plansData, setPlansData] = useState(() => {
    const saved = localStorage.getItem("wp_plansData_v2");
    return saved ? JSON.parse(saved) : initialWorkoutPlans;
  });

  const [assignedMembers, setAssignedMembers] = useState(() => {
    const saved = localStorage.getItem("wp_assignedMembers_v2");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeGoal, setActiveGoal] = useState("All Goals");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [newPlanData, setNewPlanData] = useState({
    title: "", level: "Beginner", goal: "Muscle Gain", duration: "4 weeks", days: 3, activeDays: [0, 2, 4]
  });

  useEffect(() => {
    localStorage.setItem("wp_plansData_v2", JSON.stringify(plansData));
  }, [plansData]);

  useEffect(() => {
    localStorage.setItem("wp_assignedMembers_v2", JSON.stringify(assignedMembers));
  }, [assignedMembers]);

  const filteredPlans = useMemo(() => {
    return plansData.filter((plan) => {
      const matchGoal = activeGoal === "All Goals" || plan.goal === activeGoal;
      const matchLevel = activeLevel === "All Levels" || plan.level === activeLevel;
      const matchSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGoal && matchLevel && matchSearch;
    });
  }, [plansData, activeGoal, activeLevel, searchTerm]);

  // 👇 Calculate TOTAL ASSIGNMENTS (Sum of all members across all plans)
  const totalAssignments = useMemo(() => {
    return Object.values(assignedMembers).reduce((sum, arr) => sum + arr.length, 0);
  }, [assignedMembers]);

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedPlan(null);
  };

  const handleAssignMember = (memberId) => {
    if (!selectedPlan) return;
    
    // Explicitly capture the plan ID to avoid any closure issues
    const currentPlanId = selectedPlan.id;

    setAssignedMembers(prev => {
      const currentAssigned = prev[currentPlanId] || [];
      if (currentAssigned.includes(memberId)) return prev; // Prevent duplicates

      return {
        ...prev,
        [currentPlanId]: [...currentAssigned, memberId]
      };
    });
  };

  const handleAddNewPlan = (e) => {
    e.preventDefault();
    const newPlan = {
      id: Date.now(), 
      title: newPlanData.title,
      level: newPlanData.level,
      goal: newPlanData.goal,
      duration: newPlanData.duration,
      days: newPlanData.days,
      activeDays: newPlanData.activeDays.sort((a,b) => a-b),
      exercises: ["Custom Exercise 1", "Custom Exercise 2"] 
    };
    
    setPlansData([newPlan, ...plansData]);
    setModalType(null);
    setNewPlanData({ title: "", level: "Beginner", goal: "Muscle Gain", duration: "4 weeks", days: 3, activeDays: [0, 2, 4] });
  };

  const getAssignedMembersForSelectedPlan = () => {
    if (!selectedPlan) return [];
    const ids = assignedMembers[selectedPlan.id] || [];
    return mockMembers.filter(m => ids.includes(m.id));
  };

  const dynamicStats = [
    { label: "TOTAL PLANS", value: plansData.length.toString(), icon: "document", color: "cyan" },
    { label: "TOTAL ASSIGNMENTS", value: totalAssignments.toString(), icon: "users", color: "purple" }, // 👈 Now shows total assignments
    { label: "EXERCISES LIBRARY", value: "244", icon: "dumbbell", color: "accent" },
    { label: "MOST POPULAR", value: "Beginner", icon: "star", color: "cyan" },
  ];

  return (
    <div className="wp-container">
      <header className="wp-header">
        <div>
          <h1 className="wp-title">Workout Plans</h1>
          <p className="wp-subtitle">Build & assign training programs to members • <span>Austin HQ</span></p>
        </div>
        
        <div className="wp-header-actions">
          <button className="wp-btn wp-btn-primary" onClick={() => setModalType('add')}>
            {Icons.plus} New Plan
          </button>
        </div>
      </header>

      <div className="wp-stats-grid">
        {dynamicStats.map((stat, i) => (
          <div className="wp-stat-card" key={i}>
            <div className={`wp-stat-icon ${stat.color}`}>{Icons[stat.icon]}</div>
            <div>
              <p className="wp-stat-value">{stat.value}</p>
              <p className="wp-stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="wp-filter-bar">
        <div className="wp-goal-tabs">
          {goals.map((goal) => (
            <button key={goal} className={`wp-goal-tab ${activeGoal === goal ? "active" : ""}`} onClick={() => setActiveGoal(goal)}>
              {goal}
            </button>
          ))}
        </div>

        <div className="wp-search-controls">
          <select className="wp-select" value={activeLevel} onChange={(e) => setActiveLevel(e.target.value)}>
            {levels.map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
          <div className="wp-search-wrapper">
            <span className="wp-search-icon">{Icons.search}</span>
            <input type="text" className="wp-input" placeholder="Search plan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="wp-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <WorkoutCard 
              key={plan.id} 
              plan={plan} 
              assignedCount={(assignedMembers[plan.id] || []).length} // 👈 Accurate per-plan count
              onView={(p) => { setSelectedPlan(p); setModalType('view'); }}
              onAssign={(p) => { setSelectedPlan(p); setModalType('assign'); }}
            />
          ))
        ) : (
          <div className="wp-no-data"><h3>No plans found</h3><p>Try adjusting your filters.</p></div>
        )}
      </div>

      {/* VIEW MODAL */}
      {modalType === 'view' && selectedPlan && (
        <div className="wp-modal-overlay" onClick={handleCloseModal}>
          <div className="wp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="wp-modal-header">
              <h2>{selectedPlan.title} - Details</h2>
              <button className="wp-modal-close" onClick={handleCloseModal}>{Icons.close}</button>
            </div>
            <div className="wp-modal-body">
              <div className="wp-modal-stats">
                <div className="wp-modal-stat-box">
                  <span>Level</span>
                  <strong>{selectedPlan.level}</strong>
                </div>
                <div className="wp-modal-stat-box">
                  <span>Goal</span>
                  <strong>{selectedPlan.goal}</strong>
                </div>
                <div className="wp-modal-stat-box">
                  <span>Duration</span>
                  <strong>{selectedPlan.duration}</strong>
                </div>
              </div>
              
              <h3 className="wp-modal-subtitle">Exercises Breakdown</h3>
              <div className="wp-exercise-list">
                {selectedPlan.exercises.map((ex, i) => (
                  <div key={i} className="wp-exercise-item">
                    <span className="wp-exercise-dot"></span>
                    {ex}
                  </div>
                ))}
              </div>

              <h3 className="wp-modal-subtitle" style={{ marginTop: "20px" }}>
                Assigned Members ({(assignedMembers[selectedPlan.id] || []).length})
              </h3>
              <div className="wp-assigned-list">
                {getAssignedMembersForSelectedPlan().length > 0 ? (
                  getAssignedMembersForSelectedPlan().map(member => (
                    <div key={member.id} className="wp-assigned-member-item">
                      <div className="wp-avatar-sm">{member.avatar}</div>
                      <span>{member.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="wp-empty-text">No members assigned to this workout yet.</p>
                )}
              </div>

            </div>
            <div className="wp-modal-footer">
              <button className="wp-btn wp-btn-outline" onClick={handleCloseModal}>Close</button>
              <button className="wp-btn wp-btn-primary" onClick={() => setModalType('assign')}>Assign Member</button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN MODAL */}
      {modalType === 'assign' && selectedPlan && (
        <div className="wp-modal-overlay" onClick={handleCloseModal}>
          <div className="wp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="wp-modal-header">
              <h2>Assign: {selectedPlan.title}</h2>
              <button className="wp-modal-close" onClick={handleCloseModal}>{Icons.close}</button>
            </div>
            <div className="wp-modal-body">
              <div className="wp-member-search">
                <span className="wp-search-icon">{Icons.search}</span>
                <input type="text" placeholder="Search members..." />
              </div>
              
              <div className="wp-members-list">
                {mockMembers.map(member => {
                  // 👇 Check exact plan ID
                  const isAssigned = (assignedMembers[selectedPlan.id] || []).includes(member.id);
                  return (
                    <div key={member.id} className="wp-member-item">
                      <div className="wp-member-info">
                        <div className="wp-avatar">{member.avatar}</div>
                        <div>
                          <h4>{member.name}</h4>
                          <p>{member.email}</p>
                        </div>
                      </div>
                      <button 
                        className={`wp-btn-assign-small ${isAssigned ? 'assigned' : ''}`}
                        onClick={() => handleAssignMember(member.id)}
                        disabled={isAssigned}
                      >
                        {isAssigned ? <>{Icons.check} Assigned</> : <>{Icons.assign} Assign</>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW PLAN MODAL */}
      {modalType === 'add' && (
        <div className="wp-modal-overlay" onClick={handleCloseModal}>
          <div className="wp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="wp-modal-header">
              <h2>Create New Workout Plan</h2>
              <button className="wp-modal-close" onClick={handleCloseModal}>{Icons.close}</button>
            </div>
            <form onSubmit={handleAddNewPlan}>
              <div className="wp-modal-body">
                <div className="wp-form-group">
                  <label>Plan Title</label>
                  <input type="text" required placeholder="e.g. Full Body Blast" value={newPlanData.title} onChange={e => setNewPlanData({...newPlanData, title: e.target.value})} />
                </div>
                
                <div className="wp-form-row">
                  <div className="wp-form-group">
                    <label>Level</label>
                    <select value={newPlanData.level} onChange={e => setNewPlanData({...newPlanData, level: e.target.value})}>
                      {levels.slice(1).map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="wp-form-group">
                    <label>Goal</label>
                    <select value={newPlanData.goal} onChange={e => setNewPlanData({...newPlanData, goal: e.target.value})}>
                      {goals.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div className="wp-form-row">
                  <div className="wp-form-group">
                    <label>Duration</label>
                    <input type="text" required placeholder="e.g. 6 weeks" value={newPlanData.duration} onChange={e => setNewPlanData({...newPlanData, duration: e.target.value})} />
                  </div>
                  <div className="wp-form-group">
                    <label>Total Days / Wk</label>
                    <input type="number" required min="1" max="7" value={newPlanData.days} onChange={e => setNewPlanData({...newPlanData, days: parseInt(e.target.value)})} />
                  </div>
                </div>

                <div className="wp-form-group">
                  <label>Active Days</label>
                  <div className="wp-day-checkboxes">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                      <label key={idx} className={`wp-day-checkbox ${newPlanData.activeDays.includes(idx) ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={newPlanData.activeDays.includes(idx)}
                          onChange={(e) => {
                            const updatedDays = e.target.checked
                              ? [...newPlanData.activeDays, idx]
                              : newPlanData.activeDays.filter(d => d !== idx);
                            setNewPlanData({...newPlanData, activeDays: updatedDays});
                          }}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="wp-modal-footer">
                <button type="button" className="wp-btn wp-btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="wp-btn wp-btn-primary">Save Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default WorkoutPlans;