import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import "./index.css";
import "./components/global.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Main Website Pages
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
import TeamMember1 from "./pages/TeamMember1.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import ServiceDetail from "./components/ServiceDetail.jsx";

// Admin Dashboard
import DashboardPage from "./pages/ADMIN/DashboardPage.jsx";

function AppLayout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/members") ||
    location.pathname.startsWith("/workouts") ||
    location.pathname.startsWith("/diet") ||
    location.pathname.startsWith("/schedule") ||
    location.pathname.startsWith("/batch-schedule") ||
    location.pathname.startsWith("/billing") ||
    location.pathname.startsWith("/reports") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/trainers");

  const isPlansPage = location.pathname === "/plans";

  // ==========================================
  // ✅ DASHBOARD LAYOUT
  // ==========================================
  if (isDashboard) {
    return (
      <Routes>
        <Route path="/dashboard" element={<DashboardPage page="dashboard" />} />
        <Route path="/members" element={<DashboardPage page="members" />} />
        <Route path="/batch-schedule" element={<DashboardPage page="batch-schedule" />} />
        <Route path="/workouts" element={<DashboardPage page="workouts" />} />
        <Route path="/diet" element={<DashboardPage page="diet" />} />
        <Route path="/schedule" element={<DashboardPage page="schedule" />} />
        <Route path="/trainers" element={<DashboardPage page="trainers" />} />
        <Route path="/billing" element={<DashboardPage page="billing" />} />
        <Route path="/reports" element={<DashboardPage page="reports" />} />
        <Route path="/settings" element={<DashboardPage page="settings" />} />
      </Routes>
    );
  }

  // ==========================================
  // ✅ MAIN WEBSITE LAYOUT
  // ==========================================
  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}

      <div
        className="main-content-layout"
        style={{
          paddingTop: isAuthPage || isPlansPage ? "0" : "0px",
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
          <Route path="/schedules" element={<SchedulePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/plans"
            element={
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
            }
          />

          <Route path="/services/:slug" element={<ServiceDetail />} />
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