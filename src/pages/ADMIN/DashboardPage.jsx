import React, { useState } from "react";
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";
import SettingsPage from "../../components/ADMIN/Settings/SettingsPage";
import "./DashboardPage.css";

// 👇 Apne naye component ko import karein (Path apne folder structure ke hisaab se adjust karein)
import WorkoutRoutine from "../../components/ADMIN/WorkoutRoutine"; 
import MembersList from "../../components/ADMIN/MembersList"; 

const DashboardPage = ({ page }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    if (page === "settings") {
      return <SettingsPage />;
    }
    
    if (page === "members") {
      return <MembersList />;
    }

    // 👇 Yahan Workout Plans ko call karein
    if (page === "workouts") {
      return <WorkoutRoutine />;
    }

    // Default Dashboard
    return (
      <div style={{ padding: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          {page === "dashboard" ? "Dashboard Overview" : `${page?.toUpperCase()} Page`}
        </h1>
        <p style={{ color: "#888", marginBottom: "30px" }}>Welcome to your {page} page.</p>
        
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "10px", flex: 1 }}>
            <h3 style={{ color: "#03ea04" }}>Total Members</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>1,248</p>
          </div>
          <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "10px", flex: 1 }}>
            <h3 style={{ color: "#03ea04" }}>Active Trainers</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>24</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar isOpen={isSidebarOpen} />
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <main className={`dashboard-content ${isSidebarOpen ? "shifted" : ""}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;