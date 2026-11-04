import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Users, Calendar, FileText, 
  User, Settings, LogOut, Search, Bell, Flame, ChevronDown 
} from "lucide-react";
import MembersList from "../../components/ADMIN/MembersList.jsx";
import "./MembersPage.css";

const MembersPage = () => {
  return (
    <div className="members-layout">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="members-sidebar">
        <div className="members-logo">
          <Flame size={28} color=" #03ea04" />
          <h2>FitFlow</h2>
        </div>

        <div className="members-menu">
          <Link to="/dashboard" className="members-menu-item"><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/members" className="members-menu-item active"><Users size={18} /> Member</Link>
          <Link to="/workout" className="members-menu-item"><Calendar size={18} /> Workout Routine</Link>
          <Link to="/diet" className="members-menu-item"><FileText size={18} /> Diet Chart</Link>
          <Link to="/schedule" className="members-menu-item"><Calendar size={18} /> Batch Schedule</Link>
          <Link to="/trainers" className="members-menu-item"><User size={18} /> Trainer List</Link>
          <Link to="/billing" className="members-menu-item"><FileText size={18} /> Billing List</Link>
          <Link to="/report" className="members-menu-item"><FileText size={18} /> Report</Link>
          <Link to="/settings" className="members-menu-item"><Settings size={18} /> Setting</Link>
        </div>

        <div className="sidebar-upgrade-card">
          <p>Upgrade to <span>PRO</span></p>
          <h3>Basic</h3>
          <p className="days-left">21 Days Left</p>
          <div className="progress-bar"><div className="progress-fill"></div></div>
          <button className="upgrade-btn">Upgrade Plan</button>
        </div>

        <div className="sidebar-logout">
          <LogOut size={18} /> Log Out
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="members-main">
        
        {/* TOP HEADER */}
        <header className="members-header">
          <div className="header-search">
            <Search size={18} color="#8c8ea7" />
            <input type="text" placeholder="Find something here..." />
          </div>

          <div className="header-right">
            <div className="header-icon"><Flame size={20} color=" #03ea04" /></div>
            <div className="header-icon"><Bell size={20} color=" #03ea04 "/> </div>
            <div className="header-profile">
              <img src="https://i.pravatar.cc/150?img=12" alt="User" />
              <div>
                <h4>Emon</h4>
                <p>Super Admin</p>
              </div>
              <ChevronDown size={16} color="#8c8ea7" />
            </div>
          </div>
        </header>

        {/* PAGE TITLE */}
        <div className="page-title-section">
          <h1>Member List</h1>
          <p className="breadcrumb">Member &gt; Member List</p>
        </div>

        {/* ✅ MEMBER LIST COMPONENT YAHAN CALL HUA HAI */}
        <MembersList />

      </main>
    </div>
  );
};

export default MembersPage;