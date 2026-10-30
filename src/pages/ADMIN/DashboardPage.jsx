import React from "react";
// 👇 Yahan ../../ laga dein (2 step peeche)
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";

const DashboardPage = () => {
  return (
    <div style={{ background: "#050706", minHeight: "100vh", color: "#fff" }}>
      
      {/* 👇 Sirf Dashboard Navbar Dikhega */}
      <DashboardNavbar toggleSidebar={() => alert("Sidebar toggle clicked")} />

      {/* Neeche ka area (Placeholder) */}
      <div style={{ padding: "40px" }}>
        <h2>Welcome to Dashboard</h2>
        <p style={{ color: "#888" }}>Your dashboard content goes here.</p>
      </div>

    </div>
  );
};

export default DashboardPage;