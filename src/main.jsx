import { StrictMode } from "react";
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

// 👇 Naya Dashboard Page import kiya (Aapke ADMIN folder se)
import DashboardPage from "./pages/ADMIN/DashboardPage.jsx"; 

function AppLayout() {
  const location = useLocation();
  
  // 👇 Yahan /dashboard add kar diya hai. 
  // Iska matlab jab bhi URL /dashboard hoga, isAuthPage TRUE ho jayega.
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname === "/dashboard"; 

  return (
    <>
      <ScrollToTop />

      {/* 👇 Main Navbar sirf tab dikhega jab Dashboard ya Login/Signup page na ho */}
      {!isAuthPage && <Navbar />}

      <div 
        className="main-content-layout" 
        style={{ 
          // Dashboard pe padding top 0 hogi kyunki wahan main Navbar nahi hai
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
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/schedules" element={<SchedulePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* 👇 Naya Dashboard Route */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>

      {/* 👇 Main Footer sirf tab dikhega jab Dashboard ya Login/Signup page na ho */}
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