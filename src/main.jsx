import { StrictMode } from "react";
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
import MembershipPlans from "./components/MembershipPlans.jsx"; 
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
import ServiceDetail from "./components/ServiceDetail.jsx";

// 👇 Dashboard Page
import DashboardPage from "./pages/ADMIN/DashboardPage.jsx"; 
import SettingsPage from "./components/ADMIN/Settings/SettingsPage.jsx"; 

function AppLayout() {
  const location = useLocation();
  
  // ✅ 1. Auth Pages (Login aur Signup) par Navbar/Footer nahi honge
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // ✅ 2. Admin Dashboard Routes
  const isDashboard = 
    location.pathname === "/dashboard" || 
    location.pathname === "/members" ||
    location.pathname === "/workouts" ||
    location.pathname === "/diet" ||
    location.pathname === "/schedule" ||
    location.pathname === "/trainers" ||
    location.pathname === "/billing" ||
    location.pathname === "/reports" ||
    location.pathname === "/settings";

  const isPlansPage = location.pathname === "/plans";

  // =========================================================
  // DASHBOARD LAYOUT (No Navbar, No Footer)
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
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    );
  }

  // =========================================================
  // MAIN WEBSITE LAYOUT (With Navbar & Footer)
  // =========================================================
  return (
    <>
      <ScrollToTop />

      {/* ✅ Navbar sirf tab dikhega jab Login/Signup page NA ho */}
      {!isAuthPage && <Navbar />}

      <div 
        className="main-content-layout" 
        style={{ 
          paddingTop: isAuthPage || isPlansPage ? "0" : "80px",
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
          
          {/* ✅ Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Membership Plans Route */}
          <Route path="/plans" element={
            <div className="plans-page-wrapper">
              <div className="plans-hero-section">
                <div className="plans-hero-content">
                  <h1>MEMBERSHIP</h1>
                </div>
              </div>
              <div className="plans-content-container">
                <MembershipPlans />
              </div>
            </div>
          } />

          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </div>

      {/* ✅ Footer sirf tab dikhega jab Login/Signup page NA ho */}
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