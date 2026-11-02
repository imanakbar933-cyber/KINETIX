import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutGrid, Users, Dumbbell, Utensils, Calendar, 
  UserCircle, FileText, BarChart2, Settings, LogOut 
} from "lucide-react";
import "./DashboardSidebar.css";

const DashboardSidebar = ({ isOpen }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : { name: "Nathan Reeves", photo: "/images/user.jpg" };
  });

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem("userProfile");
      if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  return (
    <aside className={`dash-sidebar ${isOpen ? "open" : ""}`}>
      <div className="dash-sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src="/images/kinetix.svg" alt="Kinetix" />
        </Link>
      </div>

      <div className="dash-sidebar-menu">
        <Link to="/dashboard" className="dash-menu-item active"><LayoutGrid size={20} /> Dashboard</Link>
        <Link to="/members" className="dash-menu-item"><Users size={20} /> Member</Link>
        <Link to="/workouts" className="dash-menu-item"><Dumbbell size={20} /> Workout Routine</Link>
        <Link to="/diet" className="dash-menu-item"><Utensils size={20} /> Diet Chart</Link>
        <Link to="/schedule" className="dash-menu-item"><Calendar size={20} /> Batch Schedule</Link>
        <Link to="/trainers" className="dash-menu-item"><UserCircle size={20} /> Trainer List</Link>
        <Link to="/billing" className="dash-menu-item"><FileText size={20} /> Billing List</Link>
        <Link to="/reports" className="dash-menu-item"><BarChart2 size={20} /> Report</Link>
        <Link to="/settings" className="dash-menu-item"><Settings size={20} /> Settings</Link>
      </div>

      <div className="dash-sidebar-footer">
        <img src={user.photo} alt={user.name} style={{ objectFit: "cover" }} />
        <div className="user-info">
          <h4>{user.name}</h4>
          <p>Super Admin</p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;