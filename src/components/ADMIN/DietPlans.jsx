import React, { useState, useMemo } from "react";
import "./DietPlans.css";

// --- MOCK DATA ---
const initialDietPlans = [
  { id: 1, title: "Lean Cut 1600", goal: "Weight Loss", type: "Non-Vegetarian", calories: 1600, macros: { protein: 140, carbs: 120, fats: 45 }, members: 62 },
  { id: 2, title: "Mass Builder 3000", goal: "Muscle Gain", type: "Non-Vegetarian", calories: 3000, macros: { protein: 210, carbs: 320, fats: 90 }, members: 38 },
  { id: 3, title: "Veg Shred 1800", goal: "Weight Loss", type: "Vegetarian", calories: 1800, macros: { protein: 110, carbs: 180, fats: 55 }, members: 44 },
  { id: 4, title: "Maintenance 2200", goal: "Maintenance", type: "Non-Vegetarian", calories: 2200, macros: { protein: 160, carbs: 220, fats: 70 }, members: 25 },
  { id: 5, title: "Keto Kickstart", goal: "Keto", type: "Non-Vegetarian", calories: 2000, macros: { protein: 150, carbs: 30, fats: 140 }, members: 19 },
  { id: 6, title: "Vegan Muscle 2600", goal: "Muscle Gain", type: "Vegan", calories: 2600, macros: { protein: 180, carbs: 280, fats: 80 }, members: 12 },
];

const goalTabs = ["All Goals", "Weight Loss", "Muscle Gain", "Maintenance", "Keto"];
const dietTypes = ["All Types", "Vegetarian", "Non-Vegetarian", "Vegan"];

const mockMembers = [
  { id: 101, name: "Ali Khan", email: "ali@example.com", avatar: "AK" },
  { id: 102, name: "Sara Ahmed", email: "sara@example.com", avatar: "SA" },
  { id: 103, name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: 104, name: "Zainab Tariq", email: "zainab@example.com", avatar: "ZT" },
  { id: 105, name: "Usman Raza", email: "usman@example.com", avatar: "UR" },
];

const Icons = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  assign: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>,
  fire: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
  leaf: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 7-7 5 0 9 4 9 9a7 7 0 0 1-7 7z"></path><path d="M4 13c3-4 8-6 12-6"></path></svg>,
  document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  dots: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>,
  close: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  check: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

const DietCard = ({ plan, onView, onAssign }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "Vegetarian": return "green";
      case "Non-Vegetarian": return "red";
      case "Vegan": return "cyan";
      default: return "gray";
    }
  };

  const proteinPct = Math.min((plan.macros.protein / 250) * 100, 100);
  const carbsPct = Math.min((plan.macros.carbs / 350) * 100, 100);
  const fatsPct = Math.min((plan.macros.fats / 150) * 100, 100);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
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
        <div className="dp-circle-wrapper">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle className="dp-circle-bg" cx="45" cy="45" r={radius} strokeWidth="8" fill="none" />
            <circle className="dp-circle-fill" cx="45" cy="45" r={radius} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
          </svg>
          <div className="dp-circle-text">
            <span className="dp-circle-value">{plan.calories}</span>
            <span className="dp-circle-unit">KCAL</span>
          </div>
        </div>

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
          <button className="dp-btn dp-btn-view" onClick={() => onView(plan)}>
            {Icons.eye} View
          </button>
          <button className="dp-btn dp-btn-assign" onClick={() => onAssign(plan)}>
            {Icons.assign} Assign
          </button>
        </div>
      </div>
    </div>
  );
};

const DietPlans = () => {
  const [plansData, setPlansData] = useState(initialDietPlans);
  const [activeGoal, setActiveGoal] = useState("All Goals");
  const [activeType, setActiveType] = useState("All Types");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal States
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view' | 'assign' | 'add'
  const [assignedMembers, setAssignedMembers] = useState({});

  // New Plan Form State
  const [newPlanData, setNewPlanData] = useState({
    title: "", goal: "Weight Loss", type: "Non-Vegetarian", calories: "", protein: "", carbs: "", fats: ""
  });

  // Dynamic Stats based on plansData
  const dynamicStats = [
    { label: "TOTAL PLANS", value: plansData.length.toString(), icon: "document", color: "accent" },
    { label: "MEMBERS ASSIGNED", value: "352", icon: "users", color: "cyan" }, // Could be dynamic too
    { label: "AVG CALORIES", value: "2,089", icon: "fire", color: "purple" },
    { label: "VEGETARIAN PLANS", value: plansData.filter(p => p.type === "Vegetarian" || p.type === "Vegan").length.toString(), icon: "leaf", color: "accent" },
  ];

  const filteredPlans = useMemo(() => {
    return plansData.filter((plan) => {
      const matchGoal = activeGoal === "All Goals" || plan.goal === activeGoal;
      const matchType = activeType === "All Types" || plan.type === activeType;
      const matchSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGoal && matchType && matchSearch;
    });
  }, [plansData, activeGoal, activeType, searchTerm]);

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedPlan(null);
  };

  const handleAssignMember = (memberId) => {
    if (!selectedPlan) return;
    const currentAssigned = assignedMembers[selectedPlan.id] || [];
    if (currentAssigned.includes(memberId)) return;

    setAssignedMembers(prev => ({
      ...prev,
      [selectedPlan.id]: [...currentAssigned, memberId]
    }));

    setPlansData(prevPlans => 
      prevPlans.map(p => p.id === selectedPlan.id ? { ...p, members: p.members + 1 } : p)
    );
    setSelectedPlan(prev => ({ ...prev, members: prev.members + 1 }));
  };

  const handleAddNewPlan = (e) => {
    e.preventDefault();
    const newPlan = {
      id: Date.now(),
      title: newPlanData.title,
      goal: newPlanData.goal,
      type: newPlanData.type,
      calories: Number(newPlanData.calories),
      macros: {
        protein: Number(newPlanData.protein),
        carbs: Number(newPlanData.carbs),
        fats: Number(newPlanData.fats)
      },
      members: 0
    };
    
    setPlansData([newPlan, ...plansData]); // Add to top of list
    setModalType(null); // Close modal
    
    // Reset form
    setNewPlanData({ title: "", goal: "Weight Loss", type: "Non-Vegetarian", calories: "", protein: "", carbs: "", fats: "" });
  };

  return (
    <div className="dp-container">
      <header className="dp-header">
        <div>
          <h1 className="dp-title">Diet Plans</h1>
          <p className="dp-subtitle">Nutrition programs, macros & meal plans • <span>Austin HQ</span></p>
        </div>
        <div className="dp-header-actions">
          {/* Export button removed */}
          <button className="dp-btn dp-btn-primary" onClick={() => setModalType('add')}>
            {Icons.plus} New Diet Plan
          </button>
        </div>
      </header>

      <div className="dp-stats-grid">
        {dynamicStats.map((stat, i) => (
          <div className="dp-stat-card" key={i}>
            <div className={`dp-stat-icon ${stat.color}`}>{Icons[stat.icon]}</div>
            <div>
              <p className="dp-stat-value">{stat.value}</p>
              <p className="dp-stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dp-filter-bar">
        <div className="dp-goal-tabs">
          {goalTabs.map((goal) => (
            <button key={goal} className={`dp-goal-tab ${activeGoal === goal ? "active" : ""}`} onClick={() => setActiveGoal(goal)}>
              {goal}
            </button>
          ))}
        </div>

        <div className="dp-search-controls">
          <select className="dp-select" value={activeType} onChange={(e) => setActiveType(e.target.value)}>
            {dietTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <div className="dp-search-wrapper">
            <span className="dp-search-icon">{Icons.search}</span>
            <input type="text" className="dp-input" placeholder="Search plan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="dp-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <DietCard 
              key={plan.id} 
              plan={plan} 
              onView={(p) => { setSelectedPlan(p); setModalType('view'); }}
              onAssign={(p) => { setSelectedPlan(p); setModalType('assign'); }}
            />
          ))
        ) : (
          <div className="dp-no-data"><h3>No diet plans found</h3><p>Try adjusting your filters.</p></div>
        )}
      </div>

      {/* VIEW MODAL */}
      {modalType === 'view' && selectedPlan && (
        <div className="dp-modal-overlay" onClick={handleCloseModal}>
          <div className="dp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="dp-modal-header">
              <h2>{selectedPlan.title} - Details</h2>
              <button className="dp-modal-close" onClick={handleCloseModal}>{Icons.close}</button>
            </div>
            <div className="dp-modal-body">
              <div className="dp-modal-stats">
                <div className="dp-modal-stat-box">
                  <span>Calories</span>
                  <strong>{selectedPlan.calories} kcal</strong>
                </div>
                <div className="dp-modal-stat-box">
                  <span>Goal</span>
                  <strong>{selectedPlan.goal}</strong>
                </div>
                <div className="dp-modal-stat-box">
                  <span>Type</span>
                  <strong>{selectedPlan.type}</strong>
                </div>
              </div>
              
              <h3 className="dp-modal-subtitle">Macro Breakdown</h3>
              <div className="dp-modal-macros">
                <div className="dp-modal-macro-item">
                  <div className="dp-macro-label"><span className="dot protein"></span> Protein</div>
                  <div className="dp-macro-value">{selectedPlan.macros.protein}g</div>
                </div>
                <div className="dp-modal-macro-item">
                  <div className="dp-macro-label"><span className="dot carbs"></span> Carbs</div>
                  <div className="dp-macro-value">{selectedPlan.macros.carbs}g</div>
                </div>
                <div className="dp-modal-macro-item">
                  <div className="dp-macro-label"><span className="dot fats"></span> Fats</div>
                  <div className="dp-macro-value">{selectedPlan.macros.fats}g</div>
                </div>
              </div>
            </div>
            <div className="dp-modal-footer">
              <button className="dp-btn dp-btn-outline" onClick={handleCloseModal}>Close</button>
              <button className="dp-btn dp-btn-primary" onClick={() => { setModalType('assign'); }}>Assign to Member</button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN MODAL */}
      {modalType === 'assign' && selectedPlan && (
        <div className="dp-modal-overlay" onClick={handleCloseModal}>
          <div className="dp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="dp-modal-header">
              <h2>Assign: {selectedPlan.title}</h2>
              <button className="dp-modal-close" onClick={handleCloseModal}>{Icons.close}</button>
            </div>
            <div className="dp-modal-body">
              <div className="dp-member-search">
                <span className="dp-search-icon">{Icons.search}</span>
                <input type="text" placeholder="Search members..." />
              </div>
              
              <div className="dp-members-list">
                {mockMembers.map(member => {
                  const isAssigned = (assignedMembers[selectedPlan.id] || []).includes(member.id);
                  return (
                    <div key={member.id} className="dp-member-item">
                      <div className="dp-member-info">
                        <div className="dp-avatar">{member.avatar}</div>
                        <div>
                          <h4>{member.name}</h4>
                          <p>{member.email}</p>
                        </div>
                      </div>
                      <button 
                        className={`dp-btn-assign-small ${isAssigned ? 'assigned' : ''}`}
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
        <div className="dp-modal-overlay" onClick={handleCloseModal}>
          <div className="dp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="dp-modal-header">
              <h2>Create New Diet Plan</h2>
              <button className="dp-modal-close" onClick={handleCloseModal}>{Icons.close}</button>
            </div>
            <form onSubmit={handleAddNewPlan}>
              <div className="dp-modal-body">
                <div className="dp-form-group">
                  <label>Plan Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Lean Bulk 2500"
                    value={newPlanData.title} 
                    onChange={e => setNewPlanData({...newPlanData, title: e.target.value})} 
                  />
                </div>
                
                <div className="dp-form-row">
                  <div className="dp-form-group">
                    <label>Goal</label>
                    <select value={newPlanData.goal} onChange={e => setNewPlanData({...newPlanData, goal: e.target.value})}>
                      {goalTabs.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="dp-form-group">
                    <label>Diet Type</label>
                    <select value={newPlanData.type} onChange={e => setNewPlanData({...newPlanData, type: e.target.value})}>
                      {dietTypes.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="dp-form-group">
                  <label>Total Calories (kcal)</label>
                  <input 
                    type="number" 
                    required 
                    min="500" 
                    placeholder="e.g. 2500"
                    value={newPlanData.calories} 
                    onChange={e => setNewPlanData({...newPlanData, calories: e.target.value})} 
                  />
                </div>

                <h3 className="dp-modal-subtitle" style={{ marginTop: "10px" }}>Macros (in grams)</h3>
                <div className="dp-form-row">
                  <div className="dp-form-group">
                    <label>Protein (g)</label>
                    <input type="number" required min="0" value={newPlanData.protein} onChange={e => setNewPlanData({...newPlanData, protein: e.target.value})} />
                  </div>
                  <div className="dp-form-group">
                    <label>Carbs (g)</label>
                    <input type="number" required min="0" value={newPlanData.carbs} onChange={e => setNewPlanData({...newPlanData, carbs: e.target.value})} />
                  </div>
                  <div className="dp-form-group">
                    <label>Fats (g)</label>
                    <input type="number" required min="0" value={newPlanData.fats} onChange={e => setNewPlanData({...newPlanData, fats: e.target.value})} />
                  </div>
                </div>

              </div>
              <div className="dp-modal-footer">
                <button type="button" className="dp-btn dp-btn-outline" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="dp-btn dp-btn-primary">Save Diet Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DietPlans;