// src/pages/Team.jsx

import React from "react";
// import Navbar from "../components/Navbar";
import TeamHero from "../components/TeamHero";
// import TeamSection from "../components/TeamSection";
import Footer from "../components/Footer";
import TeamFaces from "../components/TeamFaces"; 

const Team = () => {
  return (
    <div>
      {/* <Navbar /> */}
     
      {/* <TeamSection /> */}
      
       <TeamHero />
       <TeamFaces />
      <Footer />
    </div>
  );
};

export default Team;