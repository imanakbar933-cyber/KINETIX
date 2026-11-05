import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid, Users, Dumbbell, Utensils, Calendar,
  UserCircle, FileText, BarChart2, Settings, LogOut
} from "lucide-react";
import "./DashboardSidebar.css";

const DashboardSidebar = ({ isOpen, onResizeStart, onHeightResizeStart }) => {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : { name: "Nathan Reeves", photo: "/images/user.jpg" };
  });

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem("userProfile");
      if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "dash-menu-item active" : "dash-menu-item";

  return (
    <aside className={`dash-sidebar ${isOpen ? "open" : ""}`}>
      <div className="dash-sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src="/images/kinetix.svg" alt="Kinetix" />
        </Link>
      </div>

      <div className="dash-sidebar-menu">
        <Link to="/dashboard" className={isActive("/dashboard")}><LayoutGrid size={20} /> Dashboard</Link>
        <Link to="/members" className={isActive("/members")}><Users size={20} /> Member</Link>
        <Link to="/workouts" className={isActive("/workouts")}><Dumbbell size={20} /> Workout Routine</Link>
        <Link to="/diet" className={isActive("/diet")}><Utensils size={20} /> Diet Chart</Link>
        <Link to="/schedule" className={isActive("/schedule")}><Calendar size={20} /> Batch Schedule</Link>
        <Link to="/trainers" className={isActive("/trainers")}><UserCircle size={20} /> Trainer List</Link>
        <Link to="/billing" className={isActive("/billing")}><FileText size={20} /> Billing List</Link>
        <Link to="/reports" className={isActive("/reports")}><BarChart2 size={20} /> Report</Link>
        <Link to="/settings" className={isActive("/settings")}><Settings size={20} /> Settings</Link>
      </div>

      <div className="dash-sidebar-footer">
        <img src={user.photo} alt={user.name} style={{ objectFit: "cover" }} />
        <div className="user-info">
          <h4>{user.name}</h4>
          <p>Super Admin</p>
        </div>
      </div>

      {/* ✅ RIGHT EDGE — Invisible Width drag handle (No lines) */}
      {isOpen && (
        <div
          className="dash-sidebar-resize-handle"
          onMouseDown={onResizeStart}
          title="Drag to resize width"
        ></div>
      )}

      {/* ✅ BOTTOM EDGE — Invisible Height drag handle (No lines) */}
      {isOpen && (
        <div
          className="dash-sidebar-height-handle"
          onMouseDown={onHeightResizeStart}
          title="Drag to resize height"
        ></div>
      )}
    </aside>
  );
};

export default DashboardSidebar;