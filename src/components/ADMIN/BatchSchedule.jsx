import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, Clock, User, Users } from "lucide-react";
import "./BatchSchedule.css";

// Demo Data
const initialBatches = [
  { id: 1, className: "Morning Yoga", trainer: "Fatima Ali", day: "Monday", time: "07:00 AM - 08:00 AM", capacity: 20, booked: 15 },
  { id: 2, className: "HIIT Blast", trainer: "Ahmed Raza", day: "Monday", time: "06:00 PM - 07:00 PM", capacity: 25, booked: 25 },
  { id: 3, className: "Strength Training", trainer: "Bilal Khan", day: "Tuesday", time: "08:00 AM - 09:30 AM", capacity: 15, booked: 10 },
  { id: 4, className: "Zumba Dance", trainer: "Fatima Ali", day: "Wednesday", time: "05:00 PM - 06:00 PM", capacity: 30, booked: 22 },
  { id: 5, className: "CrossFit", trainer: "Ahmed Raza", day: "Thursday", time: "06:30 AM - 07:30 AM", capacity: 20, booked: 18 },
  { id: 6, className: "Boxing Basics", trainer: "Bilal Khan", day: "Friday", time: "07:00 PM - 08:30 PM", capacity: 15, booked: 12 },
  { id: 7, className: "Weekend Bootcamp", trainer: "Ahmed Raza", day: "Saturday", time: "09:00 AM - 10:30 AM", capacity: 40, booked: 35 },
];

const BatchSchedule = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Delete Function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter((batch) => batch.id !== id));
    }
  };

  // ✅ Search Filter
  const filteredBatches = batches.filter((batch) =>
    batch.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.day.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="batch-schedule-container">
      
      {/* --- Top Action Bar --- */}
      <div className="batch-top-bar">
        <div className="batch-search-box">
          <Search size={18} className="batch-search-icon" />
          <input 
            type="text" 
            placeholder="Search class, trainer or day..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-batch-btn">
          <Plus size={18} /> Add New Batch
        </button>
      </div>

      {/* --- Table --- */}
      <div className="batch-table-wrapper">
        <table className="batch-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Trainer</th>
              <th>Day</th>
              <th>Time</th>
              <th>Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBatches.map((batch) => (
              <tr key={batch.id} className="batch-row">
                <td>
                  <div className="class-name-box">
                    <div className="class-icon"><Clock size={16} /></div>
                    <span className="class-title">{batch.className}</span>
                  </div>
                </td>
                <td>
                  <div className="trainer-box">
                    <User size={14} className="text-green" />
                    {batch.trainer}
                  </div>
                </td>
                <td>
                  <span className="day-badge">{batch.day}</span>
                </td>
                <td className="time-text">{batch.time}</td>
                <td>
                  <div className="capacity-box">
                    <Users size={14} className="text-gray" />
                    <span>{batch.booked} / {batch.capacity}</span>
                    {/* Progress bar for capacity */}
                    <div className="capacity-bar">
                      <div 
                        className={`capacity-fill ${batch.booked >= batch.capacity ? "full" : ""}`} 
                        style={{ width: `${(batch.booked / batch.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="batch-actions">
                    <button className="batch-btn edit" title="Edit"><Pencil size={16} /></button>
                    <button className="batch-btn delete" onClick={() => handleDelete(batch.id)} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredBatches.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#9ca3af" }}>
                  No batches found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default BatchSchedule;