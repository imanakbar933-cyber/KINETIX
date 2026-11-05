import React, { useState } from "react";
import { 
  Users, Calendar, DollarSign, Star, Search, Plus, Download, 
  LayoutGrid, List, MessageCircle, MoreVertical, UserPlus 
} from "lucide-react";
import "./TrainerManagement.css";

// ✅ Initial Data (Aapki image ke mutabik)
const initialTrainers = [
  { id: 1, name: "Daniel Foster", specialization: "Strength & Conditioning", sessions: 48, members: 32, rating: 4.9, commission: 4800, initials: "DF", color: "gold", badge: "Senior", online: true },
  { id: 2, name: "Rachel Morgan", specialization: "Yoga & Mindfulness", sessions: 41, members: 28, rating: 4.8, commission: 4100, initials: "RM", color: "purple", badge: "Certified", online: true },
  { id: 3, name: "Andre Jackson", specialization: "Cardio & HIIT", sessions: 37, members: 24, rating: 4.7, commission: 3700, initials: "AJ", color: "orange", badge: "Expert", online: true },
  { id: 4, name: "Hannah Pierce", specialization: "Pilates & Core", sessions: 34, members: 22, rating: 4.8, commission: 3400, initials: "HP", color: "pink", badge: "Certified", online: true },
  { id: 5, name: "Cameron Boyd", specialization: "CrossFit & Functional", sessions: 31, members: 21, rating: 4.5, commission: 3100, initials: "CB", color: "green", badge: "Trainer", online: true },
  { id: 6, name: "Lauren Hayes", specialization: "Zumba & Dance Fitness", sessions: 29, members: 19, rating: 4.6, commission: 2900, initials: "LH", color: "cyan", badge: "Expert", online: false },
  { id: 7, name: "Shawn Nolan", specialization: "Boxing & MMA", sessions: 27, members: 15, rating: 4.6, commission: 2700, initials: "SN", color: "yellow", badge: "Expert", online: true },
  { id: 8, name: "Isabella Romano", specialization: "Aerobics & Stretching", sessions: 20, members: 12, rating: 4.5, commission: 2000, initials: "IR", color: "blue", badge: "Junior", online: false },
];

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [filterSpecialization, setFilterSpecialization] = useState("All");
  const [sortBy, setSortBy] = useState("Sessions");

  // Search & Filter Logic
  const filteredTrainers = trainers.filter(t => 
    (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.specialization.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterSpecialization === "All" || t.specialization.includes(filterSpecialization))
  );

  // Dummy Actions for Buttons
  const handleAction = (action, name) => {
    alert(`Action: ${action} for ${name}`);
  };

  return (
    <div className="trainer-management">
      
      {/* ================= HEADER ================= */}
      <div className="trainer-header">
        <div>
          <h1>Trainer Management</h1>
          <p>8 active trainers · $26.7K total commissions this month</p>
        </div>
        <div className="trainer-header-actions">
          <div className="view-toggle">
            <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}><LayoutGrid size={16} /> Grid</button>
            <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}><List size={16} /> List</button>
          </div>
          <button className="btn-outline" onClick={() => alert("Exporting data...")}><Download size={16} /> Export</button>
          <button className="btn-primary" onClick={() => alert("Add Trainer Modal Open")}><UserPlus size={16} /> Add Trainer</button>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="trainer-stats">
        <div className="t-stat-card">
          <div className="t-stat-icon"><Users size={24} /></div>
          <div><h2>8</h2><p>ACTIVE TRAINERS</p></div>
        </div>
        <div className="t-stat-card">
          <div className="t-stat-icon"><Calendar size={24} /></div>
          <div><h2>267</h2><p>SESSIONS THIS MONTH</p></div>
        </div>
        <div className="t-stat-card">
          <div className="t-stat-icon"><DollarSign size={24} /></div>
          <div><h2>$26.7K</h2><p>TOTAL COMMISSIONS</p></div>
        </div>
        <div className="t-stat-card">
          <div className="t-stat-icon"><Star size={24} /></div>
          <div><h2>4.7</h2><p>AVG RATING</p></div>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="trainer-filters">
        <div className="t-search">
          <Search size={18} className="t-search-icon" />
          <input 
            type="text" 
            placeholder="Search trainers by name or specialization..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="t-select" value={filterSpecialization} onChange={(e) => setFilterSpecialization(e.target.value)}>
          <option value="All">All Specializations</option>
          <option value="Strength">Strength & Conditioning</option>
          <option value="Yoga">Yoga & Mindfulness</option>
          <option value="Cardio">Cardio & HIIT</option>
          <option value="Pilates">Pilates & Core</option>
        </select>
        <select className="t-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="Sessions">Sort: Sessions</option>
          <option value="Commission">Sort: Commission</option>
          <option value="Rating">Sort: Rating</option>
        </select>
      </div>

      {/* ================= TRAINER CARDS GRID ================= */}
      <div className={`trainer-grid ${viewMode}`}>
        {filteredTrainers.map((trainer) => (
          <div className={`trainer-card theme-${trainer.color}`} key={trainer.id}>
            
            {/* Top Section */}
            <div className="tc-top">
              <div className="tc-avatar-wrapper">
                <div className={`tc-avatar bg-${trainer.color}`}>{trainer.initials}</div>
                <div className={`tc-status-dot ${trainer.online ? "online" : "offline"}`}></div>
              </div>
              <div className="tc-top-right">
                <span className="tc-badge">{trainer.badge}</span>
                <div className="tc-rating"><Star size={12} fill="currentColor" /> {trainer.rating}</div>
              </div>
            </div>

            {/* Info Section */}
            <div className="tc-info">
              <h3>{trainer.name}</h3>
              <p>{trainer.specialization}</p>
            </div>

            {/* Mini Stats */}
            <div className="tc-stats-mini">
              <div><span>Sessions</span><strong>{trainer.sessions}</strong></div>
              <div><span>Members</span><strong>{trainer.members}</strong></div>
              <div><span>Rating</span><strong>{trainer.rating}</strong></div>
            </div>

            {/* Commission Section */}
            <div className="tc-commission">
              <div className="tc-comm-header">
                <span>Monthly Commission</span>
                <strong>${trainer.commission.toLocaleString()}</strong>
              </div>
              <div className="tc-progress-bar">
                <div className={`tc-progress-fill bg-${trainer.color}`} style={{ width: `${(trainer.commission / 5000) * 100}%` }}></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="tc-actions">
              <button className="tc-btn schedule" onClick={() => handleAction("View Schedule", trainer.name)}>
                <Calendar size={16} /> Schedule
              </button>
              <button className="tc-btn icon-only" onClick={() => handleAction("Message", trainer.name)}>
                <MessageCircle size={16} />
              </button>
              <button className="tc-btn icon-only" onClick={() => handleAction("More Options", trainer.name)}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
        {filteredTrainers.length === 0 && <p className="no-trainers">No trainers found.</p>}
      </div>

      {/* ================= BOTTOM SECTION (Schedule + Commission) ================= */}
      <div className="trainer-bottom-section">
        
        {/* Weekly Schedule */}
        <div className="schedule-table-card">
          <div className="card-header">
            <h3>This Week's Schedule</h3>
            <span>Mon 13 - Sun 19 Jul</span>
          </div>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>TRAINER</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th>
              </tr>
            </thead>
            <tbody>
              {trainers.slice(0, 5).map(t => (
                <tr key={t.id}>
                  <td className="td-trainer">{t.name.split(' ')[0]} {t.name.split(' ')[1]?.[0]}.</td>
                  <td><span className={`slot bg-${t.color}`}>6AM</span></td>
                  <td><span className="slot empty">—</span></td>
                  <td><span className={`slot bg-${t.color}`}>6AM</span></td>
                  <td><span className={`slot bg-${t.color}`}>7PM</span></td>
                  <td><span className="slot empty">—</span></td>
                  <td><span className={`slot bg-${t.color}`}>9AM</span></td>
                  <td><span className="slot empty">—</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Commission Board */}
        <div className="commission-board-card">
          <div className="card-header">
            <h3>Commission Board</h3>
            <span>July 2026</span>
          </div>
          <div className="commission-list">
            {trainers.slice(0, 5).map((t, index) => (
              <div className="comm-item" key={t.id}>
                <span className="comm-rank">{index + 1}</span>
                <div className={`comm-avatar bg-${t.color}`}>{t.initials}</div>
                <div className="comm-info">
                  <h4>{t.name}</h4>
                  <p>{t.sessions} sessions · {t.members} members</p>
                </div>
                <div className="comm-amount">
                  <strong>${t.commission.toLocaleString()}</strong>
                  <span className={index % 2 === 0 ? "text-green" : "text-red"}>
                    {index % 2 === 0 ? "↑ 12%" : "↓ 2%"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="commission-total">
            <span>Total this month</span>
            <strong>$26,700</strong>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TrainerManagement;