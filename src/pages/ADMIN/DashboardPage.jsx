import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // 👇 Sirf tab Settings khule jab URL /settings ho
  const isSettingsPage = location.pathname === "/settings";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar isOpen={isSidebarOpen} />
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
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