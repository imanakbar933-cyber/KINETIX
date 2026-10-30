import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutGrid, Users, Dumbbell, Utensils, Calendar, 
  UserCircle, FileText, BarChart2, Settings, LogOut 
} from "lucide-react";
import "./DashboardSidebar.css";

const DashboardSidebar = ({ isOpen }) => {
  return (
    <aside className={`dash-sidebar ${isOpen ? "open" : ""}`}>
      
      {/* Sidebar Header (Logo) */}
      <div className="dash-sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src="/images/kinetix.svg" alt="Kinetix" />
        </Link>
      </div>

      {/* Menu Links */}
      <div className="dash-sidebar-menu">
        <Link to="/dashboard" className="dash-menu-item active">
          <LayoutGrid size={20} /> Dashboard
        </Link>
        <Link to="/members" className="dash-menu-item">
          <Users size={20} /> Member
        </Link>
        <Link to="/workouts" className="dash-menu-item">
          <Dumbbell size={20} /> Workout Routine
        </Link>
        <Link to="/diet" className="dash-menu-item">
          <Utensils size={20} /> Diet Chart
        </Link>
        <Link to="/schedule" className="dash-menu-item">
          <Calendar size={20} /> Batch Schedule
        </Link>
        <Link to="/trainers" className="dash-menu-item">
          <UserCircle size={20} /> Trainer List
        </Link>
        <Link to="/billing" className="dash-menu-item">
          <FileText size={20} /> Billing List
        </Link>
        <Link to="/reports" className="dash-menu-item">
          <BarChart2 size={20} /> Report
        </Link>
        <Link to="/settings" className="dash-menu-item">
          <Settings size={20} /> Settings
        </Link>
      </div>

      {/* Logout */}
      <div className="dash-sidebar-footer">
        <Link to="/login" className="logout-btn">
          <LogOut size={20} /> Log Out
        </Link>
      </div>

    </aside>
  );
};

export default DashboardSidebar;