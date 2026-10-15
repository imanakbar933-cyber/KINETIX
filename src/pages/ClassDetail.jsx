// src/pages/ClassDetail.jsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import ClassDetailHero from "../components/ClassDetailHero";
import ClassDetailContent from "../components/ClassDetailContent";
import "./ClassDetail.css";

const ClassDetail = () => {
  const { classId } = useParams();

  // ============================================
  // ✅ SAARI 6 CLASSES KA DATA — EK JAGAH
  // ============================================
  const classesData = {
    "online-classes": {
      title: "ONLINE CLASSES & RESOURCES",
      image: "/gym-assets/class1.jpg",
      description: "List rectangle frame thumbnail pen link scale clip content inspect edit.",
      date: "Fri, Sun, Wed",
      time: "60 Min",
      maximize: "Burn calories",
      intensity: "Low",
      location: "California",
      about:
        "Access our premium online fitness platform anytime, anywhere. Our online classes are designed for all fitness levels — from beginners to advanced athletes. Get personalized workout plans, live sessions with trainers, and a complete library of on-demand videos.",
      features: [
        "Live Sessions with Trainers",
        "On-Demand Video Library",
        "Mobile App Access",
        "24/7 Support",
      ],
      price: "PKR 2,500 / month",
    },

    "nutrition": {
      title: "NUTRITION COUNSELLING",
      image: "/gym-assets/class2.jpg",
      description: "Join our energetic group fitness classes led by experienced instructors.",
      date: "Mon, Tue, Thu",
      time: "45 Min",
      maximize: "Healthy diet",
      intensity: "Medium",
      location: "California",
      about:
        "Get personalized nutrition plans from certified dietitians. We help you build sustainable eating habits that align with your fitness goals — whether you want to lose weight, gain muscle, or just eat healthier.",
      features: [
        "Custom Diet Plan",
        "Weekly Check-ins",
        "Supplement Guidance",
        "Meal Prep Tips",
      ],
      price: "PKR 5,000 / month",
    },

    "personal-training": {
      title: "PERSONAL TRAINING SESSIONS",
      image: "/gym-assets/class3.jpg",
      description: "Join our energetic group fitness classes led by experienced instructors.",
      date: "Mon to Fri",
      time: "60 Min",
      maximize: "Build muscle",
      intensity: "High",
      location: "California",
      about:
        "One-on-one training sessions with our expert coaches. Whether you're a beginner or an athlete, we design a program specifically for your body, goals, and schedule.",
      features: [
        "Custom Workout Plan",
        "1-on-1 Coaching",
        "Progress Tracking",
        "Nutrition Advice",
      ],
      price: "PKR 10,000 / month",
    },

    "fitness-challenges": {
      title: "FITNESS CHALLENGES",
      image: "/gym-assets/class4.jpg",
      description: "Join our energetic group fitness classes led by experienced instructors.",
      date: "Sat, Sun",
      time: "90 Min",
      maximize: "Push limits",
      intensity: "High",
      location: "California",
      about:
        "Monthly fitness challenges to push your limits and keep you motivated. Compete with other members and win exciting rewards while getting fit.",
      features: [
        "Monthly Challenges",
        "Leaderboard",
        "Rewards & Prizes",
        "Community Support",
      ],
      price: "PKR 1,500 / month",
    },

    "workshops": {
      title: "WORKSHOPS & SEMINARS",
      image: "/gym-assets/class5.jpg",
      description: "Join our energetic group fitness classes led by experienced instructors.",
      date: "Every Saturday",
      time: "120 Min",
      maximize: "Learn skills",
      intensity: "Low",
      location: "California",
      about:
        "Attend hands-on workshops and seminars led by industry experts. Learn about fitness, nutrition, recovery, and everything in between.",
      features: [
        "Expert-Led Sessions",
        "Hands-On Practice",
        "Certificate of Completion",
        "Networking",
      ],
      price: "PKR 3,000 / workshop",
    },

    "group-fitness": {
      title: "GROUP FITNESS CLASSES",
      image: "/gym-assets/class6.jpg",
      description: "Join our energetic group fitness classes led by experienced instructors.",
      date: "Mon to Sun",
      time: "45 Min",
      maximize: "Have fun",
      intensity: "Medium",
      location: "California",
      about:
        "High-energy group classes for all fitness levels — from Zumba to HIIT, we have something for everyone. Train with a community and stay motivated.",
      features: [
        "Multiple Class Types",
        "All Levels Welcome",
        "Community Atmosphere",
        "Fun & Motivating",
      ],
      price: "PKR 2,000 / month",
    },
  };

  // ✅ URL se classId uthao, data nikalo
  const cls = classesData[classId];

  // Agar class nahi mili
  if (!cls) {
    return (
      <div className="classdetail-notfound">
        <h1>Class Not Found</h1>
        <p>Yeh class exist nahi karti.</p>
        <Link to="/classroom" className="classdetail-back">
          ← Back to Classroom
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Hero — Class Data Pass Karo */}
      <ClassDetailHero title={cls.title} image={cls.image} />

      {/* ✅ Content — Poora Data Pass Karo */}
      <ClassDetailContent cls={cls} />
    </div>
  );
};

export default ClassDetail;