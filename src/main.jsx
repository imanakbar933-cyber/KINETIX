import { StrictMode, useState } from "react"; // 👈 useState import kiya
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// ✅ CSS Import
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/App.jsx";
import About from "./pages/About.jsx";
import GymHome from "./pages/GymHome.jsx";
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
import SettingsPage from "./components/Admin/Settings/SettingsPage.jsx"; // 👈 Settings Page import kiya


function AppLayout() {
  const location = useLocation();
  
  // 👇 Sidebar State yahan rakhi
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // 👇 Settings aur Auth pages par Navbar/Footer hide honge
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname === "/settings"; 

  return (
    <>
      <ScrollToTop />

      {/* Navbar tabhi dikhega jab Auth ya Settings page na ho */}
      {!isAuthPage && (
        <Navbar 
          sidebarExpanded={sidebarExpanded} 
          setSidebarExpanded={setSidebarExpanded} 
        />
      )}

      {/* Main Content Wrapper (Sidebar ke hisaab se adjust hoga) */}
      <div 
        className="main-content-layout" 
        style={{ 
          paddingLeft: isAuthPage ? "0" : (sidebarExpanded ? "260px" : "80px"),
          paddingTop: isAuthPage ? "0" : "80px",
          transition: "padding-left 0.3s ease, padding-top 0.3s ease"
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
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/schedules" element={<SchedulePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* 👇 Settings Page Route */}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>

      {/* Footer tabhi dikhega jab Auth ya Settings page na ho */}
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