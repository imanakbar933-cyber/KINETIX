import React, { useState } from "react";
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      
      {/* 1. Sidebar (Sabse pehle, top-left) */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* 2. Navbar (isSidebarOpen prop pass kiya taake woh khud shift ho) */}
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* 3. Main Content (Jo shift hoga) */}
      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        <h1>Dashboard Overview</h1>
        <p style={{ color: "#888" }}>Welcome to your dashboard.</p>
      </main>
    </div>
  );
};

export default DashboardPage;