import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TrainersPage from "./pages/TrainersPage.jsx";   // 👈 ADD
import ServicesPage from "./pages/ServicesPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.jsx";
import TeamMember1 from "./pages/TeamMember1.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <ScrollToTop />
      <Navbar />

      <Routes>
       <Route path="/" element={<Home   />} />
        <Route path="/about" element={<About />} />
        <Route path="/gym-home" element={<GymHome />} />
         <Route path="/team" element={<Team />} />
          <Route path="/team/:memberId" element={<TeamMember1 />} /> 
        <Route path="/faqpage" element={<FaqPage />} />
        <Route path="/ClassroomPage" element={<ClassroomPage />} />
        <Route path="/GalleryPage" element={<GalleryPage />} />
        <Route path="/class-detail/:classId" element={<ClassDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trainers" element={<TrainersPage />} />   {/* 👈 ADD */}
        <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/schedules" element={<SchedulePage />} />
   
      </Routes>

      <Footer />
      
    </BrowserRouter>
  </StrictMode>
);