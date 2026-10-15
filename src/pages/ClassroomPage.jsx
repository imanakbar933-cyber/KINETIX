// src/pages/ClassroomPage.jsx

import React from "react";
import ClassroomHero from "../components/ClassroomHero";
import ClassroomContent from "../components/ClassroomContent";
import  Classroom from "../components/Classroom"; 


const ClassroomPage = () => {
  return (
    <div>
      {/* ✅ Classroom Hero */}
      <ClassroomHero />
      <ClassroomContent  /> 
      <Classroom />
       
    </div>
  );
};

export default ClassroomPage;