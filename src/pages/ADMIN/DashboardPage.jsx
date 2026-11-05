import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 

// Layout Components
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar"; 

// Pages / Components
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage";
import MembersPage from "../../pages/ADMIN/MembersPage"; // 👈 Members Page Import
import BatchSchedulepage from "../../pages/ADMIN/BatchSchedulepage"; // 👈 Batch Schedule Page Import

import "./DashboardPage.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 👇 URL check karne ke liye
  const location = useLocation(); 
  const path = location.pathname;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      
      {/* 1. Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* 2. Navbar */}
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* 3. Main Content Area */}
      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        
        {/* ✅ Condition laga kar alag alag pages load karayein */}
        
        {path === "/settings" && <SettingsPage />}
        
        {path === "/members" && <MembersPage />}
        
        {path === "/batch-schedule" && <BatchSchedulepage />}

        {/* Default Dashboard Page (Agar koi route match na ho) */}
        {path === "/dashboard" && (
          <>
            <h1>Dashboard Overview</h1>
            <p style={{ color: "#888" }}>Welcome to your dashboard.</p>
          </>
        )}
        
      </main>
    </div>
  );
};

export default DashboardPage;