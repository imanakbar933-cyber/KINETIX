
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

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
// Admin Dashboard
import DashboardPage from "./pages/ADMIN/DashboardPage.jsx";
import MembersPage from "./pages/ADMIN/MembersPage.jsx";

function AppLayout() {
  const location = useLocation();

  // ==========================================
  // AUTH PAGES (No Navbar and Footer)
  // ==========================================

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";


  // ==========================================
  // DASHBOARD ROUTES (No Navbar and Footer)
  // ==========================================

  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/members") ||
    location.pathname.startsWith("/workouts") ||
    location.pathname.startsWith("/diet") ||
    location.pathname.startsWith("/schedule") ||
    location.pathname.startsWith("/billing") ||
    location.pathname.startsWith("/reports") ||
    location.pathname.startsWith("/settings");


  // ==========================================
  // MEMBERSHIP PLANS PAGE
  // ==========================================

  const isPlansPage = location.pathname === "/plans";


  // ==========================================
  // DASHBOARD LAYOUT
  // ==========================================

  if (isDashboard) {
    return (
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/workouts" element={<DashboardPage />} />
        <Route path="/diet" element={<DashboardPage />} />
        <Route path="/schedule" element={<DashboardPage />} />
        <Route path="/billing" element={<DashboardPage />} />
        <Route path="/reports" element={<DashboardPage />} />
        <Route path="/settings" element={<DashboardPage />} />

        {/* Dashboard ke separate trainer route ke liye */}
        <Route
          path="/dashboard/trainers"
          element={<DashboardPage />}
        />
      </Routes>
    );
  }


  // ==========================================
  // MAIN WEBSITE LAYOUT
  // ==========================================

  return (
    <>
      <ScrollToTop />

      {/* Navbar Login/Signup par show nahi hoga */}
      {!isAuthPage && <Navbar />}

      <div
        className="main-content-layout"
        style={{
          paddingTop:
            isAuthPage || isPlansPage ? "0" : "80px",
          transition: "padding-top 0.3s ease"
        }}
      >

        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Gym Home */}
          <Route path="/gym-home" element={<GymHome />} />

          {/* Team */}
          <Route path="/team" element={<Team />} />
          <Route
            path="/team/:memberId"
            element={<TeamMember1 />}
          />

          {/* FAQ */}
          <Route path="/faqpage" element={<FaqPage />} />

          {/* Classroom */}
          <Route
            path="/ClassroomPage"
            element={<ClassroomPage />}
          />

          {/* Gallery */}
          <Route
            path="/GalleryPage"
            element={<GalleryPage />}
          />

          {/* Class Details */}
          <Route
            path="/class-detail/:classId"
            element={<ClassDetail />}
          />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />

          {/* Main Website Trainers Page */}
          <Route
            path="/trainers"
            element={<TrainersPage />}
          />

          {/* Schedule */}
          <Route
            path="/schedules"
            element={<SchedulePage />}
          />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Signup */}
          <Route path="/signup" element={<SignUp />} />

          {/* Membership Plans */}
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

          {/* Service Details */}
          <Route
            path="/services/:slug"
            element={<ServiceDetail />}
          />

        </Routes>

      </div>

      {/* Footer Login/Signup par show nahi hoga */}
      {!isAuthPage && <Footer />}

    </>
  );
}


// ==========================================
// ROOT RENDER
// ==========================================

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </StrictMode>
);
