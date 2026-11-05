import React from "react";
import BatchSchedule from "../../components/ADMIN/BatchSchedule"; // ✅ Path check kar lein

const BatchSchedulePage = () => {
  return (
    <div style={{ padding: "30px" }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
          Batch Schedule
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "13px", margin: 0 }}>
          Dashboard &gt; Batch Schedule
        </p>
      </div>

      {/* ✅ Sirf Table Component */}
      <BatchSchedule />
      
    </div>
  );
};

export default BatchSchedulePage;