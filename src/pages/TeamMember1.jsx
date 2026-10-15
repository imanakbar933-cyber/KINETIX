// src/pages/TeamMember.jsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeamHero from "../components/TeamHero";
import Footer from "../components/Footer";
import "./TeamMember1.css";

const TeamMember1 = () => {
  const { memberId } = useParams();

  // ✅ Team Members Data
  const members = {
    ahmed: {
      name: "AHMED RAZA",
      role: "Head Trainer",
      image: "/gym-assets/AHMED.jpg",
      bio: "Ahmed Raza is a certified strength and conditioning coach with over 10 years of experience. He has trained professional athletes, beginners, and everyone in between.",
      experience: [
        { skill: "Strength Training", percent: 95 },
        { skill: "Powerlifting", percent: 90 },
        { skill: "Nutrition Coaching", percent: 85 },
        { skill: "Body Recomposition", percent: 80 },
      ],
    },
    bilal: {
      name: "BILAL KHAN",
      role: "Fitness Coach",
      image: "/gym-assets/Bilal.jpg",
      bio: "Bilal Khan specializes in personalized fitness programs designed for busy professionals and beginners. His motivating style makes fitness accessible to everyone.",
      experience: [
        { skill: "HIIT", percent: 96 },
        { skill: "Circuit Training", percent: 90 },
        { skill: "CrossFit", percent: 88 },
        { skill: "Body Recomposition", percent: 82 },
      ],
    },
    fatima: {
      name: "FATIMA ALI",
      role: "Yoga Instructor",
      image: "/gym-assets/Fatimah.jpg",
      bio: "Fatima Ali is a certified yoga instructor with training in Hatha, Vinyasa, and Prenatal Yoga. She believes fitness is not just physical — it's mental and spiritual too.",
      experience: [
        { skill: "Hatha Yoga", percent: 98 },
        { skill: "Vinyasa Flow", percent: 92 },
        { skill: "Meditation", percent: 90 },
        { skill: "Prenatal Yoga", percent: 85 },
      ],
    },
  };

  const member = members[memberId];

  // Agar member nahi mila
  if (!member) {
    return (
      <div className="teammember-page">
        <Navbar />
        <section className="teammember-notfound">
          <h1>Member Not Found</h1>
          <p>Yeh team member exist nahi karta.</p>
          <Link to="/our-team" className="teammember-back-btn">
            ← Back to Team
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="teammember-page">
      <Navbar />

      {/* ✅ TeamHero — Member Name Ke Saath */}
      <TeamHero title={member.name} breadcrumb={member.name} />

      {/* ✅ Detail Section */}
      <section className="memberdetail-section">
        <div className="memberdetail-container">
          <div className="memberdetail-content">

            {/* LEFT — Image */}
            <div className="memberdetail-image-wrapper">
              <img
                src={member.image}
                alt={member.name}
                className="memberdetail-image"
              />
            </div>

            {/* RIGHT — Info */}
            <div className="memberdetail-info">

              <h2 className="memberdetail-name">{member.name}</h2>
              <p className="memberdetail-role">{member.role}</p>
              <p className="memberdetail-bio">{member.bio}</p>

              <div className="memberdetail-experience-block">
                <h3 className="memberdetail-block-title">
                  EXPERIENCE & EXPERTISE
                </h3>

                <div className="memberdetail-bars">
                  {member.experience.map((item, index) => (
                    <div key={index} className="memberdetail-bar-row">
                      <div className="memberdetail-bar-header">
                        <span className="memberdetail-bar-label">
                          {item.skill}
                        </span>
                        <span className="memberdetail-bar-percent">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="memberdetail-bar-track">
                        <div
                          className="memberdetail-bar-fill"
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default TeamMember1;