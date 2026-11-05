import React from "react";
import BatchSchedule from "../../components/ADMIN/BatchSchedule";
import DashboardNavbar from "../../components/ADMIN/Settings/DashboardNavbar";
import DashboardSidebar from "../../components/ADMIN/DashboardSidebar";

const BatchSchedulePage = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#050706" }}>
      <DashboardSidebar />
      <div style={{ flex: 1, marginLeft: "260px" }}>
        <DashboardNavbar />
        <div style={{ padding: "30px", marginTop: "80px" }}>
          <h1 style={{ color: "#fff", fontSize: "24px", marginBottom: "10px" }}>Batch Schedule</h1>
          <p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "25px" }}>Dashboard &gt; Batch Schedule</p>
          <BatchSchedule />
        </div>
      </div>
    </div>
  );
};

export default BatchSchedulePage;