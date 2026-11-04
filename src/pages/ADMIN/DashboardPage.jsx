import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 Yeh import zaroori hai
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage"; // 👈 SettingsPage import karein
import "./DashboardPage.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 👇 URL check karne ke liye
  const location = useLocation(); 
  const isSettingsPage = location.pathname === "/settings";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      
      {/* 1. Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* 2. Navbar */}
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* 3. Main Content */}
      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        
        {/* 👇 Check karein: Agar settings hai toh SettingsPage dikhao, warna Dashboard */}
        {isSettingsPage ? (
          <SettingsPage />
        ) : (
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