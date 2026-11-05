// src/pages/admin/WorkoutRoutine.jsx
import React from "react";
// Path apne folder structure ke hisaab se adjust karein
import WorkoutPlans from "../../components/ADMIN/WorkoutPlans"; 

const WorkoutRoutine = () => {
  return (
    <div style={{ padding: "20px", width: "100%" }}>
      {/* Humara banaya hua component yahan render ho raha hai */}
      <WorkoutPlans />
    </div>
  );
};

export default WorkoutRoutine;