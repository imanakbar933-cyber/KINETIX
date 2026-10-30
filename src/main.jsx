<<<<<<< HEAD
import { StrictMode, useState } from "react";
=======
import { StrictMode } from "react";
>>>>>>> 4130d8a8ab24b856254dec63b5eec8bb29141a02
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/App.jsx";
import About from "./pages/About.jsx";
import GymHome from "./pages/GymHome.jsx";
import MembershipPlans from "./components/MembershipPlans.jsx"; // Yeh wahi component hai jo home par bhi hai
import FaqPage from "./pages/FaqPage.jsx";
import ClassroomPage from "./pages/ClassroomPage";
import Team from "./pages/Team.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ClassDetail from "./pages/ClassDetail.jsx";
import Contact from "./pages/Contact.jsx";
import TrainersPage from "./pages/TrainersPage.jsx";
import TeamMember1 from "./pages/TeamMember1.jsx";
import SchedulePage from "./pages/SchedulePage.jsx"; 
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
<<<<<<< HEAD
import SettingsPage from "./components/Admin/Settings/SettingsPage.jsx";

function AppLayout() {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname === "/settings"; 
=======

// 👇 Dashboard Page
import DashboardPage from "./pages/ADMIN/DashboardPage.jsx"; 

// 👇 Settings Page (Aapke components folder se)
import SettingsPage from "./components/ADMIN/Settings/SettingsPage.jsx"; 

function AppLayout() {
  const location = useLocation();
  
  // 👇 Check karein ke kya hum Dashboard ke kisi bhi page par hain
  const isDashboard = location.pathname.startsWith("/dashboard") || 
                      location.pathname.startsWith("/members") ||
                      location.pathname.startsWith("/workouts") ||
                      location.pathname.startsWith("/diet") ||
                      location.pathname.startsWith("/schedule") ||
                      location.pathname.startsWith("/trainers") ||
                      location.pathname.startsWith("/billing") ||
                      location.pathname.startsWith("/reports") ||
                      location.pathname.startsWith("/settings");

  // 👇 Auth pages (Login/Signup)
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
>>>>>>> 4130d8a8ab24b856254dec63b5eec8bb29141a02

  // =========================================================
  // AGAR DASHBOARD HAI TOH SIRF DASHBOARD PAGE DIKHAO
  // =========================================================
  if (isDashboard) {
    return (
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/members" element={<DashboardPage />} />
        <Route path="/workouts" element={<DashboardPage />} />
        <Route path="/diet" element={<DashboardPage />} />
        <Route path="/schedule" element={<DashboardPage />} />
        <Route path="/trainers" element={<DashboardPage />} />
        <Route path="/billing" element={<DashboardPage />} />
        <Route path="/reports" element={<DashboardPage />} />
        
        {/* 👇 Settings ke liye naya page */}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    );
  }

  // =========================================================
  // BAQI SAARE PAGES (Main Website)
  // =========================================================
  return (
    <>
      <ScrollToTop />

<<<<<<< HEAD
      {!isAuthPage && (
        <Navbar 
          sidebarExpanded={sidebarExpanded} 
          setSidebarExpanded={setSidebarExpanded} 
        />
      )}
=======
      {!isAuthPage && <Navbar />}
>>>>>>> 4130d8a8ab24b856254dec63b5eec8bb29141a02

      <div 
        className="main-content-layout" 
        style={{ 
          paddingTop: isAuthPage ? "0" : "80px",
          transition: "padding-top 0.3s ease"
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gym-home" element={<GymHome />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:memberId" element={<TeamMember1 />} />
          <Route path="/faqpage" element={<FaqPage />} />
          <Route path="/ClassroomPage" element={<ClassroomPage />} />
          <Route path="/GalleryPage" element={<GalleryPage />} />
          <Route path="/class-detail/:classId" element={<ClassDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trainers-page" element={<TrainersPage />} />
          <Route path="/schedules" element={<SchedulePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* 👇 Yahan humne Image aur Component dono wrap kar diye hain */}
          
          <Route path="/plans" element={
  <div className="plans-page-wrapper">
    
    {/* HERO SECTION */}
    <div className="plans-hero-section">
      <div className="plans-hero-content">
        <h1>MEMBERSHIP</h1>
      </div>
    </div>

    {/* MEMBERSHIP PLANS COMPONENT */}
    <div className="plans-content-container">
      <MembershipPlans />
    </div>

  </div>
} />
          
        </Routes>
      </div>

      {!isAuthPage && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </StrictMode>
);