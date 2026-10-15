// src/pages/ClassroomPage.jsx

import React from "react";
import ClassroomHero from "../components/ClassroomHero";
import ClassroomContent from "../components/ClassroomContent";

const ClassroomPage = () => {
  return (
    <div>
      {/* ✅ Classroom Hero */}
      <ClassroomHero />
      <ClassroomContent  /> 
    </div>
  );
};

export default ClassroomPage;