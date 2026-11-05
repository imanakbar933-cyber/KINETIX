import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Layout Components
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";

// Pages
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage";
import MembersPage from "../../pages/ADMIN/MembersPage";
import BatchSchedulepage from "../../pages/ADMIN/BatchSchedulepage"; // ✅ Naya Page Import

import "./DashboardPage.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar isOpen={isSidebarOpen} />
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        
        {/* ✅ Settings Page */}
        {path === "/settings" && <SettingsPage />}

        {/* ✅ Members Page */}
        {path === "/members" && <MembersPage />}

        {/* ✅ Batch Schedule Page (Dono URL par chalega) */}
        {(path === "/schedule" || path === "/batch-schedule") && <BatchSchedulepage />}

        {/* ✅ Default Dashboard (Agar koi route match na ho) */}
        {path === "/dashboard" && (
          <>
            <h1 style={{ color: "#fff", fontSize: "24px", marginBottom: "10px" }}>Dashboard Overview</h1>
            <p style={{ color: "#888" }}>Welcome to your dashboard.</p>
          </>
        )}
        
      </main>
    </div>
  );
};

export default DashboardPage;