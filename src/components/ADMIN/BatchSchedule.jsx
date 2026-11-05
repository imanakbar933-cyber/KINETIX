import React, { useState } from "react";
import { 
  Plus, Search, Calendar, Users, Activity, Flame, 
  LayoutGrid, ChevronLeft, ChevronRight, User, X, Trash2 
} from "lucide-react";
import "./BatchSchedule.css";

// ✅ Initial Data
const initialScheduleData = [
  { day: "MON", date: 13, classes: [
    { id: 1, time: "06:00 AM", title: "Sunrise Yoga", trainer: "Rachel Morgan", type: "Yoga", duration: "60 min", booked: 18, capacity: 20, color: "orange" },
    { id: 2, time: "08:00 AM", title: "HIIT Burn", trainer: "Andre Jackson", type: "HIIT", duration: "45 min", booked: 15, capacity: 20, color: "orange" }
  ]},
  { day: "TUE", date: 14, classes: [
    { id: 3, time: "07:00 AM", title: "Spin Cardio", trainer: "Lauren Hayes", type: "Cardio", duration: "50 min", booked: 15, capacity: 20, color: "green" },
    { id: 4, time: "05:30 PM", title: "Zumba Party", trainer: "Daniel Foster", type: "Zumba", duration: "60 min", booked: 22, capacity: 25, color: "orange" }
  ]},
  { day: "WED", date: 15, classes: [
    { id: 5, time: "06:30 AM", title: "Vinyasa Flow", trainer: "Rachel Morgan", type: "Yoga", duration: "60 min", booked: 10, capacity: 20, color: "green" },
    { id: 6, time: "07:30 AM", title: "Tabata HIIT", trainer: "Andre Jackson", type: "HIIT", duration: "45 min", booked: 20, capacity: 20, color: "green" }
  ]},
  { day: "THU", date: 16, classes: [
    { id: 7, time: "08:00 AM", title: "Endurance Ride", trainer: "Lauren Hayes", type: "Cardio", duration: "50 min", booked: 18, capacity: 20, color: "orange" },
    { id: 8, time: "06:30 PM", title: "Dance Cardio", trainer: "Daniel Foster", type: "Zumba", duration: "60 min", booked: 25, capacity: 25, color: "orange" }
  ]},
  { day: "FRI", date: 17, classes: [
    { id: 9, time: "06:00 AM", title: "Morning Yoga", trainer: "Rachel Morgan", type: "Yoga", duration: "60 min", booked: 16, capacity: 20, color: "orange" },
    { id: 10, time: "05:00 PM", title: "Fat Burn HIIT", trainer: "Daniel Foster", type: "HIIT", duration: "45 min", booked: 20, capacity: 20, color: "orange" }
  ]},
  { day: "SAT", date: 18, classes: [
    { id: 11, time: "09:00 AM", title: "Weekend Flow", trainer: "Rachel Morgan", type: "Yoga", duration: "75 min", booked: 12, capacity: 25, color: "green" },
    { id: 12, time: "10:30 AM", title: "Bootcamp HIIT", trainer: "Andre Jackson", type: "HIIT", duration: "60 min", booked: 24, capacity: 25, color: "orange" }
  ]}
];

const categories = ["All", "Yoga", "HIIT", "Strength", "Cardio", "Zumba"];

const BatchSchedule = () => {
  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ title: "", trainer: "", type: "Yoga", time: "", duration: "60 min", capacity: 20, day: "MON" });

  const handleDeleteClass = (dayName, classId) => {
    if (window.confirm("Delete this class?")) {
      const updatedSchedule = scheduleData.map(day => {
        if (day.day === dayName) {
          return { ...day, classes: day.classes.filter(c => c.id !== classId) };
        }
        return day;
      });
      setScheduleData(updatedSchedule);
    }
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const newId = Date.now();
    const updatedSchedule = scheduleData.map(day => {
      if (day.day === newClass.day) {
        return { ...day, classes: [...day.classes, { ...newClass, id: newId, booked: 0, color: "green" }] };
      }
      return day;
    });
    setScheduleData(updatedSchedule);
    setIsAddModalOpen(false);
    setNewClass({ title: "", trainer: "", type: "Yoga", time: "", duration: "60 min", capacity: 20, day: "MON" });
  };

  const filteredSchedule = scheduleData.map(day => ({
    ...day,
    classes: day.classes.filter(cls => {
      const matchesCategory = activeCategory === "All" || cls.type === activeCategory;
      const matchesSearch = cls.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            cls.trainer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  }));

  return (
    <div className="schedule-container">
      
      {/* ✅ HEADER FIXED: Heading Left, Button Right */}
      <div className="schedule-header">
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add Class
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card hover-gold">
          <div className="stat-icon gold"><Calendar size={24} /></div>
          <div><h2>{scheduleData.reduce((acc, day) => acc + day.classes.length, 0)}</h2><p>CLASSES / WEEK</p></div>
        </div>
        <div className="stat-card hover-gold">
          <div className="stat-icon gold"><Users size={24} /></div>
          <div><h2>{scheduleData.reduce((acc, day) => acc + day.classes.reduce((sum, c) => sum + c.booked, 0), 0)}</h2><p>TOTAL BOOKED</p></div>
        </div>
        <div className="stat-card hover-gold">
          <div className="stat-icon gold"><Activity size={24} /></div>
          <div><h2>77%</h2><p>AVG FILL RATE</p></div>
        </div>
        <div className="stat-card hover-gold">
          <div className="stat-icon gold"><Flame size={24} /></div>
          <div><h2>{scheduleData.reduce((acc, day) => acc + day.classes.filter(c => c.booked >= c.capacity).length, 0)}</h2><p>FULL / WAITLIST</p></div>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="filter-bar">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`cat-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "All" && <LayoutGrid size={16} />}
              {cat}
            </button>
          ))}
        </div>
        
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search class or trainer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="calendar-wrapper">
        <div className="calendar-top-bar">
          <div className="week-label">
            <span className="gold-bar"></span>
            <h3>This Week · Jul 13–19, 2026</h3>
          </div>
          <div className="calendar-nav">
            <button className="nav-btn"><ChevronLeft size={18} /></button>
            <button className="today-btn">Today</button>
            <button className="nav-btn"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="weekly-grid">
          {filteredSchedule.map((day) => (
            <div className="day-column" key={day.day}>
              
              <div className="day-header">
                <span className="day-name">{day.day}</span>
                <span className="day-date">{day.date}</span>
              </div>

              <div className="day-classes">
                {day.classes.map((cls) => (
                  <div className="class-card" key={cls.id}>
                    <div className="card-top">
                      <span className="class-time">{cls.time}</span>
                      <button className="more-btn" onClick={() => handleDeleteClass(day.day, cls.id)} title="Delete Class">
                        <Trash2 size={16} className="hover-red" />
                      </button>
                    </div>
                    
                    <h4 className="class-title">{cls.title}</h4>
                    <div className="class-trainer"><User size={14} /> {cls.trainer}</div>
                    <div className="class-type"><Activity size={14} className="gold-icon" /> {cls.type} · {cls.duration}</div>
                    
                    <div className="class-progress">
                      <div className={`progress-fill ${cls.color}`} style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}></div>
                    </div>
                    
                    <div className="class-footer">
                      <span className="booked-text">{cls.booked}/{cls.capacity}</span>
                      <span className="status-text">{cls.booked >= cls.capacity ? "Full" : "Open"}</span>
                    </div>
                  </div>
                ))}
                {day.classes.length === 0 && <p className="no-classes">No classes found</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Class</h2>
              <button onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddClass} className="add-class-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Class Title</label>
                  <input required type="text" placeholder="e.g. Morning Yoga" value={newClass.title} onChange={(e) => setNewClass({...newClass, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Trainer Name</label>
                  <input required type="text" placeholder="e.g. Rachel Morgan" value={newClass.trainer} onChange={(e) => setNewClass({...newClass, trainer: e.target.value})} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Time</label>
                  <input required type="text" placeholder="e.g. 06:00 AM" value={newClass.time} onChange={(e) => setNewClass({...newClass, time: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Day</label>
                  <select value={newClass.day} onChange={(e) => setNewClass({...newClass, day: e.target.value})}>
                    {scheduleData.map(d => <option key={d.day} value={d.day}>{d.day}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={newClass.type} onChange={(e) => setNewClass({...newClass, type: e.target.value})}>
                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input required type="number" value={newClass.capacity} onChange={(e) => setNewClass({...newClass, capacity: Number(e.target.value)})} />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Class</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BatchSchedule;