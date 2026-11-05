import React, { useState } from "react";
import MembersList from "../../components/ADMIN/MembersList"; 
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar"; 
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar"; 
import "./MembersPage.css";

const MembersPage = () => {
  // ✅ Sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      
      {/* 1. SIDEBAR */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* 2. MAIN AREA (Navbar + Content) */}
      <div className={`admin-main ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        
        {/* NAVBAR */}
        <DashboardNavbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        {/* PAGE CONTENT (Table) */}
        <div className="admin-content-area">
          <div className="page-header">
            <h1>Member List</h1>
            <p className="breadcrumb">Member &gt; Member List</p>
          </div>

          <MembersList />
        </div>

      </div>
    </div>
  );
};

export default MembersPage;